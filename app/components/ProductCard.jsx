import Link from 'next/link';
import textFormatter from '../utils/textFormatter';

const ProductCard = ({ product }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md relative flex flex-col justify-between">
      <div>

      <img
        src={product.imageUrl}
        alt={product.title}
        className="w-full h-48 object-cover rounded-lg mb-4 hover:scale-110 transition-all ease-linear duration-300 cursor-pointer"
        />
      <h3 className="text-lg font-bold">{textFormatter(product.title,20)}</h3>
      <p className={"text-xs text-gray-500"}>{textFormatter(product.description,80)}</p>
        </div>
     <div className="flex justify-between items-center mt-4">

      <Link href={`/product/${product._id}`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
          View Details
        </button>
      </Link>
      <p className="text-lg font-semibold">Price: ₹{product.price.toFixed(2)}</p>
     </div>
    </div>
  );
};

export default ProductCard;