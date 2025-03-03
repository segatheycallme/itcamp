import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { bookSchema } from "@/lib/validations/book";

const prisma = new PrismaClient();

// GET http://localhost:3000/api/books
export async function GET() {
  try {
    const books = await prisma.book.findMany();
    return NextResponse.json(books);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = bookSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.errors }, { status: 400 });
    }

    const book = await prisma.book.create({
      data: result.data,
    });

    return NextResponse.json(book, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 },
    );
  }
}
