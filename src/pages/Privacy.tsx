import { Seo } from "@/components/layout/Seo";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { site } from "@/lib/site";

const PrivacyPage = () => (
  <>
    <Seo
      title="Privacy Policy"
      description="How ZenWebStudio collects, stores, and uses information submitted through the website."
      path="/privacy"
    />
    <PageHero eyebrow="Legal" title="Privacy policy." body={`Last updated 25 August 2026. Questions: ${site.email}.`} />
    <Section surface="mid">
      <div className="prose prose-invert max-w-3xl text-sm leading-relaxed text-foreground/75">
        <h2 className="font-display text-xl text-foreground">What we collect</h2>
        <p>
          When you submit the Start a Project form we store your name, email, contact number, and
          selected service. Server logs may include IP address and user agent for security.
        </p>
        <h2 className="mt-8 font-display text-xl text-foreground">Why we collect it</h2>
        <p>
          Solely to respond to project inquiries, schedule consultations, and keep a record of
          conversations you started. We do not sell this data or use it for advertising networks.
        </p>
        <h2 className="mt-8 font-display text-xl text-foreground">Where it is stored</h2>
        <p>
          Form submissions are written to the studio lead store (Postgres / Supabase, and a
          server-side lead log in development). Access is limited to the {site.name} team.
        </p>
        <h2 className="mt-8 font-display text-xl text-foreground">Analytics</h2>
        <p>
          If a Google Analytics measurement ID is configured, we receive aggregated traffic events
          such as page views and CTA clicks. You can block this with a standard browser tracker
          control.
        </p>
        <h2 className="mt-8 font-display text-xl text-foreground">Retention and your rights</h2>
        <p>
          We keep inquiry records for as long as needed to deliver a project or as required by
          accounting law. Email {site.email} to request access, correction, or deletion of your
          submission.
        </p>
      </div>
    </Section>
  </>
);

export default PrivacyPage;
