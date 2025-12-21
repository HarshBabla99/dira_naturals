import BrandHeader from "@/components/BrandHeader";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";

const Shop = () => {
  const { add, openCart } = useCart();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BrandHeader />
      <main className="section">
        <div className="container mx-auto px-6">
          <header className="mb-8">
            <h1 className="heading-md">The Collection</h1>
            <p className="mt-2 body-lg max-w-2xl">Elevated bars crafted for balance, clarity, and quiet luxury.</p>
          </header>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <article key={p.id} className="card-lux hover-scale">
                <div className="aspect-square overflow-hidden rounded-lg border">
                  <img src={p.image} alt={p.alt} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-serif text-lg leading-tight">{p.name}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
                  </div>
                  <span className="shrink-0 font-medium">${p.price.toFixed(2)}</span>
                </div>
                <div className="mt-4 flex gap-3">
                  <button className="btn flex-1" onClick={() => { add(p); openCart(); }}>Add to Cart</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
