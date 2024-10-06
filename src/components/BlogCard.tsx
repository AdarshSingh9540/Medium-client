import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string; // Now, this can be populated from the author object in the blog
  title: string;
  content: string;
  publishedDate: string; // This should be passed when rendering the BlogCard
  id: number;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="cursor-pointer mx-4">
        <div className="flex items-center">
          <Avatar name={authorName} />
          <span className="ml-2 font-medium">{authorName || "Unknown Author"}</span>
          <span className="text-slate-400 text-sm ml-auto">{publishedDate}</span>
        </div>
        <div className="font-bold mt-2">{title}</div>
        <div className="mt-2">{content.slice(0, 100) + "..."}</div>
        <div className="text-slate-400 text-sm mt-2">{`${Math.ceil(content.length / 100)} minute(s) read`}</div>
        <div className="bg-slate-200 h-1 w-full mt-2"></div>
      </div>
    </Link>
  );
};

export function Avatar({ name }: { name: string }) {
  const initials = name ? name.charAt(0).toUpperCase() : '?';

  return (
    <div className="relative inline-flex items-center justify-center w-7 h-7 overflow-hidden bg-gray-400 rounded-full dark:bg-gray-600">
      <span className="font-medium text-sm text-gray-600 dark:text-gray-300">
        {initials}
      </span>
    </div>
  );
}
