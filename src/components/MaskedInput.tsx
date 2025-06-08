import React from 'react';
import { Input, InputLabel, FormControl, FormHelperText } from '@mui/material';
import type { InputProps } from '@mui/material';
import { AMINO_ACIDS, type AminoAcid } from '../types/aminoAcids';

interface MaskedInputProps extends Omit<InputProps, 'onChange'> {
  onChange?: (value: string) => void;
  value?: string;
  label?: string;
  error?: boolean;
  helperText?: string;
}

export const MaskedInput: React.FC<MaskedInputProps> = ({
  onChange,
  value,
  error,
  helperText,
  label,
  ...props
}) => {
  const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    const filteredValue = value
      .toUpperCase()
      .split('')
      .filter((char) => AMINO_ACIDS.includes(char as AminoAcid))
      .join('');

    if (onChange) {
      onChange(filteredValue);
    }
  };

  return (
    <FormControl fullWidth error={error} margin="normal">
      {label && <InputLabel>{label}</InputLabel>}
      <Input
        {...props}
        value={value || ''}
        onChange={handleChange}
        placeholder="Example: VLSPADKTNIKASWEKIGSHG"
        inputProps={{
          style: { textTransform: 'uppercase' },
        }}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
