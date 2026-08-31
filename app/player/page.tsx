import { redirect } from "next/navigation";

export const metadata = {
  title: "Course Preview",
  description:
    "Preview the Vortex Learning course workspace with lessons, notes, downloads, transcript, AI assistant, bookmarks, progress, reminders, assignments, discussion, quiz, and certificates.",
};

export default function PlayerPage() {
  redirect("/preview/physics");
}
