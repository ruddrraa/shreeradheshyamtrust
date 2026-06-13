import { Container } from "@/components/ui/Container";

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export function LegalPageLayout({
  title,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  return (
    <div className="pt-40 pb-32 bg-white min-h-screen">
      <Container className="max-w-4xl">
        <div className="mb-14">
          <h1 className="font-display text-4xl md:text-5xl text-charcoal font-normal tracking-tight">
            {title}
          </h1>
          <p className="mt-4 text-sm text-charcoal/50 uppercase tracking-widest font-medium">
            Last Updated: {lastUpdated}
          </p>
          <div className="mt-8 luxe-divider" aria-hidden />
        </div>
        <div className="space-y-6 text-muted font-light leading-relaxed [&>h2]:text-2xl [&>h2]:font-display [&>h2]:text-charcoal [&>h2]:mt-12 [&>h2]:mb-6 [&>h3]:text-lg [&>h3]:font-medium [&>h3]:text-charcoal [&>h3]:mt-8 [&>h3]:mb-4 [&>ul]:list-disc [&>ul]:pl-5 [&>ul>li]:mb-2 [&>a]:text-gold [&>a]:underline">
          {children}
        </div>
      </Container>
    </div>
  );
}
