import roseImg from "@/assets/product-rose-geranium.jpg";
import citrusImg from "@/assets/product-citrus-basil.jpg";
import lavenderImg from "@/assets/product-lavender-oat.jpg";
import charcoalImg from "@/assets/product-charcoal-detox.jpg";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  alt: string;
  collection?: "signature" | "seasonal";
  stock?: number; // undefined = unlimited, 0 = out of stock
  stockLabel?: string; // e.g., "Out of stock", "Only 3 left"
};

export const products: Product[] = [
  // Signature Collection
  {
    id: "rose-geranium",
    name: "Rose Geranium Bar",
    description: "Silken lather with uplifting rose geranium and gentle clays.",
    price: 18,
    image: roseImg,
    alt: "Rose Geranium handmade soap bar on warm neutral backdrop",
    collection: "signature",
  },
  {
    id: "citrus-basil",
    name: "Citrus Basil Bar",
    description: "Bright citrus oils balanced with herbaceous basil for a clean finish.",
    price: 16,
    image: citrusImg,
    alt: "Citrus Basil handmade soap bar with zest flecks and basil leaf",
    collection: "signature",
  },
  {
    id: "lavender-oat",
    name: "Lavender Oat Bar",
    description: "Soothing lavender with oat for a calm, creamy cleanse.",
    price: 16,
    image: lavenderImg,
    alt: "Lavender Oat handmade soap bar with oat speckles and lavender sprigs",
    collection: "signature",
  },
  {
    id: "charcoal-detox",
    name: "Charcoal Detox Bar",
    description: "Purifying activated charcoal with a crisp, spa-like aroma.",
    price: 17,
    image: charcoalImg,
    alt: "Charcoal Detox handmade soap bar with minimal label",
    collection: "signature",
  },
  // Seasonal Collection
  {
    id: "winter-pine",
    name: "Winter Pine Bar",
    description: "Fresh pine and eucalyptus for a crisp, invigorating cleanse.",
    price: 19,
    image: charcoalImg,
    alt: "Winter Pine handmade soap bar with forest green tones",
    collection: "seasonal",
    stock: 3,
    stockLabel: "Only 3 left",
  },
  {
    id: "honey-oat",
    name: "Honey & Oat Bar",
    description: "Nourishing honey blended with creamy oats for sensitive skin.",
    price: 18,
    image: lavenderImg,
    alt: "Honey Oat handmade soap bar with golden hues",
    collection: "seasonal",
    stock: 0,
    stockLabel: "Out of stock",
  },
  {
    id: "spiced-orange",
    name: "Spiced Orange Bar",
    description: "Warm cinnamon and sweet orange for cozy winter mornings.",
    price: 17,
    image: citrusImg,
    alt: "Spiced Orange handmade soap bar with orange zest",
    collection: "seasonal",
  },
];
