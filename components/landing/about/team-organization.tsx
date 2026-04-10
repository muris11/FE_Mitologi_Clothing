"use client";

import Image from "next/image";

const TeamCard = ({
  name,
  role,
  image,
  isLeader = false,
}: {
  name: string;
  role: string;
  image: string;
  isLeader?: boolean;
}) => (
  <div
    className={`flex flex-col items-center text-center group ${isLeader ? "z-10" : ""}`}
  >
    <div
      className={`relative overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-soft transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-hover mb-6 ${isLeader ? "w-48 h-64 md:w-56 md:h-72 ring-4 ring-mitologi-navy/5 ring-offset-4" : "w-40 h-52 md:w-48 md:h-64"}`}
    >
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        sizes="(max-width: 768px) 160px, 200px"
      />
    </div>
    <h3
      className={`font-sans font-bold text-mitologi-navy tracking-tight ${isLeader ? "text-lg md:text-xl" : "text-base"}`}
    >
      {name}
    </h3>
    <p
      className={`text-xs tracking-widest uppercase mt-2 font-sans ${isLeader ? "text-mitologi-gold font-bold" : "text-slate-500 font-bold"}`}
    >
      {role}
    </p>
  </div>
);

export function TeamOrganization() {
  // Currently team members are not fetched from DB, hiding this section to prevent hardcoded dummy data
  return null;

  return (
    <section className="py-24 sm:py-32 bg-white relative border-t border-slate-200/50">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <span className="text-sm font-sans font-bold tracking-widest text-mitologi-navy uppercase mb-4 inline-block bg-mitologi-navy/5 px-4 py-1.5 rounded-full">
            Tim Kami
          </span>
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-mitologi-navy tracking-tight mt-4">
            Struktur Organisasi
          </h2>
        </div>

        <div className="flex flex-col items-center gap-16">
          {/* Level 1: Founder */}
          <div className="relative">
            <TeamCard
              name="Founder Name"
              role="Founder"
              image="/images/placeholder-user.png"
              isLeader={true}
            />
            {/* Connector Line */}
            <div className="hidden md:block absolute left-1/2 -bottom-16 w-px h-16 bg-mitologi-gold/30 -translate-x-1/2" />
          </div>

          {/* Level 2: Core Production */}
          <div className="w-full relative">
            {/* Horizontal Connector */}
            <div className="hidden md:block absolute top-0 left-1/4 right-1/4 h-px bg-mitologi-gold/30 -translate-y-8" />

            <div className="text-center mb-12">
              <span className="inline-block px-5 py-2 rounded-full bg-slate-50 text-mitologi-navy text-xs font-sans font-bold uppercase tracking-widest border border-slate-200/60 shadow-sm">
                Tim Produksi Inti
              </span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 justify-center">
              <TeamCard
                name="Team Member 1"
                role="Specialist"
                image="/images/placeholder-user.png"
              />
              <TeamCard
                name="Team Member 2"
                role="Specialist"
                image="/images/placeholder-user.png"
              />
              <TeamCard
                name="Team Member 3"
                role="Specialist"
                image="/images/placeholder-user.png"
              />
              <TeamCard
                name="Team Member 4"
                role="Specialist"
                image="/images/placeholder-user.png"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
