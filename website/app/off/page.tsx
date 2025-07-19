import { getCategories } from "../_lib/data-services";
import OffForm from "./newoff/OffForm";


export default async function Page() {
  const categories = await getCategories();
  return <OffForm categories={categories} />;
}

