import React from "react"
import { graphql, Link } from "gatsby"
import Breadcrumbs from "../components/breadcrumbs"
import Seo from "../components/Seo"

const TagTemplate = ({ data }) => {
  const { fieldValue: tag, totalCount } = data.allMarkdownRemark.group[0]
  const blogs = data.blogs.nodes
  const projects = data.projects.nodes

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    {
      label: "Tags",
      link: "/tags",
    },
    {
      label: `${tag}`,
    },
  ]
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 text-center mx-auto">
          Posts Tagged: "{tag}"
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2 text-center mx-auto">
          {totalCount} posts found
        </p>
      </div>

      {/* Blogs Section */}
      <section className="mb-10 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center">
          Blogs
        </h2>
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(200px,0.5fr))] gap-6 justify-center">
            {blogs.map(post => (
              <div
                key={post.fields.slug}
                className="card bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6"
              >
                <h3 className="text-xl text-center font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  <Link
                    to={post.fields.slug}
                    className="hover:underline text-blue-500 dark:text-blue-400"
                  >
                    {post.frontmatter.title}
                  </Link>
                </h3>
                <div className="flex flex-wrap gap-2 mb-3 justify-center">
                  {post.frontmatter.tags.map(tag => (
                    <span
                      key={tag}
                      className="badge badge-outline text-sm text-gray-600 dark:text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  to={post.fields.slug}
                  className="text-center text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
                >
                  Read More
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400 text-center mx-auto">
            No blogs found for this tag.
          </p>
        )}
      </section>

      {/* Projects Section */}
      <section className="max-w-7xl mx-auto px-6 mb-10">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center">
          Projects
        </h2>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(200px,0.5fr))] gap-6 justify-center">
            {projects.map(project => (
              <div
                key={project.fields.slug}
                className="card bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6"
              >
                <h3 className="text-xl text-center font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  <Link
                    to={`/projects#${project.fields.slug}`}
                    className="hover:underline text-blue-500 dark:text-blue-400"
                  >
                    {project.frontmatter.title}
                  </Link>
                </h3>
                <div className="flex flex-wrap gap-2 mb-3 justify-center">
                  {project.frontmatter.tags.map(tag => (
                    <span
                      key={tag}
                      className="badge badge-outline text-sm text-gray-600 dark:text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/projects#${project.fields.slug}`}
                  className="text-center text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
                >
                  View Project
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400 text-center mx-auto">
            No projects found for this tag.
          </p>
        )}
      </section>
    </div>
  )
}

export const query = graphql`
  query ($tag: String!) {
    allMarkdownRemark(filter: { frontmatter: { tags: { in: [$tag] } } }) {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
    blogs: allMarkdownRemark(
      filter: {
        frontmatter: { tags: { in: [$tag] } }
        fileAbsolutePath: { regex: "/blogs/" }
      }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          tags
        }
      }
    }
    projects: allMarkdownRemark(
      filter: {
        frontmatter: { tags: { in: [$tag] } }
        fileAbsolutePath: { regex: "/projects/" }
      }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          tags
        }
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
  const { fieldValue: tag, totalCount } = data.allMarkdownRemark.group[0]
  const blogs = data.blogs.nodes
  const projects = data.projects.nodes

  // Generate the URLs for the blog and project pages
  const blogUrls = blogs.map(blog => `${location.origin}${blog.fields.slug}`)
  const projectUrls = projects.map(
    project => `${location.origin}/projects#${project.fields.slug}`,
  )

  const webUrl = data.site.siteMetadata.siteUrl

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: `${webUrl}${location.pathname}`, // Current page URL
    name: `Tag: ${tag}`,
    description: `${totalCount} posts tagged with "${tag}"`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${webUrl}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Tags",
          item: `${location.origin}/tags`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: tag,
        },
      ],
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${webUrl}${location.pathname}`,
    },
    relatedLink: [
      ...blogUrls.map(url => ({
        "@type": "Article",
        url: `${webUrl}${url}`,
      })),
      ...projectUrls.map(url => ({
        "@type": "Project",
        url: `${webUrl}${url}`,
      })),
    ],
    about: {
      "@type": "Person",
      name: "Ankit Samaddar",
      email: "ankitsam0602@gmail.com",
      image: `${webUrl}/favicon-32x32.png`,
      jobTitle:
        "Web Developer, Website Developer, React Developer, Full Stack Developer, Software Engineer",
    },
  }

  return (
    <Seo
      title={`Posts Tagged: ${tag}`}
      description={`Explore blogs and projects tagged with "${tag}"`}
      pathname={webUrl + location.pathname}
      schemaMarkup={schemaMarkup}
    />
  )
}

export default TagTemplate
