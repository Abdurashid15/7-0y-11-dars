import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser, updateUser } from "./components/usersSlice";
import { FaEdit, FaTrash } from "react-icons/fa";
import './App.css'

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleAddUser = () => {
    if (!name || !email) {
      setError("Iltimos, barcha maydonlarni to'ldiring");
      return;
    }

    if (!validateEmail(email)) {
      setError("Noto'g'ri email manzili");
      return;
    }

    setError("");

    if (editId) {
      dispatch(updateUser({ id: editId, name, email }));
      setEditId(null);
    } else {
      dispatch(addUser({ id: Date.now(), name, email }));
    }
    setName("");
    setEmail("");
  };

  const handleEditUser = (user) => {
    setName(user.name);
    setEmail(user.email);
    setEditId(user.id);
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div className=" min-h-screen flex flex-col mx-auto bg-gray-100 p-6">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6 mb-8">
        <h1 className="text-2xl font-bold mb-4 text-center">Foydalanuvchilarni boshqarish</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Ism"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-2 border border-gray-300 rounded-md outline-slate-400"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-2 border border-gray-300 rounded-md outline-slate-400"
          />
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <button
            onClick={handleAddUser}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            {editId ? "Foydalanuvchini yangilash" : "Foydalanuvchini qo'shish"}
          </button>
        </div>
      </div>

      <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-gray-50 p-4 shadow rounded-md flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleEditUser(user)}
                className="text-blue-500 hover:text-blue-600"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="text-red-500 hover:text-red-600"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
