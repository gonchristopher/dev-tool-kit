import type { CheatSheetDefinition } from '@/types'
import { createElement } from 'react'
import { PaintBrushIcon } from '@heroicons/react/24/outline'

export const cssCheatSheet: CheatSheetDefinition = {
  id: 'css',
  title: 'CSS',
  description: 'Essential CSS selectors, properties, layouts, and modern styling techniques',
  category: 'Development',
  tags: ['css', 'styling', 'web-development', 'flexbox', 'grid', 'responsive', 'animations'],
  lastUpdated: '2025-10-04',
  icon: createElement(PaintBrushIcon),
  sections: [
    {
      title: 'Selectors',
      items: [
        {
          title: 'Basic Selectors',
          code: `/* Element selector */
p { color: blue; }

/* Class selector */
.highlight { background-color: yellow; }

/* ID selector */
#header { font-size: 24px; }

/* Universal selector */
* { margin: 0; padding: 0; }

/* Multiple selectors */
h1, h2, h3 { font-family: Arial, sans-serif; }

/* Descendant selector */
.container p { line-height: 1.5; }

/* Child selector */
.nav > li { display: inline-block; }

/* Adjacent sibling */
h2 + p { margin-top: 0; }

/* General sibling */
h2 ~ p { color: gray; }`,
          description: 'CSS selector types and combinations'
        },
        {
          title: 'Pseudo-classes & Pseudo-elements',
          code: `/* Pseudo-classes */
a:hover { color: red; }
a:visited { color: purple; }
a:active { color: orange; }
input:focus { border-color: blue; }
li:first-child { font-weight: bold; }
li:last-child { border-bottom: none; }
li:nth-child(odd) { background-color: #f0f0f0; }
li:nth-child(3n+1) { color: red; }

/* Pseudo-elements */
p::first-line { font-weight: bold; }
p::first-letter { font-size: 2em; }
.tooltip::before {
    content: "Tip: ";
    font-weight: bold;
}
.tooltip::after {
    content: " ℹ️";
}`,
          description: 'Pseudo-classes for states and pseudo-elements for content'
        },
        {
          title: 'Attribute Selectors',
          code: `/* Attribute exists */
[data-active] { display: block; }

/* Attribute equals value */
[type="text"] { border: 1px solid gray; }

/* Attribute contains value */
[class~="button"] { cursor: pointer; }

/* Attribute starts with */
[href^="https://"] { color: green; }

/* Attribute ends with */
[src$=".jpg"] { border: 2px solid black; }

/* Attribute contains substring */
[alt*="logo"] { max-width: 200px; }

/* Case-insensitive matching */
[title*="important" i] { color: red; }`,
          description: 'Selecting elements based on attributes'
        }
      ]
    },
    {
      title: 'Box Model & Layout',
      items: [
        {
          title: 'Box Model Properties',
          code: `/* Box model */
.box {
    width: 300px;
    height: 200px;
    padding: 20px;           /* Inner spacing */
    border: 2px solid black; /* Border thickness and style */
    margin: 10px;            /* Outer spacing */
}

/* Box-sizing alternatives */
.content-box { box-sizing: content-box; } /* Default */
.border-box { box-sizing: border-box; }   /* Include padding/border */

/* Individual sides */
.element {
    margin-top: 10px;
    margin-right: 15px;
    margin-bottom: 10px;
    margin-left: 15px;
    /* Shorthand: margin: 10px 15px 10px 15px; */
    /* Shorthand: margin: 10px 15px; (vertical horizontal) */
}

/* Padding shorthand */
.padding-example {
    padding: 10px;           /* All sides */
    padding: 10px 20px;      /* Vertical horizontal */
    padding: 10px 20px 30px; /* Top horizontal bottom */
    padding: 10px 20px 30px 40px; /* Top right bottom left */
}`,
          description: 'Understanding and controlling the CSS box model'
        },
        {
          title: 'Display & Positioning',
          code: `/* Display types */
.block { display: block; }
.inline { display: inline; }
.inline-block { display: inline-block; }
.none { display: none; }
.flex { display: flex; }
.grid { display: grid; }

/* Position types */
.static { position: static; }    /* Default */
.relative { 
    position: relative; 
    top: 10px; 
    left: 20px; 
}
.absolute { 
    position: absolute; 
    top: 0; 
    right: 0; 
}
.fixed { 
    position: fixed; 
    bottom: 20px; 
    right: 20px; 
}
.sticky { 
    position: sticky; 
    top: 0; 
}

/* Z-index for layering */
.overlay { 
    position: absolute; 
    z-index: 100; 
}`,
          description: 'Display modes and positioning elements'
        }
      ]
    },
    {
      title: 'Flexbox',
      items: [
        {
          title: 'Flex Container',
          code: `.flex-container {
    display: flex;
    
    /* Direction */
    flex-direction: row;        /* Default: row, row-reverse, column, column-reverse */
    
    /* Wrapping */
    flex-wrap: nowrap;          /* Default: nowrap, wrap, wrap-reverse */
    
    /* Shorthand */
    flex-flow: row wrap;        /* flex-direction + flex-wrap */
    
    /* Horizontal alignment */
    justify-content: flex-start; /* flex-start, flex-end, center, space-between, space-around, space-evenly */
    
    /* Vertical alignment */
    align-items: stretch;       /* stretch, flex-start, flex-end, center, baseline */
    
    /* Multi-line alignment */
    align-content: flex-start;  /* Same values as justify-content */
    
    /* Gap between items */
    gap: 20px;                  /* Gap between all items */
    row-gap: 20px;             /* Gap between rows */
    column-gap: 10px;          /* Gap between columns */
}`,
          description: 'Flexbox container properties for layout control'
        },
        {
          title: 'Flex Items',
          code: `.flex-item {
    /* Growth factor */
    flex-grow: 1;               /* How much to grow (default: 0) */
    
    /* Shrink factor */
    flex-shrink: 1;             /* How much to shrink (default: 1) */
    
    /* Base size */
    flex-basis: auto;           /* Initial size (default: auto) */
    
    /* Shorthand */
    flex: 1 1 auto;             /* grow shrink basis */
    flex: 1;                    /* Common: flex-grow: 1 */
    
    /* Individual alignment */
    align-self: flex-end;       /* Override container's align-items */
    
    /* Order */
    order: 2;                   /* Change visual order (default: 0) */
}

/* Common flex patterns */
.flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.flex-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
}`,
          description: 'Flex item properties and common patterns'
        }
      ]
    },
    {
      title: 'CSS Grid',
      items: [
        {
          title: 'Grid Container',
          code: `.grid-container {
    display: grid;
    
    /* Define columns */
    grid-template-columns: 200px 1fr 100px;        /* Fixed, flexible, fixed */
    grid-template-columns: repeat(3, 1fr);          /* 3 equal columns */
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Responsive */
    
    /* Define rows */
    grid-template-rows: 100px auto 50px;           /* Header, content, footer */
    grid-template-rows: repeat(3, 100px);          /* 3 rows of 100px */
    
    /* Grid areas */
    grid-template-areas:
        "header header header"
        "sidebar main aside"
        "footer footer footer";
    
    /* Gaps */
    gap: 20px;                  /* Gap between all grid items */
    row-gap: 20px;             /* Gap between rows */
    column-gap: 10px;          /* Gap between columns */
    
    /* Alignment */
    justify-items: center;      /* Horizontal alignment of items */
    align-items: center;        /* Vertical alignment of items */
    justify-content: center;    /* Horizontal alignment of grid */
    align-content: center;      /* Vertical alignment of grid */
}`,
          description: 'CSS Grid container setup and configuration'
        },
        {
          title: 'Grid Items',
          code: `.grid-item {
    /* Column placement */
    grid-column-start: 1;
    grid-column-end: 3;
    grid-column: 1 / 3;         /* Shorthand */
    grid-column: 1 / span 2;    /* Span 2 columns */
    
    /* Row placement */
    grid-row-start: 2;
    grid-row-end: 4;
    grid-row: 2 / 4;            /* Shorthand */
    grid-row: 2 / span 2;       /* Span 2 rows */
    
    /* Area placement */
    grid-area: header;          /* Use named area */
    grid-area: 1 / 1 / 2 / 4;   /* row-start / col-start / row-end / col-end */
    
    /* Individual alignment */
    justify-self: start;        /* Horizontal alignment */
    align-self: end;            /* Vertical alignment */
    place-self: center;         /* Both alignments */
}

/* Grid line naming */
.named-lines {
    grid-template-columns: [sidebar-start] 250px [sidebar-end main-start] 1fr [main-end];
}

.item {
    grid-column: sidebar-start / main-end;
}`,
          description: 'Grid item placement and positioning'
        }
      ]
    },
    {
      title: 'Typography & Colors',
      items: [
        {
          title: 'Font Properties',
          code: `/* Font family */
.text {
    font-family: "Helvetica Neue", Arial, sans-serif;
    font-family: Georgia, "Times New Roman", serif;
    font-family: "Courier New", monospace;
}

/* Font size and weight */
.heading {
    font-size: 2rem;           /* Relative to root */
    font-size: 1.5em;          /* Relative to parent */
    font-size: 24px;           /* Absolute */
    font-weight: 400;          /* 100-900 or normal, bold */
    font-weight: bold;
}

/* Font style and variants */
.italic { font-style: italic; }
.small-caps { font-variant: small-caps; }

/* Line height and spacing */
.paragraph {
    line-height: 1.6;          /* Unitless multiplier (preferred) */
    letter-spacing: 0.1em;     /* Space between letters */
    word-spacing: 0.2em;       /* Space between words */
}

/* Text properties */
.text-formatting {
    text-align: center;        /* left, right, center, justify */
    text-decoration: underline; /* none, underline, line-through */
    text-transform: uppercase; /* lowercase, uppercase, capitalize */
    text-indent: 2em;          /* First line indentation */
}`,
          description: 'Typography control and text formatting'
        },
        {
          title: 'Colors & Backgrounds',
          code: `/* Color values */
.colors {
    color: #ff6600;            /* Hex */
    color: rgb(255, 102, 0);   /* RGB */
    color: rgba(255, 102, 0, 0.8); /* RGBA with alpha */
    color: hsl(24, 100%, 50%); /* HSL */
    color: hsla(24, 100%, 50%, 0.8); /* HSLA with alpha */
}

/* CSS custom properties (variables) */
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --font-size-large: 1.25rem;
}

.button {
    background-color: var(--primary-color);
    color: white;
    font-size: var(--font-size-large);
}

/* Background properties */
.background {
    background-color: #f8f9fa;
    background-image: url('pattern.png');
    background-repeat: no-repeat;
    background-position: center top;
    background-size: cover;
    background-attachment: fixed;
    
    /* Shorthand */
    background: #f8f9fa url('bg.jpg') no-repeat center / cover;
}

/* Gradients */
.gradient {
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    background: radial-gradient(circle, #ff6b6b, #4ecdc4);
}`,
          description: 'Color systems and background styling'
        }
      ]
    },
    {
      title: 'Responsive Design',
      items: [
        {
          title: 'Media Queries',
          code: `/* Mobile-first approach */
.container {
    width: 100%;
    padding: 15px;
}

/* Tablet */
@media (min-width: 768px) {
    .container {
        width: 750px;
        margin: 0 auto;
        padding: 20px;
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .container {
        width: 1000px;
        padding: 30px;
    }
}

/* Large desktop */
@media (min-width: 1440px) {
    .container {
        width: 1200px;
    }
}

/* Other media features */
@media (orientation: landscape) { /* Landscape orientation */ }
@media (max-height: 600px) { /* Maximum height */ }
@media print { /* Print styles */ }
@media (prefers-color-scheme: dark) { /* Dark mode preference */ }`,
          description: 'Responsive breakpoints and media queries'
        },
        {
          title: 'Responsive Units & Techniques',
          code: `/* Relative units */
.responsive {
    width: 100%;               /* Percentage of parent */
    max-width: 1200px;         /* Maximum width */
    font-size: 1rem;           /* Relative to root font-size */
    padding: 2em;              /* Relative to element font-size */
}

/* Viewport units */
.viewport {
    width: 100vw;              /* 100% of viewport width */
    height: 100vh;             /* 100% of viewport height */
    font-size: 4vw;            /* 4% of viewport width */
}

/* Responsive images */
.responsive-img {
    max-width: 100%;
    height: auto;
}

/* Container queries (modern browsers) */
@container (min-width: 400px) {
    .card {
        display: flex;
        flex-direction: row;
    }
}

/* Clamp for responsive typography */
.responsive-text {
    font-size: clamp(1rem, 2.5vw, 2rem); /* min, preferred, max */
}`,
          description: 'Responsive design techniques and units'
        }
      ]
    },
    {
      title: 'Animations & Transitions',
      items: [
        {
          title: 'Transitions',
          code: `/* Basic transition */
.button {
    background-color: blue;
    transition: background-color 0.3s ease;
}

.button:hover {
    background-color: red;
}

/* Multiple properties */
.card {
    transform: scale(1);
    opacity: 1;
    transition: transform 0.3s ease, opacity 0.2s linear;
}

.card:hover {
    transform: scale(1.05);
    opacity: 0.9;
}

/* Transition shorthand */
.element {
    /* property duration timing-function delay */
    transition: all 0.3s ease-in-out 0.1s;
}

/* Timing functions */
.timing-examples {
    transition-timing-function: ease;        /* Default */
    transition-timing-function: linear;      /* Constant speed */
    transition-timing-function: ease-in;     /* Slow start */
    transition-timing-function: ease-out;    /* Slow end */
    transition-timing-function: ease-in-out; /* Slow start and end */
    transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1); /* Custom */
}`,
          description: 'CSS transitions for smooth property changes'
        },
        {
          title: 'Animations & Transforms',
          code: `/* Keyframe animation */
@keyframes fadeIn {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in {
    animation: fadeIn 0.6s ease-out;
}

/* Animation properties */
.animated {
    animation-name: fadeIn;
    animation-duration: 2s;
    animation-timing-function: ease-in-out;
    animation-delay: 0.5s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-fill-mode: forwards;
    
    /* Shorthand */
    animation: fadeIn 2s ease-in-out 0.5s infinite alternate forwards;
}

/* Transform properties */
.transforms {
    transform: translateX(100px);           /* Move horizontally */
    transform: translateY(50px);            /* Move vertically */
    transform: translate(100px, 50px);      /* Move both directions */
    transform: scale(1.2);                  /* Scale uniformly */
    transform: scale(1.5, 0.8);            /* Scale width, height */
    transform: rotate(45deg);               /* Rotate */
    transform: skew(10deg, 5deg);           /* Skew */
    
    /* Multiple transforms */
    transform: translate(50px, 100px) rotate(45deg) scale(1.2);
    
    /* Transform origin */
    transform-origin: top left;             /* Rotation/scale point */
}`,
          description: 'CSS animations and 2D transforms'
        }
      ]
    }
  ]
}