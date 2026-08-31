import { Ticket, type LucideIcon } from "lucide-react";

export function PortalRecordEmptyState({
  title,
  description,
  icon: Icon = Ticket,
}: {
  title: string;
  description: string;
  icon?: LucideIcon;
}) {
  return (
    <div className="rounded-[1.35rem] border border-vortex-border bg-white p-6 text-center shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
      <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-vortex-blue/10 text-vortex-blue">
        <Icon className="size-5" />
      </span>
      <h3 className="mt-4 font-heading text-3xl font-semibold text-vortex-navy">{title}</h3>
      <p className="mx-auto mt-2 max-w-2xl text-sm leading-7 text-vortex-muted">{description}</p>
    </div>
  );
}
