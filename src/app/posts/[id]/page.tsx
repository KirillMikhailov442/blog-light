'use client';

import PostScreen from '@screens/Post/Post';
import { useParams } from 'next/navigation';
import Meta from '@components/Meta/Meta';

const getPost = async (id: number) => {
  const responsePost = await fetch(`http://localhost:8000/api/v1/posts/${id}`, {
    cache: 'force-cache',
  });
  if (!responsePost.ok) false;
  const post = await responsePost.json();

  return post;
};

const PostPage = async () => {
  const { id } = useParams();
  const postData = await getPost(Number(id));

  return (
    <>
      <Meta title={postData.title} description={postData.title} />
      <PostScreen
        title={postData.title}
        text={postData.text}
        date_creation={postData.date_creation}
        categoryId={postData.cat_id}
        categoryName={postData.cat_name}
        preview={postData.preview}
        image={postData.image}
      />
    </>
  );
};

export default PostPage;
