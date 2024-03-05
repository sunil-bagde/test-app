import { redirect } from "next/navigation";
import { PostCard, PostProps } from "@/app/components/Post/Card";
import { getPosts } from "@/app/services/post";

export default async function Home() {
  const { data: posts } = await getPosts();
  if (posts.length == 0)
    return <p className="pt-2 text-center text-white"> No post yet.</p>;
  return posts.map(({ id, title, body }: PostProps) => (
    <PostCard key={id} title={title} body={body} />
  ));
}
