import { FaCartShopping } from "react-icons/fa6";
import { Link,Outlet, useNavigate } from "react-router-dom";
import { useState } from 'react';
import ShopFooter from "../Footer/ShopFooter";

const ShopLayout = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault(); // prevent page reload
        if (query.trim() !== '') {
            navigate(`/searchCard?query=${encodeURIComponent(query)}`);
        }
        else{
            navigate('/');
        }
    };
    return (
        <div className="w-screen min-h-screen">
            <div className="flex justify-end space-x-6 text-sm bg-blue-600 py-1">
                <Link to={'/track_order'}><span className="text-white">Track My Order</span></Link>
                <Link to={'/login'}><span className="text-white">Login</span></Link>
                <Link to={'/signup'}><span className="text-white mr-5">Sign Up</span></Link>
            </div>
            <nav className="bg-white border-b shadow-sm px-5 py-3">
                <div className="container mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    
                    {/* Top Row (Logo and Cart) */}
                    <div className="w-full flex items-center justify-between md:justify-start md:w-auto">
                    {/* Logo */}
                    <Link to={'/'}>
                        <img 
                        src={`${import.meta.env.BASE_URL}dcpokeshop.png`}
                        alt="DC Pokeshop" className="h-15 w-auto" />
                    </Link>

                    {/* Cart Icon (on the right for mobile) */}
                    <div className="md:hidden relative">
                        <Link to="/pokeCart">
                            <FaCartShopping className="h-7 w-7 text-gray-700" />
                            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
                                2
                            </span>
                            {/* {cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
                                    {cartItems.length}
                                </span>
                            )} */}
                        </Link>
                    </div>
                </div>

                    {/* Search Bar (full width on mobile) */}
                    <div className="w-full flex justify-center">
                        <div className="flex items-center w-full md:w-[75%]">
                            <label className="mr-3 text-sm text-gray-600 font-bold">Search:</label>
                            <input
                                id="searchInput"
                                type="text"
                                placeholder="Search..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none focus:ring focus:border-blue-300"
                            />
                            <div onClick={handleSearch}
                            className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700">
                                Search
                            </div>
                        </div>
                    </div>

                    {/* Cart Icon (hidden on mobile, shown on desktop) */}
                    <div className="hidden md:block relative">
                        <Link to={'/pokeCart'}>
                            <FaCartShopping className="h-7 w-7 text-gray-700 mr-3 cursor-pointer hover:text-blue-600" />
                            {/* {cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
                                    {cartItems.length}
                                </span>
                            )} */}
                            <span className="absolute -top-2 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
                                2
                            </span>
                        </Link>
                    </div>

                </div>
            </nav>

            <div className="mt-5">
                <Outlet/>
            </div>
            
            <ShopFooter/>
        </div>
    )
};

export default ShopLayout;