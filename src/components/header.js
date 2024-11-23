import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

const Header = props => {
  const [darkMode, setDarkMode] = useState(true)
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  return (
    <header>
      <div className={`navbar shadow-md bg-gray-100 dark:bg-gray-900`}>
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <li
              tabIndex={0}
              className="menu menu-lg dropdown-content bg-white dark:bg-gray-800 rounded-box z-[1] mt-3 w-52 pr-6 mb-2 shadow-2xl drop-shadow-xl"
            >
              <h2 className="menu-title text-slate-800 dark:text-slate-200">
                Menu
              </h2>
              <ul>
                <li>
                  <Link to="/" title="Home">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/projects" title="Projects">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link to="/blogs" title="Blogs">
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link to="/tags" title="Tags">
                    Tags
                  </Link>
                </li>
                <li>
                  <Link to="/contact" title="Contact Me">
                    Contact
                  </Link>
                </li>
              </ul>
            </li>
          </div>
          {/* <Link to="/" className="btn btn-ghost text-xl">My Portfolio</Link> */}
        </div>
        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/" title="Home">Home</Link>
            </li>
            <li>
              <Link to="/projects" title="Projects">Projects</Link>
            </li>
            <li>
              <Link to="/blogs" title="Blogs">Blogs</Link>
            </li>
            <li>
              <Link to="/tags" title="Tags">Tags</Link>
            </li>
            <li>
              <Link to="/contact" title="Contact Me">Contact</Link>
            </li>
          </ul>
        </div>
        {/* Navbar End */}
        <div className="navbar-end space-x-6">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="btn btn-ghost btn-circle"
          >
            {darkMode ? "🌙" : "☀️"} <span className="sr-only">Theme Switch</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
