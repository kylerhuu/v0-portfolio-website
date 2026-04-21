import { SiteFooter } from "@/components/site-footer";

export default function SiteGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      <SiteFooter />
    </>
  );
}
