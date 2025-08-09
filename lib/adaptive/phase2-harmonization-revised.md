# Phase 2: Harmonization Strategy - Revised with Full Adaptive Power

## Critical Correction

The sitebender library already has a sophisticated system of multiple data-* attributes, each with specialized compose functions that attach executable functions to DOM elements as properties. We must preserve ALL of this functionality.

## Existing Adaptive Data-* Attribute System

The sitebender library uses these specialized attributes and element properties:

### 1. **data-calculation** → `__sbCalculate`
- Uses `composeOperators` to create calculation functions
- Supports 60+ mathematical operations
- Attached to element as `__sbCalculate` property
- Registered in `document.__sbCalculators`

### 2. **data-format** → `__sbFormat`
- Uses formatter functions for value transformation
- Attached to element as `__sbFormat` property
- Registered in `document.__sbFormatters`

### 3. **data-validate** → `__sbValidate`
- Uses `composeValidator` to create validation functions
- Returns Either<Error[], Value> for validation results
- Attached to element as `__sbValidate` property

### 4. **data-display** → `__sbDisplayCallbacks`
- Uses `composeConditional` for visibility logic
- Returns boolean for show/hide decisions
- Registered in `document.__sbDisplayCallbacks`
- Elements moved to `<template>` when hidden

### 5. **data-enhance** (new for harmonization)
- Will store additional progressive enhancement configs
- For features like AJAX forms, API calls, etc.

## Revised Harmonization Approach

### Core Principle: Preserve and Extend

Instead of reducing everything to a single `data-enhance` attribute, we:
1. **Preserve** all existing sitebender data-* attributes
2. **Map** JSX props to appropriate sitebender configurations
3. **Generate** multiple data-* attributes as needed
4. **Attach** composed functions during hydration

### Build-Time Processing (SSG)

```tsx
// JSX Component (authored)
<Button 
  id="submit"
  disabled={FromLocalStorage("isLoading")}
  calculation={Add([FromElement("#quantity"), Constant(10)])}
  validation={IsMoreThan({ 
    operand: FromElement("#total"), 
    test: Constant(0) 
  })}
  display={IsEqualTo({
    operand: FromLocalStorage("userLoggedIn"),
    test: Constant(true)
  })}
  onClick={SendToApi("/submit")}
>
  Submit
</Button>

// Build-time output (HTML with multiple data-* attributes)
<button 
  id="submit"
  disabled
  data-calculation='{"operation":"add","operands":[{"type":"element","selector":"#quantity"},{"type":"constant","value":10}]}'
  data-validate='{"operation":"isMoreThan","operand":{"type":"element","selector":"#total"},"test":{"type":"constant","value":0}}'
  data-display='{"operation":"isEqualTo","operand":{"type":"localStorage","key":"userLoggedIn"},"test":{"type":"constant","value":true}}'
  data-enhance='{"disabled":{"type":"localStorage","key":"isLoading"},"click":{"type":"api","endpoint":"/submit"}}'
>
  Submit
</button>
```

### Client-Side Hydration

```typescript
// Hydration preserves all sitebender library power
async function hydrateAdaptive() {
  const elements = document.querySelectorAll('[data-calculation], [data-validate], [data-display], [data-format], [data-enhance]')
  
  for (const element of elements) {
    // Process calculation attribute
    if (element.dataset.calculation) {
      const config = JSON.parse(element.dataset.calculation)
      const { composeOperators } = await import('./operations/composers/composeOperators')
      element.__sbCalculate = await composeOperators(config)
      document.__sbCalculators.add(element.id)
    }
    
    // Process validation attribute
    if (element.dataset.validate) {
      const config = JSON.parse(element.dataset.validate)
      const { composeValidator } = await import('./operations/composers/composeValidator')
      element.__sbValidate = await composeValidator(config)
    }
    
    // Process display conditional
    if (element.dataset.display) {
      const config = JSON.parse(element.dataset.display)
      const { composeConditional } = await import('./operations/composers/composeConditional')
      const displayFn = await composeConditional(config)
      
      // Set up reactive display updates
      document.__sbDisplayCallbacks[element.id] = async () => {
        const shouldDisplay = await displayFn()
        if (!shouldDisplay) {
          // Move to template element (sitebender's approach)
          const template = document.createElement('template')
          template.dataset.sbHidden = element.id
          element.replaceWith(template)
          template.content.appendChild(element)
        }
      }
    }
    
    // Process formatter
    if (element.dataset.format) {
      const config = JSON.parse(element.dataset.format)
      const { addFormatter } = await import('./buildDomTree/addFormatter')
      await addFormatter(element, config)
      document.__sbFormatters.add(element.id)
    }
    
    // Process additional enhancements
    if (element.dataset.enhance) {
      const config = JSON.parse(element.dataset.enhance)
      await processEnhancements(element, config)
    }
  }
  
  // Initialize reactive updates
  await initializeReactivity()
}
```

## Validation at Construction Time (SSG)

```typescript
// Modified createElement for build-time validation
function createElement(tag, props, ...children) {
  // 1. Map to sitebender constructor for validation
  const Constructor = getAdaptiveConstructor(tag)
  
  if (Constructor) {
    // 2. Validate at construction time
    const validation = Constructor.validate(props, children)
    if (validation.isError) {
      throw new BuildError(`Validation failed for ${tag}: ${validation.error}`)
    }
    
    // 3. Extract all sitebender configurations
    const configs = {
      calculation: extractCalculation(props),
      validation: extractValidation(props),
      display: extractDisplay(props),
      format: extractFormat(props),
      enhance: extractEnhancements(props)
    }
    
    // 4. Generate HTML with multiple data-* attributes
    return generateHTMLWithConfigs(tag, props, children, configs)
  }
  
  return defaultCreateElement(tag, props, children)
}
```

## Tree-Shaking Strategy

```typescript
// Each compose function in a separate module
// Only loaded when corresponding data-* attribute exists

// operations/composers/composeOperators/index.ts
export async function composeOperators(config) {
  // Dynamically import only needed operations
  const operations = await loadOperations(config)
  return createCalculator(operations)
}

// operations/composers/composeValidator/index.ts
export async function composeValidator(config) {
  // Import only needed validators
  const validators = await loadValidators(config)
  return createValidator(validators)
}

// operations/composers/composeConditional/index.ts
export async function composeConditional(config) {
  // Import only needed comparators
  const comparators = await loadComparators(config)
  return createConditional(comparators)
}
```

## Progressive Enhancement Examples

### Form with Full Validation

```tsx
// JSX authored
<Form action="/api/submit" method="post">
  <Input 
    name="quantity"
    type="number"
    validation={And([
      IsMoreThan({ test: Constant(0) }),
      IsLessThan({ test: Constant(100) })
    ])}
    format={{ type: "number", decimals: 2 }}
  />
  <Input
    name="email"
    type="email"
    validation={MatchesPattern({ pattern: EmailRegex })}
  />
  <Button 
    type="submit"
    display={IsValid({ targets: ["#quantity", "#email"] })}
  >
    Submit
  </Button>
</Form>

// HTML output
<form action="/api/submit" method="post">
  <input 
    name="quantity" 
    type="number"
    data-validate='{"operation":"and","operands":[{"operation":"isMoreThan","test":{"type":"constant","value":0}},{"operation":"isLessThan","test":{"type":"constant","value":100}}]}'
    data-format='{"type":"number","decimals":2}'
  />
  <input
    name="email"
    type="email"
    data-validate='{"operation":"matchesPattern","pattern":"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"}'
  />
  <button
    type="submit"
    data-display='{"operation":"isValid","targets":["#quantity","#email"]}'
  >
    Submit
  </button>
</form>

// When JS loads:
// - Input validation functions attached as __sbValidate
// - Formatter attached as __sbFormat
// - Button visibility controlled by validation state
// - Form still submits normally without JS
```

### Dynamic Pricing Calculator

```tsx
// JSX authored
<div id="pricing">
  <Input 
    id="quantity"
    type="number"
    value={FromLocalStorage("savedQuantity")}
  />
  <span 
    id="total"
    calculation={Multiply([
      FromElement("#quantity"),
      FromApi("/api/price")
    ])}
    format={{ type: "currency", locale: "en-US" }}
  >
    $0.00
  </span>
</div>

// HTML output
<div id="pricing">
  <input id="quantity" type="number" value="1" />
  <span 
    id="total"
    data-calculation='{"operation":"multiply","operands":[{"type":"element","selector":"#quantity"},{"type":"api","endpoint":"/api/price"}]}'
    data-format='{"type":"currency","locale":"en-US"}'
  >
    $0.00
  </span>
</div>

// When JS loads:
// - __sbCalculate function attached to span
// - __sbFormat function for currency formatting
// - Reactive updates when quantity changes
// - Fallback shows $0.00 without JS
```

## Key Improvements Over Previous Plan

1. **Preserves ALL sitebender functionality** - No loss of power
2. **Multiple specialized data-* attributes** - Not everything in data-enhance
3. **Proper compose functions** - composeOperators, composeValidator, composeConditional
4. **Element properties maintained** - __sbCalculate, __sbValidate, __sbFormat, etc.
5. **Document registries preserved** - __sbCalculators, __sbFormatters, __sbDisplayCallbacks
6. **Template-based hiding** - Elements moved to template when hidden (sitebender's approach)

## Implementation Phases

### Phase 2a: JSX to Adaptive Mapping
1. Create prop extractors for each data-* type
2. Map JSX validation props to sitebender configs
3. Generate proper data-* attributes
4. Maintain build-time validation

### Phase 2b: Hydration System
1. Import compose functions dynamically
2. Attach functions to elements as properties
3. Set up document-level registries
4. Initialize reactive system

### Phase 2c: Tree-Shaking Optimization
1. Split operations into separate modules
2. Dynamic imports based on configs
3. Bundle only used operations
4. Measure bundle impact

### Phase 2d: Testing & Validation
1. Verify all sitebender features work
2. Test progressive enhancement
3. Validate tree-shaking
4. Ensure SSG compatibility

## Success Metrics

1. **100% sitebender feature preservation** - All compose functions work
2. **< 10kb base bundle** - Rest loads dynamically
3. **Build-time validation** - Errors caught during SSG
4. **Full HTML fallback** - Works without JavaScript
5. **Reactive updates** - All sitebender reactivity maintained

## Conclusion

This revised approach fully preserves the sitebender library's sophisticated capabilities while achieving the harmonization goals. By maintaining the multiple specialized data-* attributes and their corresponding compose functions, we keep all the power of the sitebender system while enabling:

- ✅ Construction-time validation for SSG
- ✅ Progressive enhancement via multiple data-* attributes
- ✅ Tree-shakable architecture with dynamic imports
- ✅ Works without JavaScript (HTML fallback)
- ✅ Full sitebender functionality preserved
