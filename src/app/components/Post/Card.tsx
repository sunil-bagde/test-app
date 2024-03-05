import Link from "next/link"; 

export interface PostProps {
  title: string;
  body: string;
  id?: number;
}

export async function PostCard({ title, body } : PostProps) { 

  return (
    <div className=" mx-auto mt-2 block max-w-sm rounded-lg bg-gray-600 p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] shadow-md dark:bg-neutral-700">
      <h5 className="mb-2 text-xl font-medium leading-tight text-white dark:text-neutral-50">
        {title}
      </h5>
      <p className="mb-4 text-base text-gray-200 ">{body}</p>
      <Link href="#post" className="  ml-auto flex justify-end text-gray-200">
        Read more
      </Link>
    </div>
  );
}
