"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const pathname = usePathname();

  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <nav className="flex items-center justify-between p-4">
      <Link href="/" className="text-xl font-bold">Logo</Link>
      <div className="flex space-x-4">
        <Link href="/" className={isActive('/') ? 'text-blue-500' : ''}>
          Home
        </Link>
        <Link href="/category" className={isActive('/category') ? 'text-blue-500' : ''}>
          Category
        </Link>
      </div>
      <div className="flex space-x-4">
        <Link href="/profile" className={isActive('/profile') ? 'text-blue-500' : ''}>
          <FaUserCircle />
        </Link>
        <Link href="/cart" className={isActive('/cart') ? 'text-blue-500' : ''}>
          <FaShoppingCart />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;