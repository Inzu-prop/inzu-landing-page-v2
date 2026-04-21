import { InzuRequestButton } from "@/components/ui/button-with-icon";

const FinalCTA = () => {
  return (
    <section className="min-h-[60vh] flex items-center py-32 bg-obsidian relative overflow-hidden">
      {/* Background Mesh */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_30%_55%,rgba(50,83,61,0.3)_0%,transparent_70%)]" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — headline */}
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-silk leading-[1.0] tracking-tight">
            Your properties deserve<br />
            <span className="text-sage italic">better management.</span>
          </h2>

          {/* Right — sub-copy + CTA */}
          <div className="flex flex-col items-start gap-8">
            <p className="text-silk/70 font-body font-light text-base leading-relaxed max-w-sm">
              A small number of portfolios are admitted each month. If you're ready
              to stop managing your property manager, this is where you start.
            </p>
            <InzuRequestButton href="/request-access" label="Claim Your Early Access" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
