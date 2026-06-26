/**
 * Analytics event tracking facade.
 * Wire this to GTM / GA / Meta Pixel etc. later — for now it logs in dev.
 */

export type AnalyticsEvent =
  | "view_auction"
  | "view_lot"
  | "register_to_bid"
  | "start_seller_enquiry"
  | "submit_seller_enquiry"
  | "contact_auction_specialist"
  | "click_phone"
  | "click_email"
  | "subscribe_auction_alerts"
  | "download_auction_document"
  | "apply_auction_filter"
  | "search_auction_inventory";

export function trackEvent(name: AnalyticsEvent, props?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  // eslint-disable-next-line no-console
  console.debug("[analytics]", name, props ?? {});
  // window.dataLayer?.push({ event: name, ...props });
}
