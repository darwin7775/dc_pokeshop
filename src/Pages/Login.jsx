import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="p-3 flex items-center justify-center">
        <div className="relative bg-gradient-to-b from-blue-800 via-blue-900 to-blue-800 border-2 border-red-500 rounded-xl w-full max-w-lg p-8 shadow-xl text-white">
            {/* Pokémon Logo */}
            <div className="flex justify-center mb-6">
                <Link to={'/'}>
                    <img
                    src={`${import.meta.env.BASE_URL}dcpokeshop.png`}
                    alt="DC Pokeshop Logo"
                    className="h-20"
                    />
                </Link>
            </div>

            {/* Form */}
            <form className="space-y-4">
                {/* Username */}
                <div>
                    <label className="block text-white font-bold text-lg mb-1">
                        Email:
                    </label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 rounded-md border-white border placeholder-white text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        placeholder="AshKetchum@mail.com"
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="block text-white font-bold text-lg mb-1">
                        Password:
                    </label>
                    <input
                        type="password"
                        className="w-full px-4 py-2 rounded-md border-white border placeholder-white  text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        placeholder="••••••••"
                    />
                    <div className="flex justify-between mt-2">
                        <div className="flex items-center">
                            <input type="checkbox" id="remember-login" className="mr-2" />
                            <label htmlFor="remember-login" className="text-sm">
                            Remember login
                            </label>
                        </div>
                        <div className="">
                            <Link to={'/signup'} className="text-sm">
                                <span className="text-white hover:text-blue-600 hover:underline">Create Account</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    className="w-full text-black font-bold py-2 rounded-md shadow-md transition duration-200"
                >
                    LOGIN
                </button>
            </form>

            {/* Pokémon Characters */}
            <div className="absolute -bottom-15 left-1/2 transform -translate-x-1/2">
            <img
                src={`${import.meta.env.BASE_URL}pokemons.png`}
                alt="Starters"
                className="h-25"
            />
            </div>

        </div>
        </div>
    );
};

export default Login;