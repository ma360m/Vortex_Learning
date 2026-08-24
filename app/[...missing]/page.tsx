import { ComingSoonContent } from "@/components/vortex/coming-soon";
import { SiteShell } from "@/components/vortex/site-shell";

export const metadata = {
  title: "Coming Soon",
  description: "A planned Vortex Learning platform area that is being prepared.",
};

export default async function MissingPage({
  params,
}: {
  params: Promise<{ missing: string[] }>;
}) {
  const { missing } = await params;

  return (
    <SiteShell>
      <ComingSoonContent feature={missing.join(" ")} />
    </SiteShell>
  );
}
