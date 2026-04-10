"use client";

export function ProdukHero() {
  return (
    <section className="relative h-[40vh] min-h-[320px] max-h-[420px] flex items-center justify-center bg-mitologi-navy overflow-hidden border-b border-slate-200/20">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-mitologi-gold/20 rounded-full blur-[100px] -translate-y-1/2 -z-0" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-mitologi-navy-light/50 rounded-full blur-[100px] translate-y-1/2 -z-0" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-white tracking-tight mb-6 drop-shadow-sm">
            Katalog Produk
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-sans font-medium max-w-2xl mx-auto drop-shadow-sm">
            Jelajahi berbagai pilihan produk konveksi berkualitas tinggi untuk
            kebutuhan Anda.
          </p>
        </div>
      </div>
    </section>
  );
}
