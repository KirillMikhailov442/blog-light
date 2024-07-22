import ListPosts from '@components/ListPosts/ListPosts';
import styles from './Search.module.scss';
import ListPostsProps from '@/types/listPostsProps';

const SearchScreen = ({ data }: ListPostsProps) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Результаты поиска</h1>
        {!data.count && <p className={styles.notFound}>Ничего не найдено</p>}
      </header>
      {data.count != 0 && <ListPosts data={data} />}
    </div>
  );
};

export default SearchScreen;
