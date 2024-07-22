'use client';

import styles from './Searchbar.module.scss';
import React, { useEffect, useRef, useState } from 'react';

import Input from '@UI/Input/Input';
import Button from '@UI/Button/Button';

import { IoSearch } from 'react-icons/io5';
import News from '@components/News/News';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { hideComponent } from '@/store/slices/showComponet';
import { useRouter } from 'next/navigation';

const getPosts = async (text: string) => {
  const url = encodeURI(`http://localhost:8000/api/v1/posts/?search=${text}`);
  const response = await fetch(url);
  const posts = await response.json();
  return posts.results;
};

const Searchbar = () => {
  const dispatch = useAppDispatch();
  const isShowSearchBar = useAppSelector(
    state => state.showComponents.componets.searchBar,
  );
  const { push } = useRouter();
  const searchBarWrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [text, setText] = useState('');
  const [posts, setPosts] = useState([]);

  const closeSearchBar = (area: any) => {
    if (!searchBarWrapperRef.current?.contains(area)) {
      dispatch(hideComponent('searchBar'));
    }
  };

  const handleChange = async () => {
    const data = await getPosts(text);
    setPosts(data);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(hideComponent('searchBar'));
    formRef.current?.reset();
    setText('');
    setPosts([]);
    push(`/search?query=${text}&list_index=1`);
  };

  useEffect(() => {
    if (isShowSearchBar) {
      inputRef.current?.focus();
    }

    if (isShowSearchBar) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isShowSearchBar]);

  if (isShowSearchBar) {
    return (
      <div onClick={e => closeSearchBar(e.target)} className={styles.wrapper}>
        <div className={styles.searchbar}>
          <div ref={searchBarWrapperRef}>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              onChange={handleChange}
              className={styles.form}
            >
              <Input
                value={text}
                handleChange={() => setText(String(inputRef.current?.value))}
                inputRef={inputRef}
                className={styles.input}
              />
              <Button className={styles.button} type="submit">
                Найти
                <IoSearch className="ml-2 text-lg" />
              </Button>
            </form>
            {posts.length > 0 && (
              <div className={styles.result}>
                <div className={styles.resultContent}>
                  {posts.map(({ id, title, date_creation }, index) => (
                    <News
                      id={id}
                      text={title}
                      date={date_creation}
                      key={id}
                      isLast={posts.length == ++index}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default Searchbar;
