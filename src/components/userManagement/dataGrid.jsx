import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { usersAtom } from "../../utils/atoms"; 
import ReusableTable from '../ReusableTable';
import api from "../../utils/api"; 
import TopUpPopUp from "./topUp";
import EditPopUp from "./editPopUp";
import DeletePopUp from "./deletePopUp";

function UserManagement() {
    const [users, setUsers] = useAtom(usersAtom);
    const [isTopUpPopupOpen, setIsTopUpPopupOpen] = useState(false);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await api.get('/api/user/getAll');
            return response?.data;
        }
    });

    useEffect(() => {
        if (data) {
            setUsers(data);
        }
    }, [data, setUsers]);

    const handleAdd = () => {
        navigate('/dashboard/users/addNew');
    };

    const handleTopUpClick = () => {    
        setIsTopUpPopupOpen(true);
    };

    const handleEdit = (row) => {
        setSelectedUser({
            "id": row.id,
            "firstName": row.firstName,
            "lastName": row.lastName,
            "phone": row.phone,
            "email": row.email,
            "role": row.role
        });    
        setIsEditPopupOpen(true);
    };
  
    const handleDelete = (row) => {
        

        setSelectedUser({
            "id": row.id,
            "firstName": row.firstName,
            "lastName": row.lastName,
            "phone": row.phone,
            "email": row.email,
            "role": row.role
        });    
        setIsDeletePopupOpen(true);
    };

    const columnMapping = [
        { columnName: "Id", fieldName: "id" },
        { columnName: "First name", fieldName: "firstName" },
        { columnName: "Last name",  fieldName: "lastName" },
        { columnName: "Phone",  fieldName: "phone" },
        { columnName: "Email",  fieldName: "email" },
        { columnName: "Role",  fieldName: "role" },
    ];

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <>
            <ReusableTable
                columnMapping={columnMapping}
                data={users}
                title="User Management"
                searchPlaceholder="Search..."
                onAdd={handleAdd}
                onTopup={handleTopUpClick}
                onEdit={handleEdit}
                onDelete={handleDelete}
                itemsPerPageOptions={[10, 25, 50, 100]}
                showAddButton={true}
                showSearchInput={true}
            />
            {isTopUpPopupOpen && (<TopUpPopUp setIsTopUpPopupOpen={setIsTopUpPopupOpen} />)}            
            {isEditPopupOpen && (<EditPopUp user={selectedUser} setIsEditPopupOpen={setIsEditPopupOpen} />)}
            {isDeletePopupOpen && (<DeletePopUp user={selectedUser} setIsDeletePopupOpen={setIsDeletePopupOpen} />)}
        </>
    );
}

export default UserManagement;

















// import React, {useState} from 'react';
// import { useNavigate } from "react-router-dom";
// import { useQuery } from '@tanstack/react-query';
// import { useAtom } from 'jotai';
// import { usersAtom } from "../../utils/atoms"; 
// import ReusableTable from '../ReusableTable';
// import api from "../../utils/api"; 
// import TopUpPopUp from "./topUp";
// import EditPopUp from "./editPopUp";

// function UserManagement() {
//     const [users, setUsers] = useAtom(usersAtom);
//     const [isTopUpPopupOpen, setIsTopUpPopupOpen] = useState(false);
//     const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
//     const [selectedUser, setSelectedUser] = useState(null);
//     const navigate = useNavigate();

//     const { isLoading, isError, data, error } = useQuery({
//         queryKey: ['users'],
//         queryFn: async () => {
//             const response = await api.get('/api/user/getAll');
//             return response?.data;
//         }
//     });

//     if (isLoading) {
//         return <p>Loading...</p>; // Render a loading indicator while data is being fetched
//     }

//     if (isError) {
//         return <p>Error: {error.message}</p>; // Render an error message if there's an error fetching data
//     }

//     if (data) {
//         setUsers(data); // Once data is fetched successfully, set it in the state
//     }

//     const handleAdd = () => {
//         navigate('/dashboard/users/addNew');
//     };

//     const handleTopUpClick = () => {    
//         setIsTopUpPopupOpen(true);
//       };

//     const handleEdit = (row) => {
//         // navigate(`/dashboard/users/edit/${row.id}`);
//         setSelectedUser({
//             "id":row.id,
//             "firstName":row.firstName,
//             "lastName":row.lastName,
//             "phone":row.phone,
//             "email":row.email,
//             "role":row.role
//         });    
//         setIsEditPopupOpen(true);
//     };
  
//     const handleDelete = (row) => {
//         navigate(`/dashboard/users/delete/${row.id}`);
//     };

//     const columnMapping = [
//         { columnName: "Id", fieldName: "id" },
//         { columnName: "First name", fieldName: "firstName" },
//         { columnName: "Last name",  fieldName: "lastName" },
//         { columnName: "Phone",  fieldName: "phone" },
//         { columnName: "Email",  fieldName: "email" },
//         { columnName: "Role",  fieldName: "role" },
//       ];

//     return (
//         <>
//             <ReusableTable
//                 columnMapping={columnMapping}
//                 data={users}
//                 title="User Management"
//                 searchPlaceholder="Search..."
//                 onAdd={handleAdd}
//                 onTopup={handleTopUpClick}
//                 onEdit={handleEdit}
//                 onDelete={handleDelete}
//                 itemsPerPageOptions={[10, 25, 50, 100]}
//                 showAddButton={true}
//                 showSearchInput={true}
//             />
//             {isTopUpPopupOpen && (<TopUpPopUp setIsTopUpPopupOpen={setIsTopUpPopupOpen} />)}            
//             {isEditPopupOpen && (<EditPopUp user={selectedUser} setIsEditPopupOpen={setIsEditPopupOpen} />)}
//         </>
//     );
// }

// export default UserManagement;
