"use client";

import { useSearchParams } from "next/navigation";
import { services } from "@/content/services";
import { ContactForm } from "@/components/site/contact-form";

/* Pre-selects the service chip when arriving from /contact?service=<slug>. */
export function ContactFormFromQuery() {
  const slug = useSearchParams().get("service");
  const match = services.find((s) => s.slug === slug);
  return <ContactForm bare key={match?.slug ?? "none"} defaultServices={match ? [match.name] : []} />;
}
