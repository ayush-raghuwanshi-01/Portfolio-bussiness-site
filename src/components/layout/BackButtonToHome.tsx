import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const INNER_PATHS = new Set(["/services", "/work", "/about", "/contact", "/privacy", "/terms"]);

/**
 * Intercepts the browser back button / Android hardware-back button while the
 * user is on an inner page and redirects to the home page (`/`).
 *
 * Covers:
 *  - Desktop Alt+Left / Backspace-when-focused-on-body
 *  - Mobile hardware back
 *  - Swipe-back gestures
 *  - Deep-link arrivals (typing `/services` directly, external share links) —
 *    a single sentinel history entry is pushed so the first back press is
 *    intercepted rather than immediately exiting the site.
 *
 * In-app `<Link>` clicks (including the logo) are unaffected — they use
 * normal router navigation.
 */
export function BackButtonToHome() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const sentinelPushedRef = useRef(false);

  useEffect(() => {
    const onInner = INNER_PATHS.has(pathname);
    if (!onInner) {
      sentinelPushedRef.current = false;
      return;
    }

    // If there's no prior in-app entry (deep link arrival) push a sentinel so
    // the first popstate is delivered to us instead of leaving the site.
    if (window.history.state?.__zenvio_sentinel !== true) {
      window.history.replaceState({ __zenvio_sentinel: true }, "", pathname);
      window.history.pushState({ __zenvio_inner: true, path: pathname }, "", pathname);
      sentinelPushedRef.current = true;
    }

    const onPop = () => {
      navigate("/", { replace: true });
    };

    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
    };
  }, [pathname, navigate]);

  return null;
}
