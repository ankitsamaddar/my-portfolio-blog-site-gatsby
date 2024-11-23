import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { useState } from "react"
import Breadcrumbs from "../components/breadcrumbs"
import Seo from "../components/Seo"

const BlogsPage = ({ data }) => {
  const blogs = data.allMarkdownRemark.nodes
  const [currentPage, setCurrentPage] = useState(1)
  const blogsPerPage = 5

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog)
  const totalPages = Math.ceil(blogs.length / blogsPerPage)

  const changePage = page => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" }) // Scroll to the top of the page
  }

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    {
      label: "Blogs",
      icon: (
        <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z" />
      ),
      viewBox: "0 0 512 512",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <Breadcrumbs items={breadcrumbItems} />

      {/* Blogs Header */}
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
          Blogs
        </h1>
      </div>

      {/* Blogs List */}
      <div className="max-w-7xl mx-auto px-6 grid gap-6">
        {currentBlogs.map(blog => (
          <div
            key={blog.fields.slug}
            className="rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-4 gap-4"
            onClick={() => (window.location.href = blog.fields.slug)}
          >
            {/* Blog Image */}
            {blog.frontmatter.image && (
              <div className="w-full h-full">
                <GatsbyImage
                  image={blog.frontmatter.image.childImageSharp.gatsbyImageData}
                  alt={blog.frontmatter.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {/* Blog Content */}
            <div className="p-6 flex flex-col space-y-4 lg:col-span-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(blog.frontmatter.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                <Link
                  to={blog.fields.slug}
                  className="hover:underline"
                  title={blog.frontmatter.title}
                >
                  {blog.frontmatter.title}
                </Link>
              </h2>
              <div className="flex flex-wrap gap-2">
                {blog.frontmatter.tags.map(tag => (
                  <span
                    key={tag}
                    className="badge badge-outline text-primary font-bold hover:contrast-125"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {blog.frontmatter.description}
              </p>
              <p className="text-gray-600 dark:text-gray-400">{blog.excerpt}</p>
              <Link
                to={blog.fields.slug}
                className="text-blue-500 hover:underline self-start"
                title="Read More"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="join">
            {[...Array(totalPages).keys()].map(page => (
              <button
                key={page + 1}
                className={`join-item btn btn-primary ${
                  currentPage === page + 1
                    ? "btn-active brightness-60 contrast-150"
                    : ""
                }`}
                onClick={() => changePage(page + 1)}
              >
                {page + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/blogs/" } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          date
          title
          tags
          description
          image {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, width: 600)
            }
          }
        }
        excerpt(pruneLength: 150)
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
  const webUrl = data.site.siteMetadata.siteUrl
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Blog",
    url: `${webUrl}${location.pathname}`,
    name: "Blogs - Ankit Samaddar",
    description:
      "Explore my blogs covering various topics including technology, design, and development.",
    publisher: {
      "@type": "Person",
      name: "Ankit Samaddar",
      email: "ankitsam0602@gmail.com",
      image: `${webUrl}/favicon-32x32.png`,
      jobTitle:
        "Web Developer, Website Developer, React Developer, Full Stack Developer, Software Engineer",
    },
    blogPost: [
      // Add structured data for each blog post dynamically
      ...data.allMarkdownRemark.nodes.map(blog => ({
        "@type": "BlogPosting",
        headline: blog.frontmatter.title,
        image: blog.frontmatter.image
          ? blog.frontmatter.image.childImageSharp.gatsbyImageData.images
              .fallback.src
          : null,
        url: `${webUrl}${blog.fields.slug}`,
        datePublished: blog.frontmatter.date,
        description: blog.frontmatter.description || blog.excerpt,
        author: {
          "@type": "Person",
          name: "Ankit Samaddar",
          email: "ankitsam0602@gmail.com",
          image: `${webUrl}/favicon-32x32.png`,
          jobTitle:
            "Web Developer, Website Developer, React Developer, Full Stack Developer, Software Engineer",
        },
      })),
    ],
  }

  return (
    <Seo
      title="Blogs - Ankit Samaddar"
      description="Explore my latest blogs on technology, design, and development."
      pathname={webUrl+location.pathname}
      keywords={[
        "blogs",
        "technology",
        "development",
        "design",
        "Ankit Samaddar",
      ]}
      schemaMarkup={schemaMarkup}
      twitterUsername="ankitsamaddar_"
    />
  )
}

export default BlogsPage
