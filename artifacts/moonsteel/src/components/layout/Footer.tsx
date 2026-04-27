import { Phone, Mail, MapPin, Clock } from "lucide-react";
import logoUrl from "@assets/ms3_1777279757146.png";

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
              <span className="font-display font-bold text-xl tracking-tight text-foreground">
                MOON STEEL
              </span>
            </div>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              Precision stainless steel fabrication for commercial kitchens, hospitals, and industrial facilities. Built with certified SS 304. No compromises.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-foreground mb-6 uppercase tracking-wider text-sm">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>
                  Plot No. 45, Sector 15, Korangi Industrial Area<br />
                  Karachi, Pakistan
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+923000000000" className="hover:text-primary transition-colors">+92 300 0000000</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:quotes@moonsteelfab.com" className="hover:text-primary transition-colors">quotes@moonsteelfab.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-foreground mb-6 uppercase tracking-wider text-sm">Hours</h4>
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
            <h4 className="font-display font-bold text-foreground mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
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

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/923000000000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50"
        aria-label="Contact on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.338.101.158.453.733.974 1.197.67.599 1.24.786 1.398.873.159.087.253.072.347-.029.094-.101.398-.461.506-.619.108-.158.217-.13.361-.072.144.058.913.433 1.072.519.159.087.26.13.298.202.038.072.038.419-.106.824z" />
        </svg>
      </a>
    </footer>
  );
}