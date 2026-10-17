import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { SITE } from "@/constants/site";

export const alt = `${SITE.name} | ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const [logo, nohemi] = await Promise.all([
    readFile(join(process.cwd(), "public/brand/logo-light.svg"), "base64"),
    readFile(join(process.cwd(), "public/fonts/nohemi/nohemi-regular.otf")),
  ]);

  return new ImageResponse(
    <div tw="flex h-full w-full flex-col justify-between bg-[#0b2a1b] p-[72px] text-white">
      {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain img only */}
      <img src={`data:image/svg+xml;base64,${logo}`} alt="" width={420} height={93} />
      <div tw="flex flex-col">
        <div tw="text-[72px] leading-none">{SITE.tagline}</div>
        <div tw="mt-8 h-2 w-64 rounded-full bg-[#e3f6a4]" />
      </div>
    </div>,
    {
      ...size,
      fonts: [{ name: "Nohemi", data: nohemi, style: "normal", weight: 400 }],
    },
  );
}
