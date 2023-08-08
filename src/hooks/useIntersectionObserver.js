import { useEffect } from "react";

export default function useIntersectionOberserver(
  threshold = 0.4,
  rootMargin = "200px"
) {
  useEffect(() => {
    const sections = document.querySelectorAll(".track");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("show", entry.isIntersecting);
          if (entry.isIntersecting) observer.unobserve(entry.target);
        });
      },
      {
        threshold: threshold,
        rootMargin: rootMargin,
      }
    );

    sections.forEach((section) => observer.observe(section));
  }, []);
}
