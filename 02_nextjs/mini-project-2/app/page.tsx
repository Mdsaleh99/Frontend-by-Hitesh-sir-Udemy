import NotesClient from "@/components/NotesClient";
import connectToDatabase from "@/lib/db";
import NoteModel from "@/models/Note";

async function getNotes() {
  await connectToDatabase()
  const notes = await NoteModel.find({})
    .sort({ createdAt: -1 })
    .lean();

  return notes.map((note) => ({
    _id: note._id.toString(),
    title: note.title,
    content: note.content,
    createdAt: note.createdAt.toISOString(),
    updatedAt: note.updatedAt.toISOString(),
  }));
}

export default async function Home() {
  const notes = await getNotes()
  console.log(notes);


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Notes App</h1>
      <NotesClient initialNotes={notes} />
    </div>
  );
}
