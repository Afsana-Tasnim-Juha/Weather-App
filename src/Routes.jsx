import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "./Layout/Main";
import WeatherApp from "./WeatherApp";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <WeatherApp></WeatherApp>,
            },
        ],
    },
]);