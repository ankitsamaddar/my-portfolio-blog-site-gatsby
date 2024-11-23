import React from "react"
import { Link } from "gatsby"
import Slider from "react-slick"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
// import "./carousel.css"

const ProjectCarousel = ({ projects }) => {
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <div className="relative max-w-7xl mx-auto px-6 py-12 overflow-hidden">
      {/* Carousel Container */}
      <Slider {...settings} className="gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex-grow basis-1/3 h-max px-4" // Maintain spacing
          >
            <Link
              to={`/projects#${project.fields.slug}`}
              className="card bg-gray-100 dark:bg-[#2c3a4e] hover:shadow-2xl transition-all"
              title={project.frontmatter.title} // Tooltip on hover
            >
              <figure>
                <img
                  src={
                    project.frontmatter.image.childImageSharp.gatsbyImageData
                      .images.fallback.src
                  }
                  alt={project.frontmatter.title}
                  className="w-full h-56 object-cover rounded-t-lg" // Increased image height
                />
              </figure>
              <div className="card-body flex flex-col items-center text-center h-[320px] overflow-hidden">
                <div className="flex items-center sm:flex-row">
                  <h2
                    className="card-title px-2 line-clamp-2"
                    title={project.frontmatter.title} // Show full text on hover
                  >
                    {project.frontmatter.title}
                  </h2>
                  {project.frontmatter.isNew && (
                    <div className="badge badge-secondary ml-2">NEW</div>
                  )}
                </div>
                <p
                  className="text-sm text-gray-700 dark:text-gray-300 m-2 line-clamp-1"
                  title={project.frontmatter.description} // Show full description on hover
                >
                  {project.frontmatter.description}
                </p>
                {/* Restrict tags to 2 lines */}
                <div
                  className="card-actions flex flex-wrap justify-center gap-2 max-h-5 overflow-hidden"
                  title={project.frontmatter.tags.join(", ")} // Show all tags on hover
                >
                  {project.frontmatter.tags.map(tag => (
                    <div
                      key={tag}
                      className="badge badge-outline text-xs font-bold hover:contrast-125 badge-primary"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
                <div className="mt-4 w-full">
                  <Link
                    to={`/projects#${project.fields.slug}`}
                    className="text-sm link link-primary"
                    title={`Learn more about ${project.frontmatter.title}`} // Tooltip on hover
                  >
                    Read More..
                  </Link>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default ProjectCarousel
