import { existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { SiteHeader } from "../components/SiteHeader";
import { Hero } from "../components/Hero";
import { QuickAccess } from "../components/QuickAccess";
import { NoticesBoard } from "../components/NoticesBoard";
import { AboutSection } from "../components/AboutSection";
import { SpongeIronSection } from "../components/SpongeIronSection";
import { CertificatesSection } from "../components/CertificatesSection";
import { NewsSection } from "../components/NewsSection";
import { WhyGoharSection } from "../components/WhyGoharSection";
import { IronOreStepper } from "../components/IronOreStepper";

import "./hero.css";
import "./quick-access.css";
import "./notices.css";
import "./about-showcase.css";
import "./sponge-iron-section.css";
import "./iron-ore-stepper.css";

/** Check committed/static files on the server, not from the user's browser.
 * This avoids requesting missing poster URLs and makes video availability explicit.
 * In production the media must be present when Next builds; restart dev after install. */
function available(name: string): boolean {
  try {
    const path = join(process.cwd(), "public", "hero", name);
    return existsSync(path) && statSync(path).size > 1024;
  } catch {
    return false;
  }
}

export default function Home(){
 const hasVideoPoster = available("gohar-hero-poster.webp");
 const hasHeroVideo = available("gohar-factory-new.mp4");
 return <>
   <SiteHeader/>
   <main id="main-content">
     <Hero posterAvailable={hasVideoPoster} videoAvailable={hasHeroVideo}/>
     <QuickAccess/>
     <AboutSection/>
     <NoticesBoard/>
     <SpongeIronSection/>
     <CertificatesSection/>
     <NewsSection/>
     <WhyGoharSection/>
   </main>
   <IronOreStepper/>
 </>;
}
