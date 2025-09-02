# Function List for the toolkit library

**Testing Progress: 14.9% (130/874 functions with 100% coverage)**

**Estimated Time to Completion**: ~150 hours

- **Remaining functions**: 744 (874 total - 130 completed)
- **Average time per function**: ~12 minutes (includes writing tests, debugging, running)
- **Functions per hour**: ~5
- **Hours remaining**: ~149 hours
- **At 8 hours/day**: ~18.6 working days
- **Last updated**: 2025-09-02  
- **Session progress**: Tested intersectionWith, interleave, intersperse, join, and lastIndexOfMatch functions. All achieved 100% coverage.

## Current Functions (874 functions total)

### array/ (123 functions)

- all - Returns true if all elements satisfy the predicate ✓
- aperture - Returns a new array of consecutive n-tuples (sliding window of size n with step 1) ✓
- cartesianProduct - Returns the Cartesian product of two arrays (all possible pairs) ✓
- chunk - Splits array into chunks of specified size ✓
- closest - Finds the value closest to a target number ✓
- combinations - Generates all combinations of array elements ✓
- compact - Removes falsy values from array ✓
- concat - Concatenates arrays together ✓
- concatTo - Flipped version of concat ✓
- countBy - Counts elements of an array according to how many match each value of a key returned by the supplied function ✓
- cycle - Returns an infinite repetition of the given array (generator function) ✓
- difference - Returns elements in the first array that are not in the second array ✓
- differenceWith - Like difference but uses a comparator function to determine equality ✓
- drop - Removes n elements from the beginning of array ✓
- dropLast - Removes n elements from the end of array ✓
- dropRepeats - Returns a new array without consecutive duplicate elements ✓
- dropRepeatsWith - Like dropRepeats but uses a comparator function ✓
- dropWhile - Removes elements from beginning while predicate is true ✓
- endsWith - Checks if an array ends with the provided suffix array ✓
- filter - Filters array elements based on predicate ✓
- find - Finds first element that satisfies predicate ✓
- findDuplicates - Returns array of elements that appear more than once ✓
- findIndex - Finds index of first element that satisfies predicate ✓
- findIndices - Returns all indices of elements that satisfy the predicate ✓
- findLast - Finds last element that satisfies predicate ✓
- findLastIndex - Finds index of last element that satisfies predicate ✓
- findMostCommon - Finds the most frequently occurring element(s) ✓
- first - Returns first element of array (alias: head) ✓
- flatMap - Maps function over array and flattens result ✓
- flatten - Flattens nested arrays by one level ✓
- frequency - Count occurrences of each unique element (returns Map<T, number>) ✓
- groupBy - Groups array elements by key function result ✓
- groupWith - Takes a binary predicate and groups consecutive elements that satisfy it ✓
- head - Returns first element of array (alias: first) ✓
- includes - Checks if array contains element ✓
- indexBy - Creates an object indexing the array elements by the given key ✓
- indexOf - Returns index of first occurrence of element ✓
- init - Returns all elements except the last one ✓
- insertAt - Inserts element at specified index ✓
- intersection - Returns elements that exist in both arrays ✓
- intersectionWith - Like intersection but uses a comparator function ✓
- interleave - Alternate elements from multiple arrays ✓
- intersperse - Inserts separator between array elements ✓
- isEmpty - Checks if array is empty ✓
- join - Joins array elements into string ✓
- last - Returns last element of array ✓
- lastIndexOf - Returns index of last occurrence of element ✓
- lastIndexOfMatch - Returns index of last element matching predicate ✓
- map - Maps function over array elements ✓
- mapAccum - Combines map and reduce, returning both accumulated value and mapped array
- mapAccumRight - Like mapAccum but processes the array from right to left
- maximumBy - Finds the maximum element according to a comparator function
- minimumBy - Finds the minimum element according to a comparator function
- move - Moves element from one index to another ✓
- none - Returns true if no elements satisfy the predicate ✓
- nub - Removes duplicate elements from an array (alias: unique) ✓
- nubBy - Like nub but uses a custom equality function
- nth - Returns element at specified index ✓
- omit - Removes elements at specified indices
- pairwise - Returns an array of adjacent pairs from the input array
- partition - Splits array into two based on predicate
- partitionBy - Partition by consecutive elements satisfying predicate
- permutations - Generates all permutations of array elements
- pluck - Extracts a list of property values from an array of objects
- range - Generates an array of numbers from start to end
- rangeStep - Like range but with a custom step value
- reduce - Reduces array to single value using reducer function ✓
- reduceRight - Like reduce but processes the array from right to left
- reduceWhile - Reduce that stops when predicate returns false
- reject - The complement of filter - keeps elements that don't satisfy the predicate
- remove - Removes all occurrences of element
- removeAll - Removes all elements matching predicate
- removeAt - Removes element at specified index ✓
- repeat - Repeats array n times
- repeatItem - Creates array with element repeated n times
- replaceAll - Replaces all occurrences of element
- replaceAllMatches - Replaces all elements matching predicate
- replaceAt - Replaces element at specified index ✓
- replaceFirst - Replaces first occurrence of element
- replaceFirstMatch - Replaces first element matching predicate
- replaceLast - Replaces last occurrence of element
- replaceLastMatch - Replaces last element matching predicate
- reverse - Reverses array order ✓
- rotateLeft - Rotates array elements to the left by n positions
- rotateRight - Rotates array elements to the right by n positions
- sample - Returns a random element from the array
- sampleSize - Returns n random elements from the array
- scan - Like reduce but returns array of intermediate results
- shuffle - Returns a new array with elements randomly shuffled
- slice - Extracts section of array ✓
- sliceFrom - Slices array from index to end
- sliding - Creates sliding window over array elements
- slidingWithStep - Creates sliding window with custom step size
- some - Returns true if any element satisfies predicate ✓
- sort - Sorts array elements ✓
- sortBy - Sorts an array based on a mapping function
- sortWith - Sorts an array using multiple comparator functions
- span - Splits array at first element that doesn't satisfy predicate
- splitEvery - Splits array into chunks of specified size
- startsWith - Checks if an array starts with the provided prefix array
- subsequences - Generates all subsequences of array
- symmetricDifference - Returns elements that are in either array but not both
- symmetricDifferenceWith - Like symmetricDifference but uses a comparator function
- tail - Returns all elements except the first ✓
- take - Takes first n elements ✓
- takeLast - Takes last n elements
- takeLastWhile - Takes elements from the end while predicate is true
- takeWhile - Takes elements from beginning while predicate is true
- times - Calls a function n times and collects the results in an array
- toSet - Converts array to Set (removes duplicates)
- transpose - Transposes a matrix (2D array)
- unflatten - Reconstructs nested arrays from flattened array with depth info
- unfold - Generates array from seed value using generator function
- union - Returns the union of two arrays (all unique elements from both)
- unionWith - Like union but uses a comparator function
- unique - Removes duplicate elements from array (alias: nub) ✓
- unzip - The opposite of zip - separates an array of pairs into two arrays
- update - Returns a new array with the element at index replaced by the result of a function ✓
- xprod - Returns the Cartesian product of two arrays (alias: cartesianProduct) ✓
- zip - Combines two arrays into an array of pairs
- zipAll - Like zip but continues until the longest array is exhausted, using undefined for missing values
- zipObj - Creates an object from arrays of keys and values
- zipWith - Combines arrays using custom function

### async/ (10 functions)

- delay - Creates a Promise that resolves after specified milliseconds with an optional value
- delayReject - Creates a Promise that rejects after specified milliseconds with an optional error
- parallel - Executes async functions concurrently and collects all results in order
- parallelLimit - Executes async functions concurrently with a maximum concurrency limit
- race - Returns the result of the first async function to complete (resolve or reject)
- retry - Retries an async function on failure with configurable attempts and delays
- series - Executes async functions sequentially, collecting all results in order
- timeout - Adds a timeout to a Promise, rejecting if it doesn't resolve in time
- waterfall - Executes async functions in series, passing each result to the next function
- whilst - Repeatedly executes an async function while a condition is true

### activation/ (7 functions)

- leakyRectifiedLinearUnit - Leaky ReLU variant with small gradient for negative inputs
- rectifiedLinearUnit - ReLU activation function
- relu - Alias for rectifiedLinearUnit
- sigmoid - Logistic function (1/(1+e^-x))
- softmax - Converts vector to probability distribution
- softplus - Smooth approximation of ReLU (ln(1 + e^x))
- swish - Self-gated activation (x × sigmoid(βx))

### combinator/ (49 functions)

- apply - Calls a function with an array of arguments
- arity - Wraps a function to report a specific arity (alias: nAry)
- binary - Wraps a function to accept exactly 2 arguments
- bind - Creates a function bound to a specific context (this)
- call - Calls a function with individual arguments
- complement - Returns the logical complement of a predicate function
- compose - Right-to-left function composition (opposite of pipe)
- composeAsync - Async version of compose for Promise-returning functions
- constant - Returns a function that always returns the given value
- construct - Wraps a constructor function for use without 'new'
- constructN - Like construct but with specified arity
- converge - Applies multiple functions to the same arguments and combines results
- curry - Auto-curry a function to allow partial application
- curryN - Curry a function to exactly n arguments
- debounce - Returns a debounced version of a function that delays invoking
- flip - Flips the first two arguments of a function
- identity - Returns its argument unchanged
- juxt - Applies an array of functions to a value and returns array of results
- lift - Lifts a function to work with functors/applicatives
- liftA2 - Lifts a binary function to work with applicative functors
- liftA3 - Lifts a ternary function to work with applicative functors
- liftA4 - Lifts a quaternary function to work with applicative functors
- liftA5 - Lifts a 5-ary function to work with applicative functors
- liftBinary - Lifts a binary function to work with functors (pairwise)
- liftN - Like lift but with specified arity
- liftTernary - Lifts a ternary function to work with functors (element-wise)
- liftUnary - Lifts a unary function to work with functors
- memoize - Returns a memoized version of a function that caches results
- memoizeWith - Like memoize but uses a custom cache key generator
- nAry - Creates a function that accepts exactly n arguments (alias: arity)
- nthArg - Returns a function that returns its nth argument
- of - Wraps a value in an array (singleton)
- once - Ensures a function can only be called once
- partial - Partially applies a function with fixed arguments
- partialRight - Like partial but fixes arguments from the right
- pipe - Left-to-right function composition ✓
- pipeAsync - Async version of pipe for Promise-returning functions
- pipeWith - Like pipe but uses a custom composition function
- tap - Runs a side effect function on a value and returns the value
- throttle - Returns a throttled version that invokes at most once per wait period
- thunkify - Converts a function to a thunk (zero-argument function)
- tryCatch - Wraps a function to catch errors and call an error handler
- unary - Wraps a function to accept exactly 1 argument
- unless - Applies function when predicate is false
- until - Calls a function repeatedly until a predicate returns true
- useWith - Transforms arguments before passing to a function
- when - Conditionally applies a function based on a predicate
- wrap - Wraps a function with a wrapper function
- memoizeKey - Creates consistent cache keys for memoization

### conversion/ (16 functions)

- castValue - Dispatcher for type conversions:
  - toBoolean - Converts various values to boolean (true/false, yes/no, 1/0)
  - toFloat - Flexibly parses values as floating-point numbers (renamed from toNumber)
  - toInteger - Strictly parses values as integers (truncates decimals)
  - toPlainDate - Parses values into Temporal PlainDate objects
  - toPlainDateTime - Parses values into Temporal PlainDateTime objects
  - toPlainTime - Parses values into Temporal PlainTime objects
  - toPrecision - Converts to number with specified decimal places (rounds)
  - toString - Safely converts any value to its string representation
- fromJson - Parses JSON strings (returns null on error)
- safeParse - Safely parses a value with a parser function, returns null on failure
- safeParseFloat - Safely parses to float, returns null on failure
- safeParseInt - Safely parses to integer with optional radix, returns null on failure
- stringify - Creates deterministic string keys from objects/arrays (sorted keys)
- toJson - Converts values to JSON strings with optional formatting
- toPercent - Converts a number to a percentage string (e.g. 0.123 -> "12.30%")

### debug/ (1 function)

- withInspect - Attaches custom inspection method for better console output

### error/ (11 functions)

- createError - Creates a custom error with enhanced properties
- createNullError - Creates an error for null/undefined values
- createTypeError - Creates a type validation error
- fromException - Converts exception to enhanced error
- fromTemplate - Creates error from template string
- pipeError - Chains error transformations
- templates - Pre-defined error templates
- withCause - Adds cause to error chain
- withFailedArg - Attaches failed argument to error
- withSuggestion - Adds suggestion for fixing error
- withTypes - Adds type information to error

### either/ (18 functions)

- bimap - Maps functions over both Left and Right
- chain - Flat maps over Right value (monadic bind) ✓
- chainLeft - Flat maps over Left value
- either - Extracts value using left/right handlers
- fold - Folds Either to a single value
- getOrElse - Extracts Right value or returns default
- isLeft - Checks if Either is Left ✓
- isRight - Checks if Either is Right
- left - Creates a Left value (error case) ✓
- leftWithInspect - Creates a Left value with enhanced debugging output
- map - Maps function over Right value ✓
- mapLeft - Maps function over Left value
- orElse - Returns alternative Either if Left
- right - Creates a Right value (success case) ✓
- rightWithInspect - Creates a Right value with enhanced debugging output
- show - Converts Either to string representation
- swap - Swaps Left and Right
- tryCatch - Converts try/catch to Either

### finance/ (6 functions)

- compoundInterest - Calculate compound interest
- futureValue - FV with compound interest and periodic payments
- fv - Alias for futureValue
- netPresentValue - NPV of cash flows
- npv - Alias for netPresentValue
- presentValue - PV of future cash flows
- pv - Alias for presentValue

### geometry/ (10 functions)

- anglesBetweenVectors - Angle between n-dimensional vectors
- chebyshevDistance - L∞ distance (chessboard metric)
- crossProduct - 3D vector cross product
- dotProduct - Vector dot product
- euclideanDistance - Distance between n-dimensional points
- haversineDistance - Great-circle distance on sphere
- magnitude - Vector magnitude/length
- manhattanDistance - L1 distance (taxicab metric)
- normalize - Normalize vector to unit length
- vectorProjection - Project one vector onto another

### interpolation/ (6 functions)

- bilinearInterpolation - 2D interpolation on a rectangle
- cubicInterpolation - Cubic interpolation through four points
- inverseLinearInterpolation - Find t value from interpolated result
- lerp - Alias for linearInterpolation
- linearInterpolation - Linear interpolation between two values
- smoothstep - Smooth S-curve interpolation

### io/ (19 functions)

- ap - Applies an IO function to an IO value (Applicative)
- chain - Flat maps a function that returns an IO (Monad bind)
- chainIOEither - Flat maps a function returning IOEither
- chainIOMaybe - Flat maps a function returning IOMaybe
- fromEither - Lifts an Either&lt;E,A> into IOEither&lt;E,A>
- fromIO - Converts IO&lt;A> to IOMaybe&lt;A> or IOEither&lt;E,A>
- fromMaybe - Lifts a Maybe&lt;A> into IOMaybe&lt;A>
- io - Creates an IO from a thunk (deferred computation)
- ioEither - Creates an IOEither from a thunk returning Either
- ioMaybe - Creates an IOMaybe from a thunk returning Maybe
- ioToIOEither - Converts IO&lt;A> to IOEither&lt;E,A>
- ioToIOMaybe - Converts IO&lt;A> to IOMaybe&lt;A>
- liftEither - Lifts a function returning Either into IOEither
- liftMaybe - Lifts a function returning Maybe into IOMaybe
- map - Maps a function over the value inside an IO (Functor)
- mapIOEither - Maps a function over the Either value inside IOEither
- mapIOMaybe - Maps a function over the Maybe value inside IOMaybe
- of - Lifts a pure value into IO context
- runIO - Executes an IO computation and returns the result

### lens/ (5 functions)

- composeLens - Composes multiple lenses
- lensEq - Checks equality at lens focus
- lensGte - Checks if value at lens focus is >= another
- lensLte - Checks if value at lens focus is <= another
- lensSatisfies - Checks if value at lens focus satisfies predicate

### logic/ (13 functions)

- and - Logical AND of two values
- cond - Multi-way conditional (like switch/case)
- defaultTo - Returns default value if input is null/undefined
- ifElse - Conditional function application
- iff - Logical biconditional (if and only if)
- implies - Logical implication (if A then B)
- nand - Logical NAND
- nor - Logical NOR
- not - Logical NOT of a value
- or - Logical OR of two values
- unless - Applies function when predicate is false
- when - Applies function when predicate is true
- xor - Logical XOR of two values

### map/ (40 functions)

- clear - Creates a new empty Map
- delete - Removes a key-value pair from a Map (returns new Map)
- deleteAll - Removes multiple keys from a Map
- difference - Returns a Map with keys in first but not in second
- differenceWith - Like difference but uses custom equality for keys
- entries - Returns an array of [key, value] pairs from a Map
- filter - Filters a Map based on predicate (returns new Map)
- filterKeys - Filters a Map based on key predicate
- filterValues - Filters a Map based on value predicate
- frequency - Count occurrences of each value across all Map values
- fromArray - Creates a Map from an array of [key, value] pairs
- fromEntries - Creates a Map from entries (alias for fromArray)
- fromObject - Creates a Map from an object
- get - Gets a value from a Map by key
- getOr - Gets a value from a Map with a default fallback
- groupBy - Groups Map entries by a key function result
- has - Checks if a Map contains a key
- interleave - Alternate entries from multiple Maps
- intersection - Returns a Map with keys present in both Maps
- intersectionWith - Like intersection but uses custom equality
- isEmpty - Checks if a Map is empty
- keys - Returns an array of Map keys
- map - Maps a function over Map values (returns new Map)
- mapEntries - Maps a function over Map entries
- mapKeys - Maps a function over Map keys
- merge - Merges multiple Maps (later values override earlier)
- mergeWith - Merges Maps using a custom merge function
- partition - Splits a Map into two based on predicate
- partitionBy - Partition Map by consecutive entries satisfying predicate
- reduce - Reduces a Map to a single value
- set - Sets a key-value pair in a Map (returns new Map)
- setAll - Sets multiple key-value pairs in a Map
- size - Returns the size of a Map
- sliding - Creates array of sliding windows over Map entries
- symmetricDifference - Returns keys in either Map but not both
- toObject - Converts Map to an object
- union - Combines multiple Maps (alias for merge)
- update - Updates a value in a Map using a function
- values - Returns an array of Map values
- withDefault - Wraps a Map to provide default values for missing keys

### math/ (53 functions)

- absoluteValue - Returns absolute value ✓
- add - Adds two numbers ✓
- average - Calculates arithmetic mean of an array (alias: mean) ✓
- binomialCoefficient - Pascal's triangle values (n choose k) ✓
- ceiling - Rounds up to integer ✓
- clamp - Constrains a number between min and max ✓
- combinations - nCr combinations calculation ✓
- cubeRoot - Returns cube root ✓ ✓
- decrement - Subtracts 1 from a number ✓
- digitSum - Calculates sum of digits in a number ✓
- divide - Divides first number by second ✓
- divisors - Find all divisors of a positive integer ✓
- exponential - Calculates e raised to the power of x (e^x) ✓ ✓
- factorial - Calculates factorial ✓
- fibonacci - Returns nth Fibonacci number ✓
- floor - Rounds down to integer ✓
- gcd - Greatest common divisor ✓
- geometricMean - Calculates geometric mean (useful for growth rates) ✓
- harmonicMean - Calculates harmonic mean (useful for rates and ratios) ✓
- increment - Adds 1 to a number ✓
- inRange - Checks if number is within range ✓
- isEven - Checks if number is even ✓
- isOdd - Checks if number is odd ✓
- isPrime - Checks if number is prime ✓
- lcm - Least common multiple ✓
- logarithm - Natural log and log with arbitrary base ✓ ✓
- logarithmBase10 - Common (base 10) logarithm ✓
- max - Finds maximum of two values ✓
- maxBy - Finds maximum using a mapping function
- mean - Calculates arithmetic mean (alias: average)
- median - Finds the median value ✓
- min - Finds minimum of two values ✓
- minBy - Finds minimum using a mapping function
- mode - Finds the most frequent value(s) ✓
- modularExponentiation - Efficient (base^exp) mod modulus calculation
- modulo - Returns remainder of division (90.6% coverage)
- multiply - Multiplies two numbers ✓
- negate - Negates a number ✓
- permutations - nPr permutations calculation ✓ ✓
- power - Raises to a power ✓
- primeFactorization - Returns prime factors with multiplicities as Map ✓
- product - Multiplies all numbers in an array ✓
- quadratic - Solves quadratic equations (a)(b)(c) → Pair<x₁, x₂> using quadratic formula ✓
- random - Generates random number in range
- randomInteger - Generates random integer in range
- rms - Root mean square (alias: rootMeanSquare)
- rootMeanSquare - Calculates RMS value of an array (useful for signal processing)
- round - Rounds to nearest integer ✓
- sign - Returns sign of number (-1, 0, or 1) ✓
- squareRoot - Returns square root ✓
- subtract - Subtracts second number from first ✓
- sum - Sums an array of numbers ✓
- totient - Euler's totient function φ(n) ✓
- truncate - Removes decimal part ✓

### matrix/ (8 functions)

- determinant2x2 - 2x2 matrix determinant
- determinant3x3 - 3x3 matrix determinant
- identityMatrix - Generate identity matrix of size n
- matrixAddition - Element-wise matrix addition
- matrixMultiply - Matrix multiplication
- matrixScalarMultiply - Multiply matrix by scalar
- matrixTrace - Sum of diagonal elements
- matrixTranspose - Transpose matrix (swap rows and columns)

### maybe/ (17 functions)

- just - Creates a Just value (Some) ✓
- justWithInspect - Creates a Just value with enhanced debugging output
- nothing - Creates a Nothing value (None) ✓
- nothingWithInspect - Creates a Nothing value with enhanced debugging output
- isJust - Checks if Maybe is Just
- isNothing - Checks if Maybe is Nothing ✓
- maybe - Extracts value using nothing/just handlers
- map - Maps function over Just value ✓
- chain - Flat maps over Just value (monadic bind) ✓
- filter - Converts to Nothing if predicate fails
- getOrElse - Extracts Just value or returns default
- orElse - Returns alternative Maybe if Nothing
- fold - Folds Maybe to a single value using handlers
- fromNullable - Converts nullable value to Maybe
- toEither - Converts Maybe to Either
- toNullable - Converts Maybe to nullable value
- show - Converts Maybe to string representation

### object/ (56 functions)

- assoc - Returns a shallow clone of an object with a property set to a value
- assocPath - Sets a nested property using a path, creating missing objects
- clone - Creates a deep clone of an object, handling circular references
- dissoc - Returns a shallow clone with a property removed
- dissocPath - Removes a nested property using a path
- entries - Converts object to array of [key, value] pairs
- eqProps - Checks if two objects have equal values for a property
- evolve - Recursively evolves object by applying functions to properties
- frequency - Count occurrences of each unique value (returns Map<V, number>)
- fromEntries - Creates object from array of [key, value] pairs
- has - Checks if object has own property
- hasPath - Checks if object has property at a given path
- invert - Swaps keys and values in an object
- invertBy - Inverts object with custom grouping for duplicate values
- keys - Returns array of object's own keys
- lens - Creates a lens for functional property access and modification
- lensIndex - Creates a lens focused on an array index
- lensPath - Creates a lens focused on a nested path
- lensProp - Creates a lens focused on an object property
- mapKeys - Maps a function over the keys of an object
- mapValues - Maps a function over the values of an object
- merge - Merges objects with target properties taking precedence
- mergeDeep - Deep merges objects recursively
- modify - Modifies a property value using a function
- modifyPath - Modifies a nested property using a path
- objOf - Creates an object with a single key-value pair
- omit - Returns object without specified keys
- over - Applies a function to a value at a lens focus
- partitionBy - Partition object entries by predicate
- path - Gets value at path in object
- pathOr - Gets value at path with default fallback
- pick - Creates object with only specified keys
- pickAll - Like pick but includes missing keys as undefined
- pickBy - Picks properties that satisfy a predicate
- project - Applies pick to each object in an array
- prop - Returns the value of a property
- propEq - Checks if a property equals a value
- propOr - Returns property value or default if missing
- props - Returns array of values for specified properties
- propSatisfies - Checks if property satisfies a predicate
- reject - Returns object with properties that don't satisfy predicate
- renameKeys - Returns object with keys renamed according to mapping
- set - Sets a property value immutably
- toPairs - Converts object to array of [key, value] pairs
- toPairsIn - Like toPairs but includes inherited properties
- transform - Transforms object using transformation specification
- values - Returns array of object's own values
- view - Extracts a value using a lens
- where - Checks if object satisfies spec of predicates
- whereEq - Checks if object properties equal spec values
- without - Returns object without specified keys (alias: omit)
- xform - Transforms object structure recursively
- zipObj - Creates object from arrays of keys and values
- zipObject - Creates object from arrays of keys and values (alias: zipObj)
- accumulate - Accumulates data from multiple sources into single object
- smartMerge - Merges objects with intelligent type-aware conflict resolution

### physics/ (8 functions)

- acceleration - Calculates acceleration from force and mass (a = F/m)
- force - Calculates force using Newton's second law (F = ma)
- frequency - Calculate frequency from period (f = 1/T)
- kineticEnergy - Calculates KE = ½mv²
- momentum - Calculates p = mv
- potentialEnergy - Gravitational PE = mgh
- velocity - Calculate velocity from distance and time (v = d/t)
- wavelength - Calculate wavelength from frequency and speed (λ = v/f)

### result/ (18 functions)

- bimap - Maps functions over both Err and Ok values
- chain - Flat maps over Ok value (monadic bind)
- chainErr - Flat maps over Err value
- err - Creates an Err result (wrapper for Either's left)
- errWithInspect - Creates an Err result with enhanced debugging output
- fold - Folds Result to a single value using handlers
- getOrElse - Extracts Ok value or returns default
- isErr - Checks if Result is Err
- isOk - Checks if Result is Ok
- map - Maps function over Ok value
- mapErr - Maps function over Err value
- ok - Creates an Ok result (wrapper for Either's right)
- okWithInspect - Creates an Ok result with enhanced debugging output
- orElse - Returns alternative Result if Err
- result - Extracts value using err/ok handlers
- show - Converts Result to string representation
- swap - Swaps Ok and Err values
- tryCatch - Converts try/catch to Result

### set/ (26 functions)

- add - Adds an element to a Set (returns new Set for immutability)
- clear - Creates an empty Set
- delete - Removes an element from a Set (returns new Set)
- difference - Returns elements in first Set but not in second
- differenceWith - Like difference but uses custom equality function
- filter - Filters a Set based on predicate
- frequency - Returns Map with element frequencies (always 1 for sets)
- fromArray - Creates a Set from an array
- has - Checks if Set contains an element
- interleave - Alternate elements from multiple sets
- intersection - Returns elements present in both Sets
- intersectionWith - Like intersection but uses custom equality function
- isDisjointFrom - Checks if Sets have no elements in common
- isEmpty - Checks if Set is empty
- isSubsetOf - Checks if first Set is subset of second
- isSupersetOf - Checks if first Set is superset of second
- map - Maps a function over Set elements (returns new Set)
- partitionBy - Partition set by predicate into multiple sets
- reduce - Reduces a Set to a single value
- sliding - Creates array of sliding windows over set elements
- size - Returns the size of a Set
- symmetricDifference - Returns elements in either Set but not both
- symmetricDifferenceWith - Like symmetricDifference but uses custom equality
- toArray - Converts a Set to an array
- union - Returns all unique elements from both Sets
- unionWith - Like union but uses custom equality function

### special/ (7 functions)

- betaFunction - Beta function B(x,y)
- complementaryErrorFunction - Complementary error function erfc(x)
- erf - Alias for errorFunction
- erfc - Alias for complementaryErrorFunction
- errorFunction - Error function for statistics
- gammaFunction - Gamma function Γ(x)
- stirlingApproximation - Stirling's approximation for factorials

### statistics/ (12 functions)

- corr - Alias for correlation
- correlation - Pearson correlation coefficient
- covariance - Measure of joint variability
- cov - Alias for covariance
- interquartileRange - IQR (Q3 - Q1) for robust spread measurement
- iqr - Alias for interquartileRange
- kurtosis - Excess kurtosis measuring tail weight
- percentile - Nth percentile of dataset
- skewness - Measure of distribution asymmetry
- standardDeviation - Calculates population or sample standard deviation ✓
- std - Alias for standardDeviation
- variance - Calculates statistical variance ✓
- zScore - Standard score (z-score)

### string/ (77 functions)

- changeExtension - Changes the file extension of a filename
- chars - Splits string into array of characters
- chomp - Removes trailing newline characters
- cleanFilename - Removes invalid characters from filenames (filesystem-safe)
- concat - Concatenates a string to the end of another string
- concatTo - Concatenates a string to the beginning of another string (flipped concat)
- contains - Checks if string contains a substring
- countMatches - Counts occurrences of a pattern in a string
- deburr - Removes diacritical marks from characters
- endsWith - Checks if a string ends with a specified suffix
- escape - Escapes special HTML characters
- escapeRegExp - Escapes special regex characters
- extractAfter - Extracts substring after a specified marker
- findExtension - Extracts file extension from a filename
- hashCode - Generates consistent hash code for string
- indent - Adds indentation to each line
- indexOf - Returns index of first occurrence of substring
- lastIndexOf - Returns index of last occurrence of substring
- levenshtein - Calculates edit distance between two strings
- lines - Splits string into array of lines
- match - Matches a regular expression against a string
- normalize - Normalizes Unicode characters
- normalizeForComparison - Normalizes string for comparison (lowercase, remove special chars)
- padBoth - Pads both sides of a string to reach a target length
- padBothTo - Curried version of padBoth with fill string first
- padBothToFromEnd - Pads both sides starting from the end
- padBothToFromStart - Pads both sides starting from the beginning
- padEnd - Pads the end of a string to reach a target length
- padEndTo - Curried version of padEnd with fill string first
- padStart - Pads the start of a string to reach a target length
- padStartTo - Curried version of padStart with fill string first
- quote - Wraps string in quotes
- remove - Removes all occurrences of a substring
- removePrefix - Removes a prefix if present
- removeSuffix - Removes a suffix if present
- repeat - Repeats a string n times
- replace - Replaces first occurrence of a pattern in a string
- replaceAll - Replaces all occurrences of a pattern in a string
- reverse - Reverses the string
- sanitize - Sanitizes strings for safe use in HTML/URLs
- similarity - Calculates similarity percentage between strings (0-100)
- slice - Extracts a section of the string
- slugify - Converts string to URL-safe slug
- splice - Changes string by removing/replacing characters
- split - Splits a string by a separator
- splitAt - Splits a string at a specific index
- splitEvery - Splits a string into chunks of specified length
- startsWith - Checks if a string starts with a specified prefix
- stripIndent - Removes common leading whitespace from lines
- substr - Extracts substring (starting at position for length)
- substring - Extracts substring between two indices
- swapCase - Swaps case of all characters
- template - Processes template strings with variable substitution
- test - Tests if a string matches a regular expression
- toCase - Converts string to specified case (contains nested case converters):
  - toCamel - Converts string to camelCase
  - toKebab - Converts string to kebab-case
  - toLower - Converts string to lowercase
  - toLowerFirst - Lowercases only the first character
  - toPascal - Converts string to PascalCase
  - toScreamingSnake - Converts string to SCREAMING_SNAKE_CASE
  - toSentence - Capitalizes only the first character
  - toSnake - Converts string to snake_case
  - toTitle - Converts string to Title Case
  - toTrain - Converts string to Train-Case
  - toUpper - Converts string to uppercase
  - toUpperFirst - Uppercases only the first character
- trim - Removes whitespace from both ends of a string
- trimEnd - Removes whitespace from the end of a string
- trimStart - Removes whitespace from the start of a string
- truncate - Truncates string to specified length with ellipsis
- truncateMiddle - Truncates string from middle with ellipsis
- unescape - Unescapes HTML entities
- unquote - Removes surrounding quotes if present
- words - Splits a string into an array of words
- wrap - Wraps string at specified width
- wrapWith - Wraps string with prefix and suffix

### temporal/ (79 functions — Temporal API based)

- addDays - Adds days to a Temporal date/datetime
- addDuration - Adds a Temporal.Duration to a date/time
- addHours - Adds hours to a Temporal time/datetime
- addMinutes - Adds minutes to a Temporal time/datetime
- addMonths - Adds months to a Temporal date/datetime
- addSeconds - Adds seconds to a Temporal time/datetime
- addYears - Adds years to a Temporal date/datetime
- adjustTime - Adjusts time components while preserving date
- clampDate - Constrains date between min and max bounds
- compare - Compares two Temporal objects (-1, 0, 1)
- dateRange - Generates array of dates between start and end
- diffDays - Calculates difference in days between dates
- diffHours - Calculates difference in hours between times
- diffMinutes - Calculates difference in minutes between times
- diffMonths - Calculates difference in months between dates
- diffSeconds - Calculates difference in seconds between times
- diffYears - Calculates difference in years between dates
- duration - Creates a Temporal.Duration from units
- endOfDay - Returns end of day for a date (23:59:59.999)
- endOfMonth - Returns last day of month for a date
- endOfWeek - Returns end of week for a date (configurable week start)
- endOfYear - Returns last day of year for a date
- equals - Checks if two Temporal objects are equal
- format - Formats Temporal object according to pattern
- fromISO - Parses ISO string to appropriate Temporal object
- getCalendar - Gets calendar from Temporal date
- getDay - Gets day of month from date
- getDayOfWeek - Gets day of week (1-7, Monday-Sunday)
- getDayOfYear - Gets day of year (1-366)
- getDaysInMonth - Gets number of days in a specific month
- getDaysInYear - Gets number of days in a specific year (365/366)
- getHour - Gets hour from time/datetime
- getMillisecond - Gets millisecond from time/datetime
- getMinute - Gets minute from time/datetime
- getMonth - Gets month from date
- getNanosecond - Gets nanosecond from time/datetime
- getQuarter - Gets quarter (1-4) from date
- getSecond - Gets second from time/datetime
- getTimeZone - Gets timezone from ZonedDateTime
- getWeekday - Alias for getDayOfWeek with clearer name
- getWeekOfYear - Gets ISO week number
- getYear - Gets year from date
- isLeapYear - Checks if a year is a leap year
- isWeekday - Checks if date falls on weekday (Mon-Fri)
- isWeekend - Checks if date falls on weekend (Sat-Sun)
- now - Gets current Temporal.Instant
- parse - Parses date/time from string with format
- round - Rounds datetime to nearest unit (hour, minute, etc.)
- setDay - Returns new date with day set to value
- setHour - Returns new time/datetime with hour set
- setMinute - Returns new time/datetime with minute set
- setMonth - Returns new date with month set to value
- setSecond - Returns new time/datetime with second set
- setYear - Returns new date with year set to value
- since - Calculates duration since a reference date/time
- startOfDay - Returns start of day for a date (00:00:00)
- startOfMonth - Returns first day of month for a date
- startOfWeek - Returns start of week for a date (configurable week start)
- startOfYear - Returns first day of year for a date
- subtractDuration - Subtracts a Temporal.Duration from date/time
- today - Gets current PlainDate
- toISO - Converts Temporal object to ISO string
- toPlainDate - Converts to Temporal.PlainDate
- toPlainDateTime - Converts ZonedDateTime to PlainDateTime
- toPlainTime - Converts to Temporal.PlainTime
- toZonedDateTime - Converts PlainDateTime to ZonedDateTime
- totalDuration - Gets total duration in specific unit
- until - Calculates duration until a target date/time
- withCalendar - Changes calendar system of date
- withTime - Combines PlainDate with PlainTime to create PlainDateTime
- withTimeZone - Converts datetime to specific timezone
- durationToMinutes - Converts a Temporal.Duration to total minutes
- durationToSeconds - Converts a Temporal.Duration to total seconds
- formatDuration - Formats duration in human-readable format (e.g., "2h 30m")
- getNextOccurrence - Finds next occurrence of a recurring event
- getOffsetTransitions - Gets timezone offset transition points
- parseTime - Parses time strings into Temporal.PlainTime objects
- serializeZonedDateTime - Serializes ZonedDateTime for storage/transmission
- sortByAbsoluteTime - Comparator for sorting by absolute time

### trigonometry/ (19 functions)

- arcCosine - Inverse cosine function
- arcSine - Inverse sine function
- arcTangent - Inverse tangent function
- arcTangent2 - Two-argument arctangent (atan2)
- atan2 - Alias for arcTangent2
- cartesianToPolar - Convert Cartesian (x,y) to polar (r,θ) coordinates
- cosh - Alias for hyperbolicCosine
- cosine - Basic cosine function ✓
- degreesToRadians - Converts degrees to radians ✓
- hyperbolicCosine - Hyperbolic cosine function
- hyperbolicSine - Hyperbolic sine function
- hyperbolicTangent - Hyperbolic tangent function
- hypotenuse - Multi-dimensional Pythagorean theorem ✓
- polarToCartesian - Convert polar (r,θ) to Cartesian (x,y) coordinates
- radiansToDegrees - Converts radians to degrees ✓
- sine - Basic sine function ✓
- sinh - Alias for hyperbolicSine
- tangent - Basic tangent function ✓
- tanh - Alias for hyperbolicTangent

### tuple/ (13 functions)

- bimap - Maps two different functions over the elements of a pair
- curry - Converts a function that takes a tuple into a curried function
- first - Extracts the first element from a tuple or array
- fromArray - Converts an array to a tuple with runtime validation
- mapTuple - Maps a function over all elements of a tuple, preserving its structure
- pair - Creates a two-element tuple (Pair) from two values
- second - Extracts the second element from a tuple or array
- singleton - Creates a one-element tuple (Singleton) from a value
- swap - Swaps the elements of a pair
- third - Extracts the third element from a tuple or array
- toArray - Converts a tuple to a regular array
- triple - Creates a three-element tuple (Triple) from three values
- uncurry - Converts a curried function into a function that takes a tuple

### validation/ (106 functions)

- allPass - Returns true if all predicates return true for the input
- anyPass - Returns true if any predicate returns true for the input
- both - Returns true if both predicates return true
- either - Returns true if either predicate returns true
- equals - Deep equality comparison
- gt - Greater than comparison
- gte - Greater than or equal comparison
- identical - Strict equality comparison (===)
- is - Checks if value is an instance of a constructor
- isAfterDate - Checks if PlainDate is after another
- isAfterDateTime - Checks if PlainDateTime is after another
- isAfterInstant - Checks if Instant is after another
- isAfterTime - Checks if PlainTime is after another
- isAlpha - Validates alphabetic characters only
- isAlphanumeric - Validates alphanumeric characters
- isArray - Checks if value is an array
- isArrayLike - Checks if value has a length property and is indexable
- isBase64 - Validates base64 encoding
- isBeforeDate - Checks if PlainDate is before another
- isBeforeDateTime - Checks if PlainDateTime is before another
- isBeforeInstant - Checks if Instant is before another
- isBeforeTime - Checks if PlainTime is before another
- isBetweenDateTimes - Checks if PlainDateTime is between two datetimes
- isBetweenDates - Checks if PlainDate is between two dates
- isBetweenTimes - Checks if PlainTime is between two times
- isBlank - Checks if string is empty or only whitespace (moved from string/)
- isBoolean - Checks if value is a boolean
- isCreditCard - Validates credit card number (Luhn)
- isDate - Checks if value is a Date object
- isDefined - Checks if value is neither null nor undefined
- isEmail - Validates email format
- isEmpty - Checks if value is empty (unified - works for strings, arrays, objects, Maps, Sets)
- isError - Checks if value is an Error object
- isEven - Checks if number is even ✓
- isFalsy - Checks if value is falsy
- isFinite - Checks if value is a finite number
- isFunction - Checks if value is a function
- isFutureDate - Checks if PlainDate is in the future
- isFutureDateTime - Checks if PlainDateTime is in the future
- isFutureInstant - Checks if Instant is in the future
- isHexColor - Validates hex color format
- isIban - Validates IBAN format
- isInteger - Checks if value is an integer
- isIpv4 - Validates IPv4 address
- isIpv6 - Validates IPv6 address
- isIsbn - Validates ISBN format
- isJSON - Validates JSON string
- isMap - Checks if value is a Map
- isNaN - Checks if value is NaN
- isNegative - Checks if number is negative
- isNil - Checks if value is null or undefined
- isNotNullish - Checks if value is not nullish using strict equality
- isNullish - Checks if value is null or undefined using == null
- isNumber - Validates if a string representation is a parseable number
- isNumeric - Validates numeric characters only
- isObject - Checks if value is an object
- isOdd - Checks if number is odd ✓
- isPastDate - Checks if PlainDate is in the past
- isPastDateTime - Checks if PlainDateTime is in the past
- isPastInstant - Checks if Instant is in the past
- isPhone - Validates phone number format
- isPlainObject - Checks if value is a plain object (not class instance)
- isPositive - Checks if number is positive
- isPostalCode - Validates postal code for country
- isPrimitive - Checks if value is a primitive type
- isPromise - Checks if value is a Promise
- isRegExp - Checks if value is a RegExp
- isRequired - Validates non-empty value
- isSameOrAfterDate - Checks if PlainDate is same or after another
- isSameOrAfterDateTime - Checks if PlainDateTime is same or after another
- isSameOrAfterTime - Checks if PlainTime is same or after another
- isSameOrBeforeDate - Checks if PlainDate is same or before another
- isSameOrBeforeDateTime - Checks if PlainDateTime is same or before another
- isSameOrBeforeTime - Checks if PlainTime is same or before another
- isSet - Checks if value is a Set
- isString - Checks if value is a string
- isSymbol - Checks if value is a Symbol
- isTemporalDate - Checks if value is a Temporal.PlainDate
- isTemporalDateTime - Checks if value is a Temporal.PlainDateTime
- isTemporalDuration - Checks if value is a Temporal.Duration
- isTemporalInstant - Checks if value is a Temporal.Instant
- isTemporalTime - Checks if value is a Temporal.PlainTime
- isTemporalZonedDateTime - Checks if value is a Temporal.ZonedDateTime
- isToday - Checks if PlainDate is today
- isTomorrow - Checks if PlainDate is tomorrow
- isTruthy - Checks if value is truthy
- isUndefined - Checks if value is strictly undefined (not null)
- isUrl - Validates URL format
- isUuid - Validates UUID format
- isValidDate - Validates if a date/time is valid (not just type check)
- isWeakMap - Checks if value is a WeakMap
- isWeakSet - Checks if value is a WeakSet
- isYesterday - Checks if PlainDate is yesterday
- isZero - Checks if number equals zero
- lt - Less than comparison
- lte - Less than or equal comparison
- matches - Validates against regex pattern
- maxLength - Validates maximum length
- minLength - Validates minimum length
- neither - Returns true if neither predicate returns true
- nonePass - Returns true if no predicates return true
- not - Returns logical negation of any value's truthiness
- validateConfig - Validates configuration objects against schema
- validateField - Validates a single form field with rules
- validateForm - Validates entire form data, returns array of errors
- validateRange - Checks if value is within specified range

### random/ (8 functions)

- generateShortId - Generates HTML-safe unique ID with underscore prefix
- randomBoolean - Random boolean with optional probability bias ✓
- randomChoice - Select random element from Array or Set
- randomFloat - Random float in range [min, max)
- randomInt - Alias for randomInteger
- randomInteger - Random integer in range [min, max]
- randomString - Random string with custom character set
- randomSubset - Random subset from Array or Set

### constants/ (functions to be documented)

Functions for shared constants and configuration values.

### debug/ (functions to be documented)

Debugging and development utilities.

### events/ (functions to be documented)

Event handling and messaging utilities.

### state/ (functions to be documented)

State management utilities.

## Notes

**Alias notes (complete list of all aliases in the library):**

_Array aliases:_

- `first` → `head` (returns first element)
- `unique` → `nub` (removes duplicates)
- `xprod` → `cartesianProduct` (Cartesian product)

_Math/Statistics aliases:_

- `mean` → `average` (arithmetic mean)
- `std` → `standardDeviation` (standard deviation)
- `corr` → `correlation` (Pearson correlation)
- `cov` → `covariance` (statistical covariance)
- `iqr` → `interquartileRange` (IQR)
- `rms` → `rootMeanSquare` (RMS)

_Trigonometry aliases:_

- `atan2` → `arcTangent2` (two-argument arctangent)
- `cosh` → `hyperbolicCosine` (hyperbolic cosine)
- `sinh` → `hyperbolicSine` (hyperbolic sine)
- `tanh` → `hyperbolicTangent` (hyperbolic tangent)

_Finance aliases:_

- `irr` → `internalRateOfReturn` (IRR)
- `npv` → `netPresentValue` (NPV)
- `pv` → `presentValue` (present value)
- `fv` → `futureValue` (future value)

_Activation function aliases:_

- `relu` → `rectifiedLinearUnit` (ReLU)
- `gelu` → `gaussianErrorLinearUnit` (GELU)

_Special function aliases:_

- `erf` → `errorFunction` (error function)
- `erfc` → `complementaryErrorFunction` (complementary error function)

_Interpolation aliases:_

- `lerp` → `linearInterpolation` (linear interpolation)

_Object aliases:_

- `without` → `omit` (removes specified keys)
- `zipObject` → `zipObj` (creates object from key/value arrays)

_Combinator aliases:_

- `nAry` → `arity` (limits function arity)

_Random function aliases:_

- `randomInt` → `randomInteger` (random integer generation)

**Implementation notes:**

- Date functions use Temporal API with strict validation (`overflow: 'reject'`)
- All functions return null/NaN for invalid inputs (safe for monadic wrapping)
- Random functions in `random/` folder are explicitly impure/non-deterministic
- Lens functions moved to `simple/lens/` for consistency
