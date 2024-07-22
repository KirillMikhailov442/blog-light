'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaPhone } from 'react-icons/fa6';
import { MdMenu, MdSearch } from 'react-icons/md';

import logoImage from '@images/logo.png';

import cn from 'clsx';

import styles from './Header.module.scss';
import useAppDispatch from '@/hooks/useAppDispatch';
import MobileNavList from './MobileNavList/MobileNavList';
import { showComponent } from '@/store/slices/showComponet';
import { usePathname } from 'next/navigation';

const Header = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href={'/'}>
          <Image width={50} height={50} src={logoImage} alt="logo" />
        </Link>
        <nav>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <Link
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
                className={cn(styles.link, {
                  [`${styles.active}`]: pathname == '/contacts',
                })}
                href={'/contacts'}
              >
                Контакты
              </Link>
            </li>
            <li
              className={styles.listItem}
              onClick={() => dispatch(showComponent('searchBar'))}
            >
              <p className={styles.link}>Поиск</p>
            </li>
            <li>
              <a className={styles.tel} href="tel:+798788787">
                <FaPhone className="mr-2 inline-block text-sm" />
                <span className="text-nowrap">+7 (987) 887-87</span>
              </a>
            </li>
          </ul>
          <div className={styles.mobileNav}>
            <button onClick={() => dispatch(showComponent('searchBar'))}>
              <MdSearch />
            </button>
            <button onClick={() => dispatch(showComponent('mobileNavList'))}>
              <MdMenu />
            </button>
          </div>
        </nav>
      </div>
      <MobileNavList />
    </header>
  );
};

export default Header;
