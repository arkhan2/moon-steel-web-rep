import { Phone, Mail, MapPin, Clock } from "lucide-react";
import logoUrl from "@assets/ms3-logo.svg";

export function Footer() {
  return (
    <footer className="bg-muted text-foreground pt-16 pb-8 border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src={logoUrl}
                alt="Moon Steel Fabricators"
                className="w-10 h-10 object-contain"
              />
              <span className="font-display font-semibold text-xl tracking-tight text-foreground">
                MOON STEEL
              </span>
            </div>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              Precision stainless steel fabrication for commercial kitchens, hospitals, and industrial facilities. Built with certified SS 304. No compromises.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-6 text-sm">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>
                  Plot 142, Sector 24, Korangi Industrial Area<br />
                  Karachi-Pakistan
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+922135121145" className="hover:text-primary transition-colors">+92-21-35121145-46</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:info@moonsteelfab.com" className="hover:text-primary transition-colors">info@moonsteelfab.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-6 text-sm">Hours</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Clock className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="text-foreground font-medium mb-1">Monday - Saturday</p>
                  <p>9:00 AM - 6:00 PM</p>
                  <p className="mt-2 text-foreground font-medium mb-1">Sunday</p>
                  <p>Closed</p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-6 text-sm">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#products" className="text-sm text-muted-foreground hover:text-primary transition-colors">Products & Specs</a></li>
              <li><a href="#comparison" className="text-sm text-muted-foreground hover:text-primary transition-colors">Material Comparison</a></li>
              <li><a href="#projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">Project Portfolio</a></li>
              <li><a href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Request a Quote</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Moon Steel Fabricators. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

    </footer>
  );
}