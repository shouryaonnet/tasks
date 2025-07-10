import { useEffect, useState } from "react";
import UserCard from "./components/UserCard";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from "./api/UserService";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", image: "" });
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    // Basic form validation
    if (!form.name || !form.email || !form.image) {
      setError("Please fill in all fields.");
      return;
    }

    if (editingUser) {
      await updateUser(editingUser.id, form);
      setEditingUser(null);
    } else {
      await addUser(form);
    }

    setForm({ name: "", email: "", image: "" });
    setError("");
    fetchUsers();
  };

  const handleEdit = (user) => {
    setForm({ name: user.name, email: user.email, image: user.image });
    setEditingUser(user);
    setError("");
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">
        Simple User Manager
      </h1>

      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">
          {editingUser ? "Edit User" : "Add New User"}
        </h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <input
          name="name"
          placeholder="Enter name"
          value={form.name}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-3"
        />

        <input
          name="email"
          placeholder="Enter email"
          value={form.email}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-3"
        />

        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          {editingUser ? "Update User" : "Add User"}
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
