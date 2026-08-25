import { Seo } from "@/components/layout/Seo";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeading } from "@/components/site/Section";
import { ProcessTimeline } from "@/components/site/ProcessTimeline";
import { CtaBand } from "@/components/site/CtaBand";
import { Reveal } from "@/components/site/Reveal";
import { principles, team, values } from "@/data/team";
import { site } from "@/lib/site";
import teamPhoto from "@/assets/team-photo.jpg";

const AboutPage = () => (
  <>
    <Seo
      title="About"
      description="Zenvio Labs is a three-person engineering studio. We build websites and business software for companies across India."
      path="/about"
    />
    <PageHero
      eyebrow="About"
      title={
        <>
          Three engineers. <em className="hl-ember not-italic">No account layer.</em>
        </>
      }
      body={`${site.name} exists so a shop, institute, or founder can hire people who write the code, quote in rupees, and pick up WhatsApp after launch.`}
    />

    <Section surface="mid">
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="overflow-hidden rounded-[28px] border border-border/60">
            <img
              src={teamPhoto}
              alt="Zenvio Labs team"
              className="aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
            />
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <span className="eyebrow">Origin</span>
          <h2 className="mt-4 font-serif-display text-4xl sm:text-5xl">A studio we would have wanted to hire.</h2>
          <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-foreground/75">
            <p>
              We kept seeing the same two failures: freelancers who vanished mid-build, and agencies that billed for
              meetings about the meetings.
            </p>
            <p>
              We formed a small studio with the opposite contract. You talk to the people writing the code. Scope is
              written down. The domain stays in your name. We work with clients across India.
            </p>
            <p>We are a young team. That is the point. There is no layer between you and the work.</p>
          </div>
        </Reveal>
      </div>
    </Section>

    <Section surface="dark">
      <SectionHeading
        eyebrow="Team"
        title="The people you will meet on a call."
        body="A tight studio, not a rotating bench."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {team.map((member, i) => (
          <Reveal key={member.name} delay={i * 0.06}>
            <article className="glass h-full rounded-[24px] p-6">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-primary font-display text-lg font-semibold text-primary-foreground shadow-glow">
                {member.initials}
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{member.name}</h3>
              <p className="mt-1 text-sm text-ember">{member.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">{member.focus}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>

    <Section surface="paper">
      <SectionHeading eyebrow="How we work" title="What we will and will not do." />
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {values.map((value) => (
          <article key={value.title} className="glass rounded-[24px] p-6">
            <h3 className="font-display text-lg font-semibold">{value.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/70">{value.body}</p>
          </article>
        ))}
      </div>
      <div className="glass mt-8 rounded-[24px] p-6">
        <h3 className="font-display text-lg font-semibold">Defaults</h3>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {principles.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-foreground/75">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Section>

    <Section id="process" surface="dark">
      <SectionHeading align="center" eyebrow="Process" title="Four steps. No theatre." />
      <div className="mt-12">
        <ProcessTimeline />
      </div>
    </Section>
    <CtaBand />
  </>
);

export default AboutPage;
