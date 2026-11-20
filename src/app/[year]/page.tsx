import { redirect } from "next/navigation";

type Props = { params: Promise<{ year: string }> };

export default async function YearPage({ params }: Props) {
  redirect("/");
}
