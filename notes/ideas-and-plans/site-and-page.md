# The Site component

The Site component (`libraries/components`) is a page-wrapper that adds the `<html>`, `<head>`, `<body>`, and the content of the `<head>` element, including `<title>`, `<meta>`, `<link>`, `<script>`, and possibly (but probably not), `<style>` elements, including Open Graph, Twitter, Dublin Core metadata, and more.

This is a generic components. The user creates their own version (or versions). This component is imported into every page in the `pages/` folder and subfolders (like a layout, and it can work as a layout), where it wraps the `<Page>` component. The `<Page>` component can override any or all of the sitewide attributes.

`<Site>` components live in the `sites/` folder.

Example:

```tsx
// At /sites/MySite/index.tsx
// Actual deeply-linked paths TBD
import Site from "@sitebender/components/Site/index.tsx";

export default function MySite({ children }) {
  return (
    <Site
      appendToTitle="My Site"
      author="Bob Dobbs"
      canonical="https://my-site.me"
      description="This is the description for My Site, the coolest site on Earth!"
      language="en-NZ"
      title="Hooray!"
      titleSeparator=" : "
      viewport="width=device-width, initial-scale=1" {/* This is the default */}
      {/* publisher, color-scheme, theme, theme-color, etc. */}
    >
      <OpenGraph
        {/* Defaults to the primary description */}
        description="This is the description for My Site, the coolest site on Earth!"
        image="https://my-site.com/images/logo.svg"
        imageAltText="My Site!"
        imageHeight="650"
        {/* siteName, title, type, imageWidth, etc. */}
      />
      <X {/* Twitter (alias it to X) */}
        {/* image, imageAltText, imageHeight, site, title, etc. */}
      />
      <Resource media="screen" type="stylesheet" url="/styles/index.css" />
      <Resource language="JavaScript" type="script" url="/scripts/index.js" />
      {children}
    </Site>
  )
}
```

Then the `<Page>` component (used in `pages/` and subfolders — folder hierarchy maps URL routes), we wrap the page in the Site component and we can override (or append to) site-wide properties:

```tsx
// At /pages/about-us/index.tsx
// Actual deeply-linked paths TBD
import Header from "@sitebender/components/Header/index.tsx"
import Logo from "@sitebender/components/Logo/index.tsx"
import Page from "@sitebender/components/Page/index.tsx"
import MySite from "../sites/MySite/index.tsx"

// About us page at /pages/about-us/index.tsx
export default function () { // Can be anonymous as path is used to access
  return (
    <MySite>
      <Page
        description="All about the My Site superstar team!"
        keywords="bob is god"
        title="About us" {/* Output: <title>About us : My Site!</title> */}
      >
        <Header>
          <Logo source="/images/logo.svg" />
        </Header>
        {/* etc. */}
      </Page>
    </MySite>
  )
}
```

Please add any concerns, thoughts, pros/cons here:
