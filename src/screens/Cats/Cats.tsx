'use client';

import styles from './Cats.module.scss';

import Sidebar from '@components/Sidebar/Sidebar';
import ListPosts from '@components/ListPosts/ListPosts';

interface CatsScreenProps {
  data: {
    catName: string;
    posts: {
      count: number;
      results: {
        id: number;
        title: string;
        text: string;
        date_creation: string;
        cat_id: number;
        cat_name: string;
        preview: string;
        image: string;
      }[];
    };
  };
}

const CatsScreen = ({ data }: CatsScreenProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.categoryName}>
        <h1 className={styles.title}>Категория {data.catName}</h1>
      </div>
      <div className={styles.content}>
        <ListPosts data={data.posts} />
        <Sidebar />
      </div>
    </div>
  );
};

export default CatsScreen;
