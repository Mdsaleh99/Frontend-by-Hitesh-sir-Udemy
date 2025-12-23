"use client";

import { INote } from "@/app/api/notes/route";
import React, { useState } from "react";

export interface IInitialNotes {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface IEditNote {
  _id: string;
  title: string;
  content: string;
}

export default function NotesClient({
  initialNotes,
}: {
  initialNotes: IInitialNotes[];
}) {
  const [form, setForm] = useState<INote>({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [notes, setNotes] = useState<IInitialNotes[]>(initialNotes);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingNote, setEditingNote] = useState<INote>({
    title: "",
    content: "",
  });

  const startEdit = (note: IEditNote) => {
    setEditingId(note._id);
    setEditingNote({
      title: note.title,
      content: note.content,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingNote({
      title: "",
      content: "",
    });
  };

  /*
    const handleChange = (e) => {
        Copy the old form state (...form)
        Update only the field that changed ([e.target.name]) with new value (e.target.value)
        [] here means dynamic key, not array.
        It uses input's name as the object key. like email, password
        
        setForm({ ...form, [e.target.name]: e.target.value });
        console.log(form);
    };
    const field = "email";
    const value = "abc@test.com";
    const obj = {
        [field]: value,  // creates { email: "abc@test.com" }
    };
    */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(form);
  };

  const updateNote = async (id: string) => {
    // if (!title || !content) return;
    setLoading(true);
    try {
      const response = await fetch(`https://localhost:3000/api/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editingNote.title,
          content: editingNote.content,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setNotes(notes.map((note) => (note._id === id ? data.data : note)));
        setEditingId(null);
        setEditingNote({
          title: "",
          content: "",
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.title && !form.content) return;

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (data.success) {
        setNotes([data.data, ...notes]);
        setForm({
          title: "",
          content: "",
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/notes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        setNotes(notes.filter((note) => note._id !== id));
        // filter creates a new array that keeps only the notes whose _id does not match the given id.
        // This effectively removes the note with that id and updates state immutably.
        alert("Note deleted successfully");
      }
    } catch (error) {
      const err = error as Error;
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black p-6 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-semibold mb-4">Create a new note</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="title"
            className="w-full p-3 border border-gray-900 rounded-md
            focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Enter title........"
          />
          <input
            type="text"
            name="content"
            className="w-full p-3 border border-gray-900 rounded-md
            focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.content}
            onChange={handleChange}
            required
            placeholder="Enter content........"
          />
        </div>
        <button
          disabled={loading}
          type="submit"
          className="rounded-lg bg-black text-white p-3 cursor-pointer"
        >
          {loading ? "Creating..." : "Create Note"}
        </button>
      </form>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">
          Your Notes: ({notes.length})
        </h2>
        {notes.length === 0 ? (
          <p>No notes found.</p>
        ) : (
          notes.map((note) => (
            <div
              key={note._id}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              {editingId === note._id ? (
                // ! Editing Mode
                <>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="title"
                      className="w-full p-3 border border-gray-900 rounded-md
            focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={editingNote.title}
                      onChange={handleChange}
                      required
                      placeholder="Enter content........"
                    />
                    <input
                      type="text"
                      name="content"
                      className="w-full p-3 border border-gray-900 rounded-md
            focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={editingNote.content}
                      onChange={handleChange}
                      required
                      placeholder="Enter content........"
                    />
                    <div className="flex gap-3">
                      <button
                        onClick={() => updateNote(note._id)}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-900 hover:disabled:opacity-50"
                        disabled={loading}
                      >
                        {loading ? "Saving...." : "Save"}
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                // ! View Mode
                <>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-black font-semibold">{note.title}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(note)}
                        className="text-blue-500 cursor-pointer hover:text-blue-700 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteNote(note._id)}
                        className=" text-red-500 cursor-pointer hover:text-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2">{note.content}</p>
                  <p className="text-sm text-gray-500">
                    Created: {new Date(note.createdAt).toLocaleDateString()}
                  </p>
                  {note.updatedAt !== note.createdAt && (
                    <p className="text-sm text-gray-500">
                      Updated: {new Date(note.updatedAt).toLocaleDateString()}
                    </p>
                  )}
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
