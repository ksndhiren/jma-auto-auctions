# Aucto Auctions — Build Plan

This is a large, multi-page marketplace + lead-gen site. I'll build it in one pass but in a sensible order, using mock/demo data (clearly labelled) that's wired through typed interfaces so you can swap in real auction data later.

## Approach

**Design system first** (src/styles.css):
- Black (#000), JMA Gold (#F2A900), White, neutral greys per brand guide
- Heading: Archivo Black (Gotham Black alt). Body: Inter (Articulat alt). Loaded via `<link>` in __root.tsx.
- Tokens for gold accents, chevron details, thin borders, dark sections
- Custom Button variants (`gold`, `dark`, `outline-gold`) with arrow-on-hover
- Reusable section spacing scale

**Central config** (`src/config/site.ts`): phone, email, social, JMA attribution — single source.

**Typed data layer** (`src/data/`):
- `types.ts` — Auction, Lot, Category, Location, FAQ, Article, Testimonial interfaces
- `auctions.ts`, `lots.ts`, `categories.ts`, `faqs.ts`, `articles.ts`, `testimonials.ts` — demo data flagged `isDemo: true`

**Reusable components** (`src/components/`):
- Layout: `SiteHeader` (sticky, mobile drawer), `SiteFooter`, `Section`
- Auction: `AuctionCard`, `LotCard`, `CategoryCard`, `StatusBadge`, `Countdown`
- UI: `Chevron`, `ArrowCTA`, `TrustBar`, `ProcessTimeline`, `FAQAccordion`, `TestimonialCard`, `StatBlock`, `BrandLockup` (Aucto + JMA attribution text lock-up)
- Forms: `SellerEnquiryForm` (multi-step), `ContactForm`, `AuctionAlertForm`, `NewsletterForm` — all with validation, loading/success/error states, placeholder submit handlers
- States: `EmptyState`, `LoadingSkeleton`, `StickyMobileCTA`

**Routes** (file-based under `src/routes/`):
- `/` — homepage (hero, auction discovery, categories, buyer/seller pathways, why-choose, featured lots, about JMA, seller CTA, testimonials, resources, final CTA)
- `/auctions` — discovery with search/filters/sort, grid/list, mobile filter drawer
- `/auctions/$slug` — detail with sticky action panel + mobile sticky CTA
- `/lots/$slug` — lot detail with gallery, specs, disclaimer
- `/categories` and `/categories/$slug`
- `/how-to-buy` — step timeline + FAQ
- `/sell` — seller value prop + process + enquiry form
- `/about` — JMA relationship, expertise
- `/contact` — form + details + department selector
- `/faq` — grouped accordions
- `/resources` and `/resources/$slug` — article list + detail
- `/auction-alerts` — full alert signup
- Legal stubs: `/privacy`, `/terms`, `/accessibility`

**Images**: I'll generate 6–8 hero/category/lot images via the image tool (authentic auction/equipment style — wide environmental, asset detail, inspection). All have meaningful alt text. No fake testimonials or stats — clearly labelled placeholders.

**Logo**: The uploaded image is a tire+gavel mark for Aucto. I'll use it as the Aucto identity, paired with a "Powered by Jeff Martin Auctioneers" text lock-up (since no JMA logo file was supplied). Editable in `BrandLockup` component.

**Analytics**: Centralized `trackEvent(name, props)` stub with the event names listed (view_auction, submit_seller_enquiry, etc.).

**SEO**: Per-route `head()` with title/description/og tags. Sitemap.xml + robots.txt. JSON-LD organization on root.

**Accessibility**: Semantic landmarks, focus-visible, `prefers-reduced-motion` guards, accessible accordion/menu, alt text, no gold-on-white small body text.

**Responsive**: Mobile-first; tested layouts at 360/768/1024/1440.

## What I will NOT do without your confirmation

- Connect a real backend (Lovable Cloud) — forms use placeholder handlers
- Invent specific phone numbers, emails, addresses, statistics, or testimonials
- Create a separate Aucto wordmark beyond a text lock-up

## Deliverable checklist

At the end I'll report a table of: page · route · sections built · mobile ✓ · form status · placeholder content needing approval · integrations still required.

## Scope confirmation

The Google Sheet you linked requires auth to read programmatically; I'll build to the structure described in your brief (which covers all the pages and sections). If the sheet has additional pages or specific copy, share the relevant rows or export as CSV and I'll reconcile in a follow-up pass.

Approve and I'll build.
