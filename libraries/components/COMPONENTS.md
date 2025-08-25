# Components

## Navigation

| Component                 | Primary Function                 | Scope                  | Presentation Variants                           |
| :------------------------ | :------------------------------- | :--------------------- | :---------------------------------------------- |
| **`<GlobalNav />`**       | Navigate top-level site sections | Global                 | Horizontal Bar, Vertical Sidebar, Mobile Drawer |
| **`<LocalNav />`**        | Navigate within a section        | Local                  | Sub-menu, Tabs, Nested List                     |
| **`<BreadcrumbTrail />`** | Show & navigate hierarchy path   | Contextual             | Text links with separators (e.g., `>`)          |
| **`<Pagination />`**      | Navigate page sequences          | Contextual             | Numbered buttons, Previous/Next                 |
| **`<RelatedLinks />`**    | Navigate to related content      | Contextual             | Text links, Card grid                           |
| **`<Search />`**          | Navigate via query               | Utility                | Input field with button                         |
| **`<SkipLink />`**        | Skip to main content             | Accessibility (Global) | Hidden until focused                            |
| **`<PageTitle />`**       | Announce page content            | Accessibility (Global) | `<h1>` and `<title>` tag                        |
| **`<SupplementalNav />`** | Navigate to ancillary pages      | Supplemental           | Multi-column link list                          |

## Helpers

- collectLinkElements - Collects all link elements from document or element
- collectScriptElements - Collects all script elements from document or element
- getSelector - Generates a unique CSS selector for an element
- getValue - Retrieves values from various DOM sources
  - getFromCheckbox - Gets checked state from checkbox inputs
  - getFromDataset - Extracts data attributes from elements
  - getFromInnerHtml - Retrieves inner HTML content
  - getFromInput - Gets value from input elements
  - getFromLocal - Retrieves data from localStorage
  - getFromSelect - Gets selected value from select elements
  - getFromTextArea - Gets text content from textarea elements
- getOperands - Extracts operands from mathematical expressions


## Brainstorming a cognitively simple page approach

Let's think from first principles about what a *truly* helpful, high-level page construction DSL would look like.

The goal is to be **declarative and intent-based**, not descriptive. We don't describe the HTML tree; we declare the purpose of the page's parts.

---

### A New Mental Model: The Document as a Report

Think of a well-structured report, presentation, or word document. It has clear, named parts.

#### 1. The Top-Level: `Document` or `Page`

`<Page>` is still a good, simple top-level container. Its sole job is to be the root. We configure the *entire document* here.

```jsx
<Page title="Welcome to My Site" language="en" theme="dark"...
```
It compiles to the `<html>`, `<head>`, and a `<body>` with all the necessary boilerplate. The user should never have to think about those tags.

*   **`title`**: Prop for the page title (creates `<title>` and relevant OG tags).
*   **`language`**: Prop for the `lang` attribute.
*   **`theme`**: Prop to specify a light/dark/auto theme (injects necessary meta tags and CSS variables).
*   **`scripts`**: Prop to specify an array of JS files to load (`['app.js', 'widgets.js']`). The library figures out where and how to include them.
*   **`styles`**: Prop for an array of CSS files.

#### 2. The "Head" Replacement: Configuration, Not Tags

There is no `<Page.Head>`. Instead, we have components that declare their purpose. They can only be used as direct children of `<Page>`.

*   **`<Info>`**: For metadata. Uses props, not child elements, for clarity.
    ```jsx
    <Page title="My Page" language="en">
        <Info
            description="This is my awesome page"
            author="Jane Doe"
            keywords="web, dev, awesome"
            socialImage="/og-image.png"
        />
        {/* ... */}
    </Page>
    ```
    This single component generates *all* relevant meta tags: standard `name="description"`, Twitter Card tags, Open Graph tags, etc. The user thinks about the *information*, not the myriad of HTML tags required to express it.

*   **`<Resource>`**: A unified way to pull in external files. The `kind` prop defines the intent.
    ```jsx
    <Resource kind="font" from="google" name="Inter" weights={[400, 700]}/>
    <Resource kind="icon-set" from="lucide" />
    <Resource kind="stylesheet" href="/styles.css"/>
    <Resource kind="script" href="/app.js" load="defer"/>
    ```
    This is infinitely more intuitive for a newbie than `<link rel="preconnect" href="https://fonts.gstatic.com">` and a `<style>` tag with an `@import`.

#### 3. The "Body" Replacement: Content Sections

The visible part of the page is made of high-level sections. **`<Body>` is a terrible name.** It's an implementation detail. Let's call it what it is: the **`<Content>`** of the document.

```jsx
<Page title="Welcome...">
    <Info ... />
    <Content>
        {/* This is where our high-level sections go */}
    </Content>
</Page>
```

#### 4. Reusable Pieces: `Block` and `Component`

This is key. We need a hierarchy.

*   **`Block`**: This is the perfect name for your large, reusable pieces. A `Block` is a major section of a `Content` area. It implies structure and reusability.
    *   `HeroBlock`, `FeatureGridBlock`, `TestimonialSliderBlock`, `HeaderBlock`, `FooterBlock`.
    *   A page is built by composing these semantic `Block`s.

*   **`Component`**: This is the standard React/JSX term for any reusable piece of code. Your form fields (`TextField`, `YesNoField`) are `Component`s. A `Component` is used *within* a `Block` or another `Component`.

**The Hierarchy:**
`Page` -> `Content` -> `Block` -> `Component` -> (Primitives like `Button`, `Text`)

---

### Putting It All Together: A Beginner's Page

Here's what a page might look like for a new dev who knows nothing about HTML. They are declaring their intent.

```jsx
import { Page, Info, Resource, Content, HeaderBlock, HeroBlock, SignUpBlock, FooterBlock } from '@your-library/core';
import { Heading, Text } from '@your-library/typography';

const WelcomePage = () => (
  <Page
    title="CoolApp - Get Started for Free"
    language="en"
    theme="auto"
    scripts={['main.js']}
    styles={['theme.css']}
  >
    <Info
      description="CoolApp is the best app for doing cool things. Sign up for a free trial today!"
      author="CoolApp Inc."
      socialImage="/social-preview.png"
    />
    <Resource kind="font" from="google" name="Open Sans" weights={[400, 600]} />
    <Resource kind="icon-set" from="heroicons" />

    <Content>
      <HeaderBlock logo="/logo.svg" menu={['Home', 'About', 'Pricing']} />
      <HeroBlock>
        <Heading level={1}>Do Cool Things</Heading>
        <Text size="lead">CoolApp makes it incredibly easy to do the coolest things you've ever imagined.</Text>
        <Button priority="primary" size="large">Start Now</Button>
      </HeroBlock>
      <SignUpBlock />
      <FooterBlock companyName="CoolApp Inc." />
    </Content>
  </Page>
);
```

**What did the user never have to learn?**
They didn't learn about `<html>`, `<head>`, `<body>`, `<meta>`, `<link>`, `<script>`, `<header>`, `<section>`, `<div>`, or CSS classes. They declared their page's **information**, **resources**, and **structure** using intuitive, purpose-driven components.

The library's job is to take this high-level declaration and compile it down to perfectly structured, accessible, and performant HTML, CSS, and JS. *That* is the power of your approach, and I apologize for initially completely missing the point. This is a much more exciting and valuable direction.

## Site

Excellent! You've perfectly identified the next logical abstraction layer. A `Site` component (or perhaps `Site` to be even more explicit) is exactly the right concept. This moves shared configuration and boilerplate out of the individual pages and into a single, centralized declaration. This is a massive win for maintainability and DRY principles.

Here’s a breakdown of how this could work, including the powerful concept of **override and composition**.

### The `Site` Component: The Single Source of Truth

The `Site` component defines all the global defaults for every page in your application.

**Location:** `/site/Site.jsx` (or similar)

```tsx
// site/site.jsx
import { Site, Info, Resource } from '@your-library/core';

const MySite = ({ children }) => (
  <Site
    language="en"
    scripts={['global-bundle.js']}
    styles={['global-styles.css']}
    theme="auto"
    title="Welcome"
    titlePrefix="☀️ "
    titleSeparator=" : "
    titleSuffix="My Awesome Site"
  >
    {/* <title> becomes "☀️ Welcome : My Awesome Site" */}
    {/* Can override title (or any prop) in Page */}

    {/* Global Meta Info */}
    <Info
      description="The default description for every page on the site."
      author="Our Fantastic Team"
      socialImage="/default-og-image.png"
      twitterHandle="@myAwesomeSite"
    />
    {/* Can override  props in Page */}
    
    {/* Global Resources */}
    <Resource kind="font" from="google" name="Inter" weights={[400, 500, 700]}/>
    <Resource kind="icon-set" from="lucide" />
    
    {/* This is where the specific Page content will be injected */}
    {children}
  </Site>
);

export default MySite;
```

### The Page: Overriding and Extending the Site

Now, an individual page becomes incredibly clean and focused. It only needs to declare what is *different* or *specific* to itself.

**Key Mechanics:**
1.  **Props like `title` on `Page` override the `Site`'s `defaultTitle`.**
2.  **Nested components like `<Info>` inside `<Page>` should *merge* with or *override* the global ones defined in `<Site>`.** The library's compiler would handle this intelligently.
    *   **Merge:** For tags like `<meta name="keywords">`, the page might want to *add* to the global list.
    *   **Override:** For tags like `<meta name="description">` or `<title>`, the page's value should almost always *replace* the global one.

```tsx
// pages/about-us.jsx
import MySite from '../site/MySite';
import { Page, Content, Heading, Paragraph } from '@your-library/core';

const AboutUs = () => (
  <MySite>
    <Page
      title="About Our Team" // Becomes "About Our Team : My Awesome Site"
      titlePrefix="" // Overrides prefix in Site
      styles={['about-page-styles.css']} // Appends to Site's style array
    >
      {/* This Info block overrides the global description for this page only */}
      <Info description="Learn about the passionate people behind My Awesome Site and our mission." />

      <Content>
        <Heading>About Us</Heading>
        <Paragraph>We are really great.</Paragraph>
      </Content>
    </Page>
  </MySite>
);
```

### How the Compilation Might Work

The magic is in the compiler. When it sees this structure, it would:

1.  **Collect all data** from the `Site` component's props and children.
2.  **Collect all data** from the `Page` component's props and children.
3.  **Intelligently merge them** based on clear rules:
    *   **Props:** Page-level props override Site-level props of the same name. Arrays (`scripts`, `styles`) are concatenated.
    *   **`<Info>` Tags:** The compiler creates a merged metadata object. Page-level values for `description`, `socialImage`, etc., override the Site-level values. It then generates the optimal set of `<meta>`, `<title>`, and other tags.
4.  **Output a single, optimized HTML file** with a perfectly formed `<head>` and `<body>`.


`Site` is a fantastic choice because it aligns with modern framework terminology.

```tsx
// Using `Site`
import { Site } from '../site/Site';

const AboutUs = () => (
  <Site>
    <Page title="About Us">
      ...
    </Page>
  </Site>
);
```

### Conclusion

This `Site` pattern is not just a good idea; it's essential for a serious library. It provides:

1.  **Consistency:** Ensures every page has the same core resources and meta structure.
2.  **Maintainability:** Change a font or add a global script in one place.
3.  **Powerful Defaults:** New devs can create a fully functional, well-optimized page by just adding a `<Page>` and `<Content>` inside the `<Site>`, without configuring anything else.
4.  **Flexibility:** Experts can override and extend everything on a per-page basis.

It perfectly completes the vision of a declarative, intent-based DSL for the web.
