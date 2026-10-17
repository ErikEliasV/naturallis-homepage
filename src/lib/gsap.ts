import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { DURATION, EASE } from "@/constants/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

gsap.defaults({ ease: EASE.out, duration: DURATION.enter });

ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger, useGSAP };
