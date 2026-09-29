import * as React from "react";
import {
  siShopify,
  siMeta,
  siInstagram,
  siZapier,
  siMake,
  siN8n,
  siWordpress,
  siWoocommerce,
  siHubspot,
  siMailchimp,
  siGoogleanalytics,
  siNotion,
  siAirtable,
  siStripe,
  type SimpleIcon,
} from "simple-icons";
import { Sparkles } from "lucide-react";

/* Brand marks from Simple Icons (CC0; each mark remains its owner's trademark
   and is shown only to name the platforms eComet works in). Klaviyo, OpenAI,
   Slack and GoHighLevel are not in Simple Icons; AI work is represented by a
   generic sparkle tile instead. */

export type ToolIcon = {
  id: string;
  label: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

function fromSimpleIcon(icon: SimpleIcon): React.FC<React.SVGProps<SVGSVGElement>> {
  const Comp = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" role="img" aria-label={icon.title} {...props}>
      <path d={icon.path} fill={`#${icon.hex}`} />
    </svg>
  );
  Comp.displayName = `Logo(${icon.title})`;
  return Comp;
}

const AiSpark: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Sparkles aria-label="AI automation" color="#7c3aed" strokeWidth={2} {...(props as object)} />
);

export const heroTools: ToolIcon[] = [
  { id: "shopify", label: "Shopify", Icon: fromSimpleIcon(siShopify) },
  { id: "meta", label: "Meta", Icon: fromSimpleIcon(siMeta) },
  { id: "zapier", label: "Zapier", Icon: fromSimpleIcon(siZapier) },
  { id: "n8n", label: "n8n", Icon: fromSimpleIcon(siN8n) },
  { id: "make", label: "Make", Icon: fromSimpleIcon(siMake) },
  { id: "wordpress", label: "WordPress", Icon: fromSimpleIcon(siWordpress) },
  { id: "ai", label: "AI automation", Icon: AiSpark },
  { id: "hubspot", label: "HubSpot", Icon: fromSimpleIcon(siHubspot) },
  { id: "mailchimp", label: "Mailchimp", Icon: fromSimpleIcon(siMailchimp) },
  { id: "stripe", label: "Stripe", Icon: fromSimpleIcon(siStripe) },
  { id: "analytics", label: "Google Analytics", Icon: fromSimpleIcon(siGoogleanalytics) },
  { id: "instagram", label: "Instagram", Icon: fromSimpleIcon(siInstagram) },
  { id: "woocommerce", label: "WooCommerce", Icon: fromSimpleIcon(siWoocommerce) },
  { id: "notion", label: "Notion", Icon: fromSimpleIcon(siNotion) },
  { id: "airtable", label: "Airtable", Icon: fromSimpleIcon(siAirtable) },
];
