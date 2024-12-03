/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
module.exports = {
  siteMetadata: {
    title: "Ankit Samaddar - Portfolio",
    author: "Ankit Samaddar",
    description: "Hi I'm Ankit. Welcome to my portfolio website.",
    siteUrl: "https://www.ankitsamaddar.github.io",
    image: "/images/apple-touch-icon.png",
    twitterUsername: "ankitsamaddar_",
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    "gatsby-plugin-postcss",
    `gatsby-plugin-sharp`,
    // Catch links in markdown
    `gatsby-plugin-catch-links`,
    // Markdown process
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        gfm: true,
        footnotes: true,
        excerpt_separator: `<!-- end -->`,
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 740,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-copy-linked-files`,
          {
            resolve: `gatsby-remark-smartypants`,
            options: {
              dashes: `oldschool`,
            },
          },
          // Embed in md using syntax `embed:javascript-code.js`
          // {
          //   resolve: `gatsby-remark-embed-snippet`,
          //   options: {
          //     directory: `${__dirname}/static/markdown/code-examples/`,
          //   },
          // },
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-graphviz`,
          `gatsby-remark-prismjs`,
          `gatsby-remark-katex`,
        ],
      },
    },
    // Add the markdown sources
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects`,
        path: `${__dirname}/markdown/projects`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blogs`,
        path: `${__dirname}/markdown/blogs`,
      },
    },
    // Generate manifest.webmanifest, site installable as a Progressive Web App (PWA)
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Ankit Samaddar - Portfolio`,
        short_name: `Ankit Samaddar`,
        description: `Hi, I'm Ankit. Welcome to the my portfolio website.`,
        lang: `en`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `standalone`,
        icon: `static/images/apple-touch-icon.png`,
        icons: [
          {
            src: "static/images/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "static/images/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "static/images/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
          },
          {
            src: "static/images/favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
          },
          {
            src: "static/images/favicon-16x16.png",
            sizes: "16x16",
            type: "image/png",
          },
        ],
        icon_options: {
          purpose: "any maskable",
        },
        theme_color_in_head: false, // Needed for light and dark theme
      },
    },
    // Offline functionality
    // {
    //   resolve: `gatsby-plugin-offline`,
    //   options: {
    //     precachePages: [`/`, `/projects/`, `/blogs/*`, `/tags/*`, `contacts`],
    //     workboxConfig: {
    //       globPatterns: ["**/icon-path*"],
    //     },
    //   },
    // },
    // Google Tag Manager
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: process.env.GATSBY_GOOGLE_TAGMANAGER_ID,

        // Include GTM in development.
        //
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,
        // Defaults to false
        enableWebVitalsTracking: true,
      },
    },
    // Add sitemap and robots.txt
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-robots-txt`,
  ],
}
