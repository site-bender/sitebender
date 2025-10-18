# Accessibility Rules

## Progressive Enhancement Required

- **Description**: Progressive enhancement required: HTML must work in Lynx, CSS enhances layout, JS adds behavior. Use proper forms, anchor IDs, rel attributes
- **Rule ID**: A11Y_PROGRESSIVE_ENHANCEMENT_001
- **Category**: accessibility
- **Reason**: Stateless WWW principles ensure universal access. Works for everyone, enhanced for capable browsers
- **Consequences**: JS-required interfaces exclude users with disabilities or older technology
- **Philosophy**: Universal access through progressive enhancement - old stateless web first
- **Examples**:
  - HTML Layer: POST/GET forms, anchor links, proper rel attributes
  - CSS Layer: @supports queries, legacy-first with fallbacks
  - JS Layer: Operator events, enhanced validation, live regions
- **Context**:
  - Libraries:
    1. pagewright
  - Usage: component_development
- **Applies To**:
  1. .tsx
  2. .jsx

## Color Independence Requirements

- **Description**: Color Independence Requirements: Information must be available without color dependency. Requires Architect approval for visual design decisions. Support color-blind users with high contrast integration through CSS theming system
- **Rule ID**: A11Y_COLOR_INDEPENDENCE_001
- **Category**: accessibility
- **Reason**: Color-blind users and high contrast mode users cannot rely on color alone for information. Visual design affects accessibility standards
- **Consequences**: Color-only information excludes users with color blindness or contrast sensitivity
- **Philosophy**: Information must be perceivable through multiple channels, not just color
- **Design Integration**: Requires Architect approval for visual design decisions - AIs handle semantics, humans handle visual design
- **Technical Implementation**: CSS custom properties for theming, @supports queries for high contrast modes
- **Pagewright Context**: CSS theming system integrates with progressive enhancement - legacy-first with fallbacks
- **Examples**:
  - Correct: Error state: red border + icon + error text message
  - Wrong: Error state: only red border color
  - CSS Integration: Uses CSS custom properties for theme-aware color schemes
  - High Contrast: @supports (prefers-contrast: high) for enhanced contrast modes
- **Applies To**:
  1. .tsx
  2. .jsx
  3. .css

## Get Architect Approval for Visual Design Decisions

- **Description**: Get Architect approval for visual design decisions. AIs focus on semantics and structure, not colors, fonts, or visual styling
- **Rule ID**: A11Y_ARCHITECT_APPROVAL_001
- **Category**: accessibility
- **Reason**: Visual design affects accessibility (contrast, readability). Design decisions should be intentional, not AI-generated
- **Consequences**: AI-chosen colors and fonts may violate accessibility standards or brand guidelines
- **Philosophy**: Separate concerns - AIs handle semantics, humans handle visual design
- **Examples**:
  - AI Responsibility: Component structure, ARIA, semantic meaning
  - Architect Responsibility: Color schemes, typography, visual hierarchy
- **Applies To**:
  1. .tsx
  2. .jsx
  3. .css

## Use Plain Language Content with Linguist Library

- **Description**: Use plain language content with Linguist library. Apply Strunk & White principles: clear, concise, descriptive labels and help text
- **Rule ID**: A11Y_PLAIN_LANGUAGE_001
- **Category**: accessibility
- **Reason**: Clear language reduces cognitive load for all users, especially those with cognitive disabilities
- **Consequences**: Complex or jargon-heavy content excludes users and creates confusion
- **Philosophy**: Communication should be clear and accessible to everyone
- **Examples**:
  - Good: Email address, Phone number, Choose your preferred contact method
  - Bad: E-mail addr, Ph. #, Select optimal communication vector
- **Applies To**:
  1. .tsx
  2. .jsx

## Make Accessibility Required Props Non-Optional

- **Description**: Make accessibility required props non-optional. Build accessibility INTO components so end users cannot skip it
- **Rule ID**: A11Y_REQUIRED_PROPS_001
- **Category**: accessibility
- **Reason**: Accessibility should be impossible to forget or skip. Required props ensure proper content. Components that permit bad accessibility are broken.
- **Consequences**: Optional accessibility props get skipped, creating inaccessible interfaces
- **Philosophy**: BUILD-IN accessibility so end users can't mess it up
- **Examples**:
  - Correct: label: string (required), helpText?: string (optional)
  - Wrong: label?: string (optional - allows unlabeled fields)
- **Applies To**:
  1. .tsx
  2. .jsx

## CSS Enhancement with @supports Requirements

- **Description**: CSS Enhancement with @supports Requirements: Progressive CSS enhancement using feature detection. Use @supports queries over browser detection with legacy-first approach. Base styles work everywhere, enhancements layer on top
- **Rule ID**: A11Y_CSS_SUPPORTS_001
- **Category**: accessibility
- **Reason**: @supports queries ensure graceful degradation and progressive enhancement. Legacy browsers get working base styles
- **Consequences**: Browser detection breaks and excludes users. Missing fallbacks create inaccessible interfaces on older technology
- **Philosophy**: Base styles work everywhere, enhancements layer on top through feature detection
- **Technical Implementation**: @supports queries for CSS features, legacy-first CSS with fallbacks, CSS custom properties
- **Pagewright Context**: Integrates with existing progressive enhancement patterns - HTML works in Lynx, CSS enhances layout
- **Progressive Stack**: HTML layer (universal access) → CSS layer (@supports enhancements) → JS layer (operator events)
- **Examples**:
  - Correct: @supports (display: grid) { .layout { display: grid; } } /* fallback: display: block */
  - Wrong: if (browser === 'Chrome') { /* grid styles */ }
  - Feature Detection: @supports (color-scheme: dark) for theme support
  - Legacy First: Base styles work without @supports, enhanced styles layer on
- **Applies To**:
  1. .css
  2. .tsx
  3. .jsx

## Use Semantic Pagewright Components Exclusively

- **Description**: Use semantic Pagewright components exclusively, never raw HTML elements. End users work in plain English semantics, not HTML widgets
- **Rule ID**: A11Y_SEMANTIC_COMPONENTS_001
- **Category**: accessibility
- **Reason**: Pagewright enforces accessibility automatically. Raw HTML bypasses built-in protections
- **Consequences**: Raw HTML elements lose accessibility guards, semantic meaning, and type safety
- **Philosophy**: BUILD-IN accessibility so end users can't mess it up
- **Context**:
  - Libraries:
    1. pagewright
  - Usage: component_development
- **Examples**:
  - Correct: <PhoneNumberField />, <EmailAddressField />, <ChooseOneField />
  - Wrong: <input type="tel">, <input type="email">, <select>
- **Applies To**:
  1. .tsx
  2. .jsx

## Keyboard Navigation Built into Components

- **Description**: Keyboard Navigation Built into Components: Component-level keyboard navigation integration with tab order, focus management, and visible focus indicators. Navigation handled automatically by Pagewright components with logical keyboard flow
- **Rule ID**: A11Y_KEYBOARD_NAVIGATION_001
- **Category**: accessibility
- **Reason**: Keyboard-only users must be able to navigate and operate all interface elements. Focus management prevents users from getting trapped
- **Consequences**: Poor keyboard navigation excludes users who cannot use pointing devices
- **Philosophy**: Logical keyboard flow through forms and interfaces, handled automatically by components
- **Technical Implementation**: Tab order management, focus indicators, escape key handling, arrow key navigation
- **Pagewright Context**: Navigation handled automatically by Pagewright components - focus management built into semantic components
- **UX Principles**: Logical tab order, visible focus indicators, predictable navigation patterns
- **Examples**:
  - Tab Order: Sequential tab through form fields, skip links for main content
  - Focus Management: Modal dialogs trap focus, focus returns to trigger element on close
  - Visible Focus: High contrast focus indicators, not just browser defaults
  - Component Integration: ChooseOneField handles arrow key navigation between radio buttons automatically
- **Applies To**:
  1. .tsx
  2. .jsx

## ARIA Usage Guidelines

- **Description**: ARIA Usage Guidelines: NO ARIA is better than BAD ARIA. Use ARIA only when Pagewright's built-in semantic components are insufficient. End users never see ARIA directly - AI component builders use ARIA internally but hide complexity from end users through semantic props mapping
- **Rule ID**: A11Y_ARIA_GUIDELINES_001
- **Category**: accessibility
- **Reason**: End users never see ARIA directly. Incorrect ARIA makes accessibility worse than no ARIA. Pagewright's semantic components handle most accessibility automatically
- **Consequences**: Bad ARIA confuses screen readers and breaks accessibility more than missing ARIA
- **Philosophy**: NO ARIA better than BAD ARIA - Pagewright semantics first, ARIA only when insufficient
- **Integration**: AI component builders use ARIA internally but map to semantic props like 'use' instead of 'role'
- **Pagewright Context**: Semantic UI DSL with purpose-based components like PhoneNumberField, ChooseOneField that auto-handle accessibility
- **Examples**:
  - Correct: Use semantic Pagewright components with built-in accessibility
  - When ARIA Needed: Live regions for dynamic content, custom controls where no semantic Pagewright equivalent exists
  - Hide From Users: Map ARIA attributes to semantic props - 'use' instead of 'role', 'purpose' instead of 'aria-label'
- **Applies To**:
  1. .tsx
  2. .jsx

## Auto-Select Appropriate Widgets with User-Configurable Thresholds

- **Description**: Auto-select appropriate widgets with user-configurable thresholds. Example: ChooseOneField uses radio buttons up to RADIO_THRESHOLD (default 6), then select box
- **Rule ID**: A11Y_AUTO_WIDGET_SELECTION_001
- **Category**: accessibility
- **Reason**: Automatic widget selection optimizes UX while allowing customization for specific needs
- **Consequences**: Wrong widget choices create poor user experience (radio with 20 options, select with 2 options)
- **Philosophy**: Smart defaults with user control
- **Examples**:
  - Implementation: const RADIO_THRESHOLD = 6; optional prop radioThreshold?: number
  - Logic: options.length <= (radioThreshold ?? RADIO_THRESHOLD) ? RadioGroup : SelectBox
- **Applies To**:
  1. .tsx
  2. .jsx

## Screen Reader Support Considerations

- **Description**: Screen Reader Support Considerations: Non-visual user support through semantic markup, live regions for dynamic content, and sufficient context provision. Screen reader navigation via Pagewright's semantic components with HTML-first approach
- **Rule ID**: A11Y_SCREEN_READER_001
- **Category**: accessibility
- **Reason**: Screen reader users need semantic structure and context to understand and navigate interfaces effectively
- **Consequences**: Poor semantic markup and missing context make interfaces unusable for screen reader users
- **Philosophy**: Progressive enhancement - semantic HTML works with screen readers, enhanced with live regions
- **Technical Implementation**: Live regions for dynamic content updates, proper heading hierarchy, descriptive labels
- **Pagewright Context**: Screen reader navigation via Pagewright's semantic components - PhoneNumberField, EmailAddressField provide built-in context
- **Progressive Integration**: Works with existing HTML-first approach - proper forms, anchor IDs, semantic elements
- **Examples**:
  - Live Regions: aria-live='polite' for form validation messages, 'assertive' for urgent updates
  - Context Provision: Descriptive labels that make sense when heard alone
  - Semantic Navigation: Proper heading hierarchy (h1, h2, h3) for screen reader navigation
  - Component Integration: EmailAddressField announces 'Email address input' automatically via semantic props
- **Applies To**:
  1. .tsx
  2. .jsx
