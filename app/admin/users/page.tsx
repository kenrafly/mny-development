"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AddUserModal from "@/components/admin/AddUserModal/AddUserModal";
import EditUserModal from "@/components/admin/EditModalUser/EditModalUser"; // ✅ import your Edit modal
import { DataTable } from "@/components/admin/tableUser/Shadcn";
import { getUserColumns } from "@/components/admin/tableUser/Columns";

export interface User {
  _id: string;
  user: string;
  dateJoined: string;
  dateEnded: string;
  plan: "1 month" | "2 months" | "3 months";
}

const Page = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false); // ✅ state for Edit modal
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // ✅ store user being edited

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure?");
    if (!confirmed) return;

    const res = await fetch("/api/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } else {
      console.error("Failed to delete user");
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setEditOpen(true);
  };

  const handleAddUser = (user: User) => {
    setUsers((prev) => [user, ...prev]);
  };

  const handleSaveUser = (updated: User) => {
    setUsers((prev) => prev.map((u) => (u._id === updated._id ? updated : u)));
  };

  return (
    <div className="min-h-screen py-6 px-4 text-white w-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">Admin Users Page</h1>
          <p>Manage users below.</p>
        </div>
        <Button onClick={() => setAddOpen(true)}>+ Add User</Button>
      </div>

      <DataTable
        columns={getUserColumns(handleEdit, handleDelete)} // ✅ pass handleEdit
        data={users}
        loading={loading}
      />

      <AddUserModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={handleAddUser}
      />

      <EditUserModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        userData={selectedUser}
        onSave={handleSaveUser}
      />
    </div>
  );
};

export default Page;
