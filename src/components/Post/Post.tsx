import { FC } from 'react';
import Button from '@UI/Button/Button';
import Link from 'next/link';

import IPost from '@/types/Post';

import styles from './Post.module.scss';

import cn from 'clsx';
import { getDate } from '@helpers/date';

interface PostProps extends IPost {
  className?: string;
  paramIndex: number;
  paramQuery: string;
}

const Post: FC<PostProps> = ({
  id,
  title,
  text,
  categoryId,
  categoryName,
  date,
  className,
  paramIndex,
  paramQuery,
}) => {
  return (
    <Link
      className={className}
      href={`/posts/${id}?query=${paramQuery}&index=${paramIndex}`}
    >
      <article className={cn(styles.post, 'bg-white text-black')}>
        <header className={cn('justify-between', styles.header)}>
          <Link href={`/cats/${categoryId}?query=${categoryName}&list_index=1`}>
            <Button className={styles.cat} variant="sky">
              {categoryName}
            </Button>
          </Link>
          <time className={'text-gray-700'}>{getDate(date)}</time>
        </header>
        <h1 className={styles.title}>{title}</h1>
        <p className={cn(styles.subtitle, 'text-gray-700')}>{text}</p>
      </article>
    </Link>
  );
};

export default Post;
