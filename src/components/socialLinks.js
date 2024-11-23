import React from "react"

const SocialLinks = ({ socials }) => {
  return (
    <div className="flex space-x-10 mt-8">
      {socials.map((social, index) => (
        <a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 transition"
          title={social.label} // Tooltip on hover
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="currentColor"
            viewBox={social.viewBox || "0 0 24 24"} // Default viewBox
          >
            <path d={social.iconPath} />
          </svg>
          <span className="sr-only">{social.label}</span>{" "}
          {/* Hidden for screen readers */}
        </a>
      ))}
    </div>
  )
}

export default SocialLinks
