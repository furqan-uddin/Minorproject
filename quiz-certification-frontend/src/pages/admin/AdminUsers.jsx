//src/pages/admin/AdminUsers.jsx
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../../api";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editUserData, setEditUserData] = useState({ name: "", email: "", role: "user" });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data } = await API.get("/admin/users");
    setUsers(data);
  };

  const startEditUser = (user) => {
    setEditingUserId(user._id);
    setEditUserData({ name: user.name, email: user.email, role: user.role });
  };

  const handleInputChange = (field, value) => {
    setEditUserData({ ...editUserData, [field]: value });
  };

  const handleEditSave = async () => {
    try {
      await API.put(`/admin/users/${editingUserId}`, editUserData);
      setEditingUserId(null);
      fetchUsers();
      toast.success("User updated");
    } catch (err) {
      toast.error("Failed to update user");
    }
  };

  const cancelEdit = () => setEditingUserId(null);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this user?")) {
      await API.delete(`/admin/users/${id}`);
      fetchUsers();
      toast.success("User deleted");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-indigo-700">Manage Users</h2>

      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border rounded w-full max-w-sm"
      />

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-xl shadow border mt-4">
          <thead>
            <tr className="bg-indigo-100 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((u) =>
                [u.name, u.email].some((field) =>
                  field.toLowerCase().includes(searchTerm.toLowerCase())
                )
              )
              .map((u) => (
                <tr key={u._id} className="border-b hover:bg-indigo-50">
                  {editingUserId === u._id ? (
                    <>
                      <td className="p-3">
                        <input
                          value={editUserData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="border p-1 rounded w-full"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          value={editUserData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="border p-1 rounded w-full"
                        />
                      </td>
                      <td className="p-3">
                        <select
                          value={editUserData.role}
                          onChange={(e) => handleInputChange("role", e.target.value)}
                          className="border p-1 rounded w-full"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="p-3 text-center space-x-2">
                        <button onClick={handleEditSave} className="text-green-600 hover:underline">Save</button>
                        <button onClick={cancelEdit} className="text-gray-600 hover:underline">Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-3">{u.name}</td>
                      <td className="p-3">{u.email}</td>
                      <td className="p-3 capitalize">{u.role}</td>
                      <td className="p-3 text-center space-x-2">
                        <button onClick={() => startEditUser(u)} className="text-blue-600 hover:underline">Edit</button>
                        <button onClick={() => handleDelete(u._id)} className="text-red-600 hover:underline">Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
