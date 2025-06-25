// components/admin/table/columns.ts
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Movie } from "../EditModal/EditMovieModal";

export const getColumns = (
  handleEdit: (movie: Movie) => void,
  handleDelete: (id: string) => void
): ColumnDef<Movie, unknown>[] => [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <Image
        src={row.getValue("image")}
        width={64}
        height={96}
        alt={row.original.title}
        className="rounded object-cover"
      />
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="font-semibold text-white">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="text-sm text-gray-400">{row.getValue("description")}</div>
    ),
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
