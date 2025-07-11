# Accessibility Testing Pattern

This document outlines the accessibility testing pattern established for WCAG 2.2 AAA compliance audits across all components.

## Overview

Our accessibility testing approach combines automated tools with semantic validation to ensure comprehensive coverage:

- **Automated**: `@axe-core/playwright` for standards compliance
- **Semantic**: Custom utilities for screen reader, keyboard, and accessibility name validation
- **Systematic**: Component-by-component audits with standardized reporting

## Testing Utilities

### Location
```
tests/a11y/utilities/
├── axeHelpers/index.ts          # Axe-core integration
├── keyboardHelpers/index.ts     # Keyboard navigation testing
├── screenReaderHelpers/index.ts # Semantic and ARIA testing
└── index.ts                     # Combined utilities and full audit
```

### Core Functions

#### Full Accessibility Audit
```typescript
import { runFullAccessibilityAudit } from "tests/a11y/utilities/index.ts"

const results = await runFullAccessibilityAudit(page, {
  componentSelector: '#my-component',  // Test specific component
  skipAxe: false,                     // Include axe violations
  skipHeadings: false,                // Check heading hierarchy
  skipLandmarks: false                // Check landmark structure
})
```

#### Individual Testing Functions
```typescript
// Axe violations
const axeResults = await runAxeAudit(page)
const componentResults = await runAxeAuditOnComponent(page, '#component')

// Accessibility names
const nameInfo = await checkAccessibilityName(page.locator('#element'))

// Keyboard navigation
await testKeyboardNavigation(page, '#interactive-component')
await testFocusTrap(page, '#modal')

// Heading structure
const headingResults = await checkHeadingStructure(page)

// Landmark structure
const landmarkResults = await checkLandmarkStructure(page)
```

## Testing Pattern

### 1. Component Audit Structure
Each component audit follows this pattern:

```typescript
// tests/a11y/components/Button/index.test.ts
import { chromium } from "playwright"
import { runFullAccessibilityAudit } from "../../utilities/index.ts"

console.log("🧪 Accessibility Audit: Button Component")

try {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext()
  const page = await context.newPage()

  // Create test page with component variations
  await page.setContent(/* component test HTML */)

  // Run comprehensive audit
  const results = await runFullAccessibilityAudit(page, {
    componentSelector: '.button-test-container'
  })

  // Report results
  console.log(\`Found \${results.issues.length} accessibility issues\`)

  // Test specific component requirements
  // ... component-specific tests

  await browser.close()
} catch (error) {
  console.error("❌ Button accessibility audit failed:", error)
  Deno.exit(1)
}
```

### 2. Test File Naming
- Component audits: `tests/a11y/components/[ComponentName]/index.test.ts`
- Setup/verification: `tests/a11y/[testName]/index.test.ts`
- Utilities: `tests/a11y/utilities/[utilityType]/index.ts`

### 3. Component Test Requirements

Each component audit must verify:

#### WCAG 2.2 AAA Compliance
- ✅ **No axe violations** (Level AAA standards)
- ✅ **Proper accessibility names** (programmatically determinable)
- ✅ **Keyboard accessibility** (all functionality available via keyboard)
- ✅ **Focus management** (visible focus indicators, logical order)
- ✅ **Color contrast** (4.5:1 normal text, 3:1 large text, 7:1 AAA)
- ✅ **Semantic markup** (appropriate HTML elements and ARIA)

#### Component-Specific Testing
- ✅ **Interactive states** (hover, focus, active, disabled)
- ✅ **Form associations** (labels, descriptions, validation)
- ✅ **Live regions** (status announcements)
- ✅ **Modal behavior** (focus trapping, escape handling)
- ✅ **Navigation patterns** (arrow keys, tab order)

### 4. Audit Results Format

Results follow a standardized structure:

```typescript
{
  axe: {
    violations: Array<AxeViolation>,
    incomplete: Array<AxeIncomplete>,
    passes: Array<AxePass>
  },
  headings: {
    hasH1: boolean,
    multipleH1: boolean,
    hierarchy: Array<HeadingInfo>,
    issues: Array<string>
  },
  landmarks: {
    structure: Array<LandmarkInfo>,
    issues: Array<string>
  },
  issues: Array<string>  // Combined issues summary
}
```

## Running Tests

### Individual Component
```bash
deno test tests/a11y/components/Button/index.test.ts -A --no-check
```

### All Accessibility Tests
```bash
deno test tests/a11y/ -A --no-check
```

### Setup Verification
```bash
deno test tests/a11y/basicAccessibilityTest/index.test.ts -A --no-check
```

## Integration with CI/CD

Add to `deno.json` tasks for automated accessibility testing:

```json
{
  "tasks": {
    "test:accessibility": "deno test tests/a11y/ -A --no-check",
    "test:a11y:verify": "deno test tests/a11y/basicAccessibilityTest/index.test.ts -A --no-check"
  }
}
```

## Component Audit Workflow

### Phase 1: Foundation (✅ Complete)
1. ✅ Install `@axe-core/playwright`
2. ✅ Create accessibility test utilities
3. ✅ Add basic verification test
4. ✅ Document testing pattern

### Phase 2: Component Audits (📋 In Progress)
For each component in `src/components/`:
1. **Audit** - Run comprehensive accessibility test
2. **Fix** - Address any WCAG 2.2 AAA violations
3. **Enhance** - Improve semantic markup where needed
4. **Test** - Add component-specific accessibility test
5. **Document** - Record findings and improvements

### Phase 3: Automation (📋 Planned)
1. Add accessibility tests to pre-commit hooks
2. Integrate with CI/CD pipeline
3. Add accessibility regression testing
4. Create accessibility component documentation

## WCAG 2.2 AAA Standards Reference

### Level A (Must Have)
- Non-text content has alternatives
- Time-based media has alternatives
- Content can be presented without loss of meaning
- All functionality available from keyboard
- Users have control over timing
- Content doesn't cause seizures
- Users can navigate and find content

### Level AA (Should Have)
- Audio has captions
- Text has sufficient color contrast (4.5:1)
- Text can be resized to 200%
- Images of text are avoided
- Page has multiple ways to be found
- Focus is visible
- Language of page and parts is identified

### Level AAA (Best Practice)
- Audio/video has sign language interpretation
- Text has enhanced color contrast (7:1)
- Audio has no background noise
- Text can be resized to 200% without scrolling
- Images of text only for decoration
- Context-sensitive help is available
- Input errors are suggested and prevented

## Best Practices

### Semantic HTML First
Prefer semantic HTML elements over ARIA when possible:

```html
<!-- Good: Semantic button -->
<button type="button">Click me</button>

<!-- Avoid: div with ARIA -->
<div role="button" tabindex="0">Click me</div>
```

### Progressive Enhancement
Build accessibility into the component from the start:

```typescript
// Build with semantic foundation
<button 
  type="button"
  aria-label={iconOnly ? label : undefined}
  aria-describedby={helpText ? \`\${id}-help\` : undefined}
  disabled={disabled}
>
  {children}
</button>
```

### Test Early and Often
Run accessibility tests during development, not just before deployment:

```bash
# Quick component check during development
deno test tests/a11y/components/Button/index.test.ts -A --no-check
```

This pattern ensures consistent, thorough accessibility testing across all components while maintaining development velocity and code quality.
