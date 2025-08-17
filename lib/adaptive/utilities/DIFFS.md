# Differences Between Original and Unsafe Implementations

This document tracks differences between the original implementations in `utilities/array`, `utilities/object`, `utilities/string` folders and their counterparts in the `unsafe/` folders.

## Object Functions

### Functions with Differences

#### `path`
- **Location**: `object/path/index.ts` vs `unsafe/object/path/index.ts`
- **Difference**: The unsafe version fixes an `any` type usage
  - Original: `(acc as any)[strKey]`
  - Unsafe: Proper type assertion using `const objAcc = acc as Record<string, Value>`
- **Semantic Change**: None - behavior is identical

#### `pick`
- **Location**: `object/pick/index.ts` vs `unsafe/object/pick/index.ts`
- **Difference**: Only import path change
- **Semantic Change**: None

### Functions that Re-export from Unsafe
These functions in the original location now re-export from the unsafe folder:
- `evolve`
- `has`
- `mapValues`
- `merge`
- `mergeDeep`
- `set`

### New Functions (Not in Original)
These exist in unsafe but have no original counterpart:
- `entries` - NEW implementation
- `fromEntries` - NEW implementation
- `keys` - NEW implementation
- `values` - NEW implementation

### Functions Without Unsafe Version
These exist in original but not in unsafe:
- `omit`
- `pathOr`

## Array Functions

### Functions Currently in unsafe/array/
- `dropWhile` - MOVED from original (original folder is now empty)
- `groupBy` - MOVED from original (original folder is now empty)
- `partition` - MOVED from original (original folder is now empty)
- `takeWhile` - MOVED from original (original folder is now empty)

### Functions Currently in safe/array/
- `dropWhile` - safe version
- `groupBy` - safe version
- `partition` - safe version
- `takeWhile` - safe version

### Original Array Functions Still in Original Location
The following functions exist in `utilities/array/` and need to be moved to `unsafe/array/`:
- `all`, `compact`, `concat`, `concatTo`, `drop`, `dropLast`
- `filter`, `find`, `findIndex`, `findLast`, `findLastIndex`
- `first`, `flatMap`, `flatten`, `head`
- `includes`, `indexOf`, `insertAt`, `isEmpty`, `join`
- `last`, `lastIndexOf`, `lastIndexOfMatch`, `map`, `move`
- `none`, `nth`, `omit`, `partition`, `reduce`
- `remove`, `removeAll`, `removeAt`, `repeat`, `repeatItem`
- `replaceAll`, `replaceAllMatches`, `replaceAt`, `replaceFirst`, `replaceFirstMatch`
- `replaceLast`, `replaceLastMatch`, `reverse`, `slice`, `sliceFrom`
- `some`, `sort`, `splitEvery`, `tail`, `take`, `takeLast`, `takeWhile`, `unique`

## String Functions

### Functions Currently in unsafe/string/
- `template` - MOVED from original (original folder is now empty)
- `toCamelImproved` - NEW implementation (no original `toCamelImproved`, but there is `camelCase`)
- `words` - MOVED from original (original folder is now empty)

### Functions Currently in safe/string/
- `template` - safe version
- `words` - safe version

### Original String Functions Needing Migration
The following functions exist in `utilities/string/` and need to be moved to `unsafe/string/`:
- `capitalize`, `camelCase`, `charAt`, `charCodeAt`, `codePointAt`
- `concat`, `contains`, `deburr`, `endsWith`, `escape`
- `escapeRegExp`, `insert`, `insertAt`, `isBlank`, `isEmpty`
- `kebabCase`, `lines`, `match`, `matchAll`, `normalize`
- `padEnd`, `padStart`, `pascalCase`, `removePrefix`, `removeSuffix`
- `repeat`, `replace`, `replaceAll`, `reverse`, `slice`
- `slugify`, `snakeCase`, `split`, `startsWith`, `test`
- `toLowerCase`, `toUpperCase`, `trim`, `trimEnd`, `trimStart`
- `truncate`, `unescape`, `words`, `wrap`

## Function Functions

### Original Function Functions
The following exist in `utilities/functions/`:
- `after`, `always`, `apply`, `applyTo`, `ascend`, `before`
- `binary`, `bind`, `call`, `comparator`, `complement`, `compose`
- `composeAsync`, `cond`, `constant`, `construct`, `constructN`
- `converge`, `curry`, `curryN`, `debounce`, `defaultTo`
- `descend`, `either`, `empty`, `F`, `flip`, `identity`
- `ifElse`, `invoker`, `juxt`, `memoize`, `memoizeWith`
- `nAry`, `negate`, `not`, `o`, `of`, `once`, `or`
- `partial`, `partialRight`, `pipe`, `pipeWith`, `T`, `tap`
- `throttle`, `thunkify`, `tryCatch`, `unapply`, `unary`
- `uncurryN`, `unless`, `until`, `useWith`, `when`

## Summary

### Current Status:
1. **Object Functions**: 
   - MOSTLY DONE: `evolve`, `has`, `mapValues`, `merge`, `mergeDeep`, `set` are moved and re-exported
   - NEW ADDITIONS: `keys`, `values`, `entries`, `fromEntries` were added
   - NEEDS FIX: `path` and `pick` are duplicated (exist in both places)
   - MISSING: `omit`, `pathOr` have no unsafe versions

2. **Array Functions**:
   - PARTIALLY DONE: Only 4 functions moved (`dropWhile`, `groupBy`, `partition`, `takeWhile`)
   - Empty folders remain in original location for moved functions
   - ~50+ functions still need to be moved

3. **String Functions**:
   - MINIMALLY DONE: Only 2 functions moved (`template`, `words`)
   - NEW ADDITION: `toCamelImproved` (doesn't match original `camelCase`)
   - Empty folders remain in original location for moved functions
   - ~40+ functions still need to be moved

### Key Issues Found:
1. **Incomplete migrations** - Most array and string functions haven't been moved
2. **Empty folders left behind** - Moved functions left empty folders in original locations
3. **Some duplications** - `path` and `pick` exist in both locations
4. **New functions added** - Some functions were created that didn't exist originally
5. **Minor type fixes** - The `path` function had an `any` type that was fixed in unsafe

### Action Items:
1. Move remaining array functions to `unsafe/array/` preserving their exact semantics
2. Move remaining string functions to `unsafe/string/` preserving their exact semantics  
3. Fix duplications - `path` and `pick` should re-export from unsafe
4. Remove empty folders from original locations
5. Create safe versions that wrap the unsafe versions with Either
6. Ensure NO semantic changes unless fixing actual bugs (like the `any` type)