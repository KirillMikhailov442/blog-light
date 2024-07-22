import { NextSeo } from 'next-seo';
import { FC } from 'react';

interface MetaProps {
  title?: string;
  description?: string;
}

const Meta: FC<MetaProps> = ({ title, description }) => {
  return <NextSeo title={title} description={description} />;
};

export default Meta;
