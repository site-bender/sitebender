# _resolveHeadingLevels

Post-processing function that resolves context-aware heading placeholders (`<Hn>`) to actual heading levels (H1-H6) based on sectioning element nesting depth.

## Purpose

The `_Hn` component generates `tagName: "HEADING"` placeholders that are resolved during a post-processing pass. This allows semantic components (Essay, Article, Tutorial, etc.) to use `<Hn>` without knowing their nesting depth in advance.

## Usage

### Basic Example

```typescript
import createElement from "@sitebender/architect/createElement/index.ts"
import _resolveHeadingLevels from "@sitebender/architect/createElement/_resolveHeadingLevels/index.ts"
import _Article from "@sitebender/architect/_html/sectioning/_Article/index.ts"
import _Section from "@sitebender/architect/_html/sectioning/_Section/index.ts"
import _Hn from "@sitebender/architect/_html/heading/_Hn/index.ts"

// Create VirtualNode tree with HEADING placeholders
const tree = _Article({
	children: [
		_Hn({ children: [{ _tag: "text", content: "Article Title" }] }),
		_Section({
			children: [
				_Hn({ children: [{ _tag: "text", content: "Section Title" }] }),
			],
		}),
	],
})

// Resolve all HEADING placeholders to actual heading levels
const resolved = _resolveHeadingLevels(tree)(0)

// Result:
// - Article > Hn → H2 (depth 1)
// - Article > Section > Hn → H3 (depth 2)
```

### With JSX

```tsx
// In your JSX component
function MyPage() {
	return (
		<Article>
			<Hn>Article Title</Hn>
			<Section>
				<Hn>Section Title</Hn>
				<Section>
					<Hn>Subsection Title</Hn>
				</Section>
			</Section>
		</Article>
	)
}

// After createElement transforms JSX to VirtualNode
const tree = MyPage()
const resolved = _resolveHeadingLevels(tree)(0)

// Heading levels are now resolved:
// - Hn at article level → H2
// - Hn at section level → H3
// - Hn at nested section level → H4
```

## How It Works

### Sectioning Elements

The following HTML elements increase heading depth:

- `<article>`
- `<section>`
- `<aside>`
- `<nav>`

### Depth Calculation

- **Root level** (depth 0): HEADING → H1
- **Inside one sectioning element** (depth 1): HEADING → H2
- **Inside nested sectioning** (depth 2): HEADING → H3
- And so on...

### Capping and Warnings

- **Maximum level**: H6 (HTML spec limit)
- **Practical limit**: H3 or H4 (configurable via MIN_PRACTICAL_LEVEL)
- **Excessive nesting**: Depths beyond practical limit add `data-§-warning-excessive-nesting` attribute in development mode

### Example with Deep Nesting

```typescript
const tree = _Article({
	children: [
		_Section({
			children: [
				_Section({
					children: [
						_Section({
							children: [
								_Section({
									children: [
										_Hn({ children: [{ _tag: "text", content: "Too Deep" }] }),
									],
								}),
							],
						}),
					],
				}),
			],
		}),
	],
})

const resolved = _resolveHeadingLevels(tree)(0)

// Heading is H6 (capped) with warning attribute:
// {
//   tagName: "H6",
//   attributes: {
//     "data-§-warning-excessive-nesting": "Heading depth 7 exceeds practical limit of 3"
//   }
// }
```

## Integration

### Manual (Recommended for Build Tools)

Call `_resolveHeadingLevels` explicitly after VirtualNode tree creation:

```typescript
const tree = renderPage()
const withResolvedHeadings = _resolveHeadingLevels(tree)(0)
const html = serializeToHtml(withResolvedHeadings)
```

### Automatic (Framework Integration)

For frameworks that wrap createElement, add heading resolution to the render pipeline:

```typescript
function renderToHtml(component: Component) {
	const tree = createElement(component)(null)([])
	const resolved = _resolveHeadingLevels(tree)(0)
	return serializeToHtml(resolved)
}
```

## Architectural Notes

### Why Post-Processing?

JSX compilation is **bottom-up** (children evaluate before parents). When `<Hn>` is created, its ancestors don't exist yet, so it can't know its depth.

Post-processing walks the tree **top-down**, tracking depth as it descends, and resolves all HEADING placeholders based on accumulated context.

### Performance

- **Single-pass**: O(n) tree traversal
- **Pure functional**: No mutations, returns new tree
- **Lazy**: Only runs when called (not automatic in createElement)

### Constitutional Compliance

- ✅ Pure function (no side effects)
- ✅ No mutations (returns new VirtualNode tree)
- ✅ No loops (uses `map` from Toolsmith)
- ✅ No exceptions (returns data, uses warning attributes)
- ✅ Curried (takes vnode, returns function that takes depth)
- ✅ Named function declarations

## Testing

Comprehensive test coverage in `index.test.ts`:

- Root level resolution (HEADING → H1)
- Single sectioning (HEADING → H2)
- Nested sectioning (HEADING → H3, H4, etc.)
- Deep nesting with capping (H6 max)
- Excessive nesting warnings
- Attribute preservation
- Children preservation
- Non-sectioning contexts
- Multiple headings at different depths
- All sectioning element types (article, section, aside, nav)
- Non-element VirtualNode pass-through

## API

### Function Signature

```typescript
function _resolveHeadingLevels(
	vnode: VirtualNode,
): (sectionDepth?: number) => VirtualNode
```

### Parameters

- **vnode**: VirtualNode tree (may contain HEADING placeholders)
- **sectionDepth**: Current nesting depth (default: 0)

### Returns

New VirtualNode tree with all HEADING elements resolved to H1-H6.

### Constants

- **SECTIONING_ELEMENTS**: `["ARTICLE", "ASIDE", "NAV", "SECTION"]`
- **MAX_HEADING_LEVEL**: `6` (HTML spec limit)
- **MIN_PRACTICAL_LEVEL**: `3` (user-configured practical limit)

## Related

- `_Hn` component (`src/_html/heading/_Hn/index.ts`)
- `createElement` (`src/createElement/index.ts`)
- VirtualNode type (`@sitebender/toolsmith/types/virtualNode/index.ts`)
