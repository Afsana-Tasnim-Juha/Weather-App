import { Outlet } from "react-router-dom";


const Main = () => {
    return (
        <div>
            <div className="max-w-8xl mx-auto">

                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default Main;