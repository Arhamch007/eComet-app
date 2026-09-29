import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";

/* Inner pages keep the previous header and footer until they move to the new
   design; the home page (app/page.tsx) carries its own floating navigation. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
