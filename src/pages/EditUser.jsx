import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import UserForm from "../components/UserForm";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`https://reqres.in/api/users/${id}`)
      .then((response) => setUser(response.data.data))
      .catch((error) => console.error("Error fetching user:", error));
  }, [id]);

  const handleSave = (updatedUser) => {
    axios.put(`https://reqres.in/api/users/${id}`, updatedUser)
      .then(() => {
        alert("User updated successfully!");
        navigate("/users");
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  const handleCancel = () => {
    navigate("/users");
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      {user ? (
        <UserForm user={user} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default EditUser;
