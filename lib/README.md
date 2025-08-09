# @sitebender/adaptive

**Write type-safe, semantic components that work everywhere, weigh nothing, and never break in production.**

This library lets you build progressive web apps that are fast by default, accessible by design, and actually work when JavaScript fails. Your forms submit without JS. Your content is SEO-perfect. Your bundle starts at <10KB. And everything is validated at build time, not runtime.

## What Makes This Library Exceptional

### 1. Progressive Enhancement Done Right
Most libraries pay lip service to progressive enhancement. This one actually builds it into the architecture. The HTML works without JavaScript, period. When JS loads, it enhances - not replaces - the functionality. This is increasingly rare and incredibly valuable.

### 2. Validation Where It Matters
Build-time validation for SSG is brilliant. Catching errors at construction time rather than runtime means broken components never reach production. The type safety extends beyond TypeScript into actual HTML semantics and content models.

### 3. Declarative Power Without the Weight
The adaptive system's declarative configurations (calculations, validations, conditionals) are powerful yet compile to efficient HTML with data attributes. You get React-like declarative programming without shipping a massive runtime.

### 4. Truly Tree-Shakable
The dynamic import strategy means you only load what you use. A form that just needs email validation doesn't load 60+ mathematical operations. This respects users' bandwidth and devices.

### 5. Semantic HTML as First-Class Citizen
The focus on Schema.org, WCAG compliance, and semantic markup shows deep respect for the web platform. This isn't just about making things work - it's about making them work *correctly*.

## For Different Developer Audiences

### For Performance-Conscious Developers
Start with a <10KB bundle. Load features on demand. No virtual DOM overhead. HTML-first means the browser's native parser does the heavy lifting. Your Time to Interactive is basically your Time to First Byte.

### For Accessibility-Focused Teams
WCAG 2.3 AAA compliance baked in. Semantic HTML by default. Works with screen readers out of the box. Progressive enhancement means your app works for everyone, not just people with perfect connections and latest browsers.

### For SEO/Content Teams
Schema.org structured data built into every component. Perfect semantic markup. Content is indexable immediately - no waiting for JS to render. Google will love you.

### For Enterprise/Reliability-Focused
Build-time validation catches errors before deployment. No runtime surprises. Works without JavaScript means your app survives CDN failures, script blockers, and corporate firewalls. This is bulletproof architecture.

## Real-World Scenarios Where This Shines

### Scenario 1: E-commerce Form That MUST Work
```typescript
// Import form fields and validation constructors
import { Form, IntegerField } from "@sitebender/adaptive/forms"
import { And, IsNoLessThan, IsNoMoreThan, Multiply, FromElement, FromAPI, Constant } from "@sitebender/adaptive/constructors"

<Form action="/checkout" method="post">
  <IntegerField
    name="quantity"
    label="Quantity"
    min={1}
    max={99}
    step={1}
    required={true}
    help="Enter quantity (1-99)"
    validation={And([
      IsNoLessThan({ test: Constant(1) }),
      IsNoMoreThan({ test: Constant(99) })
    ])}
    calculation={Multiply([
      FromElement("#quantity"),
      FromAPI("/api/price")
    ])}
  />
  {/* Generates HTML (no JS needed): */}
  {/* <input type="number" name="quantity" min="1" max="99" step="1" required /> */}
  
  {/* With JS enhancement adds: */}
  {/* - element.__sbValidate for client-side validation */}
  {/* - element.__sbCalculate for real-time price updates */}
  {/* - Same validation logic on client and server */}
</Form>
```

### Scenario 2: Dynamic Dashboard That Loads Fast
```typescript
<Dashboard>
  <Metric 
    value={FromAPI("/api/revenue")}
    format="currency"
    display={IfUserHasRole("admin")}
  />
  {/* Initial HTML: shows loading state */}
  {/* Progressive: loads only needed calculations */}
  {/* Graceful: falls back to server-rendered values */}
</Dashboard>
```

### Scenario 3: Content Site With Perfect SEO
```typescript
<Article typeof="NewsArticle">
  <Headline property="headline">{title}</Headline>
  <Author property="author" typeof="Person">
    <Name property="name">{authorName}</Name>
  </Author>
  {/* Google sees: perfect Schema.org markup */}
  {/* Users see: beautiful, accessible content */}
  {/* Developers see: type-safe, validated components */}
</Article>
```

## Why This Matters Now

### JavaScript Fatigue is Real
Developers are tired of complex build chains, massive bundles, and fragile SPAs. This library offers a simpler path that doesn't sacrifice power.

### Performance Budgets are Tightening
With Core Web Vitals and mobile-first indexing, performance isn't optional. This library makes performance the default.

### Resilience is Critical
We've all seen major sites break from a bad deployment or CDN issue. Apps built with this library keep working when things go wrong.

### AI/LLM Integration Ready
The structured data and semantic markup make your content perfectly consumable by AI systems. Your components are self-describing.

## Quick Start

```bash
# Install from JSR
deno add @sitebender/adaptive

# Or import directly
import { Button, Form, Input } from "jsr:@sitebender/adaptive"
```

## Core Features

### Three Powerful Libraries in One

1. **Adaptive Runtime Engine** - Functional HTML generation with validation and reactive rendering
2. **Schema.org/Semantic Components** - Type-safe components with built-in structured data
3. **Form Components Library** - DataType-based fields that intelligently render appropriate HTML elements

### Smart Form Fields

Form fields are named by the **data type** they handle, not the HTML element they render:

- `TextField` → Renders `<input type="text">` or `<textarea>` based on expected length
- `IntegerField` → Renders `<input type="number" step="1">` with integer validation
- `FloatField` → Renders `<input type="number" step="any">` with decimal support
- `EmailAddressField` → Renders `<input type="email">` with email validation
- `ChooseOneField` → Renders `<select>` or radio group based on number of options
- `ChooseManyField` → Renders checkboxes or multi-select based on options

Each field automatically includes:
- Proper HTML validation attributes (`min`, `max`, `step`, `pattern`, `required`)
- Progressive enhancement hooks for client-side validation
- Accessibility features (labels, help text, ARIA attributes)

### Build-Time Validation
```typescript
// Errors caught at build time, not runtime
<Button 
  type="invalid"  // ❌ Build error: Invalid button type
  disabled={true}
>
  Submit
</Button>
```

### Dual Validation Strategy

The library uses a two-tier validation approach:

1. **HTML Attributes** - For browser-native validation (works without JS)
   - Set via props: `min={1}`, `max={99}`, `pattern={/^[A-Z]+$/}`, `required={true}`
   - Renders to HTML: `<input min="1" max="99" pattern="^[A-Z]+$" required>`
   - Browser handles basic validation on form submission

2. **Validation Constructors** - For enhanced client/server validation (with JS)
   - Compose complex validation logic: `And([IsNoLessThan({test: Constant(1)}), IsNoMoreThan({test: Constant(99)})])`
   - Attached to element as `__sbValidate` function
   - Enables identical validation logic on client and server
   - Provides detailed error messages and custom validation rules

Currently, HTML attributes and validation constructors are specified separately. A future enhancement could automatically derive HTML attributes from validation constructors where possible.

### Progressive Enhancement Built-In
```typescript
// HTML output works without JavaScript
<form action="/api/submit" method="post">
  <input name="email" type="email" required />
  <button type="submit">Submit</button>
</form>

// With JS: Adds client validation, AJAX submission, live feedback
// Without JS: Standard form submission still works perfectly
```

### Smart Data Attributes
```typescript
// Component with calculations and validations
<Input 
  id="price"
  calculation={Multiply([FromElement("#quantity"), FromAPI("/api/rate")])}
  validation={IsMoreThan(0)}
  format="currency"
/>

// Generates HTML with data attributes
<input 
  id="price"
  data-calculation='{"operation":"multiply",...}'
  data-validate='{"operation":"isMoreThan",...}'
  data-format='{"type":"currency"}'
/>

// JS enhances with attached functions:
// element.__sbCalculate()
// element.__sbValidate()
// element.__sbFormat()
```

## Philosophy

### Progressive Enhancement First
Every component works without JavaScript. Enhancements are truly enhancements, not requirements.

### Validation at Construction Time
Catch errors during build/SSG, not in production. If it compiles, it works.

### Respect the Platform
Leverage native browser APIs, semantic HTML, and web standards. Don't fight the platform, embrace it.

### Performance by Default
Start small, load on demand. Every byte shipped should earn its keep.

### Accessibility is Not Optional
WCAG 2.3 AAA compliance is the target. Semantic markup is non-negotiable.

## When to Use This Library

✅ **Perfect for:**
- Sites that must work everywhere (government, healthcare, finance)
- Content-heavy sites needing perfect SEO
- Progressive web apps with offline support
- E-commerce sites where forms MUST work
- Documentation sites with rich interactive examples
- Dashboard and admin panels with complex calculations
- Any project valuing resilience and performance

❌ **Maybe not for:**
- Native mobile apps (React Native, etc.)
- WebGL/Canvas-heavy games
- Apps that truly require constant WebSocket connections
- Projects committed to a specific framework ecosystem

## The Bottom Line

This isn't just another component library. It's a philosophy of web development that puts users first, respects the platform, and makes the right thing the easy thing. In a world of 500KB JavaScript bundles for todo apps, this is a breath of fresh air.

The combination of build-time validation, progressive enhancement, semantic HTML, and tree-shakable architecture makes this a genuinely innovative approach that solves real problems. It's the library I wish existed five years ago.

## Documentation

Full documentation and live examples available at the [documentation site](https://sitebender.io/adaptive).

## License

MIT

## Contributing

Contributions welcome! Please read [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

## Support

- [GitHub Issues](https://github.com/sitebender/adaptive/issues)
- [Documentation](https://sitebender.io/adaptive)
- [Examples](https://sitebender.io/adaptive/examples)
