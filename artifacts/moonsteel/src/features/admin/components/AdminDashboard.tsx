"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AdminTabKey } from "@/features/admin/types";
import { CustomerLogosTab } from "@/features/admin/components/CustomerLogosTab";
import { HeroImagesTab } from "@/features/admin/components/HeroImagesTab";

type TabConfig = {
  key: AdminTabKey;
  label: string;
  placeholder?: boolean;
};

const tabConfig: TabConfig[] = [
  { key: "customer-logos", label: "Customer Logos" },
  { key: "hero-images", label: "Hero Images" },
  { key: "products", label: "Products", placeholder: true },
  { key: "projects", label: "Projects", placeholder: true },
  { key: "testimonials", label: "Testimonials", placeholder: true },
];

function PlaceholderTab({ title }: { title: string }) {
  return (
    <Card className="layer-1">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">This module is ready for future implementation.</p>
      </CardContent>
    </Card>
  );
}

export function AdminDashboard() {
  return (
    <Tabs defaultValue="customer-logos" className="w-full">
      <TabsList className="mb-4 h-auto w-full justify-start gap-2 overflow-x-auto rounded-lg p-1">
        {tabConfig.map((tab) => (
          <TabsTrigger key={tab.key} value={tab.key} className="shrink-0">
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabConfig.map((tab) => (
        <TabsContent key={tab.key} value={tab.key}>
          {tab.key === "customer-logos" ? (
            <CustomerLogosTab />
          ) : tab.key === "hero-images" ? (
            <HeroImagesTab />
          ) : (
            <PlaceholderTab title={tab.label} />
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}
