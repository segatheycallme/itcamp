import { notFound } from "next/navigation";
import EditBookForm from "../../components/EditBookForm";
import { paramsSchema } from "@/lib/validations/book";

async function getBook(id: string) {
  // Validate ID before fetching
  const result = paramsSchema.safeParse({ id });
  if (!result.success) {
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

export default async function EditBookPage({
  params,
}: {
  params: { id: string };
}) {
  const book = await getBook(params.id);
  return <EditBookForm book={book} />;
}

