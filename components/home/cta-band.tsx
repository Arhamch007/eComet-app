import { MessageCircle } from "lucide-react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";

export function CtaBand({
  title = "Tell us what is eating your team's time",
  text = "A 20-minute call is enough to say whether we can help and what it would cost.",
}: {
  title?: string;
  text?: string;
}) {
  const wa = site.whatsapp ? `https://wa.me/${site.whatsapp.replace(/[^\d]/g, "")}` : null;
  return (
    <div className="py-6 md:py-10">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-6 rounded-feature border border-border-1 bg-surface-2 p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <h2 className="font-display text-2xl font-semibold text-text-1 md:text-3xl">{title}</h2>
              <p className="mt-2 max-w-xl text-[15px] text-text-2">{text}</p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Button href={site.cta.href}>{site.cta.label}</Button>
              {wa ? (
                <Button href={wa} variant="secondary" target="_blank" rel="noreferrer">
                  <MessageCircle className="size-4" aria-hidden /> WhatsApp
                </Button>
              ) : (
                <Button href={`mailto:${site.email}`} variant="secondary">
                  Email us
                </Button>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
