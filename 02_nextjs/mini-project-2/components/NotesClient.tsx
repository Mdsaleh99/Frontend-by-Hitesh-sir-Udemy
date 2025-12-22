"use client";

import { INote } from "@/app/api/notes/route";
import React, { useState } from "react";

export default function NotesClient() {
  const [form, setForm] = useState<INote>({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);

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

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if (!form.title && !form.content) return;
        
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/api/notes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form)
            })
            const data = await response.json();
            console.log(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
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
    </div>
  );
}
