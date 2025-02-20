import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";

// Load a blog post dynamically
const getPost = (slug: string) => {
  const filePath = path.join(process.cwd(), "public/content", `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContents);
  return { data, content };
};

// Next.js automatically calls this function to generate static pages
export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), "public/content");
  const filenames = fs.readdirSync(contentDir);

  return filenames.map((filename) => ({
    slug: filename.replace(".md", ""),
  }));
}

// Blog Post Page
export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) return notFound();

  return (
    <article className="prose mx-auto dark:prose-invert">
      <h1>{post.data.title}</h1>
      <p className="text-gray-500">{post.data.date}</p>
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </article>
  );
}
