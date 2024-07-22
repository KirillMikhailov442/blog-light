import styles from './ListPosts.module.scss';

import BottomNav from './BottomNav/BottomNav';
import Post from '@components/Post/Post';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import ListPostsProps from '@/types/listPostsProps';

const ListPosts = ({ data }: ListPostsProps) => {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get('query'));
  const [listIndex, setListIndex] = useState(Number(params.get('list_index')));
  const pageCount = Math.ceil(data.count / 8);
  const pathName = usePathname();

  let listPage = [];
  for (let index = 0; index < pageCount; index++) {
    listPage.push(
      `http://localhost:3000${pathName}/?query=${query}&list_index=${index + 1}`,
    );
  }

  useEffect(() => {
    if (query != null) setQuery(params.get('query'));
    else setQuery('');
    setListIndex(Number(params.get('list_index')));
  }, [params]);

  return (
    <main className={styles.main}>
      {data.results.map(
        (
          { id, title, text, cat_id, cat_name, date_creation, preview },
          index,
        ) => (
          <Post
            id={id}
            title={title}
            text={text}
            categoryId={cat_id}
            categoryName={cat_name}
            date={date_creation}
            preview={preview}
            paramIndex={(listIndex - 1) * 8 + 1 + index}
            paramQuery={String(query)}
            key={index}
          />
        ),
      )}
      <BottomNav listPage={listPage} />
    </main>
  );
};

export default ListPosts;
