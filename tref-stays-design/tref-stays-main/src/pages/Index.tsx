import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import PropertyGrid from "@/components/PropertyGrid";
import TrustSection from "@/components/TrustSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <HeroBanner />
      <main className="flex-1">
        <PropertyGrid />
        <TrustSection />
      </main>
    </div>
  );
};

export default Index;
