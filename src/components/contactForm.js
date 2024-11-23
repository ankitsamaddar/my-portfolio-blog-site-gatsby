import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";

const ContactForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});
  const accessToken = process.env.GATSBY_REACT_APP_WEB3FORMS_ACCESS_TOKEN // Web3Forms access token

  // Form validation function
  const validateForm = () => {
    let errors = {};

    // Validate first name
    if (!firstName) {
      errors.firstName = "First name is required.";
    } else if (firstName.length < 2) {
      errors.firstName = "First name must be at least 2 characters long.";
    }

    // Validate last name
    if (!lastName) {
      errors.lastName = "Last name is required.";
    } else if (lastName.length < 2) {
      errors.lastName = "Last name must be at least 2 characters long.";
    }

    // Validate phone number
    if (!phone) {
      errors.phone = "Phone number is required.";
    } else if (!/^\+\d+$/.test(phone)) {
      errors.phone = "Phone number must be numeric.";
    } else if (phone.length < 10) {
      errors.phone = "Phone number must be at least 10 digits long.";
    }

    // Validate email
    if (!email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid.";
    }

    // Validate message
    if (!message) {
      errors.message = "Message is required.";
    } else if (message.length < 10) {
      errors.message = "Message must be at least 10 characters long.";
    }

    // Return the errors object
    return errors;
  };

  const myEmail = "your-mail@gmail.com";

  const handleEmailClick = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    window.location.href = `mailto:${myEmail}?subject=Contact from ${firstName} ${lastName} - ${phone} - ${email}&body=${message}`;
  };

  const handleSubmit = async e => {
    e.preventDefault()

    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return // Don't proceed if there are validation errors
    }

    const formData = new FormData()
    formData.append("name", `${firstName} ${lastName}`)
    formData.append("phone", phone)
    formData.append("email", email)
    formData.append("message", message)
    formData.append("access_key", accessToken)

    setStatus("Sending...")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setStatus("Form Submitted Successfully")
        setFirstName("")
        setLastName("")
        setPhone("")
        setEmail("")
        setMessage("")
        setErrors({}) // Clear errors on success
      } else {
        setStatus(data.message || "An error occurred. Please try again.")
      }
    } catch (error) {
      setStatus("Failed to submit form. Please try again.")
      console.error("Error:", error)
    }
  }


  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-xl mx-auto needs-validation"
      noValidate
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium mb-1">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            placeholder="First Name"
            className={`input input-bordered w-full focus:ring-2 ${errors.firstName ? "border-red-500" : "border-indigo-500 border-1"} ${errors.firstName ? "bg-red-50 dark:bg-red-900" : "bg-white dark:bg-gray-900"} focus:ring-blue-500 dark:focus:ring-blue-500`}
            required
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName}</p>
          )}
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium mb-1">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            placeholder="Last Name"
            className={`input input-bordered w-full focus:ring-2 ${errors.lastName ? "border-red-500" : "border-indigo-500 border-1"} ${errors.lastName ? "bg-red-50 dark:bg-red-900" : "bg-white dark:bg-gray-900"} focus:ring-blue-500 dark:focus:ring-blue-500`}
            required
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-1">
          Phone Number:
        </label>
        <PhoneInput
          international
          defaultCountry="IN"
          value={phone}
          onChange={setPhone}
          placeholder="Phone Number"
          className={`input input-bordered w-full focus:ring-2 ${errors.phone ? "border-red-500" : "border-indigo-500 border-1"} ${errors.phone ? "bg-red-50 dark:bg-red-900" : "bg-white dark:bg-gray-900"} focus:ring-blue-500 dark:focus:ring-blue-500`}
          required
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email Address:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email Address"
          className={`input input-bordered w-full text-gray-900 dark:text-gray-100 focus:ring-2 ${errors.email ? "border-red-500 placeholder-red-400" : "border-indigo-500 border-1"} ${errors.email ? "bg-red-50 dark:bg-red-900" : "bg-white dark:bg-gray-900"} focus:ring-blue-500 dark:focus:ring-blue-500`}
          required
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          Message:
        </label>
        <textarea
          id="message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Your Message"
          className={`textarea textarea-bordered w-full focus:ring-2 ${errors.message ? "border-red-500" : "border-indigo-500 border-1"} ${errors.message ? "bg-red-50 dark:bg-red-900" : "bg-white dark:bg-gray-900"} focus:ring-blue-500 dark:focus:ring-blue-500`}
          rows="5"
          required
        ></textarea>
        {errors.message && (
          <p className="text-red-500 text-sm">{errors.message}</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-left gap-4">
        <button
          type="button"
          onClick={handleEmailClick}
          className="btn btn-outline btn-primary"
        >
          Send Email
        </button>

        <button type="submit" className="btn btn-primary">
          Send Message
        </button>
      </div>

      {/* Status Message */}
      {status && <p className="mt-4 text-center text-lg">{status}</p>}
    </form>
  )
};

export default ContactForm;
