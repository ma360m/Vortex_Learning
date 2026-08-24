import { KeyRound, ShieldCheck } from "lucide-react";

export function PasswordSettingsPanel({
  action,
  returnTo,
}: {
  action: string;
  returnTo: string;
}) {
  return (
    <section className="rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-2xl bg-vortex-blue/10 text-vortex-blue">
              <KeyRound className="size-5" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase text-vortex-blue">Account security</p>
              <h2 className="mt-1 font-heading text-3xl font-semibold text-vortex-navy">
                Change password
              </h2>
            </div>
          </div>
          <p className="mt-4 text-sm leading-7 text-vortex-muted">
            Update the password for your signed-in Vortex Learning account.
          </p>
          <div className="mt-5 rounded-2xl bg-vortex-soft p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-vortex-navy">
              <ShieldCheck className="size-4 text-vortex-blue" />
              Protected account action
            </div>
            <p className="mt-2 text-xs leading-6 text-vortex-muted">
              Passwords must be at least 8 characters and different from the current password.
            </p>
          </div>
        </div>

        <form action={action} method="post" className="grid gap-4 rounded-2xl bg-vortex-soft p-5">
          <input type="hidden" name="intent" value="password-change" />
          <input type="hidden" name="returnTo" value={returnTo} />
          <label className="grid gap-2 text-sm font-semibold text-vortex-navy">
            Current password
            <input
              name="current_password"
              type="password"
              required
              minLength={8}
              className="h-11 rounded-2xl border border-vortex-border bg-white px-4 text-sm outline-none transition focus:border-vortex-cyan focus:ring-4 focus:ring-vortex-cyan/15"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-vortex-navy">
            New password
            <input
              name="new_password"
              type="password"
              required
              minLength={8}
              className="h-11 rounded-2xl border border-vortex-border bg-white px-4 text-sm outline-none transition focus:border-vortex-cyan focus:ring-4 focus:ring-vortex-cyan/15"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-vortex-navy">
            Confirm new password
            <input
              name="confirm_password"
              type="password"
              required
              minLength={8}
              className="h-11 rounded-2xl border border-vortex-border bg-white px-4 text-sm outline-none transition focus:border-vortex-cyan focus:ring-4 focus:ring-vortex-cyan/15"
            />
          </label>
          <button type="submit" className="btn-primary h-11 w-fit px-5">
            <KeyRound className="size-4" />
            Update password
          </button>
        </form>
      </div>
    </section>
  );
}
