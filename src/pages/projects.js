import React, { useState, useEffect } from "react"
import { graphql, navigate } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Seo from "../components/Seo"
import Breadcrumbs from "../components/breadcrumbs"

const ProjectsPage = ({ data, location }) => {
  const projects = data.allMarkdownRemark.nodes
  const [openAccordion, setOpenAccordion] = useState(null)

  // Function to handle accordion toggling
  const toggleAccordion = (index, slug) => {
    if (openAccordion === index) {
      setOpenAccordion(null)
    } else {
      setOpenAccordion(index)
      navigate(`#${slug}`)
    }
  }

  // Auto-open accordion if the URL contains a hash
  useEffect(() => {
    const hash = location.hash.replace("#", "")
    const projectIndex = projects.findIndex(p => p.fields.slug === hash)
    if (projectIndex >= 0) {
      setOpenAccordion(projectIndex)
    }
  }, [location.hash, projects])

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    {
      label: "Projects",
      icon: (
        <path d="M0 448c0 35.3 28.7 64 64 64l160 0 0-128c0-17.7 14.3-32 32-32l128 0 0-288c0-35.3-28.7-64-64-64L64 0C28.7 0 0 28.7 0 64L0 448zM171.3 75.3l-96 96c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l96-96c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6zm96 32l-160 160c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l160-160c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6zM384 384l-128 0 0 128L384 384z" />
      ),
      viewBox: "0 0 384 512",
    },
  ]

  return (
    <div className="min-h-screen py-8 bg-gray-100 dark:bg-gray-900">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
          Projects
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="mt-8 space-y-4 sm:space-y-6">
          {projects.map((project, index) => {
            const { title, description, tags, link, image, isNew } =
              project.frontmatter
            const slug = project.fields.slug
            const projectImage = getImage(image)

            return (
              <div
                id={slug}
                key={slug}
                className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md"
              >
                {/* Accordion Header */}
                <div
                  onClick={() => toggleAccordion(index, slug)}
                  className="p-4 sm:p-6 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center gap-4"
                >
                  {/* Project Image */}
                  <GatsbyImage
                    image={projectImage}
                    alt={title}
                    className="w-full sm:w-1/3 rounded-lg object-cover h-40 sm:h-auto"
                  />
                  {/* Project Details */}
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100">
                      {title}
                      {isNew && (
                        <div className="badge badge-secondary ml-2">NEW</div>
                      )}
                    </h2>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map(tag => (
                        <span
                          key={tag}
                          className="badge badge-outline text-xs sm:text-sm badge-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link link-hover hover:text-indigo-500 dark:hover:text-indigo-300  text-blue-500 dark:text-blue-300 mt-2 inline-block"
                    >
                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          fill="currentColor"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        View In Github
                      </div>
                    </a>
                    <p className="text-gray-700 dark:text-gray-300 mt-2 text-sm sm:text-base">
                      {description}
                    </p>
                  </div>
                  {/* Arrow Icon */}
                  <div className="ml-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-6 w-6 transition-transform duration-300 ${
                        openAccordion === index ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Accordion Content */}
                {openAccordion === index && (
                  <div className="p-4 sm:p-6 border-t border-gray-300 dark:border-gray-700">
                    <div
                      className="prose prose-sm dark:prose-invert"
                      dangerouslySetInnerHTML={{ __html: project.html }}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/projects/" } }, sort: { frontmatter: { isNew: DESC } }) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          link
          isNew
          description
          tags
          image {
            childImageSharp {
              gatsbyImageData(width: 400, layout: CONSTRAINED)
            }
          }
        }
        html
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`

export const Head = ({ data, location }) => {
  const projects = data.allMarkdownRemark.nodes
  const webUrl = data.site.siteMetadata.siteUrl
  // WebSite schema
  const websiteSchema = {
    "@context": "https://schema.org/",
    "@type": "WebPage",
    name: "Projects - Ankit Samaddar Portfolio",
    description:
      "Hi I'm Ankit. Explore my projects with detailed information and source code.",
    url: `${webUrl}/projects`,

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${webUrl}`,
    },
    about: {
      "@type": "Person",
      name: "Ankit Samaddar",
      email: "ankitsam0602@gmail.com",
      image: `${webUrl}/favicon-32x32.png`,
      jobTitle:
        "Web Developer, Website Developer, React Developer, Full Stack Developer, Software Engineer",
    },
  }

  // SoftwareSourceCode schema for individual projects
  const projectSchemas = projects.map((project, index) => {
    const { title, description, link } = project.frontmatter
    const slug = project.fields.slug
    return {
      "@context": "https://schema.org/",
      "@type": "SoftwareSourceCode",
      name: title,
      description: description,
      url: `${webUrl}${location.pathname}#${slug}`,
      codeRepository: link,
      creator: {
        "@type": "Person",
        name: "Ankit Samaddar",
        email: "ankitsam0602@gmail.com",
      jobTitle: "Web Developer, Website Developer, React Developer, Full Stack Developer, Software Engineer",
      },
    }
  })

  // Combined schema
  const schemaMarkup = [websiteSchema, ...projectSchemas]

  return (
    <Seo
      title="Projects - Ankit Samaddar Portfolio"
      description="Hi I'm Ankit. Explore my projects with detailed information and source code."
      pathname={webUrl+location.pathname}
      schemaMarkup={schemaMarkup}
    />
  )
}

export default ProjectsPage
