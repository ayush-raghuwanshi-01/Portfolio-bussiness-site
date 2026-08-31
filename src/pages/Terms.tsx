import { Seo } from "@/components/layout/Seo";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { site } from "@/lib/site";

const TermsPage = () => (
  <>
    <Seo
      title="Terms of Use"
      description="Terms for using the ZenVioLabs website and requesting project work."
      path="/terms"
    />
    <PageHero eyebrow="Legal" title="Terms of use." body={`Last updated 25 August 2026.`} />
    <Section surface="mid">
      <div className="max-w-3xl space-y-6 text-sm leading-relaxed text-foreground/75">
        <p>
          This website is operated by {site.legalName}, {site.location}. By using it you agree to these terms. A
          written message or statement of work governs any paid engagement and overrides the marketing copy on this
          site if there is a conflict.
        </p>
        <p>
          Prices on this site, including “websites start at {site.startingPrice}”, are starting figures for a defined
          brochure site. They are not a binding quote for custom software or apps. Scope, timeline, and fees are
          confirmed in writing before work starts.
        </p>
        <p>
          Work shown as “studio build” is our own product and spec work. It is not presented as a paid client case
          study. Third-party trademarks that appear in screenshots remain the property of their owners.
        </p>
        <p>
          The site is provided as-is. We are not liable for decisions you make solely from public pages. For project
          work, liability is limited as stated in the signed or WhatsApp-confirmed agreement.
        </p>
        <p>
          Contact {site.email} for notices. These terms are governed by the laws of India, without prejudice to any
          mandatory consumer rights that apply where you live.
        </p>
      </div>
    </Section>
  </>
);

export default TermsPage;
