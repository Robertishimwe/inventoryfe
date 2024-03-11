import { Outlet, Navigate } from "react-router-dom";
import { useAtomValue, useSetAtom, useAtom } from 'jotai';

import { loggedinUserAtom } from "../utils/atoms";


const PrivateRoutes = () => {
    const loggedinUser = useAtomValue(loggedinUserAtom);

    console.log("?????",loggedinUser)

   
    return (loggedinUser?.user ? <Outlet /> : <Navigate to="/login" />)
};

export default PrivateRoutes