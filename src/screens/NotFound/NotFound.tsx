'use client';

import Image from 'next/image';
import Button from '@UI/Button/Button';
import { MdKeyboardArrowLeft } from 'react-icons/md';

import notFoundImage from '@images/404.png';

import styles from './NotFound.module.scss';
import { useRouter } from 'next/navigation';

const NotFoundScreen = () => {
  const { back } = useRouter();
  return (
    <div className={styles.notFound}>
      <Image
        src={notFoundImage}
        height={326}
        width={326}
        alt="not-found"
        placeholder="empty"
      />
      <h1 className={styles.text}>Что-то пошло не так...</h1>
      <Button handleClick={() => back()} variant="sky">
        <MdKeyboardArrowLeft className="mr-1" />
        Вернуться назад
      </Button>
    </div>
  );
};

export default NotFoundScreen;
