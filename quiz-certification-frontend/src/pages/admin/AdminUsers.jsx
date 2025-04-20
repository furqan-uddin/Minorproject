//src/pages/admin/AdminUsers
import React, { useEffect, useState } from "react";
import API from "../../api";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const { data } = await API.get("/admin/users");
    setUsers(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await API.delete(`/admin/users/${id}`);
      fetchUsers();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">Users</h2>
      <table className="w-full bg-white rounded-xl shadow border">
        <thead>
          <tr className="bg-indigo-100">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-b hover:bg-indigo-50">
              <td className="p-3">{u.name}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3 capitalize">{u.role}</td>
              <td className="p-3 text-center">
                <button onClick={() => handleDelete(u._id)} className="text-red-600 hover:underline">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
