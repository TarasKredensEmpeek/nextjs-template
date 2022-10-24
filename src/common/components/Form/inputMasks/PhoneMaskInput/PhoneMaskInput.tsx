import React, { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';

interface PhoneMaskInputProps {
  mask?: string;
  name: string;
  onChange: (event: { target: { name: string; value: unknown } }) => void;
}

type InputRef = (r: HTMLInputElement | null) => void;

const PhoneMaskInput = forwardRef<HTMLElement, PhoneMaskInputProps>(
  ({ mask, name, onChange, ...props }, ref) => (
    <IMaskInput
      overwrite
      definitions={{
        '#': /[0-9]/,
      }}
      {...props}
      inputRef={ref as InputRef}
      onAccept={(value: unknown) => onChange({ target: { name, value } })}
      mask={mask || '0 000 000 0000'}
    />
  ),
);

export default PhoneMaskInput;
