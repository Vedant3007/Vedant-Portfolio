import { Capabilities } from "@/components/home/Capabilities";
import { ContactCta } from "@/components/home/ContactCta";
import { ExperiencePreview } from "@/components/home/ExperiencePreview";
import { Hero } from "@/components/home/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <Capabilities />
      <ExperiencePreview />
      <ContactCta />
    </>
  );
}