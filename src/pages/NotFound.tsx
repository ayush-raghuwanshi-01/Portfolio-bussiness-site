import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/layout/Seo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Seo title="Page not found" description="That page does not exist on ZenWebStudio." path={location.pathname} />
      <section className="flex min-h-[70vh] items-center justify-center px-6 pt-28">
        <div className="max-w-lg text-center">
          <span className="eyebrow justify-center">404</span>
          <h1 className="mt-5 font-serif-display text-5xl">This route is not in the product.</h1>
          <p className="mt-4 text-foreground/65">
            The page you requested does not exist. Head home or talk to the studio.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="ember" className="rounded-full">
              <Link to="/">Back home</Link>
            </Button>
            <Button asChild variant="glass" className="rounded-full">
              <Link to="/contact">Contact</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
