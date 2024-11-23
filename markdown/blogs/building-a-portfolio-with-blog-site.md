---
title: "How I Built My Portfolio with Blog Site in Gatsby"
description: "Learn how I created this portfolio with blog site using Gatsby, Tailwind CSS, and Daisy UI."
date: "2024-11-08"
tags: ["Gatsby", "Tailwind CSS", "Daisy UI", "JAMStack", "SEO"]
image: ""
---

# 🚀 How I Built My Portfolio with Blog Site in Gatsby 🚀

In today's digital age, having a personal portfolio with a blog is not just a nice-to-have; it's a must-have! 🌟 Whether you're a developer, designer, or content creator, a portfolio with a blog is your digital business card. In this blog, I'll take you on a thrilling journey through the process of building this portfolio with a blog site using Gatsby, Tailwind CSS, and Daisy UI. This project is built from scratch using the Gatsby starter template and includes features like dynamic content generation, SEO optimizations, and more. So, buckle up and let's dive in! 💻✨

## 🛠️ Setting Up the Project 🛠️

To kick things off, we'll use the Gatsby starter template. This template provides a solid foundation for building a static site with Gatsby. Once the project is set up, we'll integrate Tailwind CSS and Daisy UI to style our site.

```bash
npx gatsby new my-portfolio
cd my-portfolio
```

Now, let's install `tailwindcss`.

```bash
npm install -D tailwindcss postcss autoprefixer gatsby-plugin-postcss
npx tailwindcss init -p
```

Using npm, install `tailwindcss` and its peer dependencies, as well as `gatsby-plugin-postcss`, and then run the init command to generate both `tailwind.config.js` and `postcss.config.js`.

Next, we need to enable the `gatsby-plugin-postcss` in the `gatsby-config.js` file.

```js
module.exports = {
  plugins: [
    'gatsby-plugin-postcss',
    // ...
  ],
}
```

Now, let's install `daisyUI` as a Node package.

```bash
npm i -D daisyui@latest
```

Next, set the `tailwind.config.js`:

```js
import daisyui from "daisyui"

module.exports = {
  darkMode: "class", // Enables dark mode support
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
}
```

Create a `./src/styles/global.css` file and add the `@tailwind` directives for each of Tailwind’s layers.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Create a `gatsby-browser.js` file at the root of your project if it doesn’t already exist, and import your newly-created `./src/styles/global.css` file.

Now, import your newly-created `./src/styles/global.css` file in `gatsby-browser.js`.

```js
import './src/styles/global.css'
```

At this point, we are ready to start building our project and add libraries as required during the project. 🎉

## 📄 Creating the Pages 📄

Our portfolio site will have five main pages: `index`, `projects`, `blogs`, `tags`, and `contact`. Each page serves a specific purpose, and we'll dive into each one in detail.

### 🏠 Index Page 🏠

The index page is the landing page of our site. It's the first page visitors see and contains various sections showcasing my projects, recent blogs, and a contact form.

```jsx
// src/pages/index.js
import React from "react"
import { graphql, Link } from "gatsby"

const Home = ({ data }) => {
  const projects = data.projects.nodes
  const blogs = data.blogs.nodes
  // ....

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Welcome Section */}
      {/* Technologies Section */}
      {/* Intro Section */}
      {/* Projects Section */}
      {/* Blogs Section */}
      {/* Contact Section */}
    </div>
  );
};

export const query = graphql`
  query {
    // ...
  }
`;

export default Home;
```

### 📂 Projects Page 📂

The projects page uses an accordion to display project descriptions. Each accordion has its own slug, allowing users to open it directly using the link `*/project#slug`.

```jsx
import React, { useState, useEffect } from "react"
import { graphql, navigate } from "gatsby"

const ProjectsPage = ({ data, location }) => {
  const projects = data.allMarkdownRemark.nodes
  const [openAccordion, setOpenAccordion] = useState(null)
  // ....

  return (
    <div className="min-h-screen py-8 bg-gray-100 dark:bg-gray-900">
      {/* Accordion */}
    </div>
  );
};

export const query = graphql`
  query {
    //....
  }
`;

export default ProjectsPage;
```

### 📚 Blogs Page 📚

The blogs page features pagination, showing only five blogs at a time. Each blog is generated from a markdown file and has its own page.

```jsx
import React from "react"
import { graphql, Link } from "gatsby"

const BlogsPage = ({ data }) => {
  const blogs = data.allMarkdownRemark.nodes
  const [currentPage, setCurrentPage] = useState(1)
  const blogsPerPage = 5

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog)
  const totalPages = Math.ceil(blogs.length / blogsPerPage)

  //......

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      {/* Blogs List */}
    </div>
  );
};

export const query = graphql`
  query {
    // ...
  }
`;

export default BlogsPage;
```

### 🏷️ Tags Page 🏷️

The tags page shows an amalgamation of all the tags in the projects and blogs. Each tag has its own page, generated from `gatsby-node.js`, which displays and links to the blogs and projects separately.

```jsx
import React from "react";
import { Link } from "gatsby";

const TagsPage = ({ data }) => {
  const tags = data.allMarkdownRemark.group;

  return (
    <div>
      <h1>Tags</h1>
      {tags.map(tag => (
        <div key={tag.fieldValue}>
          <h2>
            <Link to={`/tags/${tag.fieldValue}/`}>{tag.fieldValue}</Link>
          </h2>
          <p>{tag.totalCount} items</p>
        </div>
      ))}
    </div>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;

export default TagsPage;
```

### 📧 Contact Page 📧

The contact page features a contact form that can either send an email using the `mailto:` protocol or integrate with `Web3Forms` to send the message. We have created a new component `contactForm.js` which implements the form and validates the fields and allows to send the message if all the fields are correctly filled.

```jsx
import React from "react"
import ContactForm from "../components/contactForm"

const ContactPage = () => {
  return (
    <div>
      <h1>Contact Me</h1>
      //...
      <ContactForm />
    </div>
  );
};

export default ContactPage;
```

## 🛠️ Useful Components 🛠️

### 💬 `graphComment.js` 💬

The `GraphComment` component integrates the GraphComment service, which provides a commenting system for blog posts. This component dynamically loads the `GraphComment` script and initializes it on each blog post page, allowing users to leave comments.

```jsx
// src/components/graphComment.js
import React, { useEffect } from "react";

const GraphComment = ({ slug }) => {
  // ...
  return (
    <div className="w-7xl">
      <div id="graphcomment"></div>
    </div>
  )
};
```

### 📝 `contactForm.js` 📝

The `ContactForm` component is a form that allows users to send messages directly to the site owner. It includes fields for the name, phone number, email, and message. The form can either send an email using the `mailto:` protocol with the form details or `Web3Forms API` for message delivery. The phone number field uses `react-phone-input` to allow adding a country code.

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

### 🎠 `projectCarousel.js` 🎠

The `ProjectCarousel` component displays a carousel of all the projects on the homepage. It uses the `react-slick` library to create a smooth and interactive carousel experience. Each slide in the carousel represents a project and includes the title, tag, and a brief description.

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

## 🌐 SEO and Google Analytics 🌐

### 📊 Schema Markup 📊

To improve SEO, we've added schema markup to each page using the Gatsby Head API. The Gatsby Head API allows you to customize the `<head>` section of your pages dynamically. This is particularly useful for SEO, as it enables you to add meta tags, schema markup, and other head elements based on the content of each page.

A great way to get the schema markup is to use an online schema markup generator and replace it with variables for dynamically generated pages.

By exporting a named function called `Head`, you can set the metadata for a page. When defining multiple metatags, use React Fragments.

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

I am using an `SEO.js` component to avoid re-writing the head component every time and passing the parameters as props.

To declare the `schemaMarkup` inside the `Head` component, you can simply define it as a constant within the component's body. Since `schemaMarkup` is typically a JSON object in the `JSON-LD` for structured data, you would create it as a JavaScript object and pass it as a prop to your `SEO` component.

Here’s an example of how to pass the `schemaMarkup` to the `SEO` component.

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

### 📈 Google Analytics 📈

We will use `gatsby-plugin-google-tagmanager` to set up web analytics.

To set up Google Analytics 4 (GA4) with Gatsby, start by creating a GA4 property in [Google Analytics](https://analytics.google.com/) and a data stream for your website. Copy the **Measurement ID** (e.g., `G-XXXXXXX`) from the property setup. Next, create a Google Tag Manager (GTM) container in [Google Tag Manager](https://tagmanager.google.com/). In GTM, add a **GA4 Configuration Tag** with your Measurement ID and set the trigger to **All Pages**. To track Gatsby route changes, create a **Custom Event Trigger** named `gatsby-route-change` and link it to your GA4 tag. Publish the GTM container when done.

Add the following to your `gatsby-config.js` file to enable the `gatsby-plugin-google-tagmanager` plugin:

```javascript
module.exports = {
  plugins: [
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: process.env.GATSBY_GOOGLE_TAGMANAGER_ID, // Your GTM Container ID
        includeInDevelopment: false, // Include GTM only in production
        enableWebVitalsTracking: true, // Track Web Vitals like LCP, FID, and CLS
      },
    },
  ],
};
```

The plugin dispatches a `gatsby-route-change` event on every route change, which you can capture in GTM by creating a **Custom Event Trigger** for this event. Associate the trigger with desired tags to track navigation events in GA4. Use GTM’s **Preview** mode to debug your setup, and monitor real-time data in GA4’s Debug View to confirm everything is working as expected.

### 🗺️ Adding `sitemap.xml` and `robots.txt` 🗺️

Improve your website's SEO with **`gatsby-plugin-sitemap`**, which generates a `sitemap.xml` to help search engines index your site, and **`gatsby-plugin-robots-txt`**, which creates a `robots.txt` to control crawler access. These plugins ensure search engines can effectively navigate your site while respecting your rules.

Add both plugins to `gatsby-config.js`:

```javascript
module.exports = {
  plugins: [
    `gatsby-plugin-sitemap`, // Automatically creates sitemap.xml
    `gatsby-plugin-robots-txt`, // Adds robots.txt for crawler control
  ],
};
```

With these, your Gatsby site becomes more search-engine-friendly, boosting visibility and improving crawler management.

## 🎉 Conclusion 🎉

This portfolio with a blog site is a full-stack application built using Gatsby, Tailwind CSS, and Daisy UI. It includes dynamic content generation, SEO optimizations, and analytics integration. I'm looking for opportunities as a web developer, so feel free to contact me at [your-email@example.com](mailto:your-email@example.com). Let's connect and create something amazing together! 🌟

Thanks for joining me on this journey. Happy coding! 🚀👩‍💻👨‍💻
