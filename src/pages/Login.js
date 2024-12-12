import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faUser, faKey, faEnvelope, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { loginUser } from "../services/Api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/home");
    }
  }, [navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email || !username || !password) {
      setError("All fields are required.");
      alert("All fields are required."); 
      return;
    }
  
    setIsLoading(true);
  
    try {
      const response = await loginUser(email, username, password);
  
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data));
  
      alert("User login successful!");
      navigate("/home");
    } catch (err) {
     
      const errorMessage =
        "Invalid credentials! Use the following test data for login:\n" +
        "Username: 'emilys'\n" +
        "Email: 'emily.johnson@x.dummyjson.com'\n" +
        "Password: 'emilyspass'\n" +
        "Please update the API to support both registration and login authentication. Dummy API only supports the above data.";
  
      setError(errorMessage);
      alert(errorMessage); 
      setIsLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-[#F4F4F4] px-4 sm:px-6 lg:px-8">
      <div className="hidden md:flex md:w-1/2 lg:w-2/5 justify-center">
        <img src="/assets/unstop.png" alt="Login Illustration" className="w-full max-w-sm md:max-w-md" />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm sm:max-w-md lg:max-w-lg md:w-1/2 lg:w-2/5 hover:shadow-2xl transition-shadow duration-300">
        <h1 className="text-2xl font-bold text-center text-slate-700 mb-6">
          Welcome to <span className="text-indigo-700">Unstop</span>
        </h1>

        <button className="w-full py-2 mb-3 bg-white text-gray-600 font-bold border-2 shadow-md border-slate-100 rounded-xl flex items-center justify-center space-x-3 hover:bg-gray-100 transition">
          <FontAwesomeIcon icon={faGoogle} className="text-red-500" />
          <span>Login with Google</span>
        </button>
        <button className="w-full py-2 mb-6 bg-white text-gray-600 font-bold border-2 shadow-md border-slate-100 rounded-xl flex items-center justify-center space-x-3 hover:bg-gray-100 transition">
          <FontAwesomeIcon icon={faFacebook} className="text-blue-500" />
          <span>Login with Facebook</span>
        </button>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <div className="flex items-center border border-gray-300 rounded-xl bg-gray-100">
              <FontAwesomeIcon icon={faUser} className="text-gray-500 p-2 border rounded-full m-1 border-gray-500" />
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 bg-gray-100 border-none rounded-r-xl focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="flex items-center border border-gray-300 rounded-xl bg-gray-100">
              <FontAwesomeIcon icon={faEnvelope} className="text-gray-500 p-2 border rounded-full m-1 border-gray-500" />
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 bg-gray-100 border-none rounded-r-xl focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="flex items-center border border-gray-300 rounded-xl bg-gray-100 relative">
              <FontAwesomeIcon icon={faKey} className="text-gray-500 p-3" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 bg-gray-100 border-none rounded-r-xl focus:outline-none pr-10"
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="absolute right-3 text-gray-500 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button type="submit" className="w-full py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 transition">
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account? <button className="text-indigo-700 hover:underline" onClick={() => navigate("/register")}>Register</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
