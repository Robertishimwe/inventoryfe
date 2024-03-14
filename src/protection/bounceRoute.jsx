import { Outlet, Navigate } from "react-router-dom";
import { useAtomValue } from 'jotai';
import { loggedinUserAtom } from "../utils/atoms";

const BounceRoute=()=> {
    const loggedinUser = useAtomValue(loggedinUserAtom);
    return (loggedinUser?.user ?  <Navigate to="/dashboard" /> : <Outlet />) 
}

export default BounceRoute;
