import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const SeoCom = ({
  title,
  description,
  pathname,
  image,
  lang = "en",
  schemaMarkup = null,
  keywords = [],
  twitterUsername = "ankitsamaddar_",
}) => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
          author
          image
          twitterUsername
        }
      }
    }
  `)

  // console.log("siteMetadata:", siteMetadata)

  const seo = {
    title: title || siteMetadata.title,
    description: description || siteMetadata.description,
    url: `${siteMetadata.siteUrl}${pathname || ""}`,
    image: image
      ? `${siteMetadata.siteUrl}${image}`
      : `${siteMetadata.siteUrl}${siteMetadata.image}`,
  }

  const twitterUser = twitterUsername || siteMetadata.twitterUsername

  return (
    <>
      {/* Basic Meta Tags */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="author" content={siteMetadata.author} />
      <meta name="image" content={seo.image} />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/images/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/images/favicon-16x16.png"
      />
      <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/images/android-chrome-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="512x512"
        href="/images/android-chrome-512x512.png"
      />

      {/* Keywords Meta Tag */}
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content="website" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:card" content="summary_large_image" />
      {twitterUser && (
        <>
          <meta name="twitter:creator" content={`@${twitterUser}`} />
          <meta name="twitter:site" content={`@${twitterUser}`} />
        </>
      )}

      {/* Canonical Link */}
      <link rel="canonical" href={seo.url} />

      {/* Language Attribute */}
      <html lang={lang} />

      {/* JSON-LD Schema Markup */}
      {schemaMarkup && (
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      )}
    </>
  )
}

export default SeoCom
