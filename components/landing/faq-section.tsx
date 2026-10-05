import { site } from "@/content/site";
import { LandingContainer, LandingSection } from "@/components/landing/ui";

/* FAQ, before Contact. Each question is a heading and each answer is a
   short, self-contained paragraph that still makes sense when quoted on its
   own, which is what search and AI answers pick up. All answers stay
   visible (no accordion) so nothing important sits behind a click.
   Every fact here is already stated elsewhere on the page (services, the
   four process steps, the contact panel); nothing new is claimed. */

const faqs = [
  {
    q: "What does eComet do?",
    a: "eComet is a digital services team working with businesses in the USA, Canada and Europe. We cover four areas: web solutions (websites and web applications), AI automation (workflows and integrations with tools such as Zapier, Make and n8n), growth marketing (email marketing, campaigns and Meta ads) and digital support (day-to-day digital tasks and virtual assistance). One team handles the work that would otherwise need several freelancers.",
  },
  {
    q: "How does a project with eComet start?",
    a: "It starts with a short call to understand your goal, the tools you use and what a good outcome looks like. We then document your current process and agree the scope with you before any work begins.",
  },
  {
    q: "How is the price of a project decided?",
    a: "Once the scope is agreed, we give you a fixed quote and a timeline. You see both before the work starts, so the price does not grow as the project goes on.",
  },
  {
    q: "How do you keep clients updated during a project?",
    a: "We hold weekly check-ins while we build. Everything is connected and tested with your real data and with your team, so there are no surprises at hand-over.",
  },
  {
    q: "What happens after launch?",
    a: "Every project ends with a hand-over and documentation. If you want us to keep things running and improving, there is an optional care plan, so nothing stalls after launch.",
  },
  {
    q: "How do I get in touch, and how fast do you reply?",
    a: `Send a short brief through the contact form or email ${site.email}. We reply within one business day, and we can sign an NDA before you share project details. Our office is in ${site.address.city}, ${site.address.country}.`,
  },
];

export function FaqSection() {
  return (
    <LandingSection id="faq" tone="white" labelledBy="faq-heading">
      <LandingContainer className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2
            id="faq-heading"
            className="text-[30px] leading-[1.12] font-bold tracking-[-0.025em] text-balance text-[#141414] md:text-[40px]"
          >
            Questions businesses ask us
          </h2>
          <p className="mt-4 max-w-[360px] text-[16px] leading-[1.6] text-pretty text-[#555555] md:text-[17px]">
            Short answers about what we do and how we work.
          </p>
        </div>

        <dl className="grid gap-x-10 sm:grid-cols-2">
          {faqs.map((f) => (
            <div key={f.q} className="border-t border-[#e7e9ef] py-6">
              <dt>
                <h3 className="text-[17px] leading-[1.35] font-bold tracking-[-0.01em] text-[#141414]">{f.q}</h3>
              </dt>
              <dd className="mt-2.5 text-[15px] leading-[1.65] text-pretty text-[#555555]">{f.a}</dd>
            </div>
          ))}
        </dl>
      </LandingContainer>
    </LandingSection>
  );
}
