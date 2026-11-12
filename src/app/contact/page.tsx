import type { Metadata } from "next";
import { ContactCards } from "@/components/contact/ContactCards";
import { ContactForm } from "@/components/contact/ContactForm";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusPill } from "@/components/ui/StatusPill";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Vedant Patel about IT infrastructure, cloud and software engineering opportunities.",
};

export default function ContactPage() {
  return (
    <Container className="py-16 sm:py-24">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <SectionHeading
            as="h1"
            eyebrow="Contact"
            title="Get in touch"
            description="Send me a message using the form and it will go straight to my inbox. Or reach me directly using any of the details below."
          />
          <div className="mt-6">
            <StatusPill>{siteConfig.availability.summary}</StatusPill>
          </div>
          <ContactCards />
        </div>

        <Card className="p-6 sm:p-8">
          <ContactForm />
        </Card>
      </div>
    </Container>
  );
}