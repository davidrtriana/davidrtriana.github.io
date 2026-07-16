export interface SocialLink {
  label: string;
  href: string;
}

// Shared between the Links and Contact sections so a real URL only needs
// updating in one place.
export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/davidrtriana" },
  { label: "LinkedIn (placeholder, add URL)", href: "#" },
  { label: "itch.io (placeholder, add URL)", href: "#" },
];
