
// JSXer landing page rendered via Sitebender pipeline

export function Head() {
  return (
    <>
      <title>JSX to AST Visualizer</title>
      <link rel="stylesheet" href="/style.css" />
      {/* App boot script (transpiled to JS by build) */}
      <script type="module" src="/scripts/app/main.js"></script>
    </>
  )
}

export default function IndexPage() {
  return (
    <div id="app"></div>
  )
}
