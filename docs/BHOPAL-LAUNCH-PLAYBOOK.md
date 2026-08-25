# ZenWebStudio — Hard-Truth Launch Playbook
**Bhopal, Madhya Pradesh · 3 engineers · prototype website + Business WhatsApp**

Written as an operating brief for Ayush Raghuwanshi, Deepak Tripathi, and Shubham Mishra.
Date: 25 August 2026. This is not marketing copy. Treat it as the rules of the company for the next 90 days.

---

## 0. One-sentence diagnosis

You do **not** have a software company yet. You have a **capable three-person engineering team**, a **polished marketing prototype**, a **phone number**, and **zero commercial engine**. The gap between the website’s voice (“product studio for SaaS, mobile, cloud”) and the actual assets (no GST invoice, no live domain, broken production lead capture, portfolio work with no paid-client metrics) is the reason you will not get serious leads if you “just launch the site.”

The good news: this is the normal starting point. The studios that survive in MP do not wait for inbound SaaS founders. They **sell local, bill weekly, over-deliver on one niche, then graduate**.

---

## 1. What the repo actually is (inventory)

| Asset | Status | Verdict |
| --- | --- | --- |
| Brand name **ZenWebStudio** | Consistent across site, SEO, JSON-LD | Keep. Short, pronounceable, works in Hindi and English. |
| Domain `zenwebstudio.com` | Claimed in SEO; public page is still “coming soon” | **Must go live this week** or stop using the URL. |
| Email `zenwebstudio.in@gmail.com` | Printed everywhere | Live Gmail for enquiries until a domain mailbox exists. |
| WhatsApp `+91 95845 59972` | FAB + contact + wa.me deep links | Your **real** sales channel. Treat it as the CRM. |
| Positioning | Web / Mobile / SaaS / Cloud, “India · Remote-first” | Too wide. Hides Bhopal. Wrong for first 10 clients. |
| Offer | “30% OFF first engagement this quarter” with **no rupee price** | Looks desperate and unpriceable. Indian SMEs ask *kitna lagega?* first. |
| Team page | 3 named people, initials, one studio photo | Honest size. Missing photos, LinkedIn, “we sit in Bhopal.” |
| Work | Asklytics, YourDigitalLift, commerce storefront, Prabha Foundation | Looks like **portfolio / student / prototype work**. Outcomes are adjectives, not numbers. |
| Lead form | Name, email, phone, service. Honeypot. Zod validation. | Fine UX. **Will silently fail on Vercel** unless Supabase is wired. |
| `/api/leads` | Vite middleware → `data/leads.json` | Works in `npm run dev` / `preview` only. **Not a production API.** `vercel.json` is SPA rewrite only. |
| Supabase | SQL + RLS insert-only, optional env | Required for production. Not configured. |
| Analytics | `G-XXXXXXXXXX` placeholder | Shipping fake GA is worse than none. |
| Social | `github.com/zenwebstudio`, `linkedin.com/company/zenwebstudio` | If these 404, every footer click burns trust. |
| Legal pages | Privacy + Terms, India-governed | Thin but enough for a site. **Not a client contract.** |
| GST / CIN / Udyam / address | Absent | You cannot look like a vendor to a CA, factory, or coaching institute. |

You are **not** missing another React animation. You are missing **entity, offer, proof, pipeline, and a production lead pipe**.

---

## 2. Hard truths about this type of business

### 2.1 You are a services firm, not a tech startup

A startup has one product, recurring users, and a path to venture or bootstrap SaaS revenue. You are selling **time and delivery**. That is an **IT services / boutique software shop**. It can become a product company later (YourDigitalLift is the only seed of that). Do not raise, do not talk “equity,” do not wait for a co-founder who “does growth.” Cash comes from invoices.

Gross margins on custom software in India are excellent (60–75% if you do not hire) and **terrible** if you underprice and over-scope. Death is not competition. Death is **unpaid discovery + scope creep + one bad SaaS that eats 12 weeks**.

### 2.2 Bhopal is not Bangalore, and that is your advantage

Bhopal’s IT map (2026):

- **MNCs / large:** TCS, Infosys, Wipro, HCL, Tech Mahindra, Mphasis, Persistent — they do **not** take a ₹80k clinic portal. Irrelevant as competitors for your first year.
- **Real local competitors:** HackerKernel, Agnito, DV Infosoft, Dezven, Eulogik, Random Forest, Metawish, Konvert Klicks, Vidyayatan, Leads And Brands, plus 70+ tiny web shops on GoodFirms. Typical published rates **under $25–39/hr**.
- **Indore is the state’s software capital** (YASH, InfoBeans, Softude, Deqode, Codiant). Do not pretend you compete with them on enterprise.

What Bhopal actually buys, in order of volume:

1. Coaching / education institutes (MP Nagar, Arera Colony — MPPSC, NEET, JEE, school brands) — websites, fee portals, student apps.
2. Clinics, dental, diagnostic labs, gyms, yoga studios — booking, WhatsApp, membership.
3. Real estate / builders / interior — listing sites, lead forms.
4. Retail, restaurants, hotels around New Market, DB Mall, Kolar, Bittan Market — Google-ready sites, ordering, GST invoices.
5. Manufacturing / traders in Govindpura, Mandideep, Pilukhedi — inventory, billing, dealer portals. Slow sales cycle, better tickets.
6. CAs, lawyers, architects — they become **referral partners**, not just clients.
7. True SaaS founders — rare in Bhopal. Do not build the company around them.

Your site currently speaks to #7. Your city pays for #1–#4.

### 2.3 Three engineers is enough to start and not enough to be a “studio of four surfaces”

A React + RN + Node + AWS promise from three people is a **capacity lie**. One mobile App Store submission can freeze the whole team. Rule for 90 days:

- **Max 2 paid builds in parallel.**
- **One seller-doer** (Ayush: scope, WhatsApp, demos, collection).
- **One delivery lead** (Deepak: code quality, staging, deadlines).
- **Shubham** is a **feature**, not a pillar. Do not sell “AI studio” until a client pays for a model inside an existing product. Applied ML with no data and no paying workflow is a hobby.

### 2.4 The website will not get you leads

Inbound SEO for a new domain in a generic category (“SaaS product studio”) takes 6–12 months. Google Ads for “software company Bhopal” is expensive and full of tire-kickers. Meta ads for custom software convert poorly unless you sell a **₹15–40k package** with a photo of a local shop.

First 10 clients in this city come from: **walk-ins, WhatsApp, CA referrals, Justdial, Google Business Profile, and people you already know.** That is not a theory. That is how every small MP agency that is still alive got paid.

### 2.5 Discounting 30% with no list price is a tell

Sophisticated buyers think: *if they are 30% off before I ask, they have no pipeline.* Local buyers think: *then start from 30% and I’ll still negotiate.* Either publish **packages in INR** or drop the badge. A launch offer that works: **“First 5 Bhopal businesses: fixed-price Business Site in 14 days, ₹29,900 + GST, 50% advance.”** Scarcity + number + city + time.

### 2.6 Portfolio without money is not a case study

Asklytics / gym platform / commerce / Prabha — if nobody paid, label them **“studio builds / spec work.”** If someone paid even ₹10,000, get a **WhatsApp voice note or 2-line Hindi/English quote** and a metric (enquiries, members, donations). Lying about “clients” is the fastest way to lose the second meeting when they ask for a reference call.

### 2.7 You will be asked to work for free, for equity, and for “exposure”

Default answer: **no**. Exception: one **paid pilot** at a friend-and-family rate with a written testimonial and permission to use the brand on the site. Equity-only from a college founder with no GST and no users is how studios die.

---

## 3. Objective: what “launched” actually means

Do not call it launched when Vercel shows the homepage. Call it launched when **all** of this is true:

1. A human in Bhopal can Google or WhatsApp you, get a **price band today**, and pay an **advance to a business account**.
2. You can issue a **GST-compliant tax invoice** (or a proper professional invoice with PAN while GST is in process — then GST within 2 weeks).
3. A form on the live site **creates a row you actually see** (WhatsApp ping or email) within 5 minutes.
4. Google Business Profile exists with **Bhopal as the city**, category *Software company* + *Website designer*, WhatsApp button, 5 photos, and the three of you as the team.
5. You have **one written offer** you can explain in 20 seconds in Hindi.
6. You have **5 conversations this week** that are not friends saying “bahut achha website hai.”

Until then you are still decorating.

---

## 4. What is missing — required vs later

### 4.1 Required before you take the first rupee (this week)

**Legal / money**

- Decide entity **now**. Do not wait for “when we scale.”
  - **Fastest to invoice:** Partnership firm (all 3) **or** proprietorship in Ayush’s name with a simple profit-share deed for Deepak and Shubham. Cheap, days not weeks.
  - **Correct medium-term:** **LLP** (2 designated partners, limited liability, still light). Target within 30–45 days if any client is >₹2L.
  - **Pvt Ltd:** only when a client/investor/bank asks, or you hire. Extra compliance (SPICe+, INC-20A, auditor) is a tax on a 3-person shop.
- **PAN** of the firm, **current account** in the firm name (SBI / HDFC / ICICI in Bhopal — take the COI/partnership deed + rent/NOC).
- **GST registration in Madhya Pradesh**, even if you are under ₹20L services threshold. Why: B2B clients want **ITC**. Interstate supply (a Pune founder, a Delhi brand) **requires GST anyway**. SAC codes you will use:
  - **998314** — IT design & development (sites, apps, custom software) — **18%**
  - **998313** — IT consulting — **18%**
  - **998315** — hosting / cloud management — **18%**
- **Udyam (MSME)** after GST/PAN — free, helps GeM later, some tenders, bank.
- **Registered office:** home is legal with NOC + utility bill. A ₹3–6k/month desk in a MP Nagar / Arera Colony coworking is optional but helps Google Business and client visits. Do **not** take a 11-month commercial lease yet.
- **Digital Signature** if you go LLP/Pvt Ltd.

**Commercial kit (print + PDF + WhatsApp)**

- One-page **rate card** (see §6).
- **Statement of Work template** (scope, out of scope, timeline, 50/30/20, IP to client on full payment, 2 revision rounds).
- **NDA** (one page). Rarely needed; have it.
- **Invoice template** (GSTIN, PAN, SAC, bank QR / UPI of the **firm**).
- Payment: **UPI + NEFT**. Razorpay/Instamojo later.

**Website / ops (the prototype is not production)**

- Point `zenwebstudio.com` DNS to the host. Enable HTTPS.
- Mailbox **zenwebstudio.in@gmail.com**. Later move to a domain address if you buy Google Workspace / Zoho.
- **Kill placeholder GA** or put a real GA4 ID.
- **Wire Supabase** (`VITE_SUPABASE_URL`, anon key, run `001_leads.sql`) **and** a webhook/email on insert. Otherwise production forms lie: `submitLead` needs API **or** Supabase; Vercel has no `/api/leads`.
- Remove or replace GitHub/LinkedIn URLs that 404. Empty LinkedIn company page is better than a dead link.
- Add **Bhopal, Madhya Pradesh** in footer, JSON-LD `address`, and title tags (“Web & app studio in Bhopal”). “India · Remote-first” should become **“Bhopal · work with clients across India.”**
- Put **INR starting prices** on `/services`. Hide 30% or convert it into a dated, numbered launch package.
- Relabel case studies honestly. Add “Built in Bhopal.”
- Real photos of the three of you. Initials look like a template.

**Presence**

- Google Business Profile (GBP).
- WhatsApp Business **profile**: category, hours IST, address, catalog of 3 packages, quick replies (price, timeline, “send brief”).
- Instagram + LinkedIn company — even if ugly. Local SMEs check Instagram. Founders check LinkedIn.
- Justdial + Sulekha listing (yes, they are unfashionable; they still send Bhopal phone leads).

### 4.2 Required in the first 30 days (not blockers for conversation)

- 10 **before/after** screenshots of local sites you could improve (publicly available — do not claim you built them). Use in WhatsApp pitches.
- One **live URL** of something you shipped, even a coaching landing page.
- Simple CRM: **Google Sheet** with columns: date, name, business, source, stage, next action, amount. WhatsApp is not a CRM; you will lose follow-ups.
- Weekly pipeline meeting, 30 minutes, Sunday night. Only numbers.

### 4.3 Explicitly *not* required to launch

- Office with glass walls.
- Four service pillars equally staffed.
- AWS Partner badge, CMMI, ISO.
- Custom CRM, CI/CD theatre for the marketing site.
- Hindi/English bilingual site (nice; not week-1). A Hindi WhatsApp script matters more.
- Hiring intern #4.
- Productized SaaS of your own (except if YourDigitalLift already has a paying gym — then it is a product, run it separately).
- Google Ads / Meta Ads budget.

---

## 5. Positioning that can win in Bhopal

**Stop saying:** “A product studio that designs and ships web applications, mobile apps, SaaS platforms, and cloud management for founders.”

**Start saying (Hindi + English, same meaning):**

> Hum Bhopal ki team hain. Aapke business ke liye website, mobile app, aur jo software roz kaam aaye — 2–6 hafte mein, likha hua scope, aapke naam pe code.

**90-day wedge (pick one primary, one secondary):**

| Wedge | Why Bhopal | Offer | Do not also sell |
| --- | --- | --- | --- |
| **A. Education / coaching ops** | City is an exam-coaching capital | Institute site + enquiry form + fee reminder WhatsApp | Random D2C brands |
| **B. Gym / clinic membership** | You already have YourDigitalLift as a story | Membership + attendance + site | Enterprise cloud |
| **C. “14-day Business Site”** | Volume, cash, testimonials | Fixed ₹29,900–49,900 brochure + GBP + WhatsApp | Custom SaaS in the same sprint |

**Recommendation:** **C for cash, B as the productised path.** Education (A) is huge but relationship-heavy (owners are busy, price-sensitive, want everything yesterday). Gym/clinic is smaller but your case study already points there. Business Site is the **door opener**: 8 sites in 60 days teach you sales, collection, and reviews. Then upsell “ab app bhi bana dete hain.”

Cloud management as a standalone product is a **no** until someone already runs production with you. SMEs do not buy “cloud hygiene.”

---

## 6. Pricing (so you can answer on the phone)

Publish **starting from**. Always +GST. Always 50% advance.

| Package | What they get | Time | Price band (INR) | Advance |
| --- | --- | --- | --- | --- |
| **Spark Site** | 5–7 page business site, mobile, contact, WhatsApp, basic SEO, Google Business setup help | 10–14 days | ₹24,900–39,900 | 50% |
| **Growth Site** | Spark + blog/CMS, enquiry dashboard, speed, 1 month hypercare | 3–4 weeks | ₹49,900–89,900 | 50% |
| **Ops Web App** | Login, roles, 3–5 core workflows (fees, inventory, bookings) | 5–8 weeks | ₹1.5L–3.5L | 50/30/20 |
| **Mobile (RN)** | iOS+Android companion, only if a web backend exists or is in the same SOW | 6–10 weeks | ₹2.5L–6L | 50/30/20 |
| **SaaS slice** | Multi-tenant MVP, auth, one billing path | 8–12 weeks | ₹4L–8L | 40/30/30 |
| **Care retainer** | Fixes, small features, hosting watch | monthly | ₹12,000–35,000 | monthly advance |

**Rules**

- Below ₹20,000: only if it is a **referral seed** with a public review. Otherwise it trains the market that you are a freelancer on Steroids.
- Never quote SaaS on a first WhatsApp. Book a 30-min call, send SOW in 24h.
- If they say “Indore wale ₹8,000 mein WordPress de rahe hain”: *theek hai, unse le lijiye. Hum 14 din mein aapke naam pe, source code aapke Google account mein.* Then walk. You will lose 7/10 of those. You need the 3/10 who have been burned.
- Your 30% off, if you keep it: **only Spark Site, only first 5, expiry date on the site.**

Hourly (for extra work): ₹1,200–2,000/hr blended. Do not lead with hourly; Indians buy **packages**.

---

## 7. How to get leads in the next 14 days (in priority order)

This is the part that pays rent. Website polish does not.

### Day 1–2 — warm graph (you are leaving money on the table)

Each of the three of you writes **50 names**: family, college, previous internships, landlords, gym trainers, coaching teachers, CAs, cousins in business. That is 150. You do not ask “koi kaam hai?” You ask:

> Bhai, hum teen log Bhopal mein software/website firm start kar rahe hain (ZenWebStudio). Aapke circle mein koi shop, clinic, coaching, gym, factory hai jiski site purani hai ya WhatsApp pe chal rahi hai? Bas 1 naam.

Target: **15 introductions**. Convert 2–3 into paid Spark Sites. This is how 80% of first agencies start. Skipping it because it feels “unprofessional” is ego.

### Day 1–7 — Google Business + WhatsApp machine

- GBP: 10 photos (faces, laptops, MP Nagar tea, whiteboard). Post twice a week (“14-day website for Bhopal shops”).
- Ask every friend to **Google review** after the first tiny favour.
- WhatsApp Business catalog: Spark / Growth / Ops.
- Saved replies: price, timeline, “bhejiye 5-line brief.”
- Status: 1 screenshot of work daily. Local owners live on Status.

### Day 3–14 — feet on street (this beats ads in Bhopal)

Walk **MP Nagar Zone 1/2, Arera Colony, Kolar Road, Bittan Market, 10 No. Market**. Rule: **20 doors / day, 3 days / week.**

Script (60 seconds, Hindi, standing):

> Namaste, main Ayush, ZenWebStudio, yahin Bhopal se. Aapki Google listing / website dekhi — form kaam nahi kar raha / mobile pe toot rahi hai. Hum 14 din mein nayi site + WhatsApp button, ₹29,900, aadha ab aadha launch pe. 2 minute dikhaun?

Leave a **one-pager** (phone, QR to WhatsApp, 3 prices). Do not pitch SaaS to a namkeen shop.

Track: doors → conversations → WhatsApp saved → proposal → advance. If you cannot do this, you do not have a services business. You have a GitHub.

### Listings that still work in MP

- Justdial, Sulekha, IndiaMART (for manufacturers — “custom software”, “billing software”).
- IndiaMART is slow and full of junk RFQs. Reply in **2 hours** or don’t bother.
- Facebook groups: Bhopal Business Network, Bhopal Buy/Sell, apartment groups. No spam dumps. Offer a **free 15-min website teardown** (Loom or meet).

### Partnerships (week 2–4)

- **2 CAs in Bhopal** — they see every GST-registered SME that still runs on Excel. Offer them 10% referral on collected cash.
- **2 digital-marketing freelancers** who sell ads but cannot build. You are their backend. White-label if needed, but get the testimonial rights.
- **1 interior / architect / real-estate broker** — they constantly need microsites for projects.

### What not to do for leads in month 1

- Upwork/Fiverr as the **plan**. Use as overflow if a night-owl wants USD. It will not feed three people in Bhopal reliably at the start.
- Cold email “Dear Founder, we are a cutting-edge studio.” Deleted.
- LinkedIn connection → immediately pitch. LinkedIn is for **Indore/Pune/remote SaaS later**.
- Paid ads before 10 organic conversations a week.

### After you have 5 reviews

Then: SEO pages that match search intent — `website development company Bhopal`, `coaching website Bhopal`, `gym app Bhopal`. Your current copy will not rank for those because it never says the city or the job.

---

## 8. Sales and delivery operating system (3 people)

### Roles (write this on a wall)

| Person | Owns | Does not own |
| --- | --- | --- |
| **Ayush** | Pipeline, WhatsApp reply < 1h IST, proposals, collection, GBP | Endless coding while leads wait |
| **Deepak** | Scope estimate, staging URL every Friday, quality | Saying yes to extra features |
| **Shubham** | Only scoped AI/data features **or** pair on web until AI is sold | A parallel “AI product” |

If Ayush is the strongest coder, still make him **half-time sales** for 90 days. A studio with 3 people coding and 0 selling is a hobby club.

### Response SLA you already promised

The site says **24 hours**. Beat it: **1 hour on WhatsApp 10:00–19:00 IST**, next morning otherwise. Local buyers award the job to whoever replies while they are still standing in the shop.

### The only funnel

```
WhatsApp / form / walk-in
  → 15-min qualify (budget, deadline, decision-maker)
  → 24h written proposal (1–2 pages)
  → 50% advance + SOW signed (WhatsApp “haan, go” + PDF is enough)
  → Kickoff (Google Drive + GitHub org in THEIR email)
  → Weekly Friday demo link
  → Launch + 14-day hypercare
  → Ask review + 1 referral + retainer offer
```

Qualify hard. Walk away if: no budget, “idea hai, equity denge,” cousin will “help with UI,” or they want iOS+Android+admin+AI in 3 weeks for ₹40,000.

### Cash discipline

- No work on unpaid invoices. Freeze repo access if week-3 milestone is unpaid (say this in the SOW).
- Personal and firm UPI **separated** from day one.
- Keep **3 months of personal burn** if you can. If you cannot, **Spark Site volume** is not optional — it is survival.

### Capacity math (be honest)

One Growth Site ≈ 1 person × 3 weeks.  
One Ops App ≈ 2 people × 6–8 weeks.  
If you sign two Ops Apps, **stop sales** or you will slip both and lose reviews.

---

## 9. Website: what to change so it helps sales (not just looks expensive)

The prototype is **above average visually** for a Bhopal shop. That is a real asset. It is also **aimed at the wrong buyer** and **technically incomplete for production**.

Change in this order:

1. **Production lead path** — Supabase + email/WhatsApp notify. Test from the live domain, not localhost.
2. **NAP consistency** — Name, Address (Bhopal), Phone identical on site, GBP, Justdial, invoices.
3. **Prices in INR** on Services. CTA “WhatsApp on ₹29,900 site” next to “Start a Project.”
4. **Local proof** — map, city, Hindi testimonial when you have one.
5. **Honest work** — “Studio / spec” vs “Paid client.” Add stack and a live link or don’t call it shipped.
6. **JSON-LD** — `ProfessionalService` with `address.addressLocality: Bhopal`, `addressRegion: MP`, `priceRange: ₹₹`.
7. **Drop dead socials and fake GA.**
8. Stop leading the hero with four pillars. Lead with **one sentence + one price + WhatsApp**.

Do not add more Three.js. Buyers on Jio 4G in a coaching office do not care.

---

## 10. 90-day scoreboard (what “growing exceptionally” means at this stage)

Forget “exceptional” as in unicorn. Exceptional for a 3-person Bhopal shop in 90 days:

| Metric | Weak | Acceptable | Strong |
| --- | --- | --- | --- |
| Qualified conversations / week | < 3 | 8 | 15+ |
| Paid advances | 0 | 3 | 6+ |
| Collected cash (90 days) | < ₹50k | ₹1.5–3L | ₹5L+ |
| Google reviews | 0 | 5 | 12 |
| Live URLs you can show | 0–1 | 4 | 8 |
| Retainers | 0 | 1 | 3 |
| Active builds | chaos | ≤ 2 | 2 + waitlist |

If week 3 has **zero rupees** and you have been “improving the site,” the process is the problem, not the market.

---

## 11. Risks that actually kill this company

1. **Building Asklytics 2.0** instead of visiting shops.
2. **One jumbo unpaid SaaS** for a college friend.
3. **Co-founder drift** — no written split of equity, salary, and who can sign. Write a 2-page founders’ agreement this week (even on stamp paper later):  equal or not, vesting 1 year cliff, who owns the brand, what happens if someone takes a TCS job.
4. **Mixing personal UPI** — GST and partnership fights later.
5. **Hiring** because a project slipped. Overtime first, hire after ₹2L/month run-rate for 3 months.
6. **Indore/Bangalore cosplay** — English-only, no prices, “book a discovery call.” You will be invisible to the people who can pay you next month.

---

## 12. This week’s checklist (print)

**Monday**

- [ ] Founders’ 2-hour meeting: wedge (Spark Site + gym/clinic), prices, equity, who answers WhatsApp.
- [ ] Start GST + current account process (CA in Bhopal, ₹3–8k including GST filing setup).
- [ ] Buy/connect Google Workspace or Zoho on zenwebstudio.com.
- [ ] Wire Supabase leads + notification to WhatsApp/email.
- [ ] Remove fake GA and dead social links.

**Tuesday–Wednesday**

- [ ] GBP live with Bhopal address.
- [ ] WhatsApp Business catalog + 4 saved replies.
- [ ] 150-name warm list. 50 messages sent.
- [ ] One-pager PDF rate card.

**Thursday–Saturday**

- [ ] 20 doors × 3 days.
- [ ] 5 written proposals.
- [ ] 1 advance collected — even Spark Site.

**Sunday**

- [ ] Sheet updated. What failed. Next 20 doors.

---

## 13. What I will not tell you

I will not tell you that the prototype means you are “ready to scale,” that 30% off will create a queue, or that remote US clients will appear because the UI looks like a Dribbble shot. US clients appear after Indian proof, English case studies with metrics, and outbound — month 6+, not week 1.

I will tell you that **Bhopal will pay three disciplined engineers** who show up, quote in rupees, deliver in two weeks, and pick up the phone. That is the whole business. Everything else is decoration.

---

*Internal use. Not legal advice. Confirm GST/entity steps with a Bhopal CA before filing.*
