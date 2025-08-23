# Components

## Navigation

| Component | Primary Function | Scope | Presentation Variants |
| :--- | :--- | :--- | :--- |
| **`<GlobalNav />`** | Navigate top-level site sections | Global | Horizontal Bar, Vertical Sidebar, Mobile Drawer |
| **`<LocalNav />`** | Navigate within a section | Local | Sub-menu, Tabs, Nested List |
| **`<BreadcrumbTrail />`** | Show & navigate hierarchy path | Contextual | Text links with separators (e.g., `>`) |
| **`<Pagination />`** | Navigate page sequences | Contextual | Numbered buttons, Previous/Next |
| **`<RelatedLinks />`** | Navigate to related content | Contextual | Text links, Card grid |
| **`<Search />`** | Navigate via query | Utility | Input field with button |
| **`<SkipLink />`** | Skip to main content | Accessibility (Global) | Hidden until focused |
| **`<PageTitle />`** | Announce page content | Accessibility (Global) | `<h1>` and `<title>` tag |
| **`<SupplementalNav />`** | Navigate to ancillary pages | Supplemental | Multi-column link list |

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
