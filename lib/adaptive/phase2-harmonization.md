# Phase 2: Harmonization Strategy - Refined Plan

## Goals

Based on user requirements, we need to achieve:

1. **Construction-time validation for SSG** - Vital for static site generation
2. **Progressive enhancement via data-* attributes** - Store sitebender configs in HTML
3. **Tree-shakable architecture** - Only load functions that are actually used
4. **Works without JavaScript** - Pure HTML/CSS fallback

## Core Concept: Unified Object Format

Instead of dual-mode createElement, we harmonize the object formats so JSX components generate sitebender-compatible configurations that can be:
- Validated at build time
- Serialized to data-* attributes
- Hydrated client-side when JS is available
- Work as vanilla HTML when JS is disabled

## Implementation Approach

### 1. Build-Time Processing

```tsx
// JSX Component (authored)
<Button 
  id="submit" 
  disabled={FromLocalStorage("isLoading")}
  onClick={SendToApi("/submit")}
>
  Submit
</Button>

// Build-time output (SSG)
<button 
  id="submit" 
  disabled
  data-enhance='{"disabled":{"type":"localStorage","key":"isLoading"},"click":{"type":"api","endpoint":"/submit"}}'
>
  Submit
</button>
```

### 2. Validation at Construction

```typescript
// During build (SSG phase)
function createElement(tag, props, ...children) {
  // 1. Map to sitebender constructor for validation
  const Constructor = getAdaptiveConstructor(tag)
  
  if (Constructor) {
    // 2. Validate at construction time
    const result = Constructor.validate(props, children)
    if (result.isError) {
      throw new BuildError(result.error)
    }
    
    // 3. Extract enhancement configuration
    const config = extractEnhancements(props)
    
    // 4. Generate HTML with data attributes
    return generateHTML(tag, props, children, config)
  }
  
  // Fallback for unknown components
  return defaultCreateElement(tag, props, children)
}
```

### 3. Progressive Enhancement Pipeline

```typescript
// Client-side hydration (when JS available)
function hydrateAdaptive() {
  // Find all elements with data-enhance
  const enhanced = document.querySelectorAll('[data-enhance]')
  
  enhanced.forEach(element => {
    const config = JSON.parse(element.dataset.enhance)
    
    // Lazy load only needed handlers
    if (config.disabled) {
      import('./injectors/localStorage').then(mod => {
        mod.default(element, config.disabled)
      })
    }
    
    if (config.click) {
      import('./handlers/api').then(mod => {
        mod.default(element, config.click)
      })
    }
  })
}
```

### 4. Tree-Shaking Strategy

```typescript
// Separate bundles for each feature
// Only loaded when data-enhance contains that feature

// injectors/localStorage.ts
export default function handleLocalStorage(element, config) {
  const value = localStorage.getItem(config.key)
  element.disabled = value === 'true'
  
  // Set up reactive updates
  window.addEventListener('storage', (e) => {
    if (e.key === config.key) {
      element.disabled = e.newValue === 'true'
    }
  })
}

// handlers/api.ts
export default function handleApi(element, config) {
  element.addEventListener('click', async () => {
    const response = await fetch(config.endpoint, {
      method: 'POST',
      body: gatherFormData(element)
    })
    // Handle response
  })
}
```

## Key Differences from Original Phase 2

### What Changes

1. **No dual-mode createElement** - Single mode that always validates and generates HTML
2. **Data attributes instead of objects** - Configs stored in HTML, not JavaScript
3. **Lazy loading instead of bundling** - Load enhancers on demand
4. **HTML-first output** - Always generates working HTML, JS enhances

### What Stays the Same

1. **Validation at construction** - All components validated during build
2. **Component mapping** - JSX components map to sitebender validators
3. **Feature completeness** - All sitebender features available
4. **Type safety** - Full TypeScript support

## Implementation Phases

### Phase 2a: Core Infrastructure
1. Modify createElement to always validate
2. Add data-enhance attribute generation
3. Create enhancement extractor
4. Implement HTML-first output

### Phase 2b: Component Validators
1. Create validation-only versions of sitebender constructors
2. Map all JSX components to validators
3. Implement content model checking
4. Add build-time error reporting

### Phase 2c: Enhancement Modules
1. Split sitebender features into separate modules
2. Create lazy-loading hydration system
3. Implement tree-shakable bundles
4. Add progressive enhancement detection

### Phase 2d: Client Hydration
1. Create hydration entry point
2. Implement data-enhance parser
3. Add dynamic import for features
4. Set up reactive bindings

## Benefits of This Approach

### 1. SSG-Friendly
- All validation happens at build time
- Errors caught before deployment
- No runtime validation overhead
- Clean HTML output

### 2. Progressive Enhancement
- HTML works without JavaScript
- Features enhance when JS loads
- Graceful degradation
- Accessibility maintained

### 3. Performance
- Minimal initial bundle
- Features loaded on demand
- Tree-shaking effective
- No unused code shipped

### 4. Developer Experience
- Write normal JSX
- Get validation automatically
- Features "just work"
- Clear error messages

## Example: Form Component

```tsx
// Developer writes
<Form 
  action="/api/submit"
  method="post"
  validate={ClientSideValidation}
  enhance={AjaxSubmission}
>
  <Input 
    name="email" 
    type="email"
    required
    pattern={EmailPattern}
  />
  <Button type="submit">Submit</Button>
</Form>

// Build output (no JS)
<form action="/api/submit" method="post">
  <input name="email" type="email" required 
         pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
  <button type="submit">Submit</button>
</form>

// Build output (with progressive enhancement)
<form 
  action="/api/submit" 
  method="post"
  data-enhance='{"validate":"client","submit":"ajax"}'
>
  <input 
    name="email" 
    type="email" 
    required
    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
    data-enhance='{"validate":"email"}'
  />
  <button type="submit">Submit</button>
</form>

// When JS loads, form enhances:
// - Client-side validation before submit
// - AJAX submission instead of page reload
// - Live validation feedback
// - But still works perfectly without JS!
```

## Migration Path

### For Existing JSX Components
1. Add validation mappings
2. No code changes needed
3. Automatic enhancement generation
4. Gradual opt-in to features

### For New Components
1. Write JSX as normal
2. Use sitebender props for enhancements
3. Get validation automatically
4. Progressive enhancement built-in

## Success Metrics

1. **Zero runtime validation errors** - All caught at build
2. **< 5kb initial JS bundle** - Rest loads on demand
3. **100% HTML functionality** - Everything works without JS
4. **< 100ms enhancement time** - Fast progressive enhancement
5. **Zero breaking changes** - Existing code continues working

## Next Steps

1. **Prototype validation system** - Prove build-time validation works
2. **Create enhancement extractor** - Generate data-enhance attributes
3. **Build hydration system** - Test progressive enhancement
4. **Measure bundle sizes** - Verify tree-shaking effectiveness
5. **User testing** - Validate developer experience

## Conclusion

This refined approach achieves all stated goals:
- ✅ Construction-time validation for SSG
- ✅ Progressive enhancement via data-* attributes
- ✅ Tree-shakable architecture
- ✅ Works without JavaScript

By harmonizing object formats and using HTML as the transport mechanism, we get the best of both worlds: powerful validation and features from sitebender, with the simplicity and progressive enhancement of semantic HTML.
