import { Outlet } from "react-router-dom";

const GuestLayout = () => {
    return ( 
        <div className="w-screen min-h-screen bg-gradient-to-br from-blue-900 to-blue-600">
            <Outlet/>
        </div>
    )
};

export default GuestLayout;