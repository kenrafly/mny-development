import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { User } from "@/app/admin/users/page";

export const getUserColumns = (
  handleEdit: (user: User) => void,
  handleDelete: (id: string) => void
): ColumnDef<User, unknown>[] => [
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => (
      <div className="font-medium text-white">{row.getValue("user")}</div>
    ),
  },
  {
    accessorKey: "plan",
    header: "Plan",
    cell: ({ row }) => <div className="text-sm">{row.getValue("plan")}</div>,
  },
  {
    accessorKey: "dateJoined",
    header: "Date Joined",
    cell: ({ row }) => {
      const date = new Date(row.getValue("dateJoined"));
      return (
        <div className="text-sm text-gray-400">{date.toLocaleDateString()}</div>
      );
    },
  },
  {
    accessorKey: "dateEnded",
    header: "Date Ended",
    cell: ({ row }) => {
      const date = new Date(row.getValue("dateEnded"));
      return (
        <div className="text-sm text-gray-400">{date.toLocaleDateString()}</div>
      );
    },
  },
  {
    id: "edit",
    header: "Edit",
    cell: ({ row }) => (
      <Button
        variant="outline"
        className="text-sm text-blue-600"
        onClick={() => handleEdit(row.original)}
      >
        Edit
      </Button>
    ),
  },
  {
    id: "delete",
    header: "Delete",
    cell: ({ row }) => (
      <Button
        variant="destructive"
        className="text-sm"
        onClick={() => handleDelete(row.original._id)}
      >
        Delete
      </Button>
    ),
  },
];
