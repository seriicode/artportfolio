/**
 * All copy and artwork live here.
 * Drop your own files into /public/art and set src to "/art/file.jpg".
 * Remote photos are stand-ins so the layout can be reviewed before real work is added.
 */

export type Piece = {
  id: string;
  src: string;
  alt: string;
  title: string;
  medium: string;
  year: string;
  tone: string;
};

export type Experience = {
  place: string;
  role: string;
  text: string;
};

export type Stat = {
  value: string;
  label: string;
};

const img = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const wash = (from: string, to: string) => `linear-gradient(150deg, ${from}, ${to})`;

function piece(
  id: string,
  photo: string,
  title: string,
  medium: string,
  year: string,
  from: string,
  to: string,
  w = 1400,
): Piece {
  return {
    id,
    src: img(photo, w),
    alt: `${title}, ${medium}, ${year}`,
    title,
    medium,
    year,
    tone: wash(from, to),
  };
}

export const artist = {
  name: "Jennet.K",
  first: "Jennet",
  last: "K",
  year: "2026",
  email: "hello@milaorlova.art",
  phone: "+1 415 555 0198",
  site: "milaorlova.art",
  intro:
    "Oil paintings about memory, skin and light. A canvas starts as a quiet sketch and ends louder than I planned.",
};

export const hero = {
  main: piece(
    "after-the-rain",
    "photo-1541961017774-22349e4a1262",
    "After the Rain",
    "Acrylic on canvas",
    "2025",
    "#e39a62",
    "#6d2c34",
    1600,
  ),
  detail: piece(
    "warm-ground",
    "photo-1605721911519-3dfeb3be25e7",
    "Warm Ground",
    "Oil on linen",
    "2024",
    "#e8b07a",
    "#c45a6a",
    800,
  ),
};

export const oils = {
  text: "Large canvases from the studio. Layered pigment, scraped edges, and the slow heat of oil.",
  items: [
    piece("red-room", "photo-1547826039-bfc35e0f1ea8", "Red Room", "Oil on linen", "2025", "#e07a3d", "#7a2418"),
    piece("blue-water", "photo-1515405295579-ba7b45403062", "Blue Water", "Oil on canvas", "2024", "#7ea0c4", "#1a3048"),
    piece("the-window", "photo-1561214115-f2f134cc4912", "The Window, March", "Oil on canvas", "2025", "#e0b04a", "#2a241c"),
    piece("copper-light", "photo-1536924940846-227afb31e2a5", "Copper Light", "Oil on linen", "2023", "#e07040", "#1a2848"),
    piece("june-flowers", "photo-1579783900882-c0d3dad7b119", "June Flowers", "Oil on canvas", "2024", "#d46a78", "#2a1814"),
  ],
};

export const abstracts = {
  text: "Gesture, stain and the tools that make them. Pigment, brushes, and the mark left after the hand leaves.",
  items: [
    piece("field-note", "photo-1460661419201-fd4cecdf8a8b", "Loaded Brushes", "Studio", "2025", "#e85d4c", "#2f6f8f", 1200),
    piece("pigment", "photo-1579965342575-16428a7c8881", "Pigment", "Oil on paper", "2024", "#c4523a", "#e6c49a", 900),
    piece("open-palette", "photo-1459908676235-d5f02a50184b", "Open Palette", "Mixed media", "2023", "#d98a3a", "#4a6a38", 900),
    piece("thick-light", "photo-1605721911519-3dfeb3be25e7", "Thick Light", "Oil on linen", "2025", "#e8b07a", "#c45a6a", 900),
    piece("painted-face", "photo-1547891654-e66ed7ebb968", "Painted Face", "Acrylic on wall", "2022", "#e8c4a8", "#2a6a78", 1200),
  ],
};

export const selected: Piece[] = [
  piece("north-edge", "photo-1470071459604-3b5ec3a7fe05", "North Edge", "Oil on canvas", "2023", "#8a9aa4", "#1c2428"),
  piece("late-sun", "photo-1469474968028-56623f02e42e", "Late Sun", "Oil on linen", "2024", "#e0a060", "#3a4a28"),
  piece("still-water", "photo-1501785888041-af3ef285b470", "Still Water", "Oil on canvas", "2022", "#7aa0b8", "#1a2830"),
  piece("green-field", "photo-1472214103451-9374bd1c798e", "Green Field", "Acrylic on canvas", "2023", "#8aaa58", "#2a3a20"),
  piece("after-storm", "photo-1433086966358-54859d0ed716", "After the Storm", "Oil on linen", "2021", "#6a8a98", "#1a2428"),
  piece("high-pass", "photo-1506905925346-21bda4d32df4", "High Pass", "Oil on canvas", "2024", "#d8d4dc", "#2a3444"),
  piece("market-day", "photo-1577720643272-265f09367456", "Market Day", "Oil on canvas", "2022", "#c45a48", "#3a3428"),
  piece("alpine-note", "photo-1582201943021-e8e5cb6dedc2", "Alpine Note", "Watercolour", "2020", "#e4e0d4", "#8a9080"),
];

export const portraits = {
  text: "Faces from long sittings. Warm skin against a cold ground, one person at a time, until presence feels physical.",
  items: [
    piece("mara", "photo-1531746020798-e6953c6e8e04", "Mara, Seated", "Oil on linen", "2025", "#c48a72", "#2a1614", 1000),
    piece("yellow-hour", "photo-1534528741775-53994a69daeb", "Yellow Hour", "Oil on canvas", "2024", "#e0b45a", "#3a2a22", 1000),
    piece("anna", "photo-1544005313-94ddf0286df2", "Anna in Grey", "Oil on linen", "2023", "#c8b8ae", "#2a2422", 1000),
  ],
};

export const awards: Piece[] = [
  piece("prize-emerging", "photo-1582201943021-e8e5cb6dedc2", "Best Emerging Painter", "Contemporary Art Prize", "2025", "#d8d4c8", "#6a6848"),
  piece("prize-choice", "photo-1577720643272-265f09367456", "Public Choice", "City Art Biennale", "2024", "#6a4030", "#1a1810"),
  piece("prize-gold", "photo-1506905925346-21bda4d32df4", "Gold Award", "Oil Painting Society", "2024", "#d0d4dc", "#2a3448"),
  piece("prize-finalist", "photo-1470071459604-3b5ec3a7fe05", "Top 10 Finalist", "Landscape Open", "2023", "#8aa0a8", "#1c2830"),
];

export const experiences: Experience[] = [
  {
    place: "Atelier Lumen",
    role: "Resident painter",
    text: "A season in a shared studio, ending with an open weekend of new portraits.",
  },
  {
    place: "Gallery Nord",
    role: "Solo exhibition",
    text: "Twenty-four canvases over three weeks, plus a live painting evening.",
  },
  {
    place: "Studio Kolor",
    role: "Commissioned work",
    text: "Murals and private paintings for homes, small hotels and quiet rooms.",
  },
];

export const landscape = {
  text: "Weather, fields and the edge of the city. Started outside and finished when the light was gone.",
  image: piece(
    "north-of-the-city",
    "photo-1578301978018-3005759f48f7",
    "North of the City",
    "Oil on canvas",
    "2024",
    "#c8b898",
    "#6a8090",
    1800,
  ),
};

export const stats: Stat[] = [
  { value: "120+", label: "Works" },
  { value: "25", label: "Exhibitions" },
  { value: "10+", label: "Years" },
  { value: "80+", label: "Collectors" },
];

export const about = {
  text: "I paint between the figure and the field. The work is slow and physical: paint put down, scraped back, and built again until the picture feels honest.",
  image: piece(
    "in-the-studio",
    "photo-1513364776144-60967b0f800f",
    "In the Studio",
    "Studio",
    "2026",
    "#f2efe8",
    "#e07030",
    1200,
  ),
};

export const slides: Piece[] = [
  hero.main,
  oils.items[0],
  oils.items[4],
  landscape.image,
  portraits.items[0],
];

const seen = new Set<string>();
export const gallery: Piece[] = [
  ...oils.items,
  ...portraits.items,
  landscape.image,
  ...selected,
  abstracts.items[3],
  abstracts.items[4],
].filter((item) => {
  if (seen.has(item.id)) return false;
  seen.add(item.id);
  return true;
});
