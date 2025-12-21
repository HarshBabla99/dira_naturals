import { products } from "@/data/products";

const FeaturedProducts = () => {
  return (
    <section id="featured" aria-labelledby="featured-title" className="section scroll-mt-16 md:scroll-mt-20">
      <div className="container mx-auto px-6">
        <h2 id="featured-title" className="heading-md">Featured Creations</h2>
        <p className="mt-3 body-lg max-w-2xl">A small preview of our favorite bars—scents that linger, textures that soothe.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <article key={p.id} className="card-lux hover-scale">
              <div className="aspect-square overflow-hidden rounded-lg border">
                <img src={p.image} alt={p.alt} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <h3 className="mt-4 font-serif text-lg">{p.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
