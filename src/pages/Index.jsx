import Hero from "@/components/Hero";
import RecentItems from "@/components/RecentItems";
import Statistics from "@/components/Statistics";
import GlassSection from "@/components/GlassSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-purple-100 selection:text-purple-900">
      <Header />
      <main>
        <Hero />
        <RecentItems />
        <GlassSection />
        <Statistics />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
