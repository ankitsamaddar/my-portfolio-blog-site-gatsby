import React from "react"
import ContactForm from "../components/contactForm"
import Breadcrumbs from "../components/breadcrumbs"
import SeoComponent from "../components/seoComponent"

const ContactPage = () => {
  const breadcrumbItems = [
    { label: "Home", link: "/" },
    {
      label: "Contact Me",
      icon: (
        <path d="M384 48c8.8 0 16 7.2 16 16l0 384c0 8.8-7.2 16-16 16L96 464c-8.8 0-16-7.2-16-16L80 64c0-8.8 7.2-16 16-16l288 0zM96 0C60.7 0 32 28.7 32 64l0 384c0 35.3 28.7 64 64 64l288 0c35.3 0 64-28.7 64-64l0-384c0-35.3-28.7-64-64-64L96 0zM240 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128zm-32 32c-44.2 0-80 35.8-80 80c0 8.8 7.2 16 16 16l192 0c8.8 0 16-7.2 16-16c0-44.2-35.8-80-80-80l-64 0zM512 80c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64zM496 192c-8.8 0-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64c0-8.8-7.2-16-16-16zm16 144c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64z" />
      ),
      viewBox: "0 0 512 512",
    },
  ]

  const currentDate = new Date().toLocaleString()
  const emailId = "ankitsam0602@gmail.com"
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Page Title */}
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Me</h1>
      </div>

      {/* Contact Methods */}
      <div className="max-w-7xl mx-auto mb-6">
        <article className="max-w-2xl prose dark:prose-invert mx-auto px-4 text-center">
          I'm eager to contribute my skills and grow with your team—let's
          connect!
          <br /> You can connect with me on LinkedIn or drop me an email—I'm
          just a message away and excited to explore how we can work together.
        </article>
        <div className="grid place-items-center bg-gray-100 dark:bg-gray-900">
          <div className="space-y-2 py-6 text-center">
            {/* Gmail Section */}
            <div className="flex items-center space-x-2">
              <a
                href={`mailto:${emailId}?subject=Contacting%20After%20Seeing%20Your%20Portfolio%20${encodeURIComponent(
                  currentDate,
                )}`}
                className="text-xl hover:text-blue-500 transition"
                aria-label="Email"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                  fill="currentColor"
                  stroke="none"
                >
                  <path d="M22 3H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2ZM12 9.88 4.07 4h15.86Zm-8-.67 7.7 5.69a.5.5 0 0 0 .59 0L20 9.21V20H4Z"></path>
                </svg>
              </a>
              <a
                href={`mailto:${emailId}?subject=Contacting%20After%20Seeing%20Your%20Portfolio%20${encodeURIComponent(
                  currentDate,
                )}`}
                className="text-sm text-gray-700 dark:text-gray-300 hover:underline hover:text-blue-500 hover:dark:text-blue-500 transition"
              >
                {emailId}
              </a>
            </div>

            {/* LinkedIn Section */}
            <div className="flex items-center space-x-2">
              <a
                href="https://www.linkedin.com/in/ankitsamaddar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:text-blue-500 transition"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="w-6 h-7"
                  fill="currentColor"
                  stroke="currentColor"
                >
                  <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/ankitsamaddar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-700 dark:text-gray-300 hover:underline hover:text-blue-500 hover:dark:text-blue-500 transition"
              >
                https://www.linkedin.com/in/ankitsamaddar
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">Contact Form</h2>
      </div>
      <div className="max-w-7xl mx-auto px-6">
        <ContactForm />
      </div>
    </div>
  )
}
export const Head = ({ location }) => {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: "https://ankitsamaddar.github.io/contact",
    name: "Contact Me - Ankit Samaddar",
    description:
      "Get in touch with me for collaborations, queries, or opportunities. I'm just a message away!",
    potentialAction: {
      "@type": "CommunicateAction",
      target: "mailto:ankitsam0602@gmail.com",
    },
  }

  return (
    <SeoComponent
      title="Contact Me - Ankit Samaddar"
      description="Reach out to me via LinkedIn or email for any collaboration or opportunity. I'm eager to connect!"
      pathname={"https://ankitsamaddar.github.io" + location.pathname}
      keywords={["contact", "collaboration", "email", "LinkedIn"]}
      schemaMarkup={schemaMarkup}
      twitterUsername="ankitsamaddar_"
    />
  )
}

export default ContactPage
