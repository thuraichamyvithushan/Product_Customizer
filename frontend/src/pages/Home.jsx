const Home = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">
          Design your own premium phone cover
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-600">
          Upload your artwork, place it exactly where you want on the cover, and we’ll handle the
          rest. High-quality print, edge-to-edge design, and support for the latest phone models.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="/design"
            className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark"
          >
            Start designing
          </a>
          <a
            href="#how-it-works"
            className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            How it works
          </a>
        </div>
      </section>

      <section id="how-it-works" className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">1. Pick your phone</h2>
          <p className="mt-2 text-xs text-slate-600">
            Choose from models managed in your admin panel – iPhone, Samsung, OnePlus, and more.
          </p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">2. Upload your design</h2>
          <p className="mt-2 text-xs text-slate-600">
            Drag, resize, and rotate your artwork using our live preview designer.
          </p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">3. Place order & pay</h2>
          <p className="mt-2 text-xs text-slate-600">
            Fill in your details, place the order, and get an email when it’s confirmed.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;


