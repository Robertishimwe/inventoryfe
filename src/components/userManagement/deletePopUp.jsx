import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const DeletePopup = ({ user, setIsDeletePopupOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  const { mutate: deleteUser, isError: isDeleteError } = useMutation({
    mutationFn: async () => {
      const response = await api.delete(`/api/user/${user.id}/softDelete`);
      return response.data;
    },
    onSuccess: () => {
      toast.success(`"${user.firstName}" was deleted successfully`);
      // Refetch the user data to update the data grid
      queryClient.invalidateQueries(['users']);
      setIsDeletePopupOpen(false);
    },
    onError: (error) => {
      setError(error?.response?.data?.error);
      toast.error(`${error?.response?.data?.error}`, {
        duration: 9000,
        position: 'top-center',
      });
    },
  });

  const handleDeleteFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    deleteUser();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg z-50 relative w-1/3">
        <h2 className="text-lg font-semibold mb-4 text-center">Delete User</h2>
        <form onSubmit={handleDeleteFormSubmit}>
          <div className="mb-4">
            <label htmlFor="user" className="block mb-2 font-medium">
              <span className="text-sm font-medium flex justify-center">
                Are you sure you want to delete &nbsp;<b>{user.firstName}</b>?
              </span>
            </label>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              className="mr-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              onClick={() => setIsDeletePopupOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded"
              disabled={isLoading}
            >
              {isLoading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </form>
      </div>
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={() => setIsDeletePopupOpen(false)}
      />
    </div>
  );
};

export default DeletePopup;