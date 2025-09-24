# Non-Curried Functions in Toolsmith

## Summary

Out of 803 functions in the toolsmith, 93 are not curried:
- **3 functions** with zero parameters
- **12 functions** with multiple parameters  
- **78 functions** with failed signature extraction

## Zero Parameter Functions (3)

These functions take no parameters, so they cannot be curried by definition.

### validation
- `ibanLengths`
- `nowIsoLocal`
- `todayIsoLocal`

## Multiple Parameter Functions (12)

These functions take 2 or more parameters, making them non-curried by the mathematical definition.

### combinator
- `curryN` (2 params)

### conversion
- `sortByKey` (5 params)

### math
- `multiplyFactors` (2 params)
- `sumAddends` (2 params)

### string
- `template` (3 params)

### temporal
- `toZonedDateTime` (3 params)

### validation
- `_deepEquals` (5 params)
- `isBase64` (3 params)
- `isBetweenDates` (3 params)
- `isBetweenDateTimes` (3 params)
- `isBetweenTimes` (3 params)
- `matchesCardType` (3 params)

## Failed Signature Extraction (78)

These functions have signatures that couldn't be extracted properly, showing as `function name(...)`. Most are likely single-parameter functions that should be curried, but use patterns not recognized by the extraction logic.

### activation
- `gelu`

### array
- `cycle`
- `first`
- `slidingWithStep`
- `unique`
- `xprod`

### async
- `series`

### combinator
- `apply`
- `arity`
- `bind`
- `call`
- `complement`
- `construct`
- `constructN`
- `converge`
- `debounce`
- `flip`
- `juxt`
- `liftN`
- `memoize`
- `memoizeWith`
- `nAry`
- `once`
- `partial`
- `partialRight`
- `throttle`
- `thunkify`
- `tryCatch`
- `wrap`

### finance
- `irr`

### hash
- `bytesToHex`
- `hashHex`
- `sha256`
- `toUint8Array`

### lens
- `composeLens`

### map
- `clear`
- `fromEntries`
- `union`

### math
- `increment`
- `mean`

### object
- `accumulate`
- `entries`
- `evolve`
- `invert`
- `lensProp`
- `mapKeys`
- `merge`
- `mergeDeep`
- `omit`
- `pick`
- `pickBy`
- `project`
- `prop`
- `props`
- `reject`
- `renameKeys`
- `toMap`
- `toPairs`
- `toPairsIn`
- `transform`
- `values`
- `where`
- `whereEq`
- `without`
- `xform`

### string
- `includes`
- `padBothToFromEnd`

### temporal
- `getWeekday`
- `now`
- `today`

### tuple
- `curry`
- `fromArray`
- `mapTuple`
- `uncurry`

### validation
- `equals`
- `isNil`
- `isNotNil`
- `validateConfig`

## Notes

The functions with failed signature extraction are likely using:
- Named function declarations without `export default function` prefix
- Complex generic type parameters
- Different export patterns
- Functions defined with `function` keyword but exported separately

These would need investigation to improve the signature extraction logic.
