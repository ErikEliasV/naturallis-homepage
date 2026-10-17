import { Container } from "@/components/layout/container";
import { TESTIMONIALS } from "@/constants/home";
import { Carousel } from "@/features/carousel/components/carousel";
import { CarouselArrows } from "@/features/carousel/components/carousel-arrows";
import { CarouselProgress } from "@/features/carousel/components/carousel-progress";
import { CarouselTrack } from "@/features/carousel/components/carousel-track";
import { Reveal } from "@/features/motion/components/reveal";
import { RevealText } from "@/features/motion/components/reveal-text";
import { TestimonialCard } from "@/features/testimonials/components/testimonial-card";

/** "Cuidado que também se percebe no atendimento" (Figma testimonials container). */
export function HomeTestimonials() {
  return (
    <section
      id="depoimentos"
      aria-labelledby="home-testimonials-title"
      className="scroll-mt-header-space pt-section-sm pb-section"
    >
      <Container>
        <div className="flex flex-wrap items-start gap-x-7 gap-y-3 pb-card-gap">
          <RevealText
            as="h2"
            id="home-testimonials-title"
            className="max-w-[12.3em] font-display text-display-md"
          >
            Cuidado que também se percebe no atendimento.
          </RevealText>
          <RevealText as="p" delay={0.1} className="max-w-[14em] text-body-lg text-slate">
            Conheça as experiências de quem já comprou na Naturallis.
          </RevealText>
        </div>

        <Carousel label="Depoimentos">
          <Reveal>
            <CarouselTrack
              className="-mr-gutter gap-2.5 pr-gutter"
              slideClassName="w-testimonial-card"
            >
              {TESTIMONIALS.map((testimonial) => (
                <TestimonialCard key={testimonial.title} testimonial={testimonial} />
              ))}
            </CarouselTrack>
          </Reveal>
          <div className="mt-7 flex items-center justify-between gap-6">
            <CarouselProgress />
            <CarouselArrows />
          </div>
        </Carousel>
      </Container>
    </section>
  );
}
