import Link from 'next/link';
import Button from '@UI/Button/Button';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import cn from 'clsx';

import styles from './BottomNav.module.scss';
import { useSearchParams } from 'next/navigation';

const BottomNav = ({ listPage }: { listPage: string[] }) => {
  const params = useSearchParams();
  const list_index = Number(params.get('list_index'));

  if (listPage.length > 1) {
    return (
      <footer className={styles.nav}>
        <ul className={styles.list}>
          {list_index - 1 != 0 && (
            <li>
              {
                <Link href={listPage[list_index - 2]}>
                  <Button className={styles.button} variant="sky">
                    <MdKeyboardArrowLeft />
                    Предыдущая
                  </Button>
                </Link>
              }
            </li>
          )}
          {listPage.map((page, index) => (
            <li
              key={index}
              className={cn(styles.listItem, {
                [`${styles.active}`]: list_index == index + 1,
              })}
            >
              <Link href={page} className={styles.link}>
                {++index}
              </Link>
            </li>
          ))}
          {list_index != listPage.length && (
            <li>
              <Link href={listPage[list_index]}>
                <Button className={styles.button} variant="sky">
                  Следующая
                  <MdKeyboardArrowRight />
                </Button>
              </Link>
            </li>
          )}
        </ul>
      </footer>
    );
  }
};

export default BottomNav;
