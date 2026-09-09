import { redirect } from "next/navigation";

export const metadata = {
  title: "Community and Support",
  description:
    "Vortex Learning community and support spaces are merged into one support page for discussions, instructor help, AI guidance, tickets, and parent/student communication.",
};

export default function CommunityPage() {
  redirect("/faqs");
}
