'use client';

import Meta from '@components/Meta/Meta';
import CatsScreen from '@screens/Cats/Cats';
import { notFound, useParams, useSearchParams } from 'next/navigation';

const getDataForPage = async (id: string | string[], listIndex: number) => {
  const responseCat = await fetch(`http://localhost:8000/api/v1/cats/${id}`, {
    cache: 'force-cache',
  });

  if (!responseCat.ok) return false;
  const cat = await responseCat.json();

  const responsePosts = await fetch(
    `http://localhost:8000/api/v1/posts/?search=${cat.name}&list_index=${listIndex}`,
    { cache: 'force-cache' },
  );
  if (!responseCat.ok) return false;
  const posts = await responsePosts.json();

  return { catName: cat.name, posts };
};

const CatsPage = async () => {
  const listIndex = useSearchParams().get('list_index');
  const { id } = useParams();
  const pageData = await getDataForPage(id, Number(listIndex));

  if (!pageData) {
    notFound();
  }

  return (
    <>
      <Meta title={`Категория: ${pageData.catName}`} />
      <CatsScreen data={pageData} />
    </>
  );
};

export default CatsPage;
