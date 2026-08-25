import { Mail, Phone, Clock, MapPin } from "lucide-react";
import { Seo } from "@/components/layout/Seo";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { LeadForm } from "@/components/site/LeadForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics";
import { mailHref, site, whatsappHref } from "@/lib/site";

const ContactPage = () => (
  <>
    <Seo
      title="Contact"
      description="Book a technical consultation or send the ZenWebStudio team a project brief. Company email hello@zenwebstudio.com. We reply within 24 hours."
      path="/contact"
    />
    <PageHero
      eyebrow="Contact"
      title={
        <>
          Tell us what you want to <em className="hl-ember not-italic">ship.</em>
        </>
      }
      body="Use the form, book a 20-minute consultation, or reach the studio directly. Submissions are stored for the team — not a decorative toast."
    />

    <Section surface="mid">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="space-y-4">
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
              <div className="font-display text-sm font-semibold">WhatsApp the studio</div>
              <div className="mt-1 text-sm text-foreground/65">{site.phoneDisplay}</div>
            </div>
          </a>
          <a
            href={mailHref()}
            className="glass flex items-start gap-3 rounded-2xl p-5 transition-colors hover:border-ember/40"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
              <Mail className="h-4 w-4" />
            </span>
            <div>
              <div className="font-display text-sm font-semibold">Company email</div>
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
              <div className="font-display text-sm font-semibold">Where we work</div>
              <div className="mt-1 text-sm text-foreground/65">{site.location}</div>
            </div>
          </div>
        </aside>

        <div id="book" className="glass-strong scroll-mt-28 rounded-[28px] p-6 sm:p-8">
          <Tabs defaultValue="booking">
            <TabsList className="grid w-full grid-cols-2 rounded-full bg-secondary/70 p-1">
              <TabsTrigger value="booking" className="rounded-full">
                Book a consultation
              </TabsTrigger>
              <TabsTrigger value="message" className="rounded-full">
                Send a brief
              </TabsTrigger>
            </TabsList>
            <TabsContent value="booking" className="mt-6">
              <p className="mb-5 text-sm text-foreground/65">
                Pick a date and time. We will confirm by email and come prepared with a stack
                recommendation.
              </p>
              <LeadForm mode="booking" />
            </TabsContent>
            <TabsContent value="message" className="mt-6">
              <p className="mb-5 text-sm text-foreground/65">
                Name, email, service, budget, and a short brief. We persist every submission.
              </p>
              <LeadForm mode="contact" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Section>
  </>
);

export default ContactPage;
