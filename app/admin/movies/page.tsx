"use client";

import { DataTable } from "@/components/admin/table/Shadcn";
import { getColumns } from "@/components/admin/table/Columns";
import React, { useEffect, useState } from "react";
import EditMovieModal, {
  Movie,
} from "@/components/admin/EditModal/EditMovieModal";
import AddMovieModal from "@/components/admin/addMovieModal/addMovieModal";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch("/api/movies");
      const data = await res.json();
      setMovies(data);
      setLoading(false);
    };
    fetchMovies();
  }, []);

  const handleEdit = (movie: Movie) => {
    setSelectedMovie(movie);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure?");
    if (!confirmed) return;

    const res = await fetch("/api/movies", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setMovies((prev) => prev.filter((m) => m._id !== id));
    } else {
      console.error("Failed to delete movie");
    }
  };

  const handleAddMovie = (movie: Movie) => {
    setMovies((prev) => [movie, ...prev]);
  };

  const handleSave = (updated: Movie) => {
    setMovies((prev) =>
      prev.map((movie) => (movie._id === updated._id ? updated : movie))
    );
  };

  return (
    <div className="min-h-screen py-6 px-4 text-white w-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">Admin Movies Page</h1>
          <p>Manage movies below.</p>
        </div>
        <Button onClick={() => setAddOpen(true)}>+ Add Movie</Button>
      </div>

      <DataTable
        columns={getColumns(handleEdit, handleDelete)}
        data={movies}
        loading={loading}
      />

      <AddMovieModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={handleAddMovie}
      />

      <EditMovieModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        movie={selectedMovie}
        onSave={handleSave}
      />
    </div>
  );
};

export default Page;
