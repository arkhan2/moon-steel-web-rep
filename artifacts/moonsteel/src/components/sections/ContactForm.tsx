import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock, FileUp, Send } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  company: z.string().min(2, "Company name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Invalid email address"),
  projectType: z.string().min(1, "Please select a project type"),
  message: z.string().min(10, "Please provide some project details"),
});

export function ContactForm() {
  const { toast } = useToast();
  const [fileName, setFileName] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      company: "",
      phone: "",
      email: "",
      projectType: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Quote Request Received",
      description: "We'll get back to you within 24 hours.",
    });
    
    form.reset();
    setFileName(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 max-w-6xl mx-auto">
          
          {/* Contact Info Panel */}
          <div className="lg:col-span-2 space-y-8 bg-muted text-foreground p-8 md:p-10 rounded-lg border border-border">
            <div>
              <h2 className="text-3xl font-display font-bold mb-4">Let's Build It Right.</h2>
              <p className="text-muted-foreground">
                Get a custom fabrication quote in 24 hours. No obligations. Just precise engineering and clear pricing.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Factory Location</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Plot No. 45, Sector 15<br />
                    Korangi Industrial Area<br />
                    Karachi, Pakistan
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Direct Line</h4>
                  <a href="tel:+923000000000" className="text-muted-foreground text-sm hover:text-primary transition-colors">+92 300 0000000</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Email</h4>
                  <a href="mailto:quotes@moonsteelfab.com" className="text-muted-foreground text-sm hover:text-primary transition-colors">quotes@moonsteelfab.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Business Hours</h4>
                  <p className="text-muted-foreground text-sm">Mon - Sat: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-border mt-8">
              <a 
                href="https://wa.me/923000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 bg-[#25D366] hover:bg-[#1DA851] text-white rounded-md font-semibold transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 lg:pl-8">
            <h3 className="text-2xl font-display font-bold mb-6 text-foreground">Request a Quote</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} className="bg-card" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company / Business</FormLabel>
                        <FormControl>
                          <Input placeholder="Acme Hospitality" {...field} className="bg-card" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} className="bg-card" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+92 300 0000000" {...field} className="bg-card" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="projectType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-card">
                            <SelectValue placeholder="Select a project category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="commercial-kitchen">Commercial Kitchen</SelectItem>
                          <SelectItem value="exhaust-system">Exhaust System</SelectItem>
                          <SelectItem value="sinks-tables">Sinks & Tables</SelectItem>
                          <SelectItem value="custom-fabrication">Custom Fabrication</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Details</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Please provide dimensions, specific requirements, or the scope of work..." 
                          className="min-h-[120px] bg-card"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <Label>Attach Drawings (Optional)</Label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center justify-center gap-2 px-4 py-2 border border-dashed border-border rounded cursor-pointer hover:bg-muted/50 transition-colors w-full md:w-auto">
                      <FileUp className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Upload File</span>
                      <input 
                        type="file" 
                        accept=".pdf,.dxf,.dwg,.jpg,.jpeg,.png"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                    {fileName && (
                      <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                        {fileName}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">Accepts .pdf, .dxf, .dwg, .jpg, .png</p>
                </div>

                <Button type="submit" size="lg" className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold group h-12 px-8">
                  <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Submit Request
                </Button>
              </form>
            </Form>
          </div>

        </div>
      </div>
    </section>
  );
}
