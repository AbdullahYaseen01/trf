import { Shield, Clock, Headphones, BadgePercent } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified Properties",
    description: "Every listing is verified for quality and safety standards",
  },
  {
    icon: Clock,
    title: "Instant Booking",
    description: "Book your stay instantly with our streamlined process",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our team is always available to help with any concerns",
  },
  {
    icon: BadgePercent,
    title: "Best Price Guarantee",
    description: "We match any competitor's price on identical properties",
  },
];

const TrustSection = () => {
  return (
    <section className="py-10 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <p className="text-primary font-semibold text-xs md:text-sm uppercase tracking-wide mb-2">
            Why Choose Us
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Trusted by Thousands
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="w-10 h-10 md:w-14 md:h-14 mx-auto mb-3 md:mb-4 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center">
                <feature.icon className="h-5 w-5 md:h-7 md:w-7 text-primary" />
              </div>
              <h3 className="font-semibold text-sm md:text-lg mb-1 md:mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
