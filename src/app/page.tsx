import { Capabilities } from "@/components/home/Capabilities";
import { ContactCta } from "@/components/home/ContactCta";
import { ExperiencePreview } from "@/components/home/ExperiencePreview";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Hero } from "@/components/home/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <Capabilities />
      <FeaturedProjects />
      <ExperiencePreview />
      <ContactCta />
    </>
  );
}