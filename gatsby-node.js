const fs = require('fs');
const path = require('path');

// First Add the Fields slug and lastModified
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    const fileNode = getNode(node.parent);
    const sourceInstanceName = fileNode.sourceInstanceName;

    let slug = "";
    if (sourceInstanceName === "blogs") {
      // Create slugs for blogs
      slug = `/blogs/${path.basename(fileNode.relativePath, ".md")}`;

      // Add last modified date and time for blogs
      const filePath = path.join(`${__dirname}/markdown/blogs`, fileNode.relativePath);
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        const lastModified = stats.mtime;
        createNodeField({
          node,
          name: "lastModified",
          value: lastModified.toISOString(),
        });
      }
    } else if (sourceInstanceName === "projects") {
      // Create slugs for projects
      slug = `${path.basename(fileNode.relativePath, ".md")}`;
    }

    createNodeField({
      node,
      name: "slug",
      value: slug,
    });
  }
};

// Create the pages
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Query for all Markdown nodes
  const result = await graphql(`
    {
      allMarkdownRemark {
        nodes {
          fields {
            slug
          }
          frontmatter {
            title
            tags
          }
          fileAbsolutePath
        }
      }
    }
  `)

  // Handle errors in the GraphQL query
  if (result.errors) {
    throw new Error("Error while running GraphQL query")
  }

  // Create blog pages with previous/next context
  const blogTemplate = path.resolve(`./src/templates/blog-template.js`)
  const blogPosts = result.data.allMarkdownRemark.nodes.filter(node =>
    node.fileAbsolutePath.includes("/blogs/"),
  )

  blogPosts.forEach((post, index) => {
    const previous = index === 0 ? null : blogPosts[index - 1]
    const next = index === blogPosts.length - 1 ? null : blogPosts[index + 1]

    createPage({
      path: post.fields.slug,
      component: blogTemplate,
      context: {
        slug: post.fields.slug,
        previous,
        next,
      },
    })
  })

  // Create tag pages
  const tagTemplate = path.resolve(`./src/templates/tag-template.js`)
  const tags = new Set()
  result.data.allMarkdownRemark.nodes.forEach(node => {
    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach(tag => tags.add(tag))
    }
  })

  Array.from(tags).forEach(tag => {
    createPage({
      path: `/tags/${tag}`,
      component: tagTemplate,
      context: {
        tag,
      },
    })
  })
}
