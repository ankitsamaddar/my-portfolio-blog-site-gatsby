import React from "react"
import { graphql, Link } from "gatsby"
import { Typewriter, Cursor } from "react-simple-typewriter"
import ContactForm from "../components/contactForm"
import TechIconGrid from "../components/techIconGrid"
import ProjectCarousel from "../components/projectCarousel"
import SocialLinks from "../components/socialLinks"
import Seo from "../components/Seo"

const Home = ({ data }) => {
  const projects = data.projects.nodes
  const blogs = data.blogs.nodes

  // SOCIAL LINKS
  const socials = [
    {
      label: "GitHub",
      url: "https://github.com/ankitsamaddar",
      iconPath:
        "M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z",
      viewBox: "0 0 496 512",
    },
    {
      label: "LinkedIn",
      url: "https://linkedin.com/in/ankitsamaddar",
      iconPath:
        "M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z",
      viewBox: "0 0 50 50",
    },
    {
      label: "LeetCode",
      url: "https://leetcode.com/u/ankitsamaddar",
      iconPath:
        "M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z",
      viewBox: "0 0 24 24",
    },
    {
      label: "GeeksforGeeks",
      url: "https://www.geeksforgeeks.org/user/ankitsamaddar",
      iconPath:
        "M21.45 14.315c-.143.28-.334.532-.565.745a3.691 3.691 0 0 1-1.104.695 4.51 4.51 0 0 1-3.116-.016 3.79 3.79 0 0 1-2.135-2.078 3.571 3.571 0 0 1-.13-.353h7.418a4.26 4.26 0 0 1-.368 1.008zm-11.99-.654a3.793 3.793 0 0 1-2.134 2.078 4.51 4.51 0 0 1-3.117.016 3.7 3.7 0 0 1-1.104-.695 2.652 2.652 0 0 1-.564-.745 4.221 4.221 0 0 1-.368-1.006H9.59c-.038.12-.08.238-.13.352zm14.501-1.758a3.849 3.849 0 0 0-.082-.475l-9.634-.008a3.932 3.932 0 0 1 1.143-2.348c.363-.35.79-.625 1.26-.809a3.97 3.97 0 0 1 4.484.957l1.521-1.49a5.7 5.7 0 0 0-1.922-1.357 6.283 6.283 0 0 0-2.544-.49 6.35 6.35 0 0 0-2.405.457 6.007 6.007 0 0 0-1.963 1.276 6.142 6.142 0 0 0-1.325 1.94 5.862 5.862 0 0 0-.466 1.864h-.063a5.857 5.857 0 0 0-.467-1.865 6.13 6.13 0 0 0-1.325-1.939A6 6 0 0 0 8.21 6.34a6.698 6.698 0 0 0-4.949.031A5.708 5.708 0 0 0 1.34 7.73l1.52 1.49a4.166 4.166 0 0 1 4.484-.958c.47.184.898.46 1.26.81.368.36.66.792.859 1.268.146.344.242.708.285 1.08l-9.635.008A4.714 4.714 0 0 0 0 12.457a6.493 6.493 0 0 0 .345 2.127 4.927 4.927 0 0 0 1.08 1.783c.528.56 1.17 1 1.88 1.293a6.454 6.454 0 0 0 2.504.457c.824.005 1.64-.15 2.404-.457a5.986 5.986 0 0 0 1.964-1.277 6.116 6.116 0 0 0 1.686-3.076h.273a6.13 6.13 0 0 0 1.686 3.077 5.99 5.99 0 0 0 1.964 1.276 6.345 6.345 0 0 0 2.405.457 6.45 6.45 0 0 0 2.502-.457 5.42 5.42 0 0 0 1.882-1.293 4.928 4.928 0 0 0 1.08-1.783A6.52 6.52 0 0 0 24 12.457a4.757 4.757 0 0 0-.039-.554z",
      viewBox: "0 0 24 24",
    },
  ]

  // TECHNOLOGIES I USE
  const technologies = [
    {
      label: "React",
      iconPath:
        "M418.2 177.2c-5.4-1.8-10.8-3.5-16.2-5.1.9-3.7 1.7-7.4 2.5-11.1 12.3-59.6 4.2-107.5-23.1-123.3-26.3-15.1-69.2.6-112.6 38.4-4.3 3.7-8.5 7.6-12.5 11.5-2.7-2.6-5.5-5.2-8.3-7.7-45.5-40.4-91.1-57.4-118.4-41.5-26.2 15.2-34 60.3-23 116.7 1.1 5.6 2.3 11.1 3.7 16.7-6.4 1.8-12.7 3.8-18.6 5.9C38.3 196.2 0 225.4 0 255.6c0 31.2 40.8 62.5 96.3 81.5 4.5 1.5 9 3 13.6 4.3-1.5 6-2.8 11.9-4 18-10.5 55.5-2.3 99.5 23.9 114.6 27 15.6 72.4-.4 116.6-39.1 3.5-3.1 7-6.3 10.5-9.7 4.4 4.3 9 8.4 13.6 12.4 42.8 36.8 85.1 51.7 111.2 36.6 27-15.6 35.8-62.9 24.4-120.5-.9-4.4-1.9-8.9-3-13.5 3.2-.9 6.3-1.9 9.4-2.9 57.7-19.1 99.5-50 99.5-81.7 0-30.3-39.4-59.7-93.8-78.4zM282.9 92.3c37.2-32.4 71.9-45.1 87.7-36 16.9 9.7 23.4 48.9 12.8 100.4-.7 3.4-1.4 6.7-2.3 10-22.2-5-44.7-8.6-67.3-10.6-13-18.6-27.2-36.4-42.6-53.1 3.9-3.7 7.7-7.2 11.7-10.7zM167.2 307.5c5.1 8.7 10.3 17.4 15.8 25.9-15.6-1.7-31.1-4.2-46.4-7.5 4.4-14.4 9.9-29.3 16.3-44.5 4.6 8.8 9.3 17.5 14.3 26.1zm-30.3-120.3c14.4-3.2 29.7-5.8 45.6-7.8-5.3 8.3-10.5 16.8-15.4 25.4-4.9 8.5-9.7 17.2-14.2 26-6.3-14.9-11.6-29.5-16-43.6zm27.4 68.9c6.6-13.8 13.8-27.3 21.4-40.6s15.8-26.2 24.4-38.9c15-1.1 30.3-1.7 45.9-1.7s31 .6 45.9 1.7c8.5 12.6 16.6 25.5 24.3 38.7s14.9 26.7 21.7 40.4c-6.7 13.8-13.9 27.4-21.6 40.8-7.6 13.3-15.7 26.2-24.2 39-14.9 1.1-30.4 1.6-46.1 1.6s-30.9-.5-45.6-1.4c-8.7-12.7-16.9-25.7-24.6-39s-14.8-26.8-21.5-40.6zm180.6 51.2c5.1-8.8 9.9-17.7 14.6-26.7 6.4 14.5 12 29.2 16.9 44.3-15.5 3.5-31.2 6.2-47 8 5.4-8.4 10.5-17 15.5-25.6zm14.4-76.5c-4.7-8.8-9.5-17.6-14.5-26.2-4.9-8.5-10-16.9-15.3-25.2 16.1 2 31.5 4.7 45.9 8-4.6 14.8-10 29.2-16.1 43.4zM256.2 118.3c10.5 11.4 20.4 23.4 29.6 35.8-19.8-.9-39.7-.9-59.5 0 9.8-12.9 19.9-24.9 29.9-35.8zM140.2 57c16.8-9.8 54.1 4.2 93.4 39 2.5 2.2 5 4.6 7.6 7-15.5 16.7-29.8 34.5-42.9 53.1-22.6 2-45 5.5-67.2 10.4-1.3-5.1-2.4-10.3-3.5-15.5-9.4-48.4-3.2-84.9 12.6-94zm-24.5 263.6c-4.2-1.2-8.3-2.5-12.4-3.9-21.3-6.7-45.5-17.3-63-31.2-10.1-7-16.9-17.8-18.8-29.9 0-18.3 31.6-41.7 77.2-57.6 5.7-2 11.5-3.8 17.3-5.5 6.8 21.7 15 43 24.5 63.6-9.6 20.9-17.9 42.5-24.8 64.5zm116.6 98c-16.5 15.1-35.6 27.1-56.4 35.3-11.1 5.3-23.9 5.8-35.3 1.3-15.9-9.2-22.5-44.5-13.5-92 1.1-5.6 2.3-11.2 3.7-16.7 22.4 4.8 45 8.1 67.9 9.8 13.2 18.7 27.7 36.6 43.2 53.4-3.2 3.1-6.4 6.1-9.6 8.9zm24.5-24.3c-10.2-11-20.4-23.2-30.3-36.3 9.6.4 19.5.6 29.5.6 10.3 0 20.4-.2 30.4-.7-9.2 12.7-19.1 24.8-29.6 36.4zm130.7 30c-.9 12.2-6.9 23.6-16.5 31.3-15.9 9.2-49.8-2.8-86.4-34.2-4.2-3.6-8.4-7.5-12.7-11.5 15.3-16.9 29.4-34.8 42.2-53.6 22.9-1.9 45.7-5.4 68.2-10.5 1 4.1 1.9 8.2 2.7 12.2 4.9 21.6 5.7 44.1 2.5 66.3zm18.2-107.5c-2.8.9-5.6 1.8-8.5 2.6-7-21.8-15.6-43.1-25.5-63.8 9.6-20.4 17.7-41.4 24.5-62.9 5.2 1.5 10.2 3.1 15 4.7 46.6 16 79.3 39.8 79.3 58 0 19.6-34.9 44.9-84.8 61.4zm-149.7-15c25.3 0 45.8-20.5 45.8-45.8s-20.5-45.8-45.8-45.8c-25.3 0-45.8 20.5-45.8 45.8s20.5 45.8 45.8 45.8z",
      viewBox: "0 0 512 512",
    },
    {
      label: "CSS",
      iconPath:
        "M0 32l34.9 395.8L192 480l157.1-52.2L384 32H0zm313.1 80l-4.8 47.3L193 208.6l-.3.1h111.5l-12.8 146.6-98.2 28.7-98.8-29.2-6.4-73.9h48.9l3.2 38.3 52.6 13.3 54.7-15.4 3.7-61.6-166.3-.5v-.1l-.2.1-3.6-46.3L193.1 162l6.5-2.7H76.7L70.9 112h242.2z",
      viewBox: "0 0 512 512",
      svgCss: "ml-4",
    },
    {
      label: "Webpack",
      iconPath:
        "M22.1987 18.498l-9.7699 5.5022v-4.2855l6.0872-3.3338 3.6826 2.117zm.6683-.6026V6.3884l-3.5752 2.0544v7.396zm-21.0657.6026l9.7699 5.5022v-4.2855L5.484 16.3809l-3.6826 2.117zm-.6683-.6026V6.3884l3.5751 2.0544v7.396zm.4183-12.2515l10.0199-5.644v4.1434L5.152 7.6586l-.0489.028zm20.8975 0l-10.02-5.644v4.1434l6.4192 3.5154.0489.028 3.5518-2.0427zm-10.8775 13.096l-6.0056-3.2873V8.9384l6.0054 3.4525v6.349zm.8575 0l6.0053-3.2873V8.9384l-6.0053 3.4525zM5.9724 8.1845l6.0287-3.3015L18.03 8.1845l-6.0288 3.4665z",
      viewBox: "0 0 24 24",
    },
    {
      label: "Git",
      iconPath:
        "M 46.792969 22.089844 L 27.910156 3.207031 C 27.109375 2.402344 26.054688 2 25 2 C 23.945313 2 22.890625 2.402344 22.089844 3.207031 L 18.355469 6.941406 L 22.976563 11.5625 C 24.511719 10.660156 26.511719 10.855469 27.828125 12.171875 C 29.144531 13.488281 29.335938 15.488281 28.433594 17.019531 L 32.976563 21.5625 C 34.511719 20.660156 36.511719 20.855469 37.828125 22.171875 C 39.390625 23.734375 39.390625 26.265625 37.828125 27.828125 C 36.265625 29.390625 33.734375 29.390625 32.171875 27.828125 C 30.855469 26.511719 30.660156 24.511719 31.5625 22.976563 L 27.019531 18.433594 C 26.695313 18.625 26.355469 18.765625 26 18.855469 L 26 31.140625 C 27.722656 31.585938 29 33.136719 29 35 C 29 37.210938 27.210938 39 25 39 C 22.789063 39 21 37.210938 21 35 C 21 33.136719 22.277344 31.585938 24 31.140625 L 24 18.855469 C 23.332031 18.683594 22.695313 18.351563 22.171875 17.828125 C 20.855469 16.511719 20.664063 14.511719 21.566406 12.980469 L 16.941406 8.355469 L 3.207031 22.089844 C 1.597656 23.695313 1.597656 26.304688 3.207031 27.910156 L 22.089844 46.792969 C 22.890625 47.597656 23.945313 48 25 48 C 26.054688 48 27.109375 47.597656 27.910156 46.792969 L 46.792969 27.910156 C 48.402344 26.304688 48.402344 23.695313 46.792969 22.089844 Z",
      viewBox: "0 0 50 50",
    },
    {
      label: "Gatsby",
      iconPath:
        "M24,4C13,4,4,13,4,24s9,20,20,20s20-9,20-20S35,4,24,4z M12.856,35.144c-3-3-4.571-7-4.571-10.856	l15.571,15.427C19.856,39.571,15.856,38.143,12.856,35.144L12.856,35.144z M27.427,39.288L8.714,20.571	c1.571-7,7.857-12.286,15.286-12.286c5.286,0,9.856,2.571,12.714,6.429l-2.144,1.856c-2.427-3.285-6.285-5.427-10.571-5.427	c-5.571,0-10.286,3.571-12.144,8.571l16.429,16.429c4.144-1.429,7.286-5,8.286-9.286h-6.856V24h10	c0,7.429-5.286,13.714-12.286,15.286L27.427,39.288z",
      viewBox: "0 0 48 48",
    },
    {
      label: "Tailwind",
      iconPath:
        "M24,9.604c-6.4,0-10.4,3.199-12,9.597c2.4-3.199,5.2-4.398,8.4-3.599 c1.826,0.456,3.131,1.781,4.576,3.247C27.328,21.236,30.051,24,36,24c6.4,0,10.4-3.199,12-9.598c-2.4,3.199-5.2,4.399-8.4,3.6 c-1.825-0.456-3.13-1.781-4.575-3.247C32.672,12.367,29.948,9.604,24,9.604L24,9.604z M12,24c-6.4,0-10.4,3.199-12,9.598 c2.4-3.199,5.2-4.399,8.4-3.599c1.825,0.457,3.13,1.781,4.575,3.246c2.353,2.388,5.077,5.152,11.025,5.152 c6.4,0,10.4-3.199,12-9.598c-2.4,3.199-5.2,4.399-8.4,3.599c-1.826-0.456-3.131-1.781-4.576-3.246C20.672,26.764,17.949,24,12,24 L12,24z",
      viewBox: "0 0 48 48",
    },
  ]

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Welcome Section */}
      <section className="hero w-screen h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 text-center p-12">
        {/* Name */}
        <h1 className="text-5xl font-extrabold text-gray-800 dark:text-gray-100">
          Ankit Samaddar
        </h1>

        {/* Typewriter Animation */}
        <h2 className="text-2xl text-gray-700 dark:text-gray-300 mt-4">
          <Typewriter
            words={[
              "Web Developer",
              "Web Designer",
              "Programmer",
              "Tech Enthusiast",
              "Engineer",
            ]}
            loop={0}
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
          <Cursor />
        </h2>

        {/* Introduction */}
        <div className="flex justify-center">
          <p className="prose dark:prose-invert mt-6 text-lg  text-gray-600 dark:text-gray-400 max-w-xl">
            I'm Ankit, a software developer from India with a Bachelor's Degree
            in Engineering. I specialize in web development, data structures,
            algorithms, SQL/NoSQL databases, and creating efficient PowerShell
            scripts for automation and data manipulation using .NET libraries.
          </p>
        </div>

        {/* Social Links */}
        <div className="max-h-screen flex items-center justify-center">
          <SocialLinks socials={socials} />
        </div>
      </section>
      {/* Technologies Section */}
      <section className="py-14 w-screen">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="pb-8 text-4xl text-center font-semibold text-gray-800 dark:text-gray-100">
            Tools & Technologies I Work With
          </h2>
        </div>
        {/* Icon Grid */}
        <div className="max-w-5xl mx-auto px-8">
          <TechIconGrid technologies={technologies} />
        </div>
      </section>
      {/* Intro Section */}
      <section className="py-20 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-semibold text-center text-gray-800 dark:text-gray-100">
            Welcome to My Portfolio
          </h1>
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <p className="mt-4 text-center text-xl text-gray-700 dark:text-gray-300">
            Discover my latest projects and blogs.
          </p>
        </div>
      </section>
      {/* Projects Section */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-100">
            Latest Projects
          </h2>
        </div>

        {/* Carousel Component */}
        <div className="max-w-9xl mx-auto px-6 mb-10">
          <ProjectCarousel projects={projects} />
        </div>

        {/* View All Projects */}
        <div className="max-w-fit mx-auto px-6 mb-10">
          {/* View All Projects */}
          <div className="text-center mt-6">
            <Link
              to="/projects"
              className="btn btn-primary text-black dark:text-white"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>
      {/* Blogs Section */}
      <section className="py-12 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-100">
            Latest Blogs
          </h2>
        </div>
        {/* Blog Cards */}
        <div className="flex justify-center my-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-6 w-full max-w-7xl px-6">
            {blogs.map(blog => (
              <div
                key={blog.frontmatter.title}
                className="card bg-gray-100 dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden flex flex-col md:flex-row"
              >
                {/* Image Section */}
                <div className="relative w-full md:w-1/3 h-48 md:h-auto">
                  <img
                    src={
                      blog.frontmatter.image.childImageSharp.gatsbyImageData
                        .images.fallback.src
                    }
                    alt={blog.frontmatter.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Content Section */}
                <div className="card-body p-6 flex flex-col justify-between md:w-2/3">
                  {/* Date */}
                  <time
                    className="text-sm text-zinc-700 dark:text-zinc-500"
                    dateTime={blog.frontmatter.date}
                  >
                    {new Date(blog.frontmatter.date).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      },
                    )}
                  </time>

                  {/* Title */}
                  <h2 className="card-title text-gray-800 dark:text-gray-100 mt-2 line-clamp-1">
                    {blog.frontmatter.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
                    {blog.frontmatter.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {blog.frontmatter.tags.map(tag => (
                      <div
                        key={tag}
                        className="badge badge-outline badge-primary font-bold hover:contrast-125 text-sm"
                      >
                        {tag}
                      </div>
                    ))}
                  </div>

                  {/* Read More Link */}
                  <div className="mt-4">
                    <Link
                      to={blog.fields.slug}
                      className="btn btn-sm btn-primary text-white"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-12 text-center my-6">
          <Link
            to="/blogs"
            className="btn text-black dark:text-white btn-primary"
          >
            View All Blogs
          </Link>
        </div>
      </section>
      {/* Contact Section */}
      <section className="py-12 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-100">
            Contact Me
          </h2>
          <p className="mt-4 pb-12 text-center text-gray-600 dark:text-gray-300">
            Feel free to reach out to me for any inquiries or collaborations.
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <ContactForm className="py-4" />
        </div>
      </section>
    </div>
  )
}

export const query = graphql`
  {
    projects: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/projects/" } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        frontmatter {
          title
          description
          tags
          image {
            childImageSharp {
              gatsbyImageData(width: 300, layout: CONSTRAINED)
            }
          }
        }
        fields {
          slug
        }
      }
    }
    blogs: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/blogs/" } }
      sort: { frontmatter: { date: DESC } }
      limit: 4
    ) {
      nodes {
        frontmatter {
          title
          description
          date
          tags
          image {
            childImageSharp {
              gatsbyImageData(width: 300, layout: CONSTRAINED)
            }
          }
        }
        fields {
          slug
        }
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`

// Set Metadata
export const Head = ({ data, location }) => {
  const blogs = data.blogs.nodes
  const projects = data.projects.nodes

  // Generate URLs for the blogs and projects
  const blogUrls = blogs.map(blog => `${location.origin}${blog.fields.slug}`)
  const projectUrls = projects.map(
    project => `${location.origin}/projects#${project.fields.slug}`,
  )

  const webUrl = data.site.siteMetadata.siteUrl

  // Schema markup for the portfolio's main page
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: webUrl,
    name: "Home - Ankit Samaddar Portfolio",
    description:
      "Welcome to my portfolio. Explore my projects, blogs, and get in touch.",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${webUrl}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Projects",
          item: `${webUrl}/projects`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Blogs",
          item: `${webUrl}/blogs`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Contact",
          item: `${webUrl}/contact`,
        },
      ],
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${webUrl}`,
    },
    relatedLink: [
      ...blogUrls.map(url => ({
        "@type": "Article",
        url: `${webUrl}${url}`,
      })),
      ...projectUrls.map(url => ({
        "@type": "Project",
        url: `${webUrl}${url}`,
      })),
    ],
    about: {
      "@type": "Person",
      name: "Ankit Samaddar",
      email: "ankitsam0602@gmail.com",
      image: `${webUrl}/favicon-32x32.png`,
      jobTitle:
        "Web Developer, Website Developer, React Developer, Full Stack Developer, Software Engineer",
      // worksFor: {
      //   "@type": "Organization",
      //   name: "Your Company Name",
      // },
    },
  }

  return (
    <Seo
      description="Explore my projects, read my blogs, and learn more about me."
      schemaMarkup={schemaMarkup}
    />
  )
}
export default Home
