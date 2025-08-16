# Proposed Utility Functions

## Object Utilities

### Core Manipulation
- **mergeDeep** - Deep recursive merging of objects
- **set/setPath** - Immutably set nested value at path
- **update/updatePath** - Immutably update nested value with function
- **assoc/dissoc** - Add/remove single property (like pick/omit for single keys)
- **evolve** - Apply transformation functions to specific paths

### Transformation
- **mapKeys** - Transform all keys with function
- **mapValues** - Transform all values with function  
- **invert** - Swap keys and values
- **zipObj** - Create object from keys array and values array
- **toPairs/fromPairs** - Convert object to/from [key, value] pairs

### Inspection
- **hasPath** - Check nested path existence (we have 'has' already)
- **keys/values/entries** - Curried versions of Object methods
- **isEmpty** - Check if object has no own properties
- **size** - Count own properties

### Advanced FP Patterns

#### Lenses
- **lens** - Create a lens from getter and setter
- **lensProp** - Create lens for property
- **lensPath** - Create lens for nested path
- **lensIndex** - Create lens for array index
- **view** - Read through lens
- **set** - Write through lens
- **over** - Modify through lens

#### Transducers
- **transduce** - Apply transducer to collection
- **into** - Build new collection type with transducer
- **comp** - Compose transducers
- **map/filter/take/drop** (as transducers)

## Array Utilities

### Core Manipulation
- **insert/insertAt** - Insert element at index
- **remove/removeAt** - Remove element at index (already have?)
- **move** - Move element from one index to another
- **swap** - Swap two elements by index
- **updateAt** - Update element at index with function

### Searching & Filtering
- **findIndex/findLastIndex** - Find index by predicate
- **indexOf/lastIndexOf** - Curried versions
- **takeWhile/dropWhile** - Take/drop while predicate is true
- **partition** - Split into [passing, failing] by predicate
- **groupBy** - Group elements by key function
- **indexBy/keyBy** - Convert to object using key function

### Transformation
- **scan** - Like reduce but returns all intermediate values
- **unfold** - Generate array from seed value
- **aperture** - Sliding window of n elements
- **transpose** - Transpose matrix
- **rotate** - Rotate elements left/right

### Set Operations
- **union** - Combine unique elements
- **intersection** - Common elements
- **difference** - Elements in first but not second
- **symmetricDifference** - Elements in either but not both
- **uniqBy** - Unique by comparator function

### Statistical
- **mean/median/mode** - Statistical functions
- **sum/product** - Arithmetic aggregations
- **minBy/maxBy** - Min/max by comparator

## String Utilities

### Case Conversion (enhance existing)
- **toCamelCase** - Handle edge cases better
- **toKebabCase** - Handle numbers, special chars
- **toSnakeCase** - Proper handling
- **toPascalCase** - Consistent behavior
- **toTitleCase** - Smart title casing

### Manipulation
- **truncate** - With ellipsis and word boundaries
- **wrap** - Wrap text at column width
- **indent/dedent** - Add/remove indentation
- **template** - Simple template interpolation
- **slugify** - Convert to URL-safe slug

### Analysis
- **words** - Extract words with proper unicode support
- **lines** - Split into lines (handle different line endings)
- **count** - Count occurrences of substring
- **levenshtein** - Edit distance between strings

### Validation & Testing
- **isBlank** - Empty or only whitespace
- **isNumeric** - Can be parsed as number
- **isAlpha/isAlphaNum** - Character class checks
- **matchAll** - Find all regex matches

## Common Patterns (All Types)

### Composition Helpers
- **pipe/compose** - Function composition
- **curry/uncurry** - Curry functions
- **partial/partialRight** - Partial application
- **memoize** - Cache function results
- **debounce/throttle** - Rate limiting

### Monadic Patterns
- **Maybe/Option** - Handle null/undefined
- **Either/Result** - Handle errors
- **IO** - Wrap side effects
- **Task** - Async operations

## Priority Recommendations

### High Priority (Core FP needs)
1. Object: `mergeDeep`, `set`, `mapValues`, `evolve`
2. Array: `groupBy`, `partition`, `takeWhile`, `dropWhile`
3. String: Better case conversion, `words`, `template`

### Medium Priority (Common use cases)
1. Object: Lenses (at least basic `lens`, `lensProp`, `view`, `set`, `over`)
2. Array: `scan`, `aperture`, set operations
3. String: `truncate`, `slugify`, validation helpers

### Low Priority (Advanced FP)
1. Full transducer system
2. Monadic patterns
3. Advanced statistical functions

## Questions for Consideration

1. **Naming Convention**: Should we follow Ramda conventions (preferred for FP) or Lodash (more familiar)?

2. **Mutability**: All functions should be immutable, correct?

3. **Error Handling**: Should we use Either/Result pattern consistently or throw errors?

4. **Type Safety**: How strict should TypeScript types be? Full type inference or simpler types?

5. **Bundle Size**: Should we worry about tree-shaking and keep functions small?

6. **Dependencies**: Continue with zero dependencies?

Please review and let me know which functions you'd like me to implement, in what priority order, and any specific requirements or preferences you have.