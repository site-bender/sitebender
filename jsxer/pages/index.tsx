/* @jsx createElement */
/* @jsxFrag Fragment */
// Jexer landing page rendered via Sitebender pipeline
import createElement from "~utilities/createElement/index.ts"
import Fragment from "~utilities/Fragment/index.ts"

// Ensure JSX runtime is available during SSR
Object.assign(globalThis, { createElement, Fragment })

export function Head() {
  return (
    <Fragment>
      <title>JSX to AST Visualizer</title>
  <link rel="stylesheet" href="/style.css" />
      {/* App boot script (transpiled to JS by build) */}
      <script type="module" src="/scripts/app/main.js"></script>
    </Fragment>
  )
}

export default function IndexPage() {
  return (
    <div id="app"></div>
  )
}
