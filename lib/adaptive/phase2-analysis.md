# Phase 2: Dual-Mode createElement - Detailed Analysis

## Overview

Phase 2 involves creating a unified `createElement` function that can output both:
1. **HTML strings** (current behavior for server-side rendering)
2. **Adaptive configuration objects** (for database storage and client-side reactivity)

## Why We Need This Change

### Current Situation

We have two parallel rendering systems that cannot interoperate:

#### JSX/TSX Components (Current createElement)
```tsx
// Input (JSX)
<Button id="submit" disabled={isLoading}>Submit</Button>

// Output (current createElement)
{
  type: "button",
  props: {
    id: "submit",
    disabled: true,
    children: "Submit"
  }
}

// Final render (string concatenation)
"<button id=\"submit\" disabled>Submit</button>"
```

#### Adaptive System
```typescript
// Input (functional constructor)
Button({ id: "submit", disabled: FromLocalStorage("isLoading") })([
  TextNode("Submit")
])

// Output (configuration object)
{
  tag: "Button",
  attributes: { 
    id: "submit",
    disabled: { /* injector config */ }
  },
  children: [{ tag: "TextNode", content: "Submit" }],
  calculation: { /* optional */ },
  formatters: { /* optional */ }
}

// Final render (via sitebender pipeline)
// - Can render to DOM or HTML string
// - Supports reactive updates
// - Validates content models
```

### The Problems

1. **No Interoperability**: JSX components can't leverage sitebender's features
2. **Duplication**: Two ways to create the same component with different capabilities
3. **Storage Limitation**: JSX components can't be serialized to database as configurations
4. **Missing Features**: JSX components lack validation, calculations, and reactive updates
5. **Developer Confusion**: Which system to use when?

## Proposed Solution: Dual-Mode createElement

### Core Concept

Modify `createElement` to support two output modes:

```typescript
type RenderMode = 'html' | 'sitebender'

interface CreateElementConfig {
  mode?: RenderMode
  // Other configuration options
}

function createElement(
  tag: unknown,
  props?: Record<string, unknown> | null,
  ...children: unknown[]
): unknown {
  const mode = getMode() // From config, context, or explicit prop
  
  if (mode === 'sitebender') {
    return createAdaptiveConfig(tag, props, children)
  }
  
  return createHTMLElement(tag, props, children) // Current behavior
}
```

### Implementation Details

#### 1. Mode Detection

```typescript
function getMode(): RenderMode {
  // Priority order:
  // 1. Explicit prop (props.__mode)
  // 2. Global configuration
  // 3. Build-time environment variable
  // 4. Default to 'html' for backward compatibility
  
  if (props?.__mode) return props.__mode
  if (globalConfig.renderMode) return globalConfig.renderMode
  if (process.env.RENDER_MODE) return process.env.RENDER_MODE
  return 'html'
}
```

#### 2. Adaptive Configuration Generation

```typescript
function createAdaptiveConfig(tag, props, children) {
  // Map JSX component to sitebender constructor
  const AdaptiveConstructor = getAdaptiveConstructor(tag)
  
  if (AdaptiveConstructor) {
    // Use sitebender constructor with validation
    return AdaptiveConstructor(props)(processChildren(children))
  }
  
  // For unknown/custom components, create generic config
  return {
    tag: typeof tag === 'string' ? tag : tag.name,
    attributes: filterAttributes(props),
    children: processChildren(children),
    ...extractEnhancements(props) // calculations, formatters, etc.
  }
}
```

#### 3. Component Mapping Registry

```typescript
// Map JSX components to sitebender constructors
const componentMap = new Map([
  ['button', AdaptiveButton],
  ['Button', AdaptiveButton], // Support both cases
  ['form', AdaptiveForm],
  ['input', AdaptiveInput],
  // ... etc
])

// For custom components
function registerComponent(jsxComponent, sitebenderConstructor) {
  componentMap.set(jsxComponent.name, sitebenderConstructor)
}
```

#### 4. Enhancement Props

Allow JSX components to use sitebender features:

```tsx
// JSX with sitebender enhancements
<Button 
  id="submit"
  disabled={FromLocalStorage("isLoading")} // Adaptive injector
  __calculation={{                          // Adaptive calculation
    target: "textContent",
    operation: Add([Constant(1), FromApi("/count")])
  }}
  __format={{                               // Adaptive formatter
    type: "currency",
    locale: "en-US"
  }}
>
  Submit
</Button>
```

## Pros and Cons

### Pros

#### 1. **Unified Developer Experience**
- Write components once using familiar JSX
- Get sitebender features "for free"
- No need to learn two different APIs

#### 2. **Progressive Enhancement Path**
- Existing JSX components continue working (backward compatible)
- Can gradually adopt sitebender features
- Mode can be switched per component or globally

#### 3. **Storage and Serialization**
- JSX components can generate JSON-serializable configs
- Store UI configurations in database
- Enable dynamic UI generation from stored configs

#### 4. **Feature Parity**
- JSX components gain validation and content model enforcement
- Support for calculations, formatters, and conditionals
- Reactive updates when in sitebender mode

#### 5. **Type Safety**
- Single type system can cover both modes
- Better IDE support with unified API
- Easier to maintain and document

### Cons

#### 1. **Complexity**
- `createElement` becomes more complex
- Two code paths to maintain and test
- Potential for subtle behavioral differences

#### 2. **Performance Overhead**
- Mode detection on every createElement call
- Component mapping lookups
- Additional processing for sitebender features

#### 3. **Bundle Size**
- Need to include sitebender constructors even for HTML mode
- Component mapping registry adds overhead
- May need tree-shaking optimizations

#### 4. **Migration Challenges**
- Existing code may have assumptions about createElement output
- Third-party components won't have sitebender mappings
- Need careful testing of both modes

#### 5. **Debugging Complexity**
- Harder to debug with two rendering paths
- Stack traces may be less clear
- Need tooling to inspect both output formats

## Alternative Approaches Considered

### 1. **Separate Functions**
Instead of dual-mode, have two functions:
- `createElement` for HTML (current)
- `createAdaptiveElement` for configurations

**Pros:** Clearer separation, simpler implementation
**Cons:** Requires changing JSX pragma per file, more developer friction

### 2. **Compile-Time Transformation**
Use a build plugin to transform JSX based on file extension or pragma:
- `.jsx` → HTML output
- `.ajsx` → Adaptive output

**Pros:** No runtime overhead, clear separation
**Cons:** Requires build tooling, harder to mix modes

### 3. **Wrapper Components**
Create wrapper components that bridge between systems:
```tsx
<AdaptiveWrapper>
  <Button>Submit</Button>
</AdaptiveWrapper>
```

**Pros:** Explicit opt-in, no createElement changes
**Cons:** Verbose, requires wrapping every component

## Implementation Phases

### Phase 2.1: Core Infrastructure
1. Extend createElement with mode detection
2. Create basic sitebender configuration generator
3. Implement component mapping registry
4. Add tests for both modes

### Phase 2.2: Component Mappings
1. Map all HTML elements to sitebender constructors
2. Create mappings for custom components
3. Handle edge cases (fragments, text nodes, etc.)
4. Optimize mapping lookups

### Phase 2.3: Enhancement Support
1. Parse and extract enhancement props
2. Integrate with sitebender's injection system
3. Support calculations and formatters
4. Add conditional rendering

### Phase 2.4: Optimization
1. Implement tree-shaking for unused modes
2. Add build-time mode selection
3. Optimize bundle size
4. Performance profiling and tuning

## Success Criteria

1. **Backward Compatibility**: All existing JSX components work unchanged
2. **Feature Completeness**: JSX components can use all sitebender features
3. **Performance**: Minimal overhead in HTML mode (<5% slower)
4. **Developer Experience**: Clear documentation and migration path
5. **Type Safety**: Full TypeScript support for both modes

## Risks and Mitigations

### Risk 1: Breaking Changes
**Mitigation**: Extensive test suite, gradual rollout, feature flags

### Risk 2: Performance Regression
**Mitigation**: Benchmark before/after, lazy load adaptive features, optimize hot paths

### Risk 3: Developer Confusion
**Mitigation**: Clear documentation, examples, migration guide, default to HTML mode

### Risk 4: Maintenance Burden
**Mitigation**: Shared test utilities, automated component mapping generation

## Questions for Discussion

1. **Default Mode**: Should we default to 'html' (safe) or 'sitebender' (feature-rich)?
2. **Component Registry**: Static or dynamic? Build-time or runtime?
3. **Enhancement Props**: Use `__` prefix or different approach?
4. **Migration Strategy**: Big bang or gradual component-by-component?
5. **Performance Targets**: What's acceptable overhead for the benefits?

## Next Steps

1. **Prototype**: Build minimal proof-of-concept with a few components
2. **Benchmark**: Measure performance impact
3. **User Testing**: Get feedback from component authors
4. **Refine Design**: Iterate based on findings
5. **Implementation**: Build production version

## Conclusion

The dual-mode createElement is a complex but valuable enhancement that bridges two powerful rendering systems. While it introduces complexity, the benefits of unified development experience, progressive enhancement, and feature parity outweigh the costs. The key is careful implementation with strong focus on backward compatibility and performance.
