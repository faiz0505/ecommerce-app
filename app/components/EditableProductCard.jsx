import Link from 'next/link';
import textFormatter from '../utils/textFormatter';
import { useState } from 'react';

const EditableProductCard = ({ product, onDelete, onEdit }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="border p-4 rounded-lg shadow-md relative flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
        <div>

      <img
        src={product.imageUrl}
        alt={product.title}
        className="w-full h-48 object-cover rounded-lg mb-4 hover:scale-110 transition-all ease-linear duration-300 cursor-pointer"
        />
      <h3 className="text-lg font-bold">{textFormatter(product.title, 20)}</h3>
      <p className="text-xs text-gray-500">
        {textFormatter(product.description, 80)}
      </p>
        </div>
      <div className="flex justify-between items-center mt-4">
        <Link href={`/product/${product._id}`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
            View Details
          </button>
        </Link>
        <p className="text-lg font-semibold">Price: ₹{product.price.toFixed(2)}</p>
      </div>

      {isHovered && (
        <div className="absolute top-2 right-2 flex space-x-2">
          <button
            onClick={() => onEdit(product)}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded cursor-pointer text-xs"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(product._id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded cursor-pointer text-xs"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default EditableProductCard;