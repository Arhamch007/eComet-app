import { Button } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden py-24 md:py-40">
      <div aria-hidden className="glow-violet pointer-events-none absolute left-1/2 top-0 h-96 w-[700px] -translate-x-1/2" />
      <Container className="relative text-center">
        <Eyebrow className="justify-center">404</Eyebrow>
        <h1 className="font-display mt-4 text-[40px] leading-[1.05] font-semibold text-text-1 md:text-[56px]">
          That page has moved or never existed
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-lg text-text-2">
          Try one of these instead, or tell us what you were looking for.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/">Home</Button>
          <Button href="/services" variant="secondary">Services</Button>
          <Button href="/work" variant="secondary">Work</Button>
          <Button href="/contact" variant="secondary">Contact</Button>
        </div>
      </Container>
    </section>
  );
}
