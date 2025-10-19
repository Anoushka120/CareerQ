import Header from "./Header";
import Footer from "./Footer";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen text-foreground">
      <Header />
      <main className="container mx-auto px-4">{children}</main>
      <Footer />
    </div>
  );
}
