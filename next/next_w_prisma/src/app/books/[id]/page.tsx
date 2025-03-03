import Link from "next/link";
import { notFound } from "next/navigation";
import { DeleteDialog } from "../components/DeleteDialog";

async function getBook(id: string) {
  if (isNaN(Number(id))) {
    notFound();
  }

  const res = await fetch(`http://localhost:3000/api/books/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("Failed to fetch book");
  }

  return res.json();
}

export default async function BookPage({ params }: { params: { id: string } }) {
  const book = await getBook(params.id);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <Link href="/books" className="text-blue-500 hover:text-blue-700">
          ← Back to Books
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href={`/books/${book.id}/edit`}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit Book
          </Link>
          <DeleteDialog bookId={book.id} bookTitle={book.title} />
        </div>
      </div>

      <div className="max-w-2xl mx-auto bg-[#222] rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-200">{book.title}</h1>
        <h3 className="text-lg font-normal text-gray-400 mb-4">
          By: {book.author}
        </h3>
      </div>
    </div>
  );
}

