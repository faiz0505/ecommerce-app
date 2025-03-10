import ProductCard from '@/app/components/ProductCard';
import { getProductsByCategory } from '@/app/lib/actions';

export default async function CategoryDetailPage({ params }) {
  const products = await getProductsByCategory(params.categoryName);
  const categoryTitle = params.categoryName.charAt(0).toUpperCase() + params.categoryName.slice(1).toLowerCase();

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">
        {categoryTitle} Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}