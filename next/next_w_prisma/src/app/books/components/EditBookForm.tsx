"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Book } from "@prisma/client";

const formSchema = z.object({
  title: z.string().min(1, "Book title is required"),
  author: z.string().min(1, "Instructor name is required"),
  description: z.string().optional(),
  duration: z
    .string()
    .min(1, "Duration is required")
    .transform((val) => Number(val))
    .refine((val) => val > 0, "Duration must be a positive number"),
});

// Define the form input type before transformation
type FormInput = {
  title: string;
  author: string;
  description?: string;
  duration: string;
};

export default function EditBookForm({ book }: { book: Book }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: book.title,
      author: book.author,
    },
  });

  const onSubmit = async (data: FormInput) => {
    console.log("jel me neko zvo");
    try {
      const res = await fetch(`/api/books/${book.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to update book");

      router.push(`/books/${book.id}`);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to update book");
    }
  };

  return (
    <div className="p-8">
      <Link
        href={`/books/${book.id}`}
        className="text-blue-500 hover:text-blue-700 mb-4 inline-block"
      >
        ← Back to Book
      </Link>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Edit Book</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Book Title *
            </label>
            <input
              {...register("title")}
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              author *
            </label>
            <input
              {...register("author")}
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
            {errors.author && (
              <p className="mt-1 text-sm text-red-600">
                {errors.author.message}
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 
                ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

