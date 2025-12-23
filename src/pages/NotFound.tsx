import { Link } from "react-router-dom";
import { Leaf, Home } from "lucide-react";
import BrandHeader from "@/components/BrandHeader";
import Footer from "@/components/Footer";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <BrandHeader />
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="text-center max-w-md">
          <Leaf className="h-12 w-12 text-primary mx-auto mb-6" />
          <h1 className="font-serif text-5xl md:text-6xl font-semibold mb-4">404</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Oops! The page you're looking for doesn't exist.
          </p>
          <Link to="/" className="btn inline-flex items-center gap-2">
            <Home className="h-4 w-4" />
            Return to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
