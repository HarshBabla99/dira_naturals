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
};

export const products: Product[] = [
  {
    id: "rose-geranium",
    name: "Rose Geranium Bar",
    description: "Silken lather with uplifting rose geranium and gentle clays.",
    price: 18,
    image: roseImg,
    alt: "Rose Geranium handmade soap bar on warm neutral backdrop",
  },
  {
    id: "citrus-basil",
    name: "Citrus Basil Bar",
    description: "Bright citrus oils balanced with herbaceous basil for a clean finish.",
    price: 16,
    image: citrusImg,
    alt: "Citrus Basil handmade soap bar with zest flecks and basil leaf",
  },
  {
    id: "lavender-oat",
    name: "Lavender Oat Bar",
    description: "Soothing lavender with oat for a calm, creamy cleanse.",
    price: 16,
    image: lavenderImg,
    alt: "Lavender Oat handmade soap bar with oat speckles and lavender sprigs",
  },
  {
    id: "charcoal-detox",
    name: "Charcoal Detox Bar",
    description: "Purifying activated charcoal with a crisp, spa-like aroma.",
    price: 17,
    image: charcoalImg,
    alt: "Charcoal Detox handmade soap bar with minimal label",
  },
];
