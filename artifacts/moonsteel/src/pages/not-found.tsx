import { AlertTriangle, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      
      <div className="relative z-10 max-w-md mx-4 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-destructive/10 rounded-full mb-6 border border-destructive/20">
          <AlertTriangle className="h-8 w-8 text-destructive" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4 tracking-tight">
          Page Not Found
        </h1>
        
        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
          The specification you're looking for doesn't exist or has been moved.
        </p>

        <Link href="/" className="inline-flex items-center justify-center h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold uppercase tracking-wide text-sm transition-colors group">
          <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Return to Home
        </Link>
      </div>
    </div>
  );
}
