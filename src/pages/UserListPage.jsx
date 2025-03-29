import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import UserList from "../components/UserList";

const UserListPage = () => {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!token) {
        navigate("/");
        return null;
    }

    return (
        <div>
            <UserList />
        </div>
    );
};

export default UserListPage;
