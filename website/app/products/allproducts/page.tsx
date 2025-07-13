import { getProducts } from "@/app/_lib/data-services";
import ProductsTable from "./ProductsTable";

export default async function Page() {
  const products = await getProducts();
  return <ProductsTable products={products} />;
}
