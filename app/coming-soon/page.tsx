import { ComingSoonContent } from "@/components/vortex/coming-soon";
import { SiteShell } from "@/components/vortex/site-shell";

export const metadata = {
  title: "Coming Soon",
  description: "A planned Vortex Learning platform area that is being prepared.",
};

export default async function ComingSoonPage({
  searchParams,
}: {
  searchParams: Promise<{ feature?: string | string[] }>;
}) {
  const params = await searchParams;
  const feature = Array.isArray(params.feature) ? params.feature[0] : params.feature;

  return (
    <SiteShell>
      <ComingSoonContent feature={feature} />
    </SiteShell>
  );
}
