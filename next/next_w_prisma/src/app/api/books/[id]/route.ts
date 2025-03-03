import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { bookSchema, paramsSchema } from "@/lib/validations/book";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const result = paramsSchema.safeParse(params);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors }, { status: 400 });
    }

    const book = await prisma.book.findUnique({
      where: { id: result.data.id },
    });

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json(book);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch book" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const paramResult = paramsSchema.safeParse(params);
    if (!paramResult.success) {
      return NextResponse.json(
        { error: paramResult.error.errors },
        { status: 400 },
      );
    }

    const body = await request.json();
    const bodyResult = bookSchema.safeParse(body);
    if (!bodyResult.success) {
      return NextResponse.json(
        { error: bodyResult.error.errors },
        { status: 400 },
      );
    }

    const book = await prisma.course.update({
      where: { id: paramResult.data.id },
      data: bodyResult.data,
    });

    return NextResponse.json(book);
  } catch {
    return NextResponse.json(
      { error: "Failed to update book" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const result = paramsSchema.safeParse(params);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors }, { status: 400 });
    }

    await prisma.book.delete({
      where: { id: result.data.id },
    });

    return NextResponse.json({ message: "Book deleted successfully" });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete book" },
      { status: 500 },
    );
  }
}
