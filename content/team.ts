/* Team data carried over from the previously disabled TeamTwo component.
   Confirm names, roles, photos and consent before launch (audit Open Question 6). */

export type Member = {
  name: string;
  role: string;
  group: "Leadership" | "Engineering" | "Growth" | "Operations";
  image: string;
  linkedin?: string;
};

export const team: Member[] = [
  { name: "Usama Iqbal", role: "CEO & Founder", group: "Leadership", image: "/images/team/usama.png" },
  { name: "Farooq Ashraf", role: "CTO & Co-Founder", group: "Leadership", image: "/images/team/farooq.png" },
  { name: "Arham Mahmood", role: "Full Stack Developer", group: "Engineering", image: "/images/team/arham2.png" },
  { name: "Abouzar Ijaz", role: "MERN Stack Developer", group: "Engineering", image: "/images/team/abouzar.png" },
  { name: "Bilal Raza", role: "Senior Business Developer", group: "Growth", image: "/images/team/bilal.png" },
  { name: "Ali Abdullah", role: "Sales Executive", group: "Growth", image: "/images/team/ali.png" },
  { name: "Zain Fayyaz", role: "Senior Administrative Assistant", group: "Operations", image: "/images/team/zain.png" },
  { name: "Hammad Ahmad", role: "Executive Administrative Assistant", group: "Operations", image: "/images/team/hammad.png" },
  { name: "Abdullah Haroon", role: "Junior Administrative Assistant", group: "Operations", image: "/images/team/abdullah.png" },
];

export const teamGroups: Member["group"][] = ["Leadership", "Engineering", "Growth", "Operations"];
