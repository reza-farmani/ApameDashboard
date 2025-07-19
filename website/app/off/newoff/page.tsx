import { getCategories } from "@/app/_lib/data-services";
import OffForm from "./OffForm";


export default async function Page() {
  const categories = await getCategories();
  return <OffForm categories={categories} />;
}

