import { SiteHeader } from "../components/SiteHeader";
import { Hero } from "../components/Hero";
import { QuickAccess } from "../components/QuickAccess";
import { NoticesBoard } from "../components/NoticesBoard";
import { AboutSection } from "../components/AboutSection";
import { SpongeIronSection } from "../components/SpongeIronSection";

import "./hero.css";
import "./quick-access.css";
import "./notices.css";
import "./about-showcase.css";
import "./sponge-iron-section.css";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <Hero />
        <QuickAccess />
        <NoticesBoard />
        <AboutSection />
        <SpongeIronSection />
      </main>
    </>
  );
}
