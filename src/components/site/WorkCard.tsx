import { serviceLabels } from "@/data/services";
import type { CaseStudy } from "@/data/work";

export const WorkCard = ({ item, detailed = false }: { item: CaseStudy; detailed?: boolean }) => (
  <article className="work-card group overflow-hidden rounded-[28px]">
    <div className="relative aspect-[16/10] overflow-hidden">
      <img
        src={item.cover}
        alt={`${item.title} — ${item.client} case study preview`}
        width={960}
        height={600}
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
      <div className="absolute left-4 top-4 flex flex-wrap gap-2">
        <span className="rounded-full border border-white/20 bg-black/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white backdrop-blur">
          {item.kind === "client" ? "Client" : "Studio build"}
        </span>
        {item.types.map((type) => (
          <span
            key={type}
            className="rounded-full border border-white/20 bg-black/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white backdrop-blur"
          >
            {serviceLabels[type]}
          </span>
        ))}
      </div>
    </div>
    <div className="p-6">
      {detailed ? (
        <h2 className="font-serif-display text-3xl text-foreground">{item.title}</h2>
      ) : (
        <h3 className="font-serif-display text-3xl text-foreground">{item.title}</h3>
      )}
      <p className="mt-1 text-xs uppercase tracking-wider text-foreground/50">{item.client}</p>
      {detailed ? (
        <dl className="mt-5 space-y-3 text-sm leading-relaxed">
          <div>
            <dt className="font-display text-xs uppercase tracking-wider text-ember">Problem</dt>
            <dd className="mt-1 text-foreground/75">{item.problem}</dd>
          </div>
          <div>
            <dt className="font-display text-xs uppercase tracking-wider text-ember">What we built</dt>
            <dd className="mt-1 text-foreground/75">{item.solution}</dd>
          </div>
          <div>
            <dt className="font-display text-xs uppercase tracking-wider text-ember">Note</dt>
            <dd className="mt-1 text-ember">{item.outcome}</dd>
          </div>
        </dl>
      ) : (
        <>
          <p className="mt-4 text-sm leading-relaxed text-foreground/70">{item.solution}</p>
          <p className="mt-4 text-sm font-medium text-ember">{item.outcome}</p>
        </>
      )}
      <div className="mt-5 flex flex-wrap gap-2">
        {item.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-ember/20 bg-ember/10 px-2 py-1 font-mono text-[11px] text-ember"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  </article>
);
