import { Mail, Phone, Clock, MapPin } from "lucide-react";
import { Seo } from "@/components/layout/Seo";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { StartProjectButton } from "@/components/site/StartProjectButton";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics";
import { mailHref, site, whatsappHref } from "@/lib/site";

const ContactPage = () => (
  <>
    <Seo
      title="Contact"
      description={`Contact Zenvio Labs. WhatsApp ${site.phoneDisplay} or email ${site.email}. We reply within 24 hours.`}
      path="/contact"
    />
    <PageHero
      eyebrow="Contact"
      title={
        <>
          WhatsApp or email. <em className="hl-ember not-italic">We reply.</em>
        </>
      }
      body="Send the project form — it reaches both. Or write to us directly. We work with clients across India."
      actions={
        <StartProjectButton source="contact-hero" size="xl">
          Start a project
        </StartProjectButton>
      }
    />

    <Section surface="mid">
      <div className="grid gap-5 md:grid-cols-2">
        <a
          href={whatsappHref()}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackEvent(AnalyticsEvents.WHATSAPP_CLICKED, { source: "contact-page" })}
          className="glass flex items-start gap-3 rounded-2xl p-5 transition-colors hover:border-ember/40"
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#25D366] text-white">
            <Phone className="h-4 w-4" />
          </span>
          <div>
            <div className="font-display text-sm font-semibold">WhatsApp</div>
            <div className="mt-1 text-sm text-foreground/65">{site.phoneDisplay}</div>
          </div>
        </a>
        <a href={mailHref()} className="glass flex items-start gap-3 rounded-2xl p-5 transition-colors hover:border-ember/40">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
            <Mail className="h-4 w-4" />
          </span>
          <div>
            <div className="font-display text-sm font-semibold">Email</div>
            <div className="mt-1 text-sm text-foreground/65">{site.email}</div>
          </div>
        </a>
        <div className="glass flex items-start gap-3 rounded-2xl p-5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-foreground">
            <Clock className="h-4 w-4 text-ember" />
          </span>
          <div>
            <div className="font-display text-sm font-semibold">Response time</div>
            <div className="mt-1 text-sm text-foreground/65">Within {site.responseTime}, IST business hours.</div>
          </div>
        </div>
        <div className="glass flex items-start gap-3 rounded-2xl p-5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-foreground">
            <MapPin className="h-4 w-4 text-ember" />
          </span>
          <div>
            <div className="font-display text-sm font-semibold">Studio</div>
            <div className="mt-1 text-sm text-foreground/65">
              {site.location}. Work across India.
            </div>
          </div>
        </div>
      </div>
    </Section>
  </>
);

export default ContactPage;
