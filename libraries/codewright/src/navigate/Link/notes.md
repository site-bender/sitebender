# Navigation Components

## Link Component

The `Link` component is a semantic enhancement of the standard HTML anchor element that provides a more intuitive and secure API for creating links while maintaining full progressive enhancement principles.

### Design Philosophy

Instead of requiring developers to remember obscure `rel` attribute values and security best practices, the Link component uses semantic boolean props that clearly express intent. This approach:

1. **Improves Developer Experience**: Props are self-documenting and express intent clearly
2. **Enhances Security by Default**: External links automatically get security attributes unless explicitly opted out
3. **Maintains Standards**: Compiles to standard HTML anchor elements with proper attributes
4. **Supports Progressive Enhancement**: Works without JavaScript as it renders to plain HTML

### Key Features

#### Semantic Navigation Props

- **`to`**: The destination URL (required). Supports special `@`-prefixed shortcuts (e.g., `@top` for `#`)
- **`toHelp`**: Indicates the link points to help documentation (`rel="help"`)
- **`toGlossary`**: Link to a glossary definition (`rel="glossary"`)
- **`toNextPage`**: Sequential navigation to next page (`rel="next"`)
- **`toPreviousPage`**: Sequential navigation to previous page (`rel="prev"`)

#### Security & Privacy Props (Automatic for External Links)

External links automatically receive security defaults:

- `rel="external"` - Marks as external link
- `rel="noopener"` - Prevents tab-jacking attacks
- `rel="nofollow"` - Prevents search architect crawling

Override props (use with caution):

- **`allowTabJacking`**: Opts out of `noopener` protection (not recommended)
- **`allowSearchArchitectIndexing`**: Opts out of `nofollow` (for trusted external content)
- **`hideReferringPage`**: Adds `noreferrer` for additional privacy (opt-in)

#### Navigation Behavior Props

- **`openAs`**: Semantic alternative to `target` attribute
  - `"newTab"`: Opens in new tab/window (`target="_blank"`)
  - `"parentTab"`: Opens in parent frame (`target="_parent"`)
  - `"originalTab"`: Opens in top-level frame (`target="_top"`)
- **`asDownload`**: Triggers download behavior. Can be boolean or string (filename)

### Special `@` Shortcuts

The `to` prop supports special shortcuts for common destinations:

- **`@top`**: Navigates to `#` (top of current page)
- **`@top-alt`**: Navigates to `#top` (alternative top anchor)
- **`@base`**: Navigates to `.` (current directory)
- **`@reload`**: Empty href for page reload
- **`@query`**: Navigates to `?` (query string)
- **`@data`**: Data URI prefix
- **`@media=[url]`: Strips the``@media=` prefix and uses the URL

### Implementation Details

The component uses several helper functions to process props:

1. **`processHref`**: Handles special `@`-prefixed shortcuts and normal URLs
2. **`isUrlExternal`**: Determines if a URL points to an external domain (checks for `http://`, `https://`, `//`, or `data:`)
3. **`buildRelAttribute`**: Constructs the `rel` attribute from semantic props and applies security defaults
4. **`openAsToTarget`**: Converts semantic `openAs` values to standard `target` values

### Security Model

The component follows a **secure-by-default** approach:

1. **Internal links** receive no special security attributes
2. **External links** automatically get:
   - `rel="external noopener nofollow"`
3. **Developers must explicitly opt out** of security features if needed
4. **Privacy features** like `noreferrer` remain opt-in

### Usage Examples

```tsx
// Simple internal link - no security attributes
<Link to="/about">About Us</Link>

// External link - automatic security
<Link to="https://external.com">
  External Resource
</Link>
// Outputs: <a href="https://external.com" rel="external noopener nofollow">

// Trusted external link - allow search indexing
<Link 
  to="https://trusted-partner.com" 
  allowSearchArchitectIndexing
>
  Partner Site
</Link>
// Outputs: <a href="https://trusted-partner.com" rel="external noopener">

// Private external link with extra privacy
<Link 
  to="https://private.com" 
  hideReferringPage
>
  Private Resource
</Link>
// Outputs: <a href="https://private.com" rel="external noopener nofollow noreferrer">

// Help documentation link
<Link to="/docs/api" toHelp openAs="newTab">
  API Documentation
</Link>

// Download link
<Link 
  to="/report.pdf" 
  asDownload="Annual_Report_2024.pdf"
>
  Download Report
</Link>

// Sequential navigation
<Link to="/page-2" toNextPage>Next Page</Link>
<Link to="/page-0" toPreviousPage>Previous Page</Link>

// Using shortcuts
<Link to="@top">Back to Top</Link>
<Link to="@reload">Refresh Page</Link>
```

### Output Examples

The component compiles to clean, semantic HTML:

```html
<!-- Internal link -->
<link to="/help" toHelp>
<a href="/help" rel="help">Help</a>

<!-- External link (default security) -->
<link to="https://external.com">
<a href="https://external.com" rel="external noopener nofollow">External</a>

<!-- External link (with overrides) -->
<link to="https://trusted.com" allowSearchArchitectIndexing>
<a href="https://trusted.com" rel="external noopener">Trusted Site</a>

<!-- External link (with privacy) -->
<link to="https://private.com" hideReferringPage>
<a href="https://private.com" rel="external noopener nofollow noreferrer"
>Private</a>

<!-- Download link -->
<link to="/file.pdf" asDownload="Document.pdf">
<a href="/file.pdf" download="Document.pdf">Download</a>

<!-- Navigation with target -->
<link to="/next" toNextPage openAs="newTab">
<a href="/next" rel="next" target="_blank">Next</a>
```

### Best Practices

1. **Trust the defaults** - External links are automatically secured
2. **Only use `allowTabJacking`** when absolutely necessary and you trust the external site
3. **Use `allowSearchArchitectIndexing`** for reputable external resources you want to endorse
4. **Add `hideReferringPage`** for sensitive external links where referrer data could be problematic
5. **Prefer semantic props** over direct `rel` and `target` attributes for clarity
6. **Use `@`-shortcuts** consistently across the application for common anchors

### Accessibility Considerations

- The component preserves all standard anchor attributes for ARIA labels and descriptions
- Sequential navigation links (`toNextPage`, `toPreviousPage`) help screen readers understand document structure
- The `title` attribute is preserved for additional context
- All links remain keyboard navigable and focusable

### Future Enhancements

Potential progressive enhancements that could be added via data attributes:

#### 1. Prefetching for Internal Links

**Implementation Approach:**

- Add a `prefetch` prop (boolean or "hover"/"visible" strategy)
- For static sites: Inject `<link rel="prefetch">` tags during build
- For dynamic sites: Use IntersectionObserver for visible-in-viewport prefetching
- Consider resource hints (preconnect/dns-prefetch) for external domains

**Thoughts:**

- Great for perceived performance but needs careful resource budgeting
- Should be opt-in due to bandwidth concerns on mobile
- Need to handle prefetch failures gracefully

#### 2. Analytics Tracking

**Implementation Approach:**

- Add `track` prop accepting event names or categories
- Support both click tracking and visibility tracking
- Decouple from core component - accept an `onAnalyticsEvent` callback
- Default to common analytics providers (GA, Plausible) but make extensible

**Thoughts:**

- Critical for most production sites but should be tree-shakeable
- Privacy-conscious implementation (respect DNT headers)
- Consider performance impact of analytics scripts

#### 3. Smooth Scrolling for Anchor Links

**Implementation Approach:**

- Add `smoothScroll` prop (boolean or config object)
- Use CSS `scroll-behavior: smooth` as baseline
- Polyfill with JS for unsupported browsers
- Support custom easing/duration via the config object
- Handle edge cases (scrolling containers, fixed headers)

**Thoughts:**

- Nice UX enhancement but needs careful accessibility testing
- Should work with browser's reduced motion preferences
- Consider scroll position restoration on back navigation

#### 4. Loading States for Slow External Resources

**Implementation Approach:**

- Add `loadingState` prop with options ("spinner", "skeleton", "progress")
- Support custom loading components via slots/render props
- Implement resource timing API for automatic slow detection
- Combine with prefetching for better UX

**Thoughts:**

- Valuable for poor network conditions but adds complexity
- Need clear timeout/fallback mechanisms
- Consider React Suspense-like patterns for async resources

#### 5. Confirmation Dialogs for Destructive Actions

**Implementation Approach:**

- Add `confirmation` prop accepting string or config object
- Support both native `confirm()` and custom modal dialogs
- Customizable messages, confirm/cancel text
- Accessibility focus management for custom dialogs
- Support async confirmation flows

**Thoughts:**

- Critical for preventing data loss but can be annoying if overused
- Should follow platform conventions (mobile vs desktop)
- Need careful keyboard and screen reader support

### Enhancement Implementation Recommendations

#### Data Attribute Naming Convention

Establish a consistent pattern for progressive enhancement:

- **`data-enhance-[feature]`** for boolean enhancements
- **`data-enhance-[feature]="value"`** for configured enhancements
- **`data-enhance-[feature]='{"key": "value"}'`** for complex configs

Example:

```html
<a href="/page" data-enhance-prefetch="hover">Prefetch on hover</a>
<a href="/page" data-enhance-track="navigation:click:header">Track clicks</a>
<a href="#section" data-enhance-smooth-scroll="true">Smooth scroll</a>
```

#### Implementation Pattern

Given the strict FP approach, enhancements should be separate from components:

```typescript
// lib/enhancements/links/prefetch.ts
export function enhancePrefetch(element: HTMLAnchorElement): void {
	const strategy = element.dataset.enhancePrefetch
	if (!strategy) return

	// Enhancement logic here
}

// Client-side enhancement script
// scripts/enhance.ts
if (typeof window !== "undefined") {
	document.querySelectorAll("a[data-enhance-prefetch]").forEach(
		enhancePrefetch,
	)
	document.querySelectorAll("a[data-enhance-smooth-scroll]").forEach(
		enhanceSmoothScroll,
	)
	// etc.
}
```

#### Additional Enhancement Considerations

**Performance Budget:**

- Each feature should be tree-shakeable
- Consider lazy-loading non-critical behaviors
- Monitor total JavaScript payload

**Accessibility Requirements:**

- All enhancements must maintain or improve accessibility
- Respect user preferences (reduced motion, prefers-contrast, DNT)
- Ensure keyboard navigation remains functional
- Provide screen reader announcements for state changes

**Network-Aware Features:**

- **Pending states**: `data-enhance-pending="disable"` to prevent double-clicks
- **Keyboard shortcuts**: `data-enhance-shortcut="cmd+k"` for power users
- **Proximity detection**: Prefetch when mouse is within X pixels
- **Connection-aware loading**: Different behaviors for slow/fast connections

**Configuration Strategy:**

- Global defaults via configuration object
- Per-instance overrides via data attributes
- Context-based configuration for sections of the page
- Environment-specific settings (dev/staging/prod)

#### Security Considerations for Enhancements

- **CSP Compliance**: Ensure all enhancements work with strict Content Security Policies
- **Trusted Types**: Support Trusted Types API for DOM manipulation
- **Sandboxing**: Consider iframe sandbox attributes for external content
- **Rate Limiting**: Prevent abuse of prefetching or tracking features
