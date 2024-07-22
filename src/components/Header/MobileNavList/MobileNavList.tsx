import Link from 'next/link';
import { IoCloseCircleOutline } from 'react-icons/io5';

import cn from 'clsx';

import styles from './MobileNavList.module.scss';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { hideComponent } from '@/store/slices/showComponet';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const MobileNavList = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const showNavList = useAppSelector(
    state => state.showComponents.componets.mobileNavList,
  );

  useEffect(() => {
    if (showNavList) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [showNavList]);

  return (
    <div
      className={cn(styles.mobileNavList, { [`${styles.show}`]: showNavList })}
    >
      <header className={styles.header}>
        <button
          onClick={() => dispatch(hideComponent('mobileNavList'))}
          className={styles.close}
        >
          <IoCloseCircleOutline size={40} />
        </button>
      </header>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <Link
              onClick={() => dispatch(hideComponent('mobileNavList'))}
              className={cn(styles.link, {
                [`${styles.active}`]: pathname == '/',
              })}
              href={'/'}
            >
              Главная
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link
              onClick={() => dispatch(hideComponent('mobileNavList'))}
              className={cn(styles.link, {
                [`${styles.active}`]: pathname == '/about',
              })}
              href={'/about'}
            >
              О нас
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link
              onClick={() => dispatch(hideComponent('mobileNavList'))}
              className={cn(styles.link, {
                [`${styles.active}`]: pathname == '/contacts',
              })}
              href={'/contacts'}
            >
              Контакты
            </Link>
          </li>
          <li className={styles.listItem}>
            <a className={cn(styles.link, styles.tel)} href="tel:+798788787">
              <span>+7 (987) 887-87</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MobileNavList;
