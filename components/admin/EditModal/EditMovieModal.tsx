// components/admin/modal/EditMovieModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export interface Movie {
  _id: string;
  title: string;
  description: string;
  image: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  movie: Movie | null;
  onSave: (updated: Movie) => void;
}

export default function EditMovieModal({
  open,
  onClose,
  movie,
  onSave,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (movie) {
      setTitle(movie.title);
      setDescription(movie.description);
      setImage(movie.image);
    }
  }, [movie]);

  const handleSubmit = async () => {
    if (!movie) return;

    const updatedMovie: Movie = {
      ...movie,
      title,
      description,
      image, // Make sure this comes from Cloudinary or the form
    };

    const res = await fetch("/api/movies", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedMovie),
    });

    if (res.ok) {
      const data = await res.json();
      onSave(data); // use response to update UI
      onClose();
    } else {
      console.error("Failed to update movie");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#0e0f1a] text-white">
        <DialogHeader>
          <DialogTitle>Edit Movie</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <Input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image URL"
          />
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
