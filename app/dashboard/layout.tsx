import { PortalGate } from "@/components/vortex/portal-gate";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalGate allowed={["student", "parent", "instructor", "admin"]}>
      {children}
    </PortalGate>
  );
}
