
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center max-w-md px-4">
        <h1 className="text-6xl font-bold mb-4 gradient-text bg-clip-text text-transparent bg-gradient-to-r from-download-primary to-download-secondary">404</h1>
        <p className="text-xl text-foreground mb-6">Oops! This download couldn't be found</p>
        <p className="text-muted-foreground mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Button asChild className="download-button">
          <Link to="/">Return to Downloads</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
