import React, { FC } from 'react';

import styles from './Button.module.scss';

import cn from 'clsx';

interface ButtonProps {
  handleClick?: () => void;
  className?: string;
  variant?: 'blue' | 'sky' | 'lightTransparent';
  type?: 'submit' | 'button';
  children: React.ReactNode;
}

const Button: FC<ButtonProps> = ({
  handleClick,
  variant = 'blue',
  className,
  type = 'button',
  children,
}) => {
  return (
    <button
      type={type}
      className={cn(
        styles.button,
        {
          'bg-blue-500 hover:bg-blue-600 text-white rounded-3xl':
            variant == 'blue',
        },
        {
          'bg-gray-200 hover:bg-blue-300 text-blue-500 rounded-lg':
            variant == 'sky',
        },
        {
          'bg-lightTransparent hover:bg-blue-600 text-white':
            variant == 'lightTransparent',
        },
        className,
      )}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
