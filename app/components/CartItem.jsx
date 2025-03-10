const CartItem = ({ item, onRemove }) => {
    return (
      <div className="flex items-center border p-4 rounded-lg shadow-md">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-20 h-20 object-cover rounded-lg mr-4"
        />
        <div className="flex-grow">
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-gray-600">Price: ₹{item.price.toFixed(2)}</p>
        </div>
        <button
          onClick={() => onRemove(item._id)}
          className="bg-red-500 cursor-pointer hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Remove
        </button>
      </div>
    );
  };

  export default CartItem;