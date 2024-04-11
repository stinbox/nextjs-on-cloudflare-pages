import { notFound } from "next/navigation";
import { FC } from "react";

export const runtime = "edge";

export const generateStaticParams = () => {
  return [{ name: "vercel" }, { name: "y-hiraoka" }];
};

const Page: FC<{
  params: { name: string };
}> = async ({ params }) => {
  const userResponse = await fetch(
    `https://api.github.com/users/${params.name}`
  );

  if (userResponse.status === 404) {
    return notFound();
  }

  const user = await userResponse.json();

  return <pre>{JSON.stringify(user, null, 2)}</pre>;
};

export default Page;
