'use client';

import Image from 'next/image';

import Sidebar from '@components/Sidebar/Sidebar';
import Button from '@UI/Button/Button';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import styles from './Post.module.scss';
import { FC, useEffect, useState } from 'react';
import useAppDispatch from '@/hooks/useAppDispatch';
import { hideComponent } from '@/store/slices/showComponet';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { getDate } from '@helpers/date';
import axios from 'axios';

interface IPostScreen {
  preview: string;
  title: string;
  text: string;
  date_creation: string;
  categoryId: number;
  categoryName: string;
  image: string;
}

const getOtherPosts = async (query: string, index: number) => {
  const responseCount = await fetch(
    `http://localhost:8000/api/v1/posts/?search=${query}`,
    { cache: 'force-cache' },
  );
  if (!responseCount.ok) return false;
  let count = await responseCount.json();
  count = count.count;

  let otherPosts = { prev: undefined, next: undefined };

  if (count > 1) {
    const paginationCount = Math.ceil(index / 8);
    // prev post
    try {
      if (index > 1) {
        if (index % 8 == 1) {
          otherPosts.prev = await axios
            .get(
              `http://localhost:8000/api/v1/posts/?search=${query}&list_index=${paginationCount - 1}&num=1`,
            )
            .then(res => res.data.results[7].id);
        } else if (index % 8 == 0) {
          otherPosts.prev = await axios
            .get(
              `http://localhost:8000/api/v1/posts/?search=${query}&list_index=${paginationCount}&num=1`,
            )
            .then(res => res.data.results[6].id);
        } else {
          otherPosts.prev = await axios
            .get(
              `http://localhost:8000/api/v1/posts/?search=${query}&list_index=${paginationCount}&num=1`,
            )
            .then(res => res.data.results[(index % 8) - 2].id);
        }
      }
    } catch (err) {
      console.log(err);
    }
    // next post
    try {
      if (index != ++count) {
        if (index % 8 == 0) {
          otherPosts.next = await axios
            .get(
              `http://localhost:8000/api/v1/posts/?search=${query}&list_index=${paginationCount + 1}&num=2`,
            )
            .then(res => res.data.results[0].id);
        } else {
          otherPosts.next = await axios
            .get(
              `http://localhost:8000/api/v1/posts/?search=${query}&list_index=${paginationCount}&num=2`,
            )
            .then(res => res.data.results[index % 8].id);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  return otherPosts;
};

const PostScreen: FC<IPostScreen> = ({
  title,
  text,
  date_creation,
  categoryId,
  categoryName,
  preview,
  image,
}) => {
  const dispatch = useAppDispatch();
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get('query'));
  const [index, setIndex] = useState(Number(params.get('index')));
  const [prevPost, setPrevPost] = useState();
  const [nextPost, setNextPost] = useState();

  useEffect(() => {
    dispatch(hideComponent('searchBar'));

    const fetchData = async () => {
      if (index != 0 || query) {
        const otherPosts = await getOtherPosts(String(query), index);
        if (otherPosts) {
          setPrevPost(otherPosts.prev);
          setNextPost(otherPosts.next);
        }
      }
    };
    fetchData();
  }, [params]);

  useEffect(() => {
    setQuery(params.get('query'));
    setIndex(Number(params.get('index')));
  }, [params]);

  console.log(prevPost, nextPost);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Image
          src={preview}
          alt="preview"
          width={0}
          height={0}
          layout="responsive"
          className={styles.preview}
        />
      </div>
      <div className={styles.content}>
        <main className={styles.main}>
          <header className={styles.header}>
            <Link
              href={`/cats/${categoryId}?query=${categoryName}&list_index=1`}
            >
              <Button className={styles.button} variant="sky">
                {categoryName}
              </Button>
            </Link>
            <time className={styles.date}>{getDate(date_creation)}</time>
          </header>
          <div>
            <h1 className={styles.title}>{title}</h1>
            {text.split('\n').map((p, index) => (
              <p key={index} className={styles.text}>
                {p}
              </p>
            ))}
            <Image
              className={styles.mainImage}
              height={0}
              width={0}
              src={image}
              alt="image"
              layout="responsive"
            />
          </div>
          {query || index ? (
            <nav className={styles.nav}>
              {prevPost && (
                <Link
                  href={`http://localhost:3000/posts/${prevPost}/?query=${query}&index=${index - 1}`}
                >
                  <Button className={styles.button} variant="sky">
                    <MdKeyboardArrowLeft />
                    Предыдущая новость
                  </Button>
                </Link>
              )}
              {!nextPost && <div></div>}
              {!prevPost && <div></div>}
              {nextPost && (
                <Link
                  href={`http://localhost:3000/posts/${nextPost}/?query=${query}&index=${index + 1}`}
                >
                  <Button className={styles.button} variant="sky">
                    Следующая новость
                    <MdKeyboardArrowRight />
                  </Button>
                </Link>
              )}
            </nav>
          ) : (
            ''
          )}
        </main>
        <Sidebar />
      </div>
    </div>
  );
};

export default PostScreen;
