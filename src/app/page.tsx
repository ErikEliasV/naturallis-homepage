import { SITE } from "@/constants/site";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center gap-section-sm bg-forest px-gutter py-section text-white">
      <h1 className="max-w-[16ch] font-display text-display-lg">{SITE.tagline}</h1>
      <p className="max-w-[48ch] text-lead">{SITE.description}</p>
    </main>
  );
}
