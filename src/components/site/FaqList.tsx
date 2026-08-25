import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/data/faqs";

export const FaqList = () => (
  <Accordion type="single" collapsible className="w-full">
    {faqs.map((item, i) => (
      <AccordionItem key={item.q} value={`faq-${i}`} className="border-border/60">
        <AccordionTrigger className="text-left font-display text-base hover:no-underline">
          {item.q}
        </AccordionTrigger>
        <AccordionContent className="text-sm leading-relaxed text-foreground/70">{item.a}</AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);
