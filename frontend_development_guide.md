# Frontend Engineering & Design Implementation Guide: Vintage Engraved UI/UX

This guide details how to build and engineer a modern web frontend that replicates the aesthetic, architectural, and interaction patterns of a vintage, engraved print design system (exemplified by the Meridian project).

## 1. Architectural Blueprint & Setup

To achieve a seamless, high-end editorial feel, your frontend architecture must prioritize layout containment, performant media handling, and precise typography scaling.

### Core CSS Reset & Design Tokens

Establish your foundational design tokens using CSS custom properties (`:root`). This ensures consistent translation of vintage print terminology (papers, inks) into digital color spaces.

```css
:root {
  --paper: #ebeee7;       /* Muted sage paper background */
  --ink: #2b3a30;         /* Deep iron-gall green for primary text/lines */
  --ink-soft: #3d4a41;    /* Softened green for body/taglines */
  --muted: #6b746c;       /* Muted tone for subtle copyright details */
  
  --serif: "Fraunces", Georgia, serif;
  --sans: "Inter", system-ui, -apple-system, sans-serif;
}

*, *::before, *::after {
  box-sizing: border-box;
}

body {
  background-color: var(--paper);
  color: var(--ink);
  font-family: var(--sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  overflow-x: hidden;
}
```

## 2. Implementing the Engraved Print Effect via CSS Blend Modes

The hallmark of this style is making digital assets look like they are printed directly onto textured or tinted paper stock rather than floating in a digital iframe.

### The `mix-blend-mode: multiply` Technique

When using transparent or white-background video scans, illustrations, or vector textures, use the multiply blend mode to let the paper background bleed through light areas while keeping dark ink lines opaque.

```css
.engraving-container {
  position: relative;
  background-color: var(--paper);
  isolation: isolate; /* Creates a new stacking context for blending */
}

.engraving-media {
  width: 100%;
  height: auto;
  object-fit: cover;
  mix-blend-mode: multiply; /* White video background vanishes into --paper */
  pointer-events: none;
  user-select: none;
}
```

## 3. Responsive Navigation & Grid Adaptations

Vintage layouts require strict structural alignment. On desktop, items should flow horizontally with delicate separators; on restricted viewports, they must adapt to clean structural grids to prevent messy wrapping or orphaned elements.

### Progressive Layout Switching

* **Desktop:** Single-line flex layout with custom bullet dot pseudo-elements (`li + li::before`).
* **Tablet (max-width: 900px):** 4-column CSS Grid layout; hide dot separators.
* **Mobile (max-width: 600px):** 2-column CSS Grid layout with expanded touch targets.

```css
/* Desktop Base Navigation */
.nav__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav__item + .nav__item::before {
  content: "";
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: var(--ink);
  margin: 0 clamp(16px, 1.8vw, 24px);
}

/* Tablet & Mobile Breakpoints */
@media (max-width: 900px) {
  .nav__list {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 12px 16px;
    max-width: 560px;
    margin: 0 auto;
  }
  .nav__item + .nav__item::before {
    display: none; /* Strip out dots for clean grid alignment */
  }
}

@media (max-width: 600px) {
  .nav__list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    max-width: 320px;
  }
}
```

## 4. Micro-Interactions: The Animated Print Underline

To emulate the deliberate motion of a pen stroke or printing press reveal, implement a scale-transform underline transition for navigation links.

```css
.nav__link {
  position: relative;
  color: var(--ink);
  text-decoration: none;
  font-size: clamp(14px, 1.1vw, 15px);
  padding: 4px 0;
}

.nav__link::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background-color: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav__link:hover::after,
.nav__link:focus-visible::after {
  transform: scaleX(1);
}
```

## 5. Performance, Viewport Locking, & Accessibility

### Viewport Height Standardization

To ensure the UI acts as a precise full-screen immersive module without causing vertical document scrolls, implement modern viewport units combined with standard fallbacks:

```css
.viewport-module {
  height: 100vh;
  height: 100svh; /* Overrides mobile browser address bar layout shifts */
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
```

### Motion Sensitivity & Intersection Observer Management

Always respect user accessibility flags for reduced motion and optimize video resource consumption using an `IntersectionObserver` so off-screen animations pause automatically:

```javascript
document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector(".engraving-media");
  if (!video) return;

  // Check user motion preference
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    video.removeAttribute("autoplay");
    video.pause();
    return;
  }

  // Observe element visibility to control CPU/battery usage
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.15 });

  observer.observe(video);
});