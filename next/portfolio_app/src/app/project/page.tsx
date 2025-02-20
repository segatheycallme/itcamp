import path from "path";
import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";

async function getPosts() {
  const contentDir = path.join(process.cwd(), "public/content/project");
  return fs.readdirSync(contentDir).map((filename) => {
    const file = fs.readFileSync(contentDir + "/" + filename, "utf8");
    const { data } = matter(file);
    return { data, filename };
  });
}

export default async function Projects() {
  const posts = await getPosts();
  console.log(posts)
  return (
    <div className="flex gap-8">
      {posts.map((val, i) =>
        <Link key={i} href={"/project/" + val.filename.substring(0, val.filename.length - 3)}>
          <div className="bg-gray-100 rounded-lg shadow-lg p-8">
            <p className="text-xl">{val.data.title}</p>
            <p className="text-gray-600"> {val.data.date}</p>
          </div>
        </Link>
      )}
    </div>
  )
}
