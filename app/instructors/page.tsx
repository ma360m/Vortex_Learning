import { redirect } from "next/navigation";

export const metadata = {
  title: "Instructors",
  description:
    "Explore Vortex Learning instructor profiles, courses, ratings, experience, biographies, subjects, availability, certificates, and consultation booking.",
};

export default function InstructorsPage() {
  redirect("/team#instructors");
}
