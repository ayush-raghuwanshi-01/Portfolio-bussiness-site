import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  estimateProject,
  estimatorScales,
  estimatorServices,
  estimatorTimelines,
  formatInr,
  formatUsd,
  type EstimatorScaleId,
  type EstimatorServiceId,
  type EstimatorTimelineId,
} from "@/lib/estimator";
import { cn } from "@/lib/utils";

const Chip = ({
  active,
  label,
  hint,
  onClick,
}: {
  active: boolean;
  label: string;
  hint?: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "rounded-2xl border px-3 py-2.5 text-left transition-colors",
      active
        ? "border-primary/50 bg-primary/15 text-foreground"
        : "border-border/70 text-foreground/70 hover:border-primary/30 hover:text-foreground",
    )}
  >
    <div className="text-sm font-medium">{label}</div>
    {hint && <div className="mt-0.5 text-[11px] text-foreground/50">{hint}</div>}
  </button>
);

export const Estimator = ({ compact = false }: { compact?: boolean }) => {
  const [service, setService] = useState<EstimatorServiceId>("web");
  const [scale, setScale] = useState<EstimatorScaleId>("starter");
  const [timeline, setTimeline] = useState<EstimatorTimelineId>("standard");

  const result = useMemo(
    () => estimateProject({ service, scale, timeline }),
    [service, scale, timeline],
  );

  return (
    <div className="glass-strong relative overflow-hidden rounded-[28px] p-6 sm:p-8">
      <div className="pointer-events-none absolute inset-0 bg-gradient-aurora opacity-40" />
      <div className="relative">
        <span className="eyebrow">Project estimator</span>
        <h3 className="mt-3 font-display text-2xl font-semibold">Get a starting range in 20 seconds.</h3>
        <p className="mt-2 text-sm text-foreground/65">
          Built from our published starting prices. This is a planning range — not a quote. We confirm
          scope in writing before any invoice.
        </p>

        <div className="mt-6 space-y-5">
          <div>
            <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">What are you building?</div>
            <div className="grid gap-2 sm:grid-cols-2">
              {estimatorServices.map((item) => (
                <Chip
                  key={item.id}
                  active={service === item.id}
                  label={item.label}
                  onClick={() => setService(item.id)}
                />
              ))}
            </div>
          </div>
          <div>
            <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">Scale</div>
            <div className="grid gap-2 sm:grid-cols-3">
              {estimatorScales.map((item) => (
                <Chip
                  key={item.id}
                  active={scale === item.id}
                  label={item.label}
                  hint={item.hint}
                  onClick={() => setScale(item.id)}
                />
              ))}
            </div>
          </div>
          <div>
            <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">Cadence</div>
            <div className="grid gap-2 sm:grid-cols-3">
              {estimatorTimelines.map((item) => (
                <Chip
                  key={item.id}
                  active={timeline === item.id}
                  label={item.label}
                  hint={item.hint}
                  onClick={() => setTimeline(item.id)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-7 rounded-2xl border border-primary/25 bg-primary/10 p-5">
          <div className="text-xs uppercase tracking-wider text-primary">Indicative range · {result.serviceLabel}</div>
          <div className="mt-2 font-serif-display text-3xl sm:text-4xl">
            {formatInr(result.lowInr)} – {formatInr(result.highInr)}
          </div>
          <div className="mt-1 text-sm text-foreground/60">
            {formatUsd(result.lowUsd)} – {formatUsd(result.highUsd)} · {result.weeksLow}–{result.weeksHigh} weeks
          </div>
        </div>

        {!compact && (
          <p className="mt-3 text-xs text-foreground/50">
            Micro-copy that matters: no discovery fee to talk. You leave the call with a written next
            step even if we are not the right studio.
          </p>
        )}

        <Button asChild variant="ember" className="mt-5 rounded-full">
          <Link to="/contact#book">
            Start your project <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};
