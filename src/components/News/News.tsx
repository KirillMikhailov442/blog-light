import { FC } from 'react';
import styles from './News.module.scss';
import Link from 'next/link';

import cn from 'clsx';
import { getDate } from '@helpers/date';

interface NewsProps {
  id: number;
  text: string;
  date: string;
  className?: string;
  isLast?: boolean;
}

const News: FC<NewsProps> = ({ id, text, date, className, isLast = false }) => {
  return (
    <Link className={className} href={`/posts/${id}`}>
      <article className={cn(styles.news, { [styles.borderNone]: isLast })}>
        <p className={styles.text}>{text}</p>
        <time className={styles.date}>{getDate(date)}</time>
      </article>
    </Link>
  );
};

export default News;
