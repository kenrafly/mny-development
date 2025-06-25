"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { User } from "@/app/admin/users/page"; // adjust if needed

interface Props {
  open: boolean;
  onClose: () => void;
  userData: User | null;
  onSave: (updated: User) => void;
}

export default function EditUserModal({
  open,
  onClose,
  userData,
  onSave,
}: Props) {
  const [username, setUsername] = useState("");
  const [dateJoined, setDateJoined] = useState("");
  const [dateEnded, setDateEnded] = useState("");
  const [plan, setPlan] = useState<"1 month" | "2 months" | "3 months">(
    "1 month"
  );

  useEffect(() => {
    if (userData) {
      setUsername(userData.user);
      setDateJoined(userData.dateJoined.slice(0, 10)); // YYYY-MM-DD
      setDateEnded(userData.dateEnded.slice(0, 10));
      setPlan(userData.plan);
    }
  }, [userData]);

  const handleSubmit = async () => {
    if (!userData) return;

    const updated: User = {
      ...userData,
      user: username,
      dateJoined: new Date(dateJoined).toISOString(),
      dateEnded: new Date(dateEnded).toISOString(),
      plan,
    };

    const res = await fetch(`/api/users/${userData._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });

    if (res.ok) {
      onSave(updated);
      onClose();
    } else {
      console.error("Failed to update user");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#0e0f1a] text-white">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <Input
            type="date"
            value={dateJoined}
            onChange={(e) => setDateJoined(e.target.value)}
          />
          <Input
            type="date"
            value={dateEnded}
            onChange={(e) => setDateEnded(e.target.value)}
          />
          <select
            value={plan}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(e) => setPlan(e.target.value as any)}
            className="w-full bg-[#1a1b2e] p-2 rounded text-white"
          >
            <option value="1 month">1 month</option>
            <option value="2 months">2 months</option>
            <option value="3 months">3 months</option>
          </select>
        </div>
        <DialogFooter className="pt-4">
          <Button onClick={handleSubmit}>Save</Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
