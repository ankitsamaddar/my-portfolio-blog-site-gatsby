import React from "react"
import { graphql, Link } from "gatsby"
import Breadcrumbs from "../components/breadcrumbs"
import Seo from "../components/Seo"

const TagsPage = ({ data }) => {
  const tags = data.allMarkdownRemark.group

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    {
      label: "Tags",
      icon: (
        <path d="M9.777 2l11.394 11.395-7.78 7.777-11.391-11.391v-7.781h7.777zm.828-2h-10.605v10.609l13.391 13.391 10.609-10.604-13.395-13.396zm-4.104 5c.4 0 .776.156 1.059.438.585.586.585 1.539.001 2.123-.285.283-.661.439-1.061.439s-.777-.156-1.06-.438c-.585-.586-.586-1.538-.001-2.123.284-.283.661-.439 1.062-.439zm0-1c-.641 0-1.28.244-1.769.732-.977.976-.977 2.558 0 3.536.489.488 1.128.732 1.768.732s1.279-.244 1.768-.733c.977-.977.977-2.558 0-3.537-.488-.486-1.127-.73-1.767-.73z" />
      ),
      viewBox: "0 0 24 24",
    },
  ]

  return (
    <div className="min-h-screen py-8 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Page Title */}
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Tags</h1>
      </div>

      {/* Tags Grid */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tags.map(tag => (
          <Link
            to={`/tags/${tag.fieldValue}`}
            key={tag.fieldValue}
            className="flex flex-col justify-between bg-gray-200 dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M10.773 21.585l-1.368 1.415-10.405-10.429v-8.571h2v7.719l9.773 9.866zm1.999-20.585h-9.772v9.772l12.074 12.228 9.926-9.85-12.228-12.15zm-4.772 7c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2z" />
                </svg>
                <h2 className="text-lg font-medium">{tag.fieldValue}</h2>
              </div>
              <span className="badge badge-outline badge-primary">
                {tag.totalCount}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
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
  const tags = data.allMarkdownRemark.group
  const webUrl = data.site.siteMetadata.siteUrl

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: `${webUrl}${location.pathname}`, // Replace with the correct base URL
    name: "Tags - Ankit Samaddar",
    description:
      "Explore all the tags used in my blogs. Find posts categorized by technology, design, development, and more.",
    publisher: {
      "@type": "Person",
      name: "Ankit Samaddar",
      email: "ankitsam0602@gmail.com",
      image: `${webUrl}/favicon-32x32.png`,
      jobTitle:
        "Web Developer, Website Developer, React Developer, Full Stack Developer, Software Engineer",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${webUrl}${location.pathname}`, // Replace
    },
    keywords: ["tags", "blog topics", "technology", "design", "development"],
    additionalType: "https://schema.org/CollectionPage",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: tags.map((tag, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${webUrl}${location.pathname}${tag.fieldValue}`, // URL for each tag page
        name: tag.fieldValue,
      })),
    },
  }

  return (
    <Seo
      title="Tags - Ankit Samaddar"
      description="Explore insightful tags that cover a range of topics including technology, design, development, and more."
      pathname={webUrl+location.pathname}
      keywords={["tags", "blog topics", "technology", "design", "development"]}
      schemaMarkup={schemaMarkup}
    />
  )
}

export default TagsPage
