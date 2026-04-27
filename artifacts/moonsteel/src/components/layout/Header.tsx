import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
const logoUrl = "/ms3-logo.svg";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Products", href: "#products" },
    { name: "Comparison", href: "#comparison" },
    { name: "Process", href: "#process" },
    { name: "Projects", href: "#projects" },
  ];

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-border py-3 shadow-sm"
          : "bg-background/65 backdrop-blur-xl border-border/60 py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <img
              src={logoUrl}
              alt="Moon Steel Fabricators"
              className="w-9 h-9 object-contain"
            />
            <div className="leading-none text-center">
              <span className="moonsteel-wordmark block font-display font-semibold text-xl tracking-tight text-foreground">
                MOON-STEEL
              </span>
              <span className="moonsteel-subline hidden mt-1 text-[10px] font-medium text-muted-foreground">
                FABRICATORS
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </button>
            ))}
            <Button
              onClick={() => scrollTo("#contact")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-sm"
            >
              Request Quote
            </Button>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-sm py-4 px-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.href)}
              className="text-left text-lg font-medium text-foreground py-2 border-b border-border/50"
            >
              {link.name}
            </button>
          ))}
          <Button
            onClick={() => scrollTo("#contact")}
            className="w-full mt-2 bg-primary text-primary-foreground font-medium"
          >
            Request Quote
          </Button>
        </div>
      )}
    </header>
  );
}