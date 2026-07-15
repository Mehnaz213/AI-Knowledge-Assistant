'use client';

import { useState, useEffect } from "react";
import { User, Lock, Trash2 } from "lucide-react";

export default function EmployeeSettingsPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [users, setUsers] = useState<any[]>([]);

    const [newUserName, setNewUserName] = useState("");

    const [newUserEmail, setNewUserEmail] = useState("");

    const [newUserPassword, setNewUserPassword] = useState("");

    const [newUserRole, setNewUserRole] = useState("employee");
    const handleCreateUser = async () => {

        if (
            !newUserName ||
            !newUserEmail ||
            !newUserPassword
        ) {
            alert("Please fill all fields.");
            return;
        }

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://127.0.0.1:8000/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        name: newUserName,
                        email: newUserEmail,
                        password: newUserPassword,
                        role: newUserRole
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.detail);
                return;
            }

            alert(data.message);

            const usersResponse = await fetch(
                "http://127.0.0.1:8000/users",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const usersData = await usersResponse.json();

            setUsers(usersData);

            setNewUserName("");
            setNewUserEmail("");
            setNewUserPassword("");
            setNewUserRole("employee");

        } catch {

            alert("Unable to create user.");

        }

    };

    const handleDeleteUser = async (id: number) => {

        if (!confirm("Delete this user?")) return;

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://127.0.0.1:8000/users/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.detail);
                return;
            }

            setUsers(prev =>
                prev.filter(user => user.id !== id)
            );

            alert(data.message);

        } catch {

            alert("Unable to delete user.");

        }

    };

    const handlePasswordChange = async () => {

        if (
            !currentPassword ||
            !newPassword ||
            !confirmPassword
        ) {
            alert("Please fill all fields.");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://127.0.0.1:8000/change-password",
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },

                    body: JSON.stringify({
                        current_password: currentPassword,
                        new_password: newPassword,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.detail);
                return;
            }

            alert(data.message);

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

        } catch {

            alert("Something went wrong.");

        }

    };
    useEffect(() => {

        const user = JSON.parse(
            localStorage.getItem("user") || "{}"
        );

        setName(user.name || "");
        setEmail(user.email || "");
        setRole(user.role || "");
        const token = localStorage.getItem("token");
        fetch("http://127.0.0.1:8000/users", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);

    return (
        <div className="flex-1 overflow-auto p-8 page-fade">
            <h2 className="text-2xl font-bold gradient-text mb-8">
                Settings
            </h2>

            <div className="max-w-3xl space-y-8">

                {/* Profile */}

                <div className="glass neon-border hover-lift smooth-transition rounded-xl p-6">

                    <div className="flex items-center gap-3 mb-6">

                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                        </div>

                        <h3 className="text-lg font-semibold">
                            Profile Information
                        </h3>

                    </div>

                    <div className="space-y-5">

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Name
                            </label>

                            <input
                                type="text"
                                value={name}
                                readOnly
                                className="w-full rounded-xl bg-background border border-border px-4 py-3 text-muted-foreground cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Email
                            </label>

                            <input
                                type="email"
                                value={email}
                                readOnly
                                className="w-full rounded-xl bg-background border border-border px-4 py-3 text-muted-foreground cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Role
                            </label>

                            <input
                                type="text"
                                value={role}
                                readOnly
                                className="w-full rounded-xl bg-background border border-border px-4 py-3 text-muted-foreground cursor-not-allowed"
                            />
                        </div>

                    </div>

                </div>
                {/* Change Password */}

                <div className="glass neon-border hover-lift smooth-transition rounded-xl p-6">

                    <div className="flex items-center gap-3 mb-6">

                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">

                            <Lock className="w-5 h-5 text-white" />

                        </div>

                        <h3 className="text-lg font-semibold">

                            Change Password

                        </h3>

                    </div>

                    <div className="space-y-5">

                        <div>

                            <label className="block text-sm font-medium mb-2">

                                Current Password

                            </label>

                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full rounded-xl bg-background border border-border px-4 py-3 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 outline-none"
                            />

                        </div>

                        <div>

                            <label className="block text-sm font-medium mb-2">

                                New Password

                            </label>

                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full rounded-xl bg-background border border-border px-4 py-3 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 outline-none"
                            />

                        </div>

                        <div>

                            <label className="block text-sm font-medium mb-2">

                                Confirm Password

                            </label>

                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full rounded-xl bg-background border border-border px-4 py-3 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 outline-none"
                            />

                        </div>

                        <button
                            onClick={handlePasswordChange}
                            className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 py-3 text-white font-medium hover:from-blue-600 hover:to-cyan-600 transition"
                        >

                            Update Password

                        </button>
                    </div>
                </div>
                {role === "admin" && (

                    <div className="glass neon-border hover-lift smooth-transition rounded-xl p-6">

                        <div className="flex items-center gap-3 mb-6">

                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">

                                <User className="w-5 h-5 text-white" />

                            </div>

                            <h3 className="text-lg font-semibold">

                                User Management

                            </h3>

                        </div>
                        <div className="space-y-4 mb-8">

                            <input
                                type="text"
                                placeholder="Full Name"
                                value={newUserName}
                                onChange={(e) =>
                                    setNewUserName(e.target.value)
                                }
                                className="w-full rounded-xl bg-background border border-border px-4 py-3"
                            />

                            <input
                                type="email"
                                placeholder="Email"
                                value={newUserEmail}
                                onChange={(e) =>
                                    setNewUserEmail(e.target.value)
                                }
                                className="w-full rounded-xl bg-background border border-border px-4 py-3"
                            />

                            <input
                                type="password"
                                placeholder="Temporary Password"
                                value={newUserPassword}
                                onChange={(e) =>
                                    setNewUserPassword(e.target.value)
                                }
                                className="w-full rounded-xl bg-background border border-border px-4 py-3"
                            />

                            <select
                                value={newUserRole}
                                onChange={(e) =>
                                    setNewUserRole(e.target.value)
                                }
                                className="w-full rounded-xl bg-background border border-border px-4 py-3"
                            >

                                <option value="employee">
                                    Employee
                                </option>

                                <option value="admin">
                                    Admin
                                </option>

                            </select>

                            <button
                                onClick={handleCreateUser}
                                className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 py-3 text-white font-medium"
                            >

                                Create User

                            </button>

                        </div>
                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead>

                                    <tr className="border-b border-border">

                                        <th className="text-left py-3">Name</th>

                                        <th className="text-left py-3">Email</th>

                                        <th className="text-left py-3">Role</th>

                                        <th className="text-left py-3">Action</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {users.map((user) => (

                                        <tr
                                            key={user.id}
                                            className="border-b border-border"
                                        >

                                            <td className="py-3">

                                                {user.name}

                                            </td>

                                            <td className="py-3">

                                                {user.email}

                                            </td>

                                            <td className="py-3 capitalize">

                                                {user.role}

                                            </td>
                                            <td className="py-3">

                                                <button
                                                    onClick={() => handleDeleteUser(user.id)}
                                                    className="text-red-400 hover:text-red-300"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>

                                            </td>
                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>

                )}
            </div>

        </div>

    );
}
