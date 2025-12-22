const Testimonials = () => {
  const quotes = [
    {
      name: "Jack",
      text: "The only soap that feels truly indulgent—soft, creamy lather and a scent that lingers subtly.",
    },
    {
      name: "Marcus",
      text: "Minimal packaging, maximal experience. My skin feels balanced and calm.",
    },
    {
      name: "Winnie",
      text: "Quiet luxury in a bar. It transformed my morning routine.",
    },
  ];

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="section scroll-mt-16 md:scroll-mt-20 bg-secondary/50 border-y">
      <div className="container mx-auto px-6">
        <h2 id="testimonials-title" className="heading-md">Kind Words</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {quotes.map((q) => (
            <figure key={q.name} className="card-lux">
              <blockquote className="text-sm text-muted-foreground">“{q.text}”</blockquote>
              <figcaption className="mt-4 font-medium">— {q.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
