import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const INNER_PATHS = new Set(["/services", "/work", "/about", "/contact", "/privacy", "/terms"]);

/**
 * Intercepts the browser/OS back button (desktop Alt+Left, mobile hardware
 * back, swipe-back) while on an inner page and redirects to the home page
 * instead of walking back through history or exiting the site.
 *
 * Strategy: whenever an inner page mounts, push a single sentinel history
 * entry pointing to the same URL. The next popstate (back) lands on the
 * original entry of the same page — we detect that and navigate home via
 * `replace: true` so no extra history entry is left.
 */
export function BackButtonToHome() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const pushedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!INNER_PATHS.has(pathname)) {
      pushedRef.current = null;
      return;
    }

    window.history.pushState({ __zenvio_backhome: pathname }, "", pathname);
    pushedRef.current = pathname;

    const onPop = () => {
      navigate("/", { replace: true });
    };

    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      // If we're unmounting because the user navigated forward in-app (e.g.
      // clicked the logo to go home, or clicked another nav link), clean up
      // the sentinel entry so the history stack stays tidy.
      if (pushedRef.current === pathname) {
        window.history.back();
      }
    };
  }, [pathname, navigate]);

  return null;
}
