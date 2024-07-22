'use client';

import Image from 'next/image';
import styles from './Footer.module.scss';

import logoImage from '@images/logo.png';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import cn from 'clsx';

const Footer = () => {
  const pathname = usePathname();
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Link href={'/'}>
          <Image src={logoImage} alt="logo" width={50} height={50} />
        </Link>
        <nav className={styles.nav}>
          <ul className={styles.list}>
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
                  [`${styles.active}`]: pathname == '/gallery',
                })}
                href={'/gallery'}
              >
                Галерея
              </Link>
            </li>
            <li className={styles.listItem}>
              <Link
                className={cn(styles.link, {
                  [`${styles.active}`]: pathname == '/news',
                })}
                href={'/news'}
              >
                Новости
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
          </ul>
        </nav>
        <p className={styles.copyright}>
          ООО “Организация” 2020. Все права защищены
        </p>
      </div>
    </footer>
  );
};

export default Footer;
