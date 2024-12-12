import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserData } from "../services/Api";

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
          navigate("/auth/login");
          return;
        }

        const data = await fetchUserData(user.id);
        setUserData(data);
      } catch (err) {
        setError("Failed to load user data.");
      }
    };

    getUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    navigate("/auth/login");
  };

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!userData) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  const getImage = () => {
    switch (userData.gender) {
      case "male":
        return "/assets/male.png";
      case "female":
        return "/assets/female.png";
      default:
        return "/assets/other.png";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center w-full max-w-md">
        <div className="text-2xl font-bold mb-12 text-gray-700">
          Welcome to <h1 className="text-indigo-700 text-5xl">Unstop</h1>
        </div>

        <div className="max-w-sm mx-auto rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300">
          <div className="flex justify-center mt-6">
            <img
              src={getImage()}
              alt={`${userData.firstName} ${userData.lastName}`}
              className="h-32 w-32 object-cover rounded-full border-4 border-indigo-700 hover:shadow-2xl transition-shadow duration-300"
            />
          </div>

          <div className="p-6">
            <h2 className="text-xl font-bold text-indigo-700 mb-2 text-center">
              {userData.firstName} {userData.lastName}
            </h2>
            <p className="text-lg text-gray-600 mb-1 text-center">{userData.email}</p>
            <p className="text-lg text-gray-600 text-center capitalize">{userData.gender}</p>
          </div>

          <div className="text-center pb-6">
            <button
              onClick={handleLogout}
              className="mt-4 py-2 px-8 bg-indigo-700 font-bold text-white rounded-full hover:bg-indigo-500 transition-colors duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
