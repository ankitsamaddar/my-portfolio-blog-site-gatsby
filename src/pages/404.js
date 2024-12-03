import React from "react"
import { Link } from "gatsby"
import Breadcrumbs from "../components/breadcrumbs"
import SeoComponent from "../components/seoComponent"

const NotFoundPage = () => {
  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "404", link: "/404" },
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8 bg-red-500 text-white">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Main content */}
      <div className="text-center p-6 space-y-6">
        <h1 className="text-6xl font-extrabold tracking-tight">
          Oops! Page Not Found
        </h1>
        <p className="text-xl font-semibold">
          Looks like you wandered too far off the beaten path.
        </p>
        <p className="text-lg">Don’t worry, we’ll get you back on track!</p>

        <Link to="/" className="btn btn-neutral bg-gray-900 text-white mt-4">
          Go back Home
        </Link>
      </div>
    </div>
  )
}


export const Head = ({ location }) => {

  return (
    <SeoComponent
      title="404 Not Found - Ankit Samaddar"
      description="Oops! The page you're looking for couldn't be found."
      pathname={location.pathname}
    />
  )
}

export default NotFoundPage
