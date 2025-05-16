import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [users, setUsers] = useState([]);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/all");
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-blue-700">
          Welcome, {currentUser?.user?.name}
        </h1>
        <button
          onClick={handleSignOut}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md shadow"
        >
          Sign Out
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full table-auto text-sm text-gray-700">
          <thead className="bg-blue-100 text-blue-800 uppercase text-left">
            <tr>
              <th className="p-4 border-b">Name</th>
              <th className="p-4 border-b">Date of Birth</th>
              <th className="p-4 border-b">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                <td className="p-4 border-b">{user.name}</td>
                <td className="p-4 border-b">{user.dob}</td>
                <td className="p-4 border-b">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
