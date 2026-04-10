import { redirect } from "next/navigation";

export default async function SearchPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams.q;

  if (query) {
    redirect(`/shop?q=${query}`);
  }

  redirect("/shop");
}
