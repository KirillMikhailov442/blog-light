import React, { ChangeEvent, FC } from 'react';

import styles from './Input.module.scss';

interface InputProps {
  handleChange?: (e?: ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: (e?: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  type?: 'text' | 'password' | 'email';
  error?: string;
  placeholder?: string;
  name?: string;
  inputRef?: any;
  className?: string;
}

const Input: FC<InputProps> = ({
  type = 'text',
  error,
  handleChange,
  handleBlur,
  value,
  placeholder,
  inputRef,
  className,
  name,
}) => {
  return (
    <div className={className}>
      <input
        className={styles.input}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        ref={inputRef}
        name={name}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;
