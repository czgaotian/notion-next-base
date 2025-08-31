import { useSiteStore } from 'providers/siteProvider';
import LayoutBase from '../layout/LayoutBase';
import BlogList from '../components/BlogList';
import CategoryList from '@/components/CategoryList';

const CategoryDetail = () => {
  const category = useSiteStore((state) => state.category);

  return (
    <LayoutBase>
      <CategoryList />
      <div className="mb-4 mt-5 px-3 text-3xl font-bold text-black dark:text-white">
        {category}
      </div>
      <BlogList />
    </LayoutBase>
  );
};

export default CategoryDetail;
