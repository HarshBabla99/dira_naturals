const SectionAbout = () => {
  return (
    <section id="about" aria-labelledby="about-title" className="section scroll-mt-16 md:scroll-mt-20">
      <div className="container mx-auto px-6 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-6">
          <h2 id="about-title" className="heading-md">Artisanal. Sustainable. Pure.</h2>
          <p className="mt-4 body-lg">
            Dira Naturals crafts small-batch soaps using cold-process methods, botanical oils,
            and mineral-rich clays. Our formulas are free from synthetic dyes and harsh sulfates,
            designed to nourish skin and calm the senses.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            <li>• Ethically sourced, plant-based ingredients</li>
            <li>• Recyclable, minimal packaging</li>
            <li>• No parabens, no phthalates, no silicones</li>
          </ul>
        </div>
        <div className="md:col-span-6">
          <div className="card-lux animate-enter">
            <p className="text-sm text-muted-foreground">
              “We believe in quiet luxury—considered materials, elevated textures, and thoughtful details.
              Each bar is cured for weeks to achieve a gentle, creamy lather.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionAbout;
