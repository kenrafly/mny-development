"use client";

import { DataTable } from "@/components/admin/table/Shadcn";
import { getColumns } from "@/components/admin/table/Columns";
import React, { useEffect, useState } from "react";
import EditMovieModal, {
  Movie,
} from "@/components/admin/EditModal/EditMovieModal";

const Page = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("/api/movies");
        const data = await res.json();
        setMovies(data);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setLoading(false);
      }
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
    const res = await fetch(`/api/movies/${id}`, { method: "DELETE" });
    if (res.ok) {
      setMovies((prev) => prev.filter((m) => m._id !== id));
    }
  };

  const handleSave = (updated: Movie) => {
    setMovies((prev) =>
      prev.map((movie) => (movie._id === updated._id ? updated : movie))
    );
  };

  return (
    <div className="min-h-screen py-6 px-4 text-white w-full">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Admin Movies Page</h1>
          <p>This is the admin movies Page where you can manage movies.</p>
        </div>
      </div>

      <DataTable
        columns={getColumns(handleEdit, handleDelete)}
        data={movies}
        loading={loading}
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
