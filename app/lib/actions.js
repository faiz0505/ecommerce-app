'use server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { ConnectToDatabase } from './database/connection';
import Product from './database/modals/Product';

export async function addProduct(formData) {
  const {name,description,imageUrl,price,category} = formData
  try {
    await ConnectToDatabase();
    const product = new Product({
      title: name,
      description,
      imageUrl,
      price :parseFloat(price),
      category
    });
    await product.save();
  } catch (error) {
    console.error('Error adding product:', error);
    throw new Error('Failed to add product');
  }
}
export async function getProducts() {
  try {
    await ConnectToDatabase();
    const products = await Product.find({});
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}
export async function getProductsById(id) {
  try {
    await ConnectToDatabase();
    const products = await Product.findById(id);
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getCategories() {
  await ConnectToDatabase();
  const categories = await Product.aggregate([
    { $group: { _id: '$category' } },
    { $sort: { _id: 1 } },
  ]);
  return categories.map((category) => category._id);
}

export async function getProductsByCategory(categoryName) {
  await ConnectToDatabase();
  const products = await Product.find({
    category: categoryName,
  });
  return JSON.parse(JSON.stringify(products));
}

export async function deleteProduct(productId) {
  try {
    await dbConnect();
    await Product.findByIdAndDelete(productId);
    revalidateTag("products")
    return { success: true };
  } catch (error) {
    console.error('Error deleting product:', error);
    return { success: false, error: 'Failed to delete product' };
  }
}

export async function editProduct({ id, name, description, imageUrl, price, category }) {
  try {
    await ConnectToDatabase();
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        title: name,
        description,
        imageUrl,
        price: parseFloat(price),
        category: category,
      },
      { new: true }
    );
    revalidateTag("products")
    revalidatePath('/profile');
    revalidatePath(`/product/${id}`);
    revalidatePath(`/category/${category.toLowerCase()}`)
    return { success: true, product: JSON.parse(JSON.stringify(updatedProduct)) };
  } catch (error) {
    console.error('Error editing product:', error);
    return { success: false, error: 'Failed to edit product' };
  }
}


export async function getProductsByIds(ids) {
  try {
    await ConnectToDatabase();
    const products = await Product.find({ _id: { $in: ids } });
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Error fetching products by IDs:", error);
    return [];
  }
}