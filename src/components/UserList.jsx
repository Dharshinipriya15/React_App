import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Pagination from "../components/Pagination";

const UserList = () => {
    const { logout } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://reqres.in/api/users?page=${currentPage}`)
            .then((response) => {
                setUsers(response.data.data);
                setFilteredUsers(response.data.data);
                setTotalPages(response.data.total_pages);
            })
            .catch((error) => console.error("Error fetching users:", error));
    }, [currentPage]);

    // Handle search filtering (only updates when searchTerm changes)
    useEffect(() => {
        setFilteredUsers(
            users.filter(user =>
                `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, users]);

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    const handleDelete = (id) => {
        axios.delete(`https://reqres.in/api/users/${id}`)
            .then(() => {
                setUsers(users.filter(user => user.id !== id));
                setFilteredUsers(filteredUsers.filter(user => user.id !== id));
            })
            .catch((error) => console.error("Error deleting user:", error));
    };

    return (
        <div >
            <div className="user-list-container">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
                />
                <button onClick={logout} className="logout-btn">Logout</button>
            </div>
            <div className="user-list">
            <h2>User List</h2>
            <ul >
                {filteredUsers.map(user => (
                    <li key={user.id} className="user-card">
                        <img src={user.avatar} alt={user.first_name} />
                        <div>
                            <p>{user.first_name} {user.last_name}</p>
                        </div>
                        <button onClick={() => handleEdit(user.id)} className="edit-btn">Edit</button>
                        <button onClick={() => handleDelete(user.id)} className="delete-btn">Delete</button>
                    </li>
                ))}
            </ul>
            </div>

            {/* Pagination */}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
    );
};

export default UserList;
