import { LearningPlayer } from "@/components/vortex/learning-player";

export const metadata = {
  title: "Course Player",
  description:
    "Preview the Vortex Learning course player with video, notes, downloads, transcript, AI assistant, bookmarks, progress, reminders, assignments, discussion, quiz, and certificates.",
};

export default function PlayerPage() {
  return <LearningPlayer />;
}
