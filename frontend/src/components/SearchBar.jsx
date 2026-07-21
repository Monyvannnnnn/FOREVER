import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (showSearch) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [showSearch]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    if (val.trim() !== '' && !location.pathname.includes('collection')) {
      navigate('/collection');
    }
  };

  const isOpen = showSearch && visible;

  return (
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out border-b bg-gray-50 text-center ${
        isOpen
          ? "max-h-28 opacity-100 py-3 border-t translate-y-0"
          : "max-h-0 opacity-0 py-0 -translate-y-2 border-none pointer-events-none"
      }`}
    >
      <div className="inline-flex items-center justify-center border border-gray-300 px-5 py-2 my-1 mx-3 rounded-full w-3/4 sm:w-1/2 bg-white shadow-sm">
        <input
          value={search}
          onChange={handleSearchChange}
          className="flex-1 outline-none bg-transparent text-sm text-[#5A3A31] placeholder-gray-400"
          type="text"
          placeholder="Search products..."
          autoFocus={isOpen}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="#5A3A31"
          className="w-4 h-4 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
      <button
        type="button"
        aria-label="Close search"
        onClick={() => {
          setShowSearch(false);
          setSearch("");
        }}
        className="inline-flex items-center justify-center p-1.5 text-gray-500 hover:text-[#5A3A31] cursor-pointer transition-colors align-middle"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
