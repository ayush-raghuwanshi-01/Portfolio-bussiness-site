import { describe, expect, it } from "vitest";
import { absoluteUrl, mailHref, pageTitle, site, whatsappHref } from "@/lib/site";

describe("SEO and URL helpers", () => {
  it("formats page titles correctly with brand name", () => {
    expect(pageTitle("Services")).toBe("Services — ZenVioLabs");
    expect(pageTitle("Work")).toBe("Work — ZenVioLabs");
    expect(pageTitle("About")).toBe("About — ZenVioLabs");
    expect(pageTitle("Contact")).toBe("Contact — ZenVioLabs");
    expect(pageTitle("Privacy Policy")).toBe("Privacy Policy — ZenVioLabs");
    expect(pageTitle("Terms of Use")).toBe("Terms of Use — ZenVioLabs");
  });

  it("formats the default root title with tagline/headline", () => {
    const rootTitle = pageTitle();
    expect(rootTitle).toContain("ZenVioLabs");
    expect(rootTitle).toContain(site.headline);
  });

  it("constructs valid absolute canonical URLs", () => {
    expect(absoluteUrl("/")).toBe("https://zenwebstudio.com/");
    expect(absoluteUrl("")).toBe("https://zenwebstudio.com/");
    expect(absoluteUrl("/services")).toBe("https://zenwebstudio.com/services");
    expect(absoluteUrl("services")).toBe("https://zenwebstudio.com/services");
    expect(absoluteUrl("/work")).toBe("https://zenwebstudio.com/work");
    expect(absoluteUrl("/about")).toBe("https://zenwebstudio.com/about");
    expect(absoluteUrl("/contact")).toBe("https://zenwebstudio.com/contact");
  });

  it("generates correct WhatsApp links with encoded message", () => {
    const defaultWa = whatsappHref();
    expect(defaultWa).toContain(`https://wa.me/${site.whatsapp}`);
    expect(defaultWa).toContain("text=");

    const customWa = whatsappHref("I need a website for my dental clinic");
    expect(customWa).toContain(`https://wa.me/${site.whatsapp}?text=I%20need%20a%20website%20for%20my%20dental%20clinic`);
  });

  it("generates correct mailto links", () => {
    const defaultMail = mailHref();
    expect(defaultMail).toContain(`mailto:${site.email}`);
    expect(defaultMail).toContain("subject=");

    const customMail = mailHref("Custom Subject");
    expect(customMail).toBe(`mailto:${site.email}?subject=Custom%20Subject`);
  });
});
