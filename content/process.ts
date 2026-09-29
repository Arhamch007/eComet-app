import { Search, Map, Blocks, LifeBuoy, type LucideIcon } from "lucide-react";

export type Step = { n: string; title: string; text: string; icon: LucideIcon };

export const process: Step[] = [
  {
    n: "01",
    title: "Discover",
    text: "A short call to understand the goal, the tools you use and what a good outcome looks like.",
    icon: Search,
  },
  {
    n: "02",
    title: "Map",
    text: "We document the current process, agree the scope and give you a fixed quote and timeline.",
    icon: Map,
  },
  {
    n: "03",
    title: "Build and integrate",
    text: "Weekly check-ins while we build, connect and test with your real data and your team.",
    icon: Blocks,
  },
  {
    n: "04",
    title: "Support and improve",
    text: "Hand-over, documentation and an optional care plan so nothing stalls after launch.",
    icon: LifeBuoy,
  },
];
