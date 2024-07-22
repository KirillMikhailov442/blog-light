'use client';

import News from '@components/News/News';
import styles from './Sidebar.module.scss';
import Newsletter from './Newsletter/Newsletter';
import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';

const getListNews = async () => {
  const response = await fetch('http://localhost:8000/api/v1/posts', {
    cache: 'force-cache',
  });

  if (!response.ok) return false;

  const data = await response.json();
  return data.results;
};

const Sidebar = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const listNews = await getListNews();
      if (!listNews) notFound();
      setNews(listNews.slice(0, 3));
    };
    fetchData();
  }, []);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.content}>
        <h2 className={styles.title}>Популярные новости</h2>
        <div className={styles.listNews}>
          {news.map(({ title, date_creation, id }, index) => (
            <News
              key={id}
              id={id}
              text={title}
              date={date_creation}
              isLast={news.length == index + 1}
            />
          ))}
        </div>
        <Newsletter />
      </div>
    </aside>
  );
};
export default Sidebar;
