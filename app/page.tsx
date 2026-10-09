import { SiteHeader } from "../components/SiteHeader";
import { Hero } from "../components/Hero";
import { QuickAccess } from "../components/QuickAccess";
import { SpongeIronSection } from "../components/SpongeIronSection";
import "./hero.css";
import "./quick-access.css";
import "./sponge-iron-section.css";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <Hero />
        <QuickAccess />
        <SpongeIronSection />
      </main>
    </>
  );
}
