import { redirect } from "next/navigation";

export const metadata = {
  title: "Course Preview",
  description:
    "Preview the Vortex Learning course workspace with lessons, notes, resources, transcript, AI assistant, assignments, discussion, quiz, learning journey, and platform modules.",
};

export default function PreviewPage() {
  redirect("/preview/physics");
}
