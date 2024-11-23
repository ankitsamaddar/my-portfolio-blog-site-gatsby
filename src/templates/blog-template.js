import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Breadcrumbs from "../components/breadcrumbs"
import Seo from "../components/Seo"
import GraphComment from "../components/graphComment"

const BlogTemplate = ({ data, pageContext }) => {
  // console.log(pageContext)
  const { frontmatter, html, fields } = data.markdownRemark
  const { title, tags, date, description, image } = frontmatter
  const blogImage = getImage(image)
  const lastModified = new Date(fields.lastModified).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })
  const { previous, next } = pageContext
  // const previous = BlogHooks({ date: date, comparison: "lt" })
  // const next = BlogHooks({ date: date, comparison: "gt" })

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: description,
        url: shareUrl,
      })
    } else {
      alert("Sharing is not supported in your browser. Please copy the URL.")
    }
  }

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    {
      label: "Blogs",
      link: "/blogs",
    },
    {
      label: `${title}`,
    },
  ]
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Title Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-left flex-1">{title}</h1>
          <button
            onClick={handleShare}
            title="Share"
            className="btn btn-outline btn-sm btn-primary flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 20 20"
              stroke="currentColor"
            >
              <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3" />
            </svg>
            Share
          </button>
        </div>

        {/* Blog Header */}
        {blogImage && (
          <GatsbyImage
            image={blogImage}
            alt={title}
            className="rounded-lg shadow-lg w-full h-auto mb-6 block mx-auto"
          />
        )}
        <div className="text-center mb-6">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            <span className="font-medium">Published on:</span> {date}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            <span className="font-medium">Last Modified:</span> {lastModified}
          </p>
        </div>
        <p className="text-center text-xl text-gray-700 dark:text-gray-300 mb-8 px-4">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {tags.map(tag => (
            <span
              key={tag}
              className="badge badge-primary hover:brightness-80 font-bold drop-shadow-lg text-sm px-3 py-2 rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Blog Content */}
        <div className="max-w-7xl mx-auto">
          <article
            className="prose prose-neutral prose-2xl dark:prose-invert max-w-none mx-auto px-4 text-justify"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="max-w-7xl mx-auto p-12 my-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-7">
          {previous && (
            <Link
              to={previous.fields.slug}
              title={previous.frontmatter.title}
              className="btn btn-primary flex flex-col sm:flex-row items-center gap-2 shadow-lg hover:shadow-xl transition duration-300 ease-in-out w-full sm:w-auto sm:max-w-xs"
            >
              <div className="flex items-center gap-2 w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5 flex-shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span className="text-sm sm:text-base text-left break-words sm:whitespace-nowrap sm:overflow-hidden sm:text-ellipsis flex-grow">
                  Previous: {previous.frontmatter.title}
                </span>
              </div>
            </Link>
          )}
          {next && (
            <Link
              to={next.fields.slug}
              title={next.frontmatter.title}
              className="btn btn-primary flex flex-col sm:flex-row items-center gap-2 shadow-lg hover:shadow-xl transition duration-300 ease-in-out w-full sm:w-auto sm:max-w-xs"
            >
              <div className="flex items-center gap-2 w-full">
                <span className="text-sm sm:text-base text-left break-words sm:whitespace-nowrap sm:overflow-hidden sm:text-ellipsis flex-grow">
                  Next: {next.frontmatter.title}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5 flex-shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* Comments */}
      <div className="max-w-7xl mx-auto px-6 my-6">
        <GraphComment slug={fields.slug} />
      </div>
    </div>
  )
}

export const query = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        tags
        date(formatString: "DD MMMM, YYYY")
        description
        image {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 400)
          }
        }
      }
      html
      fields {
        slug
        lastModified
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
  const { frontmatter, fields } = data.markdownRemark
  const { title, description, date, image, tags } = frontmatter
  const blogImage =
    image?.childImageSharp?.gatsbyImageData?.images?.fallback?.src || ""

  // Format the publication and modification date
  const lastModified = new Date(fields.lastModified).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })

  const webUrl = data.site.siteMetadata.siteUrl

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    url: `${webUrl}${location.pathname}`, // Dynamic URL of the page
    datePublished: date,
    dateModified: lastModified,
    author: {
      "@type": "Person",
      name: "Ankit Samaddar",
      email: "ankitsam0602@gmail.com",
      image: `${webUrl}/favicon-32x32.png`,
      jobTitle:
        "Web Developer, Website Developer, React Developer, Full Stack Developer, Software Engineer",
    },
    image: blogImage,
    keywords: tags.join(", "), // Convert tags array to a comma-separated string
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${webUrl}${location.pathname}`,
    },
    publisher: {
      "@type": "Person",
      name: "Ankit Samaddar",
      email: "ankitsam0602@gmail.com",
      image: `${webUrl}/favicon-32x32.png`,
      jobTitle:
        "Web Developer, Website Developer, React Developer, Full Stack Developer, Software Engineer",
    },
    tags: tags,
  }

  return (
    <Seo
      title={title}
      description={description}
      pathname={webUrl + location.pathname}
      image={blogImage}
      schemaMarkup={schemaMarkup}
    />
  )
}

export default BlogTemplate
