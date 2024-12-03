---

title: "Gatsby Portfolio with Blog and Projects"
description: "Discover a stunning GatsbyJS portfolio site, optimized for SEO with Tailwind CSS and Daisy UI. Featuring dynamic content generation, a blog section, project showcases, and advanced SEO features like schema markup and Google Analytics integration. Perfect for developers seeking a professional online presence."
tags: ["GatsbyJS", "SEO", "Tailwind CSS", "React", "Portfolio", "Blog"]
image: "./assets/portfolio-and-blog-site-gatsby.png"
isNew: true
link: "https://github.com/ankitsamaddar/my-portfolio-blog-site-gatsby"

---

🚀 A beautifully crafted portfolio site built with GatsbyJS React Framework, Tailwind CSS, and Daisy UI, featuring dynamic content generation, SEO optimizations, and an elegant user interface with dark and light theme. This site includes a blog section, project showcases, a contact form, and advanced SEO features like schema markup and Google Analytics integration. Perfect for developers looking to create a personal or professional online presence.

## Project Structure

This portfolio site is built from scratch using the Gatsby starter template. It includes five main pages: `index`, `projects`, `blogs`, `tags`, and `contact`. The site is designed to showcase projects and blogs written in Markdown, processed dynamically by Gatsby's transformer remark plugin

```
├── markdown
│   ├── blogs
│   │   └── ...
│   └── projects
│       └── .....
├── src
│   ├── components
│   │   ├── contactForm.js
│   │   ├── graphComment.js
│   │   ├── projectCarousel.js
│   │   ├── SeoComponent.js
│   │   ├── ....
│   ├── pages
│   │   ├── 404.js
│   │   ├── blogs.js
│   │   ├── contact.js
│   │   ├── index.js
│   │   ├── projects.js
│   │   └── tags.js
│   ├── styles
│   │   └── global.css
│   └── templates
│       ├── blog-template.js
│       └── tag-template.js
├── gatsby-browser.js
├── gatsby-config.js
├── gatsby-node.js
├── package.json
├── postcss.config.js
└── tailwind.config.js
```

### 📚 Dynamic Content Generation

The blog and project contents are written in Markdown and processed by Gatsby's `gatsby-transformer-remark` plugin to generate dynamic pages.

- Each Markdown file is parsed into a node of type `MarkdownRemark`.

- This plugin adds additional fields to the `MarkdownRemark` GraphQL type including `html`, `excerpt`, `headings`, etc.

  ```graphql
  {
    allMarkdownRemark {
      edges {
        node {
          html
          headings {
            depth
            value
          }
          frontmatter {
            # Assumes you're using title in your frontmatter.
            title
          }
        }
      }
    }
  }
  ```

### 📊 SEO Optimizations

- **Schema Markup**: Added schema markup to each page using the `Gatsby Head API` for better SEO. For multiple meta tags, use React Fragments.

  ```javascript
  export function Head() {
    return (
      <>
        <html lang="en" />
        <body className="my-body-class" />
        <title>Hello World</title>
      </>
    )
  }
  ```

- **SEO Component**: A reusable `SEO.js` React component to manage metadata and schema markup across pages.

- **Schema Markup**:  `schemaMarkup`  is typically a JSON object in the `JSON-LD` for structured data, so it  can simply be defined as a constant inside the `Head` component. The JavaScript object then can be passed as a prop to the `SEO` component.

  ```jsx
  export const Head = ({ pageContext }) => {
    const schemaMarkup = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": pageContext.title,
      "description": pageContext.description,
      "url": pageContext.url,
      "image": pageContext.image
      // You can add more fields as needed for your schema markup
    };

    return (
      <SEO
        title={pageContext.title}
        description={pageContext.description}
        image={pageContext.image}
        schemaMarkup={schemaMarkup}
      />
    );
  };
  ```

### 📩 Contact Form

- A custom `contactForm.js` React component that validates user inputs and sends email via `mailto:` protocol or uses `Web3Forms API` to send message.

- **Web3Forms API Integration**:

  ```jsx
  // src/components/contactForm.js
  import React, { useState } from "react";
  import PhoneInput from "react-phone-number-input";
  const ContactForm = () => {
    // ...
    const accessToken = process.env.GATSBY_REACT_APP_WEB3FORMS_ACCESS_TOKEN // Web3Forms access token

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })
      //
    }
    return (
      <form....>
        //....
      </form>
    );
  };
  ```

### 🎠 Project Carousel

- A carousel React component built with `react-slick` to showcase projects on the homepage.

  ```jsx
  //src/components/projectCarousel.js
  import React from "react";
  import Slider from "react-slick";
  import "slick-carousel/slick/slick.css"
  import "slick-carousel/slick/slick-theme.css"

  const ProjectCarousel = ({ projects }) => {
    //...
    return (
      <Slider {...settings}>
        //.....
      </Slider>
    );
  };

  export default ProjectCarousel;
  ```

### 📈 Google Analytics Integration

- Integrated Google Analytics 4 (GA4) using `gatsby-plugin-google-tagmanager` to get web analytics for the page.

- The plugin dispatches a `gatsby-route-change` event on every route change, which is captured in GTM by creating a **Custom Event Trigger** for this event.

  ```javascript
  // gatsby-config.js
  module.exports = {
    plugins: [
      {
        resolve: "gatsby-plugin-google-tagmanager",
        options: {
          id: process.env.GATSBY_GOOGLE_TAGMANAGER_ID,
          includeInDevelopment: false,
          enableWebVitalsTracking: true,
        },
      },
      // ....
    ],
  };
  ```

### 🗺️ Sitemap and Robots.txt

- Added `gatsby-plugin-sitemap` and `gatsby-plugin-robots-txt` for SEO improvements.

  ```javascript
  // gatsby-config.js
  module.exports = {
    plugins: [
      `gatsby-plugin-sitemap`,
      `gatsby-plugin-robots-txt`,
      // ...
    ],
  };
  ```

-  The `sitemap.xml` and `robots.txt` ensure search engines can effectively navigate your site while respecting the crawling rules.
