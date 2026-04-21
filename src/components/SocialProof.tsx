const SocialProof = () => {
  const locations = ["WESTLANDS", "KILIMANI", "KAREN", "KILELESHWA", "MUTHAIGA", "THE PEARL", "LAVINGTON"];

  return (
    <section className="py-16 bg-ivory overflow-hidden">

      {/* Label */}
      <div className="container-custom mb-10 text-center">
        <p className="text-[11px] font-body font-normal tracking-[0.12em] text-obsidian/50 uppercase">
          Trusted by landlords managing Nairobi's most prestigious addresses
        </p>
      </div>

      {/* Marquee */}
      <div
        className="relative flex overflow-hidden"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
      >
        <div className="flex animate-scroll whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center shrink-0">
              {locations.map((loc) => (
                <span
                  key={`${i}-${loc}`}
                  className="font-display text-xl text-obsidian/40 hover:text-obsidian/70 transition-all tracking-[0.18em] cursor-default px-10"
                >
                  {loc}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="container-custom mt-12 pt-8 border-t border-forest/8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0">
          {[
            { value: 'KES 480M+', label: 'in rent managed' },
            { value: '40+',        label: 'landlords in early access' },
            { value: '18%',        label: 'avg collections uplift' },
          ].map((stat, idx) => (
            <div
              key={stat.value}
              className={`flex items-center gap-2 text-sm text-obsidian/60 sm:px-10 ${
                idx !== 2 ? 'sm:border-r sm:border-forest/10' : ''
              }`}
            >
              <span className="font-body font-semibold text-forest">{stat.value}</span>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default SocialProof;
