# Narrative Component Architecture Notes

## 1. Element Type Flexibility

### Current Approach
All character components currently use `<span>` elements exclusively, which works well for inline narrative text.

### Proposed Enhancement
Add an `element` prop with a constrained union type to support different use cases. Based on existing patterns in the codebase, each component should define its own semantically appropriate union:

```typescript
// For character components (narrative focus)
element?: "span" | "div" | "b" | "i" | "strong" | "em" | "mark"

// Each component can have its own specific subset
// CharacterName might support: "span" | "b" | "strong" | "cite"
// Dialogue might support: "span" | "div" | "q" | "blockquote"
// StageDirection might support: "span" | "div" | "i" | "em"
```

### Use Cases by Element
- **`span`** (default): Inline narrative text, most common use case
- **`div`**: Block-level markup for character sheets, dramatis personae, or structured character lists
- **`b`/`strong`**: When the character name needs visual/semantic emphasis
- **`i`/`em`**: For stylistic emphasis (e.g., internal thoughts about a character)
- **`mark`**: Highlighting character references in analysis or study guides
- **`cite`**: When referencing a character as a source or in academic contexts

### Example Implementation
```tsx
export default function CharacterName({
  element = "span",
  // ... other props
}: Props): JSX.Element {
  const Element = element
  return (
    <Element
      aria-label={ariaLabel}
      class="character-name"
      // ... other attributes
    >
      {children}
    </Element>
  )
}
```

## 2. Metadata Strategy: Microdata, Enrich Components, and Data Attributes

### Current State
- **Identify components**: Currently include Schema.org microdata directly (itemScope, itemType, itemProp)
- **Enrich components**: Exist separately in `/lib/components/enrich/` for full Schema.org support
- **Data attributes**: Provide machine-readable metadata for AI/MCP tools

### Key Questions and Considerations

#### A. Purpose Without Microdata
Even without microdata, identify components serve valuable purposes:
1. **Semantic HTML**: Clear document structure and meaning
2. **CSS Hooks**: Consistent styling via classes and data attributes
3. **AI/MCP Readability**: Data attributes provide structured metadata for tools
4. **Accessibility**: ARIA labels improve screen reader experience
5. **JavaScript Enhancement**: Data attributes enable progressive enhancement

#### B. Relationship with Enrich Components
The `/lib/components/enrich/` folder contains full Schema.org components like Person. We could:

**Option 1: Composition Pattern (Recommended)**
```tsx
// identify/narrative/CharacterName can optionally wrap with enrich/Person
import Person from "../../../enrich/Person"

export default function CharacterName({
  enrichWithSchema = false,
  // ... other props
}: Props): JSX.Element {
  const content = <span itemProp="name">{children}</span>
  
  if (enrichWithSchema && characterId) {
    return (
      <Person
        id={characterId}
        name={fullName || children}
        alternateName={nickname}
      >
        {content}
      </Person>
    )
  }
  
  return (
    <span
      aria-label={ariaLabel}
      class="character-name"
      data-character-id={characterId}
      // Minimal microdata
      itemProp="character"
      {...props}
    >
      {content}
    </span>
  )
}
```

**Option 2: Levels of Metadata**
```tsx
type MetadataLevel = "none" | "minimal" | "full"

// "none": Just data attributes and ARIA
// "minimal": Add basic microdata (current approach)
// "full": Wrap with enrich components for complete Schema.org
```

**Option 3: Separate Concerns**
- Keep identify components focused on narrative semantics (data attributes + ARIA)
- Let users explicitly wrap with enrich components when needed
- This maintains single responsibility and composability

### Recommendations

1. **Default to Minimal Microdata**: Include basic itemProp attributes that don't require itemScope/itemType
2. **Optional Schema Enhancement**: Add an `enrichWithSchema` boolean prop that wraps with appropriate enrich components
3. **Keep Data Attributes Always**: These are lightweight and valuable for AI/MCP tools
4. **Document Composition Patterns**: Show users how to combine identify + enrich components

### Example Usage Patterns

```tsx
// Basic narrative marking (minimal microdata)
<CharacterName characterId="elizabeth">Elizabeth</CharacterName>

// With full Schema.org (uses enrich/Person internally)
<CharacterName 
  characterId="elizabeth"
  enrichWithSchema={true}
  fullName="Elizabeth Bennet"
>
  Lizzy
</CharacterName>

// Manual composition for complex cases
<Person 
  id="elizabeth-bennet"
  givenName="Elizabeth" 
  familyName="Bennet"
>
  <CharacterName characterId="elizabeth">
    Elizabeth
  </CharacterName>
</Person>
```

## 3. Implementation Strategy

### Phase 1: Update Existing Components
1. Add `element` prop to all character components
2. Add `enrichWithSchema` prop (default false)
3. Maintain backward compatibility

### Phase 2: Establish Patterns
1. Create helper functions for common metadata patterns
2. Document best practices for identify + enrich composition
3. Add examples showing different metadata levels

### Phase 3: Consistency Check
1. Ensure all narrative components follow the same patterns
2. Update documentation with clear guidance on when to use each approach
3. Add tests for different element types and metadata levels

## 4. Benefits of This Approach

1. **Progressive Enhancement**: Start simple, add complexity as needed
2. **Flexibility**: Users can choose appropriate metadata level for their use case
3. **Performance**: Minimal overhead by default, opt-in for richer metadata
4. **Clarity**: Clear separation between narrative identification and data enrichment
5. **Composability**: Components work well together without tight coupling

## 5. Final Recommendations (UPDATED)

Based on the codebase patterns and user requirements for ease of use:

### For Element Types
1. **Each component defines its own union type** - Following the existing pattern where components like `ForeignTerm` use `"i" | "span" | "em" | "cite"` based on semantic appropriateness
2. **Default to span** - Most inline narrative text works best with span
3. **Include div for components that might be block-level** - Dialogue, StageDirection, SceneSetting
4. **Use destructuring rename pattern**: `element: Element = "span"` for cleaner code

### For Metadata Strategy - REVISED
1. **Add `enrich` prop with enumeration** for ease of use
2. **Automatically wrap with enrich components** when enrich prop is provided
3. **Keep data attributes always** - They serve AI/MCP tools regardless of enrichment level
4. **Prioritize user convenience** over implementation simplicity

### Enrichment Levels

```typescript
type EnrichmentLevel = "microdata" | "linkedData" | "both"

export type Props = {
  children?: JSX.Element | Array<JSX.Element> | string
  element?: "span" | "b" | "strong" | "cite" | "mark"
  enrich?: EnrichmentLevel  // undefined = no enrichment (lightweight default)
  // ... other props
}
```

### Implementation Pattern

```typescript
import Person from "../../../enrich/Person"

export default function CharacterName({
  characterId,
  children,
  element: Element = "span",
  enrich,
  fullName,
  nickname,
  role,
  title,
  ...props
}: Props): JSX.Element {
  const displayName = children || fullName || nickname || ""
  const ariaLabel = [
    "character",
    fullName || displayName,
    nickname && fullName && `also known as ${nickname}`,
    role && `the ${role}`,
  ].filter(Boolean).join(", ")

  const baseElement = (
    <Element
      aria-label={ariaLabel}
      class="character-name"
      data-character-id={characterId}
      data-full-name={fullName}
      data-nickname={nickname}
      data-role={role}
      data-title={title}
      {...props}
    >
      {enrich ? <span itemProp="name">{displayName}</span> : displayName}
    </Element>
  )

  // Wrap with Person component if enriching
  if (enrich && characterId) {
    return (
      <Person
        id={characterId}
        name={fullName || displayName}
        alternateName={nickname}
        disableJsonLd={enrich === "microdata"}
        disableMicrodata={enrich === "linkedData"}
      >
        {baseElement}
      </Person>
    )
  }

  // Default: lightweight with data attributes and basic microdata
  return (
    <Element
      aria-label={ariaLabel}
      class="character-name"
      data-character-id={characterId}
      data-full-name={fullName}
      data-nickname={nickname}
      data-role={role}
      data-title={title}
      itemProp="character"  // Basic microdata when not enriched
      {...props}
    >
      {displayName}
    </Element>
  )
}
```

### Benefits of This Approach
1. **Zero friction adoption**: Users just add `enrich="both"` to get full semantic markup
2. **Clear upgrade path**: Start simple, add enrichment as needed
3. **Library mission fulfilled**: Encourages maximum semantic and open data with minimal effort
4. **Performance conscious**: Lightweight by default, opt-in for richer metadata
5. **Flexibility maintained**: Users can still manually compose for complex cases