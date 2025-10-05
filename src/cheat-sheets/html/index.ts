import type { CheatSheetDefinition } from '@/types'
import { createElement } from 'react'
import { DocumentTextIcon } from '@heroicons/react/24/outline'

export const htmlCheatSheet: CheatSheetDefinition = {
  id: 'html',
  title: 'HTML',
  description: 'Essential HTML elements, attributes, and semantic markup for modern web development',
  category: 'Development',
  tags: ['html', 'markup', 'web-development', 'semantic', 'accessibility', 'html5'],
  lastUpdated: '2025-10-04',
  icon: createElement(DocumentTextIcon),
  sections: [
    {
      title: 'Document Structure',
      items: [
        {
          title: 'Basic HTML Document',
          code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title</title>
    <meta name="description" content="Page description for SEO">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>Header content</header>
    <main>Main content</main>
    <footer>Footer content</footer>
    <script src="script.js"></script>
</body>
</html>`,
          description: 'Complete HTML5 document structure with meta tags'
        },
        {
          title: 'Head Elements',
          code: `<head>
    <!-- Character encoding -->
    <meta charset="UTF-8">
    
    <!-- Viewport for responsive design -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- SEO meta tags -->
    <meta name="description" content="Page description">
    <meta name="keywords" content="html, css, javascript">
    <meta name="author" content="Your Name">
    
    <!-- Open Graph for social media -->
    <meta property="og:title" content="Page Title">
    <meta property="og:description" content="Page description">
    <meta property="og:image" content="image.jpg">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    
    <!-- Stylesheets -->
    <link rel="stylesheet" href="styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
</head>`,
          description: 'Essential head elements and meta tags'
        }
      ]
    },
    {
      title: 'Semantic Elements',
      items: [
        {
          title: 'Page Structure',
          code: `<!-- Main page structure -->
<header>
    <nav>
        <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </nav>
</header>

<main>
    <section>
        <h1>Page Title</h1>
        <article>
            <h2>Article Title</h2>
            <p>Article content...</p>
        </article>
    </section>
    
    <aside>
        <h3>Sidebar</h3>
        <p>Sidebar content...</p>
    </aside>
</main>

<footer>
    <p>&copy; 2025 Your Website</p>
</footer>`,
          description: 'Semantic HTML5 elements for page structure'
        },
        {
          title: 'Content Sections',
          code: `<!-- Article structure -->
<article>
    <header>
        <h1>Article Title</h1>
        <p>Published on <time datetime="2025-10-04">October 4, 2025</time></p>
        <p>By <address>John Doe</address></p>
    </header>
    
    <section>
        <h2>Introduction</h2>
        <p>Article introduction...</p>
    </section>
    
    <section>
        <h2>Main Content</h2>
        <p>Main article content...</p>
        
        <figure>
            <img src="image.jpg" alt="Descriptive alt text">
            <figcaption>Image caption</figcaption>
        </figure>
    </section>
    
    <footer>
        <p>Tags: <mark>HTML</mark>, <mark>Web Development</mark></p>
    </footer>
</article>`,
          description: 'Semantic elements for article content'
        }
      ]
    },
    {
      title: 'Text & Content',
      items: [
        {
          title: 'Headings & Text',
          code: `<!-- Headings hierarchy -->
<h1>Main Page Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>
<h4>Sub-subsection Title</h4>
<h5>Minor Heading</h5>
<h6>Smallest Heading</h6>

<!-- Text elements -->
<p>Regular paragraph text with <strong>strong emphasis</strong> and <em>italic emphasis</em>.</p>

<p>This text has <mark>highlighted</mark> words and <del>deleted text</del>.</p>

<p>Chemical formulas: H<sub>2</sub>O</p>
<p>Mathematical expressions: E = mc<sup>2</sup></p>

<!-- Quotes -->
<blockquote cite="https://example.com">
    <p>Long quotation that spans multiple lines...</p>
    <footer>— <cite>Author Name</cite></footer>
</blockquote>

<p>Short <q>inline quotation</q> within text.</p>`,
          description: 'Text formatting and semantic markup'
        },
        {
          title: 'Lists',
          code: `<!-- Unordered list -->
<ul>
    <li>First item</li>
    <li>Second item
        <ul>
            <li>Nested item</li>
            <li>Another nested item</li>
        </ul>
    </li>
    <li>Third item</li>
</ul>

<!-- Ordered list -->
<ol>
    <li>Step one</li>
    <li>Step two</li>
    <li>Step three</li>
</ol>

<!-- Description list -->
<dl>
    <dt>HTML</dt>
    <dd>HyperText Markup Language</dd>
    
    <dt>CSS</dt>
    <dd>Cascading Style Sheets</dd>
    
    <dt>JavaScript</dt>
    <dd>Programming language for web interactivity</dd>
</dl>`,
          description: 'Different types of lists in HTML'
        }
      ]
    },
    {
      title: 'Links & Media',
      items: [
        {
          title: 'Links & Navigation',
          code: `<!-- Basic links -->
<a href="https://example.com">External link</a>
<a href="/page.html">Internal link</a>
<a href="#section">Link to section on same page</a>
<a href="mailto:user@example.com">Email link</a>
<a href="tel:+1234567890">Phone link</a>

<!-- Link attributes -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
    Open in new tab (secure)
</a>

<a href="document.pdf" download="filename.pdf">Download link</a>

<!-- Navigation menu -->
<nav>
    <ul>
        <li><a href="/" aria-current="page">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
</nav>`,
          description: 'Links and navigation elements'
        },
        {
          title: 'Images & Media',
          code: `<!-- Responsive image -->
<img src="image.jpg" 
     alt="Descriptive alt text for accessibility"
     width="800" 
     height="600"
     loading="lazy">

<!-- Picture element for responsive images -->
<picture>
    <source media="(min-width: 768px)" srcset="large.jpg">
    <source media="(min-width: 480px)" srcset="medium.jpg">
    <img src="small.jpg" alt="Responsive image">
</picture>

<!-- Video element -->
<video controls width="640" height="360">
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
    <p>Your browser doesn't support video. <a href="video.mp4">Download the video</a>.</p>
</video>

<!-- Audio element -->
<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
    <source src="audio.ogg" type="audio/ogg">
    <p>Your browser doesn't support audio.</p>
</audio>`,
          description: 'Images, video, and audio elements'
        }
      ]
    },
    {
      title: 'Forms',
      items: [
        {
          title: 'Form Structure',
          code: `<form action="/submit" method="POST" enctype="multipart/form-data">
    <fieldset>
        <legend>Personal Information</legend>
        
        <div>
            <label for="name">Full Name:</label>
            <input type="text" id="name" name="name" required>
        </div>
        
        <div>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
        </div>
        
        <div>
            <label for="phone">Phone:</label>
            <input type="tel" id="phone" name="phone">
        </div>
    </fieldset>
    
    <fieldset>
        <legend>Preferences</legend>
        
        <div>
            <input type="checkbox" id="newsletter" name="newsletter" value="yes">
            <label for="newsletter">Subscribe to newsletter</label>
        </div>
        
        <div>
            <label for="country">Country:</label>
            <select id="country" name="country">
                <option value="">Select a country</option>
                <option value="us">United States</option>
                <option value="ca">Canada</option>
                <option value="uk">United Kingdom</option>
            </select>
        </div>
    </fieldset>
    
    <button type="submit">Submit Form</button>
</form>`,
          description: 'Complete form structure with fieldsets and labels'
        },
        {
          title: 'Input Types',
          code: `<!-- Text inputs -->
<input type="text" placeholder="Enter text">
<input type="password" placeholder="Enter password">
<input type="email" placeholder="user@example.com">
<input type="url" placeholder="https://example.com">
<input type="tel" placeholder="+1234567890">
<input type="search" placeholder="Search...">

<!-- Number inputs -->
<input type="number" min="0" max="100" step="1">
<input type="range" min="0" max="100" value="50">

<!-- Date and time -->
<input type="date">
<input type="time">
<input type="datetime-local">
<input type="month">
<input type="week">

<!-- File upload -->
<input type="file" accept="image/*" multiple>
<input type="file" accept=".pdf,.doc,.docx">

<!-- Checkboxes and radio buttons -->
<input type="checkbox" id="option1" name="options" value="1">
<label for="option1">Option 1</label>

<input type="radio" id="size-s" name="size" value="small">
<label for="size-s">Small</label>
<input type="radio" id="size-m" name="size" value="medium">
<label for="size-m">Medium</label>`,
          description: 'Various HTML5 input types and attributes'
        }
      ]
    },
    {
      title: 'Tables & Data',
      items: [
        {
          title: 'Table Structure',
          code: `<table>
    <caption>Sales Report Q4 2025</caption>
    <thead>
        <tr>
            <th scope="col">Product</th>
            <th scope="col">Units Sold</th>
            <th scope="col">Revenue</th>
            <th scope="col">Growth</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">Product A</th>
            <td>1,250</td>
            <td>$125,000</td>
            <td>+15%</td>
        </tr>
        <tr>
            <th scope="row">Product B</th>
            <td>850</td>
            <td>$85,000</td>
            <td>-5%</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <th scope="row">Total</th>
            <td>2,100</td>
            <td>$210,000</td>
            <td>+8%</td>
        </tr>
    </tfoot>
</table>`,
          description: 'Accessible table structure with proper semantics'
        },
        {
          title: 'Data Elements',
          code: `<!-- Details and summary for collapsible content -->
<details>
    <summary>Click to expand</summary>
    <p>Hidden content that can be toggled...</p>
</details>

<!-- Progress and meter elements -->
<progress value="75" max="100">75%</progress>
<meter value="8" min="0" max="10">8 out of 10</meter>

<!-- Data and time elements -->
<p>Meeting scheduled for <time datetime="2025-10-04T14:30">October 4th at 2:30 PM</time></p>

<p>The file size is <data value="1048576">1 MB</data></p>

<!-- Code and preformatted text -->
<p>Use the <code>console.log()</code> function to debug.</p>

<pre><code>function greet(name) {
    return "Hello, " + name;
}</code></pre>

<!-- Keyboard input -->
<p>Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy.</p>`,
          description: 'Semantic elements for data and interactive content'
        }
      ]
    }
  ]
}