interface ListPostsProps {
  data: {
    count: number;
    results: {
      id: number;
      title: string;
      text: string;
      date_creation: string;
      cat_id: number;
      cat_name: string;
      preview: string;
      image: string;
    }[];
  };
}

export default ListPostsProps;
