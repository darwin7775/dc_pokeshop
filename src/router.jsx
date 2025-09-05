import { HashRouter } from "react-router-dom";
import { RouterProvider, createHashRouter } from 'react-router-dom';
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import NotFound from "./Pages/NotFound";
import ShopLayout from "./Components/Layouts/ShopLayout";
import GuestLayout from "./Components/Layouts/GuestLayout";
import Home from "./Pages/Home";
import TrackOrder from "./Pages/TrackOrder";
import SearchCard from "./Pages/SearchCard";
import PokeCart from "./Pages/PokeCart";

const router = createHashRouter([
    {
        path: '/',
        element: <ShopLayout/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/track_order',
                element: <TrackOrder/>
            },
            {
                path: '/searchCard',
                element: <SearchCard/>
            },
            {
                path: '/pokeCart',
                element: <PokeCart/>
            }
        ]
    },
    {
        path:'/',
        element: <GuestLayout/>,
        children:[
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signup',
                element: <Signup/>
            },
            {
                path: '*',
                element: <NotFound/>
            }
        ]
    },
]);

export default router;