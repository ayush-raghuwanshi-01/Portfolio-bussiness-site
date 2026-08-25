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
      description="The story, team, values, and engineering process behind ZenWebStudio — a product studio for custom software, web, mobile, AI, and cloud."
      path="/about"
    />
    <PageHero
      eyebrow="About the studio"
      title={
        <>
          Built by engineers who were tired of <em className="hl-ember not-italic">agency theatre.</em>
        </>
      }
      body={`${site.name} exists so founders can hire a product team that scopes honestly, ships weekly, and answers the phone after launch.`}
    />

    <Section surface="mid">
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="overflow-hidden rounded-[28px] border border-border/60">
            <img
              src={teamPhoto}
              alt="ZenWebStudio founding team in the studio"
              className="aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
            />
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <span className="eyebrow">Origin</span>
          <h2 className="mt-4 font-serif-display text-4xl sm:text-5xl">
            A studio we would have wanted to hire.
          </h2>
          <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-foreground/75">
            <p>
              {site.name} started as a small engineering collective that kept watching the same
              failure mode: freelancers who vanished mid-build, and agencies that billed for
              meetings about the meetings.
            </p>
            <p>
              We formed a studio around the opposite contract. You talk to the people writing the
              code. Scope is written down. Web, mobile, AI, and cloud are designed as one system. The
              repository stays in your name.
            </p>
            <p>
              We are still a young team — that is the point. There is no account-management layer
              between you and the work.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>

    <Section surface="dark">
      <SectionHeading
        eyebrow="Team"
        title="Founders and the people who ship."
        body="A tight studio, not a rotating bench. Roles below are the people you will actually meet on a call."
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
      <SectionHeading
        eyebrow="Values"
        title="How we decide what to build — and what to refuse."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {values.map((value) => (
          <article key={value.title} className="glass rounded-[24px] p-6">
            <h3 className="font-display text-lg font-semibold">{value.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/70">{value.body}</p>
          </article>
        ))}
      </div>
      <div className="glass mt-8 rounded-[24px] p-6">
        <h3 className="font-display text-lg font-semibold">Engineering principles</h3>
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
      <SectionHeading
        align="center"
        eyebrow="Process"
        title="The same four steps on every engagement."
      />
      <div className="mt-12">
        <ProcessTimeline />
      </div>
    </Section>
    <CtaBand />
  </>
);

export default AboutPage;
