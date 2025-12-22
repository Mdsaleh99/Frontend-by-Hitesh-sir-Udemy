import connectToDatabase from "@/lib/db";
import NoteModel from "@/models/Note";
import { NextRequest, NextResponse } from "next/server";

export interface INote {
  title: string;
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const { title, content }: INote = await request.json();
    if (!title || !content) {
      throw new Error("Title and content are required");
    }
    const note = await NoteModel.create({
      title,
      content,
    });

    return NextResponse.json(
      {
        success: true,
        data: note,
      },
      { status: 201, statusText: "Created" }
    );
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const note = await NoteModel.find({});

    return NextResponse.json(
      {
        success: true,
        data: note,
      },
      { status: 201, statusText: "Fetch all notes" }
    );
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
}
