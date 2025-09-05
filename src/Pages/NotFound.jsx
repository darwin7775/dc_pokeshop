import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-600 flex items-center justify-center text-white font-sans px-4">
        <div className="text-center max-w-md">
            {/* Pokémon Logo */}
            <img
                src={`${import.meta.env.BASE_URL}dcpokeshop.png`}
                alt="DC Pokéshop Logo"
                className="mx-auto h-20 mb-6"
            />

            {/* 404 Message */}
            <h1 className="text-6xl font-extrabold mb-2">404</h1>
            <p className="text-xl font-semibold mb-4">
                Oops! This page is <span className="text-yellow-300">Missing.</span>
            </p>
            <p className="text-sm mb-6 text-gray-200">
                Looks like the page you're trying to catch ran away.
            </p>

            <img
                src={`${import.meta.env.BASE_URL}sad_charizard`}
                alt="Sad Charizard"
                className="mx-auto h-40 mb-6"
            />

            {/* Home Button */}
            <Link
                to="/"
                className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300"
            >
                <span className="text-white">Go Home</span>
            </Link>
        </div>
        </div>
    );
};

export default NotFound;