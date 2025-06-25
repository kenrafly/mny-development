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
import { useState } from "react";
import { User } from "@/app/admin/users/page"; // Adjust path if needed

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (user: User) => void;
}

export default function AddUserModal({ open, onClose, onAdd }: Props) {
  const [username, setUsername] = useState("");
  const [plan, setPlan] = useState<"1 month" | "2 months" | "3 months">(
    "1 month"
  );
  const [dateJoined, setDateJoined] = useState("");
  const [dateEnded, setDateEnded] = useState("");

  const handleSubmit = async () => {
    if (!username || !dateJoined || !dateEnded) return alert("Fill all fields");

    const newUser = {
      user: username,
      plan,
      dateJoined,
      dateEnded,
    };

    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    if (res.ok) {
      const data = await res.json();
      onAdd(data);
      onClose();
      // Reset form
      setUsername("");
      setPlan("1 month");
      setDateJoined("");
      setDateEnded("");
    } else {
      alert("Failed to add user");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#0e0f1a] text-white">
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />

          <label className="block">
            <span className="text-sm text-gray-300">Date Joined</span>
            <Input
              type="date"
              value={dateJoined}
              onChange={(e) => setDateJoined(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-300">Date Ended</span>
            <Input
              type="date"
              value={dateEnded}
              onChange={(e) => setDateEnded(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-300">Plan</span>
            <select
              className="w-full rounded bg-[#1c1c2a] p-2 text-white"
              value={plan}
              onChange={(e) =>
                setPlan(e.target.value as "1 month" | "2 months" | "3 months")
              }
            >
              <option value="1 month">1 month</option>
              <option value="2 months">2 months</option>
              <option value="3 months">3 months</option>
            </select>
          </label>
        </div>

        <DialogFooter className="pt-4">
          <Button onClick={handleSubmit}>Add</Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
