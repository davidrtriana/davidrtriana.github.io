export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  title: string;
  hook: string;
  designBreakdown: {
    mechanic: string;
    system: string;
    whatIdChange: string;
  };
  links: ProjectLink[];
  /** itch.io (or similar) embed URL. Wired up in Phase 4. */
  demoEmbedUrl?: string;
}

// Placeholder entries, shaped like the real thing. Replace before launch.
export const projects: Project[] = [
  {
    id: "placeholder-1",
    title: "Placeholder: Roguelike Economy Sim",
    hook: "A prototype testing whether scarcity forces better trades than abundance.",
    designBreakdown: {
      mechanic: "Resources decay on a timer, so hoarding has a real cost.",
      system:
        "A supply-and-demand pricing engine that reacts to aggregate player trades.",
      whatIdChange:
        "Add a server-authoritative trade ledger so one bad actor can't inflate the whole economy.",
    },
    links: [
      { label: "Play on itch.io (placeholder)", href: "#" },
      { label: "Source (placeholder)", href: "#" },
    ],
  },
  {
    id: "placeholder-2",
    title: "Placeholder: Tower Defense Balance Pass",
    hook: "Rebalancing enemy scaling using playtest telemetry instead of gut feel.",
    designBreakdown: {
      mechanic:
        "Enemy health and speed scale off a curve tuned from real run data, not a flat multiplier.",
      system:
        "A telemetry pipeline logging wave-by-wave player damage output and death causes.",
      whatIdChange:
        "Surface the tuning curve in a debug overlay so playtesters can see why a wave feels unfair.",
    },
    links: [
      { label: "Play on itch.io (placeholder)", href: "#" },
      { label: "Source (placeholder)", href: "#" },
    ],
  },
  {
    id: "placeholder-3",
    title: "Placeholder: Co-op Puzzle Mechanic",
    hook: "A two-player mechanic where neither player can see the full puzzle alone.",
    designBreakdown: {
      mechanic:
        "Each player sees half the board state; solving requires describing it to the other.",
      system:
        "A shared-state sync layer that deliberately withholds information per client.",
      whatIdChange:
        "Add a voice-optional mode with structured prompts, for players who can't talk while playing.",
    },
    links: [
      { label: "Play on itch.io (placeholder)", href: "#" },
      { label: "Source (placeholder)", href: "#" },
    ],
  },
];
