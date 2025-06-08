import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Box, Typography, Paper, Snackbar, Alert } from '@mui/material';
import { type AminoAcid, AMINO_ACID_COLORS, isValidAminoAcid } from '../types/aminoAcids';
import { MaskedInput } from './MaskedInput';

interface FormInputs {
  sequence1: string;
  sequence2: string;
}

export const SequenceAlignment: React.FC = () => {
  const [alignment, setAlignment] = useState<{ seq1: string; seq2: string } | null>(null);
  const [showCopyNotification, setShowCopyNotification] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      sequence1: '',
      sequence2: '',
    },
  });

  const sequence = watch('sequence1');

  const validateSequence = (value: string) => {
    if (!value) return 'Sequence is required';
    if (value.length !== sequence.length && sequence) {
      return 'Sequences must be of equal length';
    }
    if (![...value].every((char) => isValidAminoAcid(char))) {
      return 'Sequence can only contain valid amino acid letters (A-Z) and -';
    }
    return true;
  };

  const onSubmit = (data: FormInputs) => {
    setAlignment({
      seq1: data.sequence1,
      seq2: data.sequence2,
    });
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowCopyNotification(true);
  };

  const renderSequence = (sequence: string, isTop: boolean) => {
    return (
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          fontFamily: 'monospace',
          fontSize: '1.2rem',
          userSelect: 'text',
          cursor: 'text',
          position: 'relative',
        }}
        onMouseUp={() => {
          const selection = window.getSelection();
          if (selection && selection.toString()) {
            handleCopy(selection.toString());
          }
        }}
      >
        {[...sequence].map((char, index) => {
          const isDifferent = !isTop && char !== sequence[index];
          return (
            <Box
              key={index}
              sx={{
                backgroundColor: isTop
                  ? AMINO_ACID_COLORS[char as AminoAcid]
                  : isDifferent
                  ? '#FFD700'
                  : 'transparent',
                color: 'black',
                padding: '0 0',
                border: '1px solid black',
                borderCollapse: 'collapse',
                minWidth: '1.2em',
                textAlign: 'center',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {char}
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <Box sx={{ maxWidth: '100%', p: 2 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="sequence1"
            control={control}
            rules={{ validate: validateSequence }}
            render={({ field }) => (
              <MaskedInput
                {...field}
                fullWidth
                label="First Sequence"
                error={!!errors.sequence1}
                helperText={errors.sequence1?.message}
              />
            )}
          />
          <Controller
            name="sequence2"
            control={control}
            rules={{ validate: validateSequence }}
            render={({ field }) => (
              <MaskedInput
                {...field}
                fullWidth
                label="Second Sequence"
                error={!!errors.sequence2}
                helperText={errors.sequence2?.message}
              />
            )}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Visualize Alignment
          </Button>
        </form>
      </Paper>

      {alignment && (
        <Paper elevation={3} sx={{ p: 3, gap: 4, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" gutterBottom>
            Alignment Visualization
          </Typography>
          {renderSequence(alignment.seq1, true)}
          {renderSequence(alignment.seq2, false)}
        </Paper>
      )}

      <Snackbar
        open={showCopyNotification}
        autoHideDuration={1000}
        onClose={() => setShowCopyNotification(false)}
      >
        <Alert severity="success" onClose={() => setShowCopyNotification(false)}>
          Sequence copied to clipboard!
        </Alert>
      </Snackbar>
    </Box>
  );
};
