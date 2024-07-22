'use client';
import styles from './Home.module.scss';

import Button from '@UI/Button/Button';
import { MdSearch } from 'react-icons/md';
import { showComponent } from '@/store/slices/showComponet';
import { useDispatch } from 'react-redux';

const HomeScreen = ({ count }: { count: number }) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Добро пожаловать на <span className="text-blue-500">Blog light</span>
      </h1>
      <p className={styles.text}>
        на нашем сайте есть <b className="text-blue-500">{count}</b> постов на
        самые разнообразные темы
      </p>
      <Button
        handleClick={() => dispatch(showComponent('searchBar'))}
        variant="sky"
      >
        Найти свой пост
        <MdSearch className="text-lg mx-4" />
      </Button>
    </div>
  );
};

export default HomeScreen;
