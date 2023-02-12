import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtecterRoutes = ({children, isLogin}) => {
    return isLogin ? <Outlet/> : <Navigate to={'/'}/>;
}

export default ProtecterRoutes;
