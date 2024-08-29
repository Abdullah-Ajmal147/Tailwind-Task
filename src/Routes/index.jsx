import { Navigate, Route, Routes } from "react-router-dom";
import React from 'react';
import useRouteHelper from "./helper";

const MainRoutes = () => {
    const { routes } = useRouteHelper();

    return (
        <Routes>
            {routes?.map(({ path, element }, index) => (
                <Route path={path} element={element} key={index} />
            ))}

            <Route path="*" element={<Navigate to={'/'} />} />

        </Routes>
    );
};

export default MainRoutes;
