"use client";

export function CategoryHero() {
  return (
    <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-mitologi-navy overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-mitologi-gold/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-mitologi-navy-light/40 blur-[80px] rounded-full pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-x-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-6 backdrop-blur-md shadow-sm">
          <span className="text-xs font-bold font-sans tracking-widest text-mitologi-gold uppercase">
            Koleksi Kami
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-extrabold text-white tracking-tight mb-6 drop-shadow-sm">
          Kategori Produk
        </h1>
        <p className="text-lg md:text-xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
          Temukan koleksi pilihan dengan material premium dan desain eksklusif
          yang dirancang khusus untuk Anda.
        </p>
      </div>
    </section>
  );
}
