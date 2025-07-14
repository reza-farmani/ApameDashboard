import { getProducts } from "@/app/_lib/data-services";
import ProductsTable from "./ProductsTable";
import { FormData } from '../../(operations)/addproduct/page';

export default async function Page() {
  const products: FormData[] = (await getProducts()) ?? [];
  return <ProductsTable products={products} />;
}
