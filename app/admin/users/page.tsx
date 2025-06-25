"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AddUserModal from "@/components/admin/AddUserModal/AddUserModal"; // Make sure this exists
import { DataTable } from "@/components/admin/tableUser/Shadcn";
import { getUserColumns } from "@/components/admin/tableUser/Columns"; // Make sure this exists

// ✅ Define User type here or import it if defined elsewhere
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
  const [addOpen, setAddOpen] = useState(false); // modal state

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
    const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
    if (res.ok) {
      setUsers((prev) => prev.filter((u) => u._id !== id));
    }
  };

  const handleAddUser = (user: User) => {
    setUsers((prev) => [user, ...prev]);
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
        columns={getUserColumns(handleDelete)}
        data={users}
        loading={loading}
      />

      <AddUserModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={handleAddUser}
      />
    </div>
  );
};

export default Page;
