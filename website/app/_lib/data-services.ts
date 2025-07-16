import { supabase } from "./supabase";

export async function getProducts({
  page = 1,
  pageSize = 5,
  search = "",
  category = "all",
} = {}) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase.from("products").select("*", { count: "exact" });

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  if (category !== "all") {
    query = query.eq("category", category);
  }

  const { data, count, error } = await query.range(from, to);

  if (error) {
    console.error("خطا در دریافت داده ها:", error.message);
    return { data: [], count: 0 };
  }

  return { data, count: count || 0 };
}

export async function getCategories() {
  const { data, error } = await supabase
    .from("products")
    .select("category", { distinct: true });

  if (error) {
    console.error(" خطا در دریافت داده ها:", error.message);
    return [];
  }

  const uniqueCategories = Array.from(
    new Set(data.map((item) => item.category).filter(Boolean))
  );
  return uniqueCategories;
}

export async function getCustomers({
  page = 1,
  pageSize = 5,
  search = "",
} = {}) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase.from("customers").select("*", { count: "exact" });

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  const { data, count, error } = await query.range(from, to);

  if (error) {
    console.error("خطا در دریافت داده ها:", error.message);
    return { data: [], count: 0 };
  }

  return { data, count: count || 0 };
}
