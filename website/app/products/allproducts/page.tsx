import { getCategories } from "@/app/_lib/data-services";
import ProductsTable from "./ProductsTable";

export default async function Page() {
  const categories = await getCategories();
  return <ProductsTable categories={categories} />;
}
