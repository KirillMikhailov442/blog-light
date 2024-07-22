'use client';

import SearchScreen from '@screens/Search/Search';
import { useSearchParams } from 'next/navigation';
import Meta from '@components/Meta/Meta';

const getPostsData = async (text: string, list_index: number) => {
  const url = encodeURI(
    `http://localhost:8000/api/v1/posts/?search=${text}&list_index=${list_index}`,
  );
  const response = await fetch(url);
  const postsData = await response.json();

  return postsData;
};

const SearchPage = async () => {
  const searchParams = await useSearchParams();
  const query = searchParams.get('query');
  const list_index = searchParams.get('list_index');
  const postsData = await getPostsData(String(query), Number(list_index));

  return (
    <>
      <Meta
        title={`Результаты поиска: ${query}`}
        description={`Результаты поиска: ${query}`}
      />
      <SearchScreen data={postsData} />
    </>
  );
};
export default SearchPage;
