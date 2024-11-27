import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaGithub, FaPencilAlt } from "react-icons/fa"; // Import Pencil Icon
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
function UserDetails() {
    const location = useLocation();
    const navigation = useNavigate();
    const initialData = location.state || {};
    const [userData, setUserData] = useState(initialData); // State for user details
    const [editingField, setEditingField] = useState(null); // Track which field is being edited
console.log(userData.image)
    // Function to handle image change
    const handleImageChange = (e) => {
        setEditingField(null); // Close editing mode
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file); // Generate object URL for preview
            setUserData((prev) => ({ ...prev, image: imageUrl }));
        }
        setEditingField(null); // Close editing mode
    };

    const handleFieldChange = (field, value) => {
        setUserData((prev) => ({ ...prev, [field]: value }));
        setEditingField(null); // Close editing mode
    };

    const onLogout = () => {
        navigation('/');
    };

    const onChangeAccount = () => {
        navigation('/')
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
                {/* User Image */}
                <div className="relative flex justify-center mt-6">
                    <img
                        src={userData.image}
                        alt="User"
                        className="w-36 h-36 rounded-full shadow-lg object-cover hover:scale-110 bg-slate-50 border-4 border-black p-2"
                    />
                    <button
                        onClick={() => setEditingField("image")}
                        className="absolute bottom-[-15px] align-middle bg-gray-800 text-white p-2 rounded-full shadow hover:bg-gray-700"
                    >
                        <FaPencilAlt />
                    </button>
                    {editingField === "image" && (
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="absolute top-full mt-2"
                        />
                    )}
                </div>

                {/* User Details */}
                <div className="p-6">
                    {/* Name */}
                    <div className="flex justify-between items-center mb-4">
                        <div className=" flex justify-between w-full text-xl font-semibold text-gray-800">
                    
                                <div className="">User Name </div>
                                <div className="">
                                {editingField === "name" ? (
                                <input
                                    type="text"
                                    defaultValue={userData.name}
                                    onBlur={(e) => handleFieldChange("name", e.target.value)}
                                    autoFocus
                                    className="border-b-2 focus:outline-none"
                                />
                            ) : (
                                userData.name
                            )}
                                </div>
                            
                           
                        </div>
                        <button
                            onClick={() => setEditingField("name")}
                            className="text-gray-500 hover:text-gray-700 ms-3"
                        >
                            <FaPencilAlt />
                        </button>
                    </div>

                    {/* Email */}
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-gray-500 w-full flex justify-between">
                            <div>Email</div>
                            {editingField === "email" ? (
                                <input
                                    type="email"
                                    defaultValue={userData.email}
                                    onBlur={(e) => handleFieldChange("email", e.target.value)}
                                    autoFocus
                                    className="border-b-2 focus:outline-none"
                                />
                            ) : (
                                userData.email
                            )}
                        </div>
                        <button
                            onClick={() => setEditingField("email")}
                            className="text-gray-500 hover:text-gray-700 ms-3"
                        >
                            <FaPencilAlt />
                        </button>
                    </div>

                    {/* Password */}
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-gray-500 flex justify-between w-full">
                            <div>Password</div>
                            {editingField === "password" ? (
                                <input
                                    type="password"
                                    defaultValue={userData.password}
                                    onBlur={(e) =>
                                        handleFieldChange("password", e.target.value)
                                    }
                                    autoFocus
                                    className="border-b-2 focus:outline-none"
                                />
                            ) : (
                                userData.password // Mask password display
                            )}
                        </div>
                        <button
                            onClick={() => setEditingField("password")}
                            className="text-gray-500 hover:text-gray-700 ms-3"
                        >
                            <FaPencilAlt />
                        </button>
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 space-y-4">
                        <button
                            onClick={onLogout}
                            className="w-full py-2 px-4 bg-red-500 text-white font-medium rounded-lg shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                        >
                            Logout
                        </button>
                        <Button color="dark" onClick={onChangeAccount} className="w-full">Change Account</Button>
                    </div>
                    <div className="mt-10 text-gray-400 text-center">If you sign-in with google, See console for full details of you by Google-Provider</div>
                <div className="flex justify-center mt-4"><a href="https://github.com/Suheldevs/Google-Oauth" target="blank"><FaGithub/></a> </div>
                </div>
            </div>
        </div>
    );
}

export default UserDetails;
