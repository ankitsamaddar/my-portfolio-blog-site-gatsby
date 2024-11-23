/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
 */

import React from "react";

// Third-party styles
import 'react-phone-number-input/style.css';
import 'katex/dist/katex.min.css';
import 'prismjs/themes/prism-okaidia.css';
import "prismjs/plugins/command-line/prism-command-line.css"

// Tailwind and custom styles
import "/src/styles/global.css";

import Layout from "./src/components/layout";


export const wrapPageElement = ({ element }) => {
  return <Layout>{element}</Layout>;
};
