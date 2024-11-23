import React, { useEffect } from "react"

const GraphComment = ({ slug }) => {
  useEffect(() => {

    if (window.__semio__gc_graphlogin) {
      window.__semio__gc_graphlogin({
        graphcommentId: "my-portfolio",
        behaviour: {
          uid: slug,
        },
        theme: "dark",
      })
      return
    }

    // Function to load GraphComment
    function __semio__onload() {
      if (window.__semio__gc_graphlogin) {
        window.__semio__gc_graphlogin({
          graphcommentId: process.env.GATSBY_GRAPH_COMMENT_ID,
          behaviour: {
            uid: slug,
          },
          theme: "dark",
        })
      }
    }

    // Create and append the script to the document
    const gc = document.createElement("script")
    gc.type = "text/javascript"
    gc.async = true
    gc.onload = __semio__onload
    gc.defer = true
    gc.src =
      "https://integration.graphcomment.com/gc_graphlogin.js?" + Date.now()
    ;(
      document.getElementsByTagName("head")[0] ||
      document.getElementsByTagName("body")[0]
    ).appendChild(gc)

    // Cleanup on unmount
    return () => {
      const script = document.querySelector(`script[src="${gc.src}"]`)
      if (script) {
        script.remove()
      }
    }
  }, [slug])

  return (
    <div className="w-7xl">
      <div id="graphcomment"></div>
    </div>
  )
}

export default GraphComment
