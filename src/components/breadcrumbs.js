import React from "react"
import { Link } from "gatsby"

const Breadcrumbs = ({ items }) => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <nav className="breadcrumbs mb-6 text-sm">
        <ul className="flex space-x-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-center space-x-1">
              {item.link ? (
                <Link
                  to={item.link}
                  className="hover:underline flex items-center space-x-1 text-gray-700 dark:text-gray-300"
                >
                  {item.icon && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox={item.viewBox || "0 0 24 24"} // Default viewBox if not provided
                      stroke="currentColor"
                    >
                      {item.icon}
                    </svg>
                  )}
                  <span>{item.label}</span>
                </Link>
              ) : (
                <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                  {item.icon && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox={item.viewBox || "0 0 24 24"} // Default viewBox if not provided
                      stroke="currentColor"
                    >
                      {item.icon}
                    </svg>
                  )}
                  <span>{item.label}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}



export default Breadcrumbs
