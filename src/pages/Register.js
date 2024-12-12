import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faKey, faVenusMars, faEnvelope, faSignature, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { registerUser } from "../services/Api";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!firstName || !lastName || !gender || !email || !username || !password) {
      return setError("All fields are required.");
    }
    if (password.length < 8) {
      return setError("Password must be at least 8 characters long.");
    }

    try {
      const response = await registerUser({ firstName, lastName, gender, email, username, password });
      console.log(response);
      alert("User registration completed successfully! \n" +
       "Please update the API to incorporate registered user data for login authentication.");
      navigate("/auth/login");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-[#F4F4F4] px-4 sm:px-6 lg:px-8">
      <div className="hidden md:flex md:w-1/2 lg:w-2/5 justify-center">
        <img src="/assets/unstop.png" alt="Register Illustration" className="w-full max-w-sm md:max-w-md" />
      </div>
      <div className="bg-white px-6 py-3 rounded-lg shadow-md w-full max-w-sm sm:max-w-md lg:max-w-lg hover:shadow-2xl transition-shadow duration-300">
        <h1 className="text-2xl font-bold text-center text-slate-700 mb-4">Register to <span className="text-indigo-700">Unstop</span></h1>

        <button className="w-full py-2 mb-3 bg-white text-gray-600 font-bold border-2 shadow-md border-slate-100 rounded-xl flex items-center justify-center space-x-3 hover:bg-gray-100 transition">
          <FontAwesomeIcon icon={faGoogle} className="text-red-500" />
          <span>Register with Google</span>
        </button>
        <button className="w-full py-2 bg-white text-gray-600 font-bold border-2 shadow-md border-slate-100 rounded-xl flex items-center justify-center space-x-3 hover:bg-gray-100 transition">
          <FontAwesomeIcon icon={faFacebook} className="text-blue-500" />
          <span>Register with Facebook</span>
        </button>

        <div className="flex items-center my-2">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <div className="flex items-center border border-gray-300 rounded-xl bg-gray-100">
              <FontAwesomeIcon icon={faSignature} className="text-gray-500 p-2 border rounded-full m-1 border-gray-500" />
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-2 bg-gray-100 border-none rounded-r-xl focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <div className="flex items-center border border-gray-300 rounded-xl bg-gray-100">
              <FontAwesomeIcon icon={faSignature} className="text-gray-500 p-2 border rounded-full m-1 border-gray-500" />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-2 bg-gray-100 border-none rounded-r-xl focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <div className="flex items-center border border-gray-300 rounded-xl bg-gray-100">
              <FontAwesomeIcon icon={faSignature} className="text-gray-500 p-2 border rounded-full m-1 border-gray-500" />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 bg-gray-100 border-none rounded-r-xl focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="flex items-center border border-gray-300 rounded-xl bg-gray-100">
              <FontAwesomeIcon icon={faEnvelope} className="text-gray-500 p-2 border rounded-full m-1 border-gray-500" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 bg-gray-100 border-none rounded-r-xl focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <div className="flex items-center border border-gray-300 rounded-xl bg-gray-100">
              <FontAwesomeIcon icon={faVenusMars} className="text-gray-500 p-2 border rounded-full m-1 border-gray-500" />
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-2 bg-gray-100 border-none rounded-r-xl focus:outline-none"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Set Password</label>
            <div className="flex items-center border border-gray-300 rounded-xl bg-gray-100 relative">
              <FontAwesomeIcon icon={faKey} className="text-gray-500 p-3" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 bg-gray-100 border-none rounded-r-xl focus:outline-none"
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="absolute right-3 text-gray-500 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button type="submit" className="w-full py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 transition">Register</button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <button className="text-indigo-700 hover:underline" onClick={() => navigate("/auth/login")}>Login</button>
        </p>
      </div>
    </div>
  );
};

export default Register;
