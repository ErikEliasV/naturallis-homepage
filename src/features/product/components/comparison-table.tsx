import Image from "next/image";

import { Container } from "@/components/layout/container";
import { COMPARISON } from "@/constants/product-page";
import { Reveal } from "@/features/motion/components/reveal";
import { RevealText } from "@/features/motion/components/reveal-text";
import { cn } from "@/utils/cn";

/** Product vs. alternatives table on a soft band (Figma bottom "Container", 1340 × 420). */
export function ComparisonTable({ productName }: { productName: string }) {
  const columns = [productName, ...COMPARISON.alternatives];

  return (
    <section aria-labelledby="comparison-title" className="bg-black/5 py-section">
      <Container width="shop">
        <Reveal
          y={60}
          className="grid overflow-hidden rounded-tile bg-white lg:mx-12.5 lg:grid-cols-[432fr_908fr]"
        >
          <div className="flex flex-col gap-4 p-10">
            <RevealText as="h2" id="comparison-title" className="font-display text-heading-xl">
              {COMPARISON.title}
            </RevealText>
            <p className="text-body text-black/70">{COMPARISON.description}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[40rem] border-collapse text-body">
              <thead>
                <tr>
                  <td className="h-17.5 border-b border-black/10 bg-surface-soft" />
                  {columns.map((column, index) => (
                    <th
                      key={column}
                      scope="col"
                      className={cn(
                        "h-17.5 border-b border-black/10 px-4 text-center font-display text-heading-sm font-normal",
                        index === 0 && "bg-surface-soft",
                      )}
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.rows.map((row) => (
                  <tr key={row.label}>
                    <th
                      scope="row"
                      className="h-17.5 border-b border-black/10 bg-surface-soft pr-4 pl-8 text-left font-normal"
                    >
                      {row.label}
                    </th>
                    {row.values.map((value, index) => (
                      <td
                        key={index}
                        className={cn(
                          "h-17.5 border-b border-black/10 px-4 text-center",
                          index === 0 && "bg-surface-soft",
                        )}
                      >
                        <Image
                          src={value ? "/icons/pdp/compare-yes.svg" : "/icons/pdp/compare-no.svg"}
                          alt={value ? "Sim" : "Não"}
                          width={26}
                          height={26}
                          className="mx-auto"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
