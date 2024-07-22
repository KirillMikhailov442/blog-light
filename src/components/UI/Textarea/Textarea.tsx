import styles from './Textarea.module.scss';

import { ChangeEvent, FC } from 'react';

interface TextareaProps {
  handleChange?: (e?: ChangeEvent<HTMLTextAreaElement>) => void;
  handleBlur?: (e?: ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
  error?: string;
  placeholder?: string;
  name?: string;
  className?: string;
}

const Textarea: FC<TextareaProps> = ({
  handleChange,
  handleBlur,
  value,
  error,
  placeholder,
  name,
  className,
}) => {
  return (
    <div className={className}>
      <textarea
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        placeholder={placeholder}
        name={name}
        className={styles.textarea}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Textarea;
