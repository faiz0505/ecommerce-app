import AddToCartButton from '@/app/components/AddToCartButton';
import { getProductsById } from '@/app/lib/actions';

export default async function ProductDetailPage({ params }) {

const product = await getProductsById(params.productId)

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="w-full h-[400px] relative">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full rounded-lg absolute h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-xl font-semibold mb-4">
            Price: ₹{product.price.toFixed(2)}
          </p>
         <AddToCartButton productId={product._id}/>
        </div>
      </div>
    </div>
  );
}
