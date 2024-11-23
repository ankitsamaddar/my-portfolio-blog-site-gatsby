import React from "react"

const TechGrid = ({ technologies }) => {
  return (
    <div className="flex flex-wrap justify-center mt-8 gap-2 px-6 sm:px-0">
      {technologies.map((tech, index) => (
        <div
          key={index}
          className="w-32 h-32 flex-shrink-0 sm:w-1/2 sm:max-w-[12rem] grid place-items-center hover:text-blue-500 transition-all"
        >
          {/* Group for SVG and text */}
          <div className="flex flex-col items-center">
            {/* SVG Wrapper */}
            <div className={`grid place-items-center ${tech.svgCss || ""}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16 mb-2"
                fill="currentColor"
                viewBox={tech.viewBox || "0 0 24 24"} // Default viewBox if not provided
              >
                <path d={tech.iconPath} />
              </svg>
            </div>
            <p className="text-xl text-gray-700 dark:text-gray-300 text-center">
              {tech.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TechGrid;
