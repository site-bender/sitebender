# Accessibility Rules

## HTML must work in Lynx, CSS enhances layout, JS adds behavior through progressive enhancement

- **Rule ID**: A11Y_PROGRESSIVE_ENHANCEMENT_001
- **Description**: HTML must work in Lynx, CSS enhances layout, JS adds behavior through progressive enhancement
- **Keywords**: progressive-enhancement, accessibility, html-first, lynx, stateless, universal-access, forms, anchor-links, pagewright
- **Rationale**: Stateless WWW principles ensure universal access. Works for everyone, enhanced for capable browsers. JS-required interfaces exclude users with disabilities or older technology. This embodies universal access through progressive enhancement - old stateless web first.

**Prohibited:**
```ts
// ❌ PROHIBITED - JavaScript-required interface:
function SubmitButton(): JSX.Element {
	return (
		<button
			onClick={(e) => {
				e.preventDefault()
				fetchAPI('/submit', formData)
			}}
		>
			Submit
		</button>
	)
}

// Problems:
// - No fallback for JS-disabled browsers
// - No HTML form action
// - Excludes users with disabilities or older technology
// - Breaks in Lynx and text browsers
```

*Reasoning*: JS-only interactions exclude users and violate progressive enhancement principles

**Required:**
```ts
// ✅ REQUIRED - Progressive enhancement with HTML first:
// HTML Layer: Works in Lynx
function SubmitForm(): JSX.Element {
	return (
		<form method="POST" action="/submit">
			<input type="text" name="username" required />
			<button type="submit">Submit</button>
		</form>
	)
}

// CSS Layer: Enhanced layout with @supports
// .form { display: block; } /* fallback */
// @supports (display: grid) { .form { display: grid; } }

// JS Layer: Enhanced validation via Operator events
// Progressive: form works without JS, enhanced with JS
// Proper rel attributes, anchor IDs for navigation
```

*Scope*: All Pagewright components - HTML works universally, CSS/JS layer enhancements on top

---

## Information must be perceivable without color dependency, using multiple channels like borders, icons, and text

- **Rule ID**: A11Y_COLOR_INDEPENDENCE_001
- **Description**: Information must be perceivable without color dependency, using multiple channels like borders, icons, and text
- **Keywords**: color-blindness, accessibility, high-contrast, theming, css-custom-properties, architect-approval, visual-design, multi-channel
- **Rationale**: Color-blind users and high contrast mode users cannot rely on color alone for information. Visual design affects accessibility standards. Color-only information excludes users with color blindness or contrast sensitivity. Information must be perceivable through multiple channels, not just color. Requires Architect approval for visual design decisions - AIs handle semantics, humans handle visual design.

**Prohibited:**
```ts
// ❌ PROHIBITED - Color-only error indication:
function ErrorField(): JSX.Element {
	return (
		<input
			type="text"
			style={{ borderColor: 'red' }}
		/>
	)
}

// Problems:
// - Only red border indicates error
// - No icon or text message
// - Invisible to color-blind users
// - Fails in high contrast mode
// - No CSS theming integration
```

*Reasoning*: Color alone is invisible to color-blind users and fails accessibility standards

**Required:**
```ts
// ✅ REQUIRED - Multi-channel error indication:
function ErrorField({ errorMessage }: { errorMessage: string }): JSX.Element {
	return (
		<div className="field field--error">
			<input
				type="text"
				aria-invalid="true"
				aria-describedby="error-msg"
			/>
			<span className="error-icon">⚠</span>
			<span id="error-msg" className="error-text">
				{errorMessage}
			</span>
		</div>
	)
}

// CSS with theming:
// .field--error { border: 2px solid var(--color-error); }
// @supports (prefers-contrast: high) {
//   .field--error { border-width: 3px; }
// }
```

*Scope*: All Pagewright components - get Architect approval for color/visual design decisions

---

## Get Architect approval for visual design decisions - AIs handle semantics and structure, not colors, fonts, or styling

- **Rule ID**: A11Y_ARCHITECT_APPROVAL_001
- **Description**: Get Architect approval for visual design decisions - AIs handle semantics and structure, not colors, fonts, or styling
- **Keywords**: architect-approval, visual-design, accessibility, contrast, typography, brand, separation-of-concerns, semantics
- **Rationale**: Visual design affects accessibility (contrast, readability). Design decisions should be intentional, not AI-generated. AI-chosen colors and fonts may violate accessibility standards or brand guidelines. Separate concerns - AIs handle semantics, humans handle visual design.

**Prohibited:**
```ts
// ❌ PROHIBITED - AI choosing visual design:
const THEME = {
	primaryColor: '#3498db',
	secondaryColor: '#2ecc71',
	fontFamily: 'Comic Sans MS',
	headingSize: '24px'
}

function Header(): JSX.Element {
	return (
		<h1 style={{
			color: THEME.primaryColor,
			fontFamily: THEME.fontFamily
		}}>
			Welcome
		</h1>
	)
}

// Problems:
// - AI chose colors without contrast check
// - No Architect approval for visual decisions
// - May violate brand guidelines
// - Font choice affects readability
```

*Reasoning*: Visual design decisions require human Architect approval for accessibility and brand compliance

**Required:**
```ts
// ✅ REQUIRED - Semantic structure, visual design deferred:
// AI responsibility: Semantic structure
function Header({ text }: { text: string }): JSX.Element {
	return (
		<header className="site-header">
			<h1 className="site-title">{text}</h1>
		</header>
	)
}

// Architect responsibility: Visual design
// (Architect provides CSS with approved colors, fonts, contrast ratios)
// .site-header { /* Architect-approved styles */ }
// .site-title {
//   color: var(--color-heading);  /* Architect-approved */
//   font-family: var(--font-heading);  /* Architect-approved */
// }

// AI focuses on:
// - Component structure
// - ARIA attributes
// - Semantic meaning
// - Progressive enhancement
```

*Scope*: All components - semantic structure by AI, visual design requires Architect approval

---

## Use plain language following Strunk & White principles - clear, concise, descriptive labels and help text

- **Rule ID**: A11Y_PLAIN_LANGUAGE_001
- **Description**: Use plain language following Strunk & White principles - clear, concise, descriptive labels and help text
- **Keywords**: plain-language, accessibility, cognitive-load, clarity, strunk-white, linguist, labels, jargon, readability
- **Rationale**: Clear language reduces cognitive load for all users, especially those with cognitive disabilities. Complex or jargon-heavy content excludes users and creates confusion. Communication should be clear and accessible to everyone.

**Prohibited:**
```ts
// ❌ PROHIBITED - Jargon and abbreviations:
function ContactForm(): JSX.Element {
	return (
		<form>
			<label htmlFor="email">E-mail addr</label>
			<input type="email" id="email" />

			<label htmlFor="phone">Ph. #</label>
			<input type="tel" id="phone" />

			<label htmlFor="method">
				Select optimal communication vector
			</label>
			<select id="method">
				<option>Email</option>
				<option>Phone</option>
			</select>
		</form>
	)
}

// Problems:
// - Abbreviations (addr, Ph. #)
// - Jargon (communication vector)
// - Increases cognitive load
// - Confusing for non-native speakers
```

*Reasoning*: Abbreviations and jargon create barriers for users with cognitive disabilities and non-native speakers

**Required:**
```ts
// ✅ REQUIRED - Plain language with Linguist library:
function ContactForm(): JSX.Element {
	return (
		<form>
			<label htmlFor="email">Email address</label>
			<input type="email" id="email" />

			<label htmlFor="phone">Phone number</label>
			<input type="tel" id="phone" />

			<label htmlFor="method">
				Choose your preferred contact method
			</label>
			<select id="method">
				<option>Email</option>
				<option>Phone</option>
			</select>

			<p className="help-text">
				We will use this to send you updates
			</p>
		</form>
	)
}

// Principles:
// - Use full words, not abbreviations
// - Clear, descriptive labels
// - Helpful, concise text
// - Strunk & White style
```

*Scope*: All user-facing text in Pagewright components - use Linguist library for content

---

## Make accessibility props required, not optional - build accessibility INTO components so end users cannot skip it

- **Rule ID**: A11Y_REQUIRED_PROPS_001
- **Description**: Make accessibility props required, not optional - build accessibility INTO components so end users cannot skip it
- **Keywords**: required-props, accessibility, type-safety, component-design, build-in, mandatory, labels, pagewright
- **Rationale**: Accessibility should be impossible to forget or skip. Required props ensure proper content. Components that permit bad accessibility are broken. Optional accessibility props get skipped, creating inaccessible interfaces. BUILD-IN accessibility so end users can't mess it up.

**Prohibited:**
```ts
// ❌ PROHIBITED - Optional accessibility props:
type TextFieldProps = {
	name: string
	label?: string  // WRONG: optional label
	helpText?: string
	ariaLabel?: string  // WRONG: accessibility as opt-in
}

function TextField({ name, label, ariaLabel }: TextFieldProps): JSX.Element {
	return (
		<div>
			{label && <label htmlFor={name}>{label}</label>}
			<input
				id={name}
				name={name}
				aria-label={ariaLabel}
			/>
		</div>
	)
}

// Problems:
// - Label is optional - allows unlabeled fields
// - Accessibility can be skipped
// - End users can create inaccessible forms
// - Component permits bad accessibility
```

*Reasoning*: Optional accessibility props allow developers to skip accessibility, creating broken interfaces

**Required:**
```ts
// ✅ REQUIRED - Mandatory accessibility props:
type TextFieldProps = {
	name: string
	label: string  // REQUIRED: cannot skip label
	helpText?: string  // Optional: supplementary, not critical
}

function TextField({ name, label, helpText }: TextFieldProps): JSX.Element {
	return (
		<div className="field">
			<label htmlFor={name}>{label}</label>
			<input
				id={name}
				name={name}
				aria-describedby={helpText ? `${name}-help` : undefined}
			/>
			{helpText && (
				<span id={`${name}-help`} className="help-text">
					{helpText}
				</span>
			)}
		</div>
	)
}

// TypeScript enforces accessibility:
// <TextField name="email" />  // ERROR: missing required prop 'label'
// <TextField name="email" label="Email address" />  // OK
```

*Scope*: All Pagewright components - critical accessibility props must be required

---

## Use @supports feature detection for progressive CSS enhancement with legacy-first fallbacks

- **Rule ID**: A11Y_CSS_SUPPORTS_001
- **Description**: Use @supports feature detection for progressive CSS enhancement with legacy-first fallbacks
- **Keywords**: css-supports, progressive-enhancement, feature-detection, legacy-first, graceful-degradation, fallbacks, accessibility, browser-compatibility
- **Rationale**: @supports queries ensure graceful degradation and progressive enhancement. Legacy browsers get working base styles. Browser detection breaks and excludes users. Missing fallbacks create inaccessible interfaces on older technology. Base styles work everywhere, enhancements layer on top through feature detection.

**Prohibited:**
```ts
// ❌ PROHIBITED - Browser detection:
const styles = `
	.layout {
		/* No fallback styles */
	}
`

// JavaScript browser detection
if (navigator.userAgent.includes('Chrome')) {
	styles += `
		.layout {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
		}
	`
}

// Problems:
// - Browser detection breaks and goes stale
// - No fallback for older browsers
// - Excludes users on older technology
// - User agent strings are unreliable
```

*Reasoning*: Browser detection is unreliable and excludes users; feature detection ensures graceful degradation

**Required:**
```ts
// ✅ REQUIRED - Feature detection with @supports:
// Legacy-first: Base styles work everywhere
.layout {
	display: block;  /* Fallback for all browsers */
}

// Progressive enhancement: Layer on features
@supports (display: grid) {
	.layout {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
	}
}

// High contrast support
@supports (prefers-contrast: high) {
	.layout {
		border-width: 2px;
	}
}

// Dark mode support
@supports (color-scheme: dark) {
	.layout {
		background: var(--color-bg-dark);
	}
}

// Progressive stack:
// HTML layer (universal) → CSS layer (@supports) → JS layer (Operator events)
```

*Scope*: All CSS in Pagewright - base styles work universally, @supports adds enhancements

---

## Use semantic Pagewright components exclusively, never raw HTML elements - end users work in semantics, not HTML widgets

- **Rule ID**: A11Y_SEMANTIC_COMPONENTS_001
- **Description**: Use semantic Pagewright components exclusively, never raw HTML elements - end users work in semantics, not HTML widgets
- **Keywords**: semantic-components, pagewright, accessibility, type-safety, build-in, raw-html, PhoneNumberField, EmailAddressField, ChooseOneField
- **Rationale**: Pagewright enforces accessibility automatically. Raw HTML bypasses built-in protections. Raw HTML elements lose accessibility guards, semantic meaning, and type safety. BUILD-IN accessibility so end users can't mess it up.

**Prohibited:**
```ts
// ❌ PROHIBITED - Raw HTML elements:
function ContactForm(): JSX.Element {
	return (
		<form>
			<input type="tel" name="phone" />
			<input type="email" name="email" />
			<select name="contact-method">
				<option>Email</option>
				<option>Phone</option>
			</select>
		</form>
	)
}

// Problems:
// - No labels (accessibility failure)
// - No validation
// - No semantic meaning
// - Bypasses Pagewright protections
// - End users must manually add accessibility
```

*Reasoning*: Raw HTML bypasses Pagewright's built-in accessibility, allowing broken interfaces

**Required:**
```ts
// ✅ REQUIRED - Semantic Pagewright components:
import { PhoneNumberField } from '@sitebender/pagewright/fields/PhoneNumberField'
import { EmailAddressField } from '@sitebender/pagewright/fields/EmailAddressField'
import { ChooseOneField } from '@sitebender/pagewright/fields/ChooseOneField'

function ContactForm(): JSX.Element {
	return (
		<form>
			<PhoneNumberField
				name="phone"
				label="Phone number"  // Required prop
			/>

			<EmailAddressField
				name="email"
				label="Email address"  // Required prop
			/>

			<ChooseOneField
				name="contact-method"
				label="Preferred contact method"  // Required prop
				options={['Email', 'Phone']}
			/>
		</form>
	)
}

// Benefits:
// - Accessibility built-in
// - Required props enforce labels
// - Type-safe
// - Semantic meaning clear
```

*Scope*: All Pagewright components - semantic components only, never raw HTML elements

---

## Keyboard navigation handled automatically by Pagewright components with tab order, focus management, and visible indicators

- **Rule ID**: A11Y_KEYBOARD_NAVIGATION_001
- **Description**: Keyboard navigation handled automatically by Pagewright components with tab order, focus management, and visible indicators
- **Keywords**: keyboard-navigation, accessibility, tab-order, focus-management, keyboard-only, focus-indicators, escape-key, arrow-keys, pagewright
- **Rationale**: Keyboard-only users must be able to navigate and operate all interface elements. Focus management prevents users from getting trapped. Poor keyboard navigation excludes users who cannot use pointing devices. Logical keyboard flow through forms and interfaces, handled automatically by components.

**Prohibited:**
```ts
// ❌ PROHIBITED - Poor keyboard navigation:
function Modal({ onClose }: { onClose: () => void }): JSX.Element {
	return (
		<div className="modal" onClick={onClose}>
			<div className="modal-content">
				<h2>Modal Title</h2>
				<p>Content here</p>
				<div onClick={onClose}>Close</div>
			</div>
		</div>
	)
}

// Problems:
// - No keyboard trap (focus escapes modal)
// - Close div not keyboard accessible
// - No escape key handling
// - No focus return on close
// - No visible focus indicators
```

*Reasoning*: Poor keyboard navigation excludes users who cannot use pointing devices

**Required:**
```ts
// ✅ REQUIRED - Proper keyboard navigation:
function Modal({ onClose, returnFocusTo }: ModalProps): JSX.Element {
	useEffect(() => {
		// Trap focus in modal
		const trapFocus = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose()
			// Tab cycling logic...
		}

		document.addEventListener('keydown', trapFocus)
		return () => {
			document.removeEventListener('keydown', trapFocus)
			// Return focus to trigger element
			returnFocusTo?.focus()
		}
	}, [])

	return (
		<div className="modal" role="dialog" aria-modal="true">
			<div className="modal-content">
				<h2>Modal Title</h2>
				<p>Content here</p>
				<button onClick={onClose}>Close</button>
			</div>
		</div>
	)
}

// CSS: .modal button:focus { outline: 2px solid blue; }
// Pagewright components handle this automatically
```

*Scope*: All interactive components - tab order, focus trapping, escape key, visible focus indicators

---

## NO ARIA is better than BAD ARIA - use ARIA only when Pagewright's semantic components are insufficient

- **Rule ID**: A11Y_ARIA_GUIDELINES_001
- **Description**: NO ARIA is better than BAD ARIA - use ARIA only when Pagewright's semantic components are insufficient
- **Keywords**: aria, accessibility, screen-readers, semantic-components, pagewright, no-aria, bad-aria, semantic-props, live-regions
- **Rationale**: End users never see ARIA directly. Incorrect ARIA makes accessibility worse than no ARIA. Pagewright's semantic components handle most accessibility automatically. Bad ARIA confuses screen readers and breaks accessibility more than missing ARIA. NO ARIA better than BAD ARIA - Pagewright semantics first, ARIA only when insufficient.

**Prohibited:**
```ts
// ❌ PROHIBITED - Bad ARIA usage:
function SearchButton(): JSX.Element {
	return (
		<button
			role="button"  // Redundant - button has implicit role
			aria-label="Search button"  // Redundant - visible text exists
			aria-pressed="false"  // Wrong - not a toggle button
		>
			Search
		</button>
	)
}

function CustomInput(): JSX.Element {
	return (
		<div
			role="textbox"  // Wrong - use <input> instead
			aria-required="true"
		>
			{/* contentEditable div */}
		</div>
	)
}

// Problems:
// - Redundant ARIA attributes
// - Incorrect roles
// - Bad ARIA worse than no ARIA
// - Should use semantic HTML/components
```

*Reasoning*: Bad ARIA confuses screen readers and creates worse accessibility than missing ARIA

**Required:**
```ts
// ✅ REQUIRED - Semantic components first, ARIA when needed:
// Option 1: Use semantic Pagewright components (preferred)
import { SearchField } from '@sitebender/pagewright/fields/SearchField'

function SearchBar(): JSX.Element {
	return (
		<SearchField
			name="search"
			label="Search"  // Semantic prop, not aria-label
			use="search"    // Maps to role internally
		/>
	)
}

// Option 2: ARIA when no semantic component exists
function LiveRegion({ message }: { message: string }): JSX.Element {
	return (
		<div
			role="status"  // Valid use - live region
			aria-live="polite"  // Valid use - announce updates
			aria-atomic="true"
		>
			{message}
		</div>
	)
}

// Pagewright semantic props:
// - 'use' instead of 'role'
// - 'purpose' instead of 'aria-label'
// - Accessibility built-in, ARIA hidden from end users
```

*Scope*: All components - prefer semantic Pagewright components, use ARIA only when insufficient

---

## Auto-select appropriate widgets with user-configurable thresholds - smart defaults with user control

- **Rule ID**: A11Y_AUTO_WIDGET_SELECTION_001
- **Description**: Auto-select appropriate widgets with user-configurable thresholds - smart defaults with user control
- **Keywords**: widget-selection, ux, radio-buttons, select-box, thresholds, smart-defaults, ChooseOneField, user-configurable, accessibility
- **Rationale**: Automatic widget selection optimizes UX while allowing customization for specific needs. Wrong widget choices create poor user experience (radio with 20 options, select with 2 options). Smart defaults with user control.

**Prohibited:**
```ts
// ❌ PROHIBITED - Fixed widget choice:
function ChooseOneField({ options }: { options: Array<string> }): JSX.Element {
	// Always uses radio buttons, regardless of option count
	return (
		<fieldset>
			{options.map(option => (
				<label key={option}>
					<input type="radio" name="choice" value={option} />
					{option}
				</label>
			))}
		</fieldset>
	)
}

// Problems:
// - Radio buttons with 20 options (bad UX)
// - No auto-selection logic
// - No user control over threshold
// - Fixed widget regardless of use case
```

*Reasoning*: Fixed widget choices ignore UX optimization and user needs

**Required:**
```ts
// ✅ REQUIRED - Auto-selection with configurable threshold:
const RADIO_THRESHOLD = 6

type ChooseOneFieldProps = {
	name: string
	label: string
	options: Array<string>
	radioThreshold?: number  // User can override
}

function ChooseOneField({
	name,
	label,
	options,
	radioThreshold = RADIO_THRESHOLD
}: ChooseOneFieldProps): JSX.Element {
	// Smart widget selection
	const useRadio = options.length <= radioThreshold

	if (useRadio) {
		return (
			<fieldset>
				<legend>{label}</legend>
				{options.map(option => (
					<label key={option}>
						<input type="radio" name={name} value={option} />
						{option}
					</label>
				))}
			</fieldset>
		)
	}

	return (
		<label>
			{label}
			<select name={name}>
				{options.map(option => (
					<option key={option} value={option}>{option}</option>
				))}
			</select>
		</label>
	)
}

// Usage:
// <ChooseOneField options={['A', 'B']} />  // Uses radio (2 ≤ 6)
// <ChooseOneField options={states} />  // Uses select (50 > 6)
// <ChooseOneField options={states} radioThreshold={10} />  // Override
```

*Scope*: All choice components - auto-select widget based on option count with user override

---

## Screen reader support through semantic markup, live regions for dynamic content, and proper heading hierarchy

- **Rule ID**: A11Y_SCREEN_READER_001
- **Description**: Screen reader support through semantic markup, live regions for dynamic content, and proper heading hierarchy
- **Keywords**: screen-readers, accessibility, semantic-markup, live-regions, aria-live, headings, non-visual, context, pagewright, progressive-enhancement
- **Rationale**: Screen reader users need semantic structure and context to understand and navigate interfaces effectively. Poor semantic markup and missing context make interfaces unusable for screen reader users. Progressive enhancement - semantic HTML works with screen readers, enhanced with live regions.

**Prohibited:**
```ts
// ❌ PROHIBITED - Poor semantic structure:
function Article(): JSX.Element {
	return (
		<div>
			<div className="title">Article Title</div>
			<div className="subtitle">Section 1</div>
			<div>Content here...</div>
			<div className="subtitle">Section 2</div>
			<div>More content...</div>
		</div>
	)
}

function FormValidation({ error }: { error: string }): JSX.Element {
	// No live region - screen reader won't announce
	return <div className="error">{error}</div>
}

// Problems:
// - No semantic headings (h1, h2, h3)
// - Divs instead of semantic HTML
// - No live regions for dynamic content
// - Screen readers can't navigate structure
```

*Reasoning*: Poor semantic structure prevents screen reader users from understanding and navigating content

**Required:**
```ts
// ✅ REQUIRED - Semantic markup with live regions:
function Article(): JSX.Element {
	return (
		<article>
			<h1>Article Title</h1>

			<section>
				<h2>Section 1</h2>
				<p>Content here...</p>
			</section>

			<section>
				<h2>Section 2</h2>
				<p>More content...</p>
			</section>
		</article>
	)
}

function FormValidation({ error }: { error: string }): JSX.Element {
	return (
		<div
			role="status"
			aria-live="polite"  // Announces to screen reader
			aria-atomic="true"
			className="error"
		>
			{error}
		</div>
	)
}

// Pagewright semantic components:
// - EmailAddressField announces "Email address input" automatically
// - PhoneNumberField provides built-in context
// - Proper heading hierarchy for navigation
// - Live regions for dynamic updates (polite/assertive)
```

*Scope*: All content - semantic HTML first, live regions for dynamic content, proper heading hierarchy

---
