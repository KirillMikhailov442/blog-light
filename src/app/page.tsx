import HomeScreen from '@screens/Home/Home';
import { notFound } from 'next/navigation';

const getCountPosts = async () => {
  const res = await fetch('http://localhost:8000/api/v1/posts', {
    next: {
      revalidate: 10,
    },
  });
  if (!res.ok) return false;
  const data = await res.json();
  return data.count;
};

const Home = async () => {
  const count = await getCountPosts();
  if (!count) notFound();

  return <HomeScreen count={count} />;
};
export default Home;
