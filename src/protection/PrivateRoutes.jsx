import { Outlet, Navigate } from "react-router-dom";
import { useAtomValue } from 'jotai';

import { loggedinUserAtom } from "../utils/atoms";


const PrivateRoutes = () => {
    const loggedinUser = useAtomValue(loggedinUserAtom);
    return (loggedinUser?.user ? <Outlet /> : <Navigate to="/login" />)
};

export default PrivateRoutes