import { Seo } from "@/components/layout/Seo";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { site } from "@/lib/site";

const TermsPage = () => (
  <>
    <Seo
      title="Terms of Use"
      description="Terms for using the ZenWebStudio website and requesting project work."
      path="/terms"
    />
    <PageHero eyebrow="Legal" title="Terms of use." body={`Last updated 25 August 2026.`} />
    <Section surface="mid">
      <div className="max-w-3xl space-y-6 text-sm leading-relaxed text-foreground/75">
        <p>
          This website is operated by {site.legalName}. By using it you agree to these terms. A
          signed statement of work or proposal governs any paid engagement and overrides the
          marketing copy on this site if there is a conflict.
        </p>
        <p>
          Offers on this site, including seasonal discounts, are indicative. They are not a binding
          quote. Scope, timeline, and fees are confirmed in writing before work starts.
        </p>
        <p>
          Case studies describe studio work. Metrics are limited to outcomes we can stand behind.
          Third-party trademarks that appear in screenshots remain the property of their owners.
        </p>
        <p>
          The site is provided as-is. We are not liable for decisions you make solely from public
          pages. For project work, liability is limited as stated in the signed agreement.
        </p>
        <p>
          Contact {site.email} for notices. These terms are governed by the laws of India, without
          prejudice to any mandatory consumer rights that apply where you live.
        </p>
      </div>
    </Section>
  </>
);

export default TermsPage;
