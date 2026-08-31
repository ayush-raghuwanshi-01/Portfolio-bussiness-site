import { Seo } from "@/components/layout/Seo";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { site } from "@/lib/site";

const PrivacyPage = () => (
  <>
    <Seo
      title="Privacy Policy"
      description="How ZenVioLabs collects and uses information submitted through the website."
      path="/privacy"
    />
    <PageHero eyebrow="Legal" title="Privacy policy." body={`Last updated 25 August 2026. Questions: ${site.email}.`} />
    <Section surface="mid">
      <div className="prose prose-invert max-w-3xl text-sm leading-relaxed text-foreground/75">
        <h2 className="font-display text-xl text-foreground">What we collect</h2>
        <p>
          When you send the project form we store your name, email, phone, city, what you need, and a short
          description. Server logs may include IP address and user agent for security.
        </p>
        <h2 className="mt-8 font-display text-xl text-foreground">Why we collect it</h2>
        <p>
          Only to reply to your enquiry and keep a record of conversations you started. We send the same details to
          the studio WhatsApp and {site.email}. We do not sell this data or use it for advertising networks.
        </p>
        <h2 className="mt-8 font-display text-xl text-foreground">Where it is stored</h2>
        <p>
          Form submissions are emailed to the studio, delivered to WhatsApp, and may be written to a private lead
          store. Access is limited to the {site.name} team.
        </p>
        <h2 className="mt-8 font-display text-xl text-foreground">Analytics</h2>
        <p>
          If a Google Analytics measurement ID is configured, we receive aggregated traffic events such as page
          views. You can block this with a standard browser tracker control.
        </p>
        <h2 className="mt-8 font-display text-xl text-foreground">Retention and your rights</h2>
        <p>
          We keep enquiry records as long as needed to reply or as required by accounting law. Email {site.email} to
          request access, correction, or deletion of your submission.
        </p>
      </div>
    </Section>
  </>
);

export default PrivacyPage;
