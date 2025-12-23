import connectToDatabase from "@/lib/db";
import NoteModel from "@/models/Note";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: RouteContext<"/api/notes/[id]">
) {
  try {
    const { id } = await params;
    await connectToDatabase();
    const note = await NoteModel.findByIdAndDelete(id);
    if (!note) {
      return NextResponse.json(
        { success: false, message: "Note not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Note deleted successfully", data: {} },
      { status: 200 }
    );
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
    return NextResponse.json(err.message, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: RouteContext<"/api/notes/[id]">
) {
  try {
    const { id } = await params;
    const body = await request.json();
    await connectToDatabase();
    const note = await NoteModel.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!note) {
      return NextResponse.json(
        { success: false, message: "Note not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Note Updated successfully", data: note },
      { status: 200 }
    );
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
    return NextResponse.json(err.message, { status: 500 });
  }
}
