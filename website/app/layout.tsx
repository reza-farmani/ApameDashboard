import Header from "./_components/Header";
import "@/app/_styles/globals.css";
import { Lalezar } from "next/font/google";
import SideNav from "./_components/SideNav";
import Breadcrumbs from "./_components/Breadcrumbs";
import BreadcrumbInitializer from "./_components/BreadcrumbInitializer";
import { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

const font = Lalezar({
  subsets: ["arabic"],
  display: "swap",
  weight: "400",
});

export const metadata = {
  title: {
    template: "%s/ آپامه",
    default: "آپامه",
  },
  description: "",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fa">
      <body dir="rtl" className={font.className}>
        <div className="grid h-screen grid-cols-[20rem_1fr] grid-rows-[auto_1fr]">
          <Header />
          <SideNav />
          <main className="bg-gray-200 p-4 pb-16 md:p-8 md:pb-24">
            <BreadcrumbInitializer />
            <Breadcrumbs />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
