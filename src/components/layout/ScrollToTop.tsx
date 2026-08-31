import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Scroll to top first
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" in window ? "instant" : "auto" });
      return;
    }

    // For hash navigation, wait for content to render then scroll
    const id = hash.replace("#", "");
    const scrollToElement = () => {
      const element = document.getElementById(id);
      if (element) {
        // Calculate offset for fixed header
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          left: 0,
          behavior: "smooth"
        });
      }
    };

    // Try scrolling immediately, then retry after a short delay for lazy-loaded content
    const timers: NodeJS.Timeout[] = [];
    
    // Immediate attempt
    scrollToElement();
    
    // Retry after 100ms in case content is still loading
    timers.push(window.setTimeout(scrollToElement, 100));
    // Retry after 300ms for slower connections
    timers.push(window.setTimeout(scrollToElement, 300));
    // Retry after 500ms for lazy-loaded images/components
    timers.push(window.setTimeout(scrollToElement, 500));

    return () => {
      timers.forEach(t => window.clearTimeout(t));
    };
  }, [pathname, hash]);

  return null;
};
