# Operator Substitutions

## Instead of * Operator for Math, Use Multiply Function from Toolsmith

- **Description**: Instead of * operator for math, use multiply function from Toolsmith (path depends on data type: integer/bigint/float/precision)
- **Rule ID**: SUBSTITUTE_MULTIPLY_001
- **Category**: operator_substitution
- **Priority**: 9
- **Replaces**: *
- **Substitute**: multiply
- **Data Type**: varies
- **Reason**: multiply function is semantic, composable, and type-specific
- **Import Paths**:
  - Integer: @sitebender/toolsmith/vanilla/math/integer/multiply/index.ts
  - Bigint: @sitebender/toolsmith/vanilla/math/bigint/multiply/index.ts
  - Float: @sitebender/toolsmith/vanilla/math/float/multiply/index.ts
  - Precision: @sitebender/toolsmith/vanilla/math/precision/multiply/index.ts
- **Examples**:
  - Wrong: const product = a * b
  - Right: const product = multiply(a)(b)
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Instead of <= Operator, Use Lte Function from Toolsmith

- **Description**: Instead of <= operator, use lte (lessThanOrEqual) function from Toolsmith
- **Rule ID**: SUBSTITUTE_LTE_001
- **Category**: operator_substitution
- **Priority**: 9
- **Replaces**: <=
- **Substitute**: lte
- **Alias**: lessThanOrEqual
- **Reason**: lte reads like English and is null-safe
- **Import**: @sitebender/toolsmith/vanilla/validation/lte/index.ts
- **Examples**:
  - Wrong: if (age <= 65)
  - Right: if (lte(65)(age))
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Instead of + Operator for Bigints, Use Add Function

- **Description**: Instead of + operator for bigints, use add function from @sitebender/toolsmith/vanilla/math/bigint/add/index.ts
- **Rule ID**: SUBSTITUTE_ADD_BIGINT_001
- **Category**: operator_substitution
- **Priority**: 9
- **Replaces**: +
- **Substitute**: add
- **Data Type**: bigint
- **Reason**: add function provides consistent interface for bigint math operations
- **Import**: @sitebender/toolsmith/vanilla/math/bigint/add/index.ts
- **Examples**:
  - Wrong: const result = a + b
  - Right: import add from '@sitebender/toolsmith/vanilla/math/bigint/add/index.ts'; const result = add(a)(b)
- **Context**: Use for large integer operations that exceed Number.MAX_SAFE_INTEGER
- **Note**: Same function name 'add' - path determines bigint type
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Instead of .length Property, Use Length Function from Toolsmith

- **Description**: Instead of .length property, use length function from Toolsmith
- **Rule ID**: SUBSTITUTE_LENGTH_001
- **Category**: operator_substitution
- **Priority**: 10
- **Replaces**: .length
- **Substitute**: length
- **Reason**: length(arr) is functional and null-safe, avoiding property access
- **Import**: @sitebender/toolsmith/vanilla/validation/length/index.ts
- **Examples**:
  - Wrong: if (arr.length > 0)
  - Right: if (isNotEmpty(arr))
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Instead of array.reduce() Method, Use Reduce Function from Toolsmith

- **Description**: Instead of array.reduce() method, use reduce function from Toolsmith
- **Rule ID**: SUBSTITUTE_REDUCE_001
- **Category**: operator_substitution
- **Priority**: 10
- **Replaces**: .reduce()
- **Substitute**: reduce
- **Reason**: reduce function is curried, composable, and follows functional programming principles
- **Import**: @sitebender/toolsmith/vanilla/array/reduce/index.ts
- **Examples**:
  - Wrong: const sum = numbers.reduce((acc, n) => acc + n, 0)
  - Right: import reduce from '@sitebender/toolsmith/vanilla/array/reduce/index.ts'; const sum = reduce(add)(0)(numbers)
- **Note**: Wraps native .reduce() for performance but provides functional interface
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Instead of || Operator, Use Or Function from Toolsmith

- **Description**: Instead of || operator, use or function from Toolsmith
- **Rule ID**: SUBSTITUTE_OR_001
- **Category**: operator_substitution
- **Priority**: 9
- **Replaces**: ||
- **Substitute**: or
- **Reason**: or reads like English and handles null/undefined safely
- **Import**: @sitebender/toolsmith/vanilla/validation/or/index.ts
- **Examples**:
  - Wrong: const value = input || defaultValue
  - Right: const value = or(input)(defaultValue)
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Instead of >= Operator, Use Gte Function from Toolsmith

- **Description**: Instead of >= operator, use gte (greaterThanOrEqual) function from Toolsmith
- **Rule ID**: SUBSTITUTE_GTE_001
- **Category**: operator_substitution
- **Priority**: 9
- **Replaces**: >=
- **Substitute**: gte
- **Alias**: greaterThanOrEqual
- **Reason**: gte reads like English and is null-safe
- **Import**: @sitebender/toolsmith/vanilla/validation/gte/index.ts
- **Examples**:
  - Wrong: if (age >= 18)
  - Right: if (gte(18)(age))
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Instead of array.includes() Method, Use Includes Function from Toolsmith

- **Description**: Instead of array.includes() method, use includes (or contains alias) function from Toolsmith
- **Rule ID**: SUBSTITUTE_INCLUDES_001
- **Category**: operator_substitution
- **Priority**: 9
- **Replaces**: .includes()
- **Substitute**: includes
- **Alias**: contains
- **Reason**: includes is curried, composable, and null-safe
- **Import**: @sitebender/toolsmith/vanilla/array/includes/index.ts
- **Examples**:
  - Wrong: if (numbers.includes(5))
  - Right: if (includes(5)(numbers))
- **Note**: Can be aliased as 'contains' for better readability
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Instead of + Operator for Money/Precision, Use Add Function

- **Description**: Instead of + operator for money/precision, use add function from @sitebender/toolsmith/vanilla/math/precision/add/index.ts
- **Rule ID**: SUBSTITUTE_ADD_PRECISION_001
- **Category**: operator_substitution
- **Priority**: 9
- **Replaces**: +
- **Substitute**: add
- **Data Type**: precision
- **Reason**: add function handles decimal precision correctly for financial calculations
- **Import**: @sitebender/toolsmith/vanilla/math/precision/add/index.ts
- **Examples**:
  - Wrong: const total = price + tax // loses precision
  - Right: import add from '@sitebender/toolsmith/vanilla/math/precision/add/index.ts'; const total = add(price)(tax)
- **Context**: Use for money, financial calculations, or precision-sensitive math
- **Note**: Same function name 'add' - path determines precision type
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Instead of + Operator for Integers, Use Add Function (Corrected)

- **Description**: Instead of + operator for integers, use add function from @sitebender/toolsmith/vanilla/math/integer/add/index.ts
- **Rule ID**: SUBSTITUTE_ADD_INTEGER_CORRECTED_001
- **Category**: operator_substitution
- **Priority**: 9
- **Replaces**: +
- **Substitute**: add
- **Data Type**: integer
- **Reason**: add function handles integer math correctly and is composable
- **Import**: @sitebender/toolsmith/vanilla/math/integer/add/index.ts
- **Examples**:
  - Wrong: const result = a + b
  - Right: import add from '@sitebender/toolsmith/vanilla/math/integer/add/index.ts'; const result = add(a)(b)
- **Context**: Use for integer math operations
- **Note**: All math functions named 'add' - path determines type
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Instead of array.filter() Method, Use Filter Function from Toolsmith

- **Description**: Instead of array.filter() method, use filter function from Toolsmith
- **Rule ID**: SUBSTITUTE_FILTER_001
- **Category**: operator_substitution
- **Priority**: 10
- **Replaces**: .filter()
- **Substitute**: filter
- **Reason**: filter function is curried, composable, and follows functional programming principles
- **Import**: @sitebender/toolsmith/vanilla/array/filter/index.ts
- **Examples**:
  - Wrong: const evens = numbers.filter(x => x % 2 === 0)
  - Right: import filter from '@sitebender/toolsmith/vanilla/array/filter/index.ts'; const evens = filter(isEven)(numbers)
- **Note**: Wraps native .filter() for performance but provides functional interface
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Instead of - Operator for Math, Use Subtract Function from Toolsmith

- **Description**: Instead of - operator for math, use subtract function from Toolsmith (path depends on data type: integer/bigint/float/precision)
- **Rule ID**: SUBSTITUTE_SUBTRACT_001
- **Category**: operator_substitution
- **Priority**: 9
- **Replaces**: -
- **Substitute**: subtract
- **Data Type**: varies
- **Reason**: subtract function is semantic, composable, and type-specific
- **Import Paths**:
  - Integer: @sitebender/toolsmith/vanilla/math/integer/subtract/index.ts
  - Bigint: @sitebender/toolsmith/vanilla/math/bigint/subtract/index.ts
  - Float: @sitebender/toolsmith/vanilla/math/float/subtract/index.ts
  - Precision: @sitebender/toolsmith/vanilla/math/precision/subtract/index.ts
- **Examples**:
  - Wrong: const difference = a - b
  - Right: const difference = subtract(b)(a)
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Instead of && Operator, Use And Function from Toolsmith

- **Description**: Instead of && operator, use and function from Toolsmith
- **Rule ID**: SUBSTITUTE_AND_001
- **Category**: operator_substitution
- **Priority**: 9
- **Replaces**: &&
- **Substitute**: and
- **Reason**: and reads like English and handles null/undefined safely
- **Import**: @sitebender/toolsmith/vanilla/validation/and/index.ts
- **Examples**:
  - Wrong: if (isValid && isComplete)
  - Right: if (and(isValid)(isComplete))
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Instead of ! Operator, Use Not Function from Toolsmith

- **Description**: Instead of ! operator, use not function from Toolsmith
- **Rule ID**: SUBSTITUTE_NOT_001
- **Category**: operator_substitution
- **Priority**: 10
- **Replaces**: !
- **Substitute**: not
- **Reason**: ! is easy to miss visually. not() is explicit and reads like English
- **Import**: @sitebender/toolsmith/vanilla/validation/not/index.ts
- **Examples**:
  - Wrong: if (!isValid)
  - Right: if (not(isValid))
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Instead of < Operator, Use Lt Function from Toolsmith

- **Description**: Instead of < operator, use lt (lessThan) function from Toolsmith
- **Rule ID**: SUBSTITUTE_LT_001
- **Category**: operator_substitution
- **Priority**: 9
- **Replaces**: <
- **Substitute**: lt
- **Alias**: lessThan
- **Reason**: lt reads like English and is null-safe
- **Import**: @sitebender/toolsmith/vanilla/validation/lt/index.ts
- **Examples**:
  - Wrong: if (age < 18)
  - Right: if (lt(18)(age))
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Instead of > Operator, Use Gt Function from Toolsmith

- **Description**: Instead of > operator, use gt (greaterThan) function from Toolsmith
- **Rule ID**: SUBSTITUTE_GT_001
- **Category**: operator_substitution
- **Priority**: 9
- **Replaces**: >
- **Substitute**: gt
- **Alias**: greaterThan
- **Reason**: gt reads like English and is null-safe
- **Import**: @sitebender/toolsmith/vanilla/validation/gt/index.ts
- **Examples**:
  - Wrong: if (score > 100)
  - Right: if (gt(100)(score))
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Instead of !== Operator, Use IsUnequal Function from Toolsmith

- **Description**: Instead of !== operator, use isUnequal function from Toolsmith
- **Rule ID**: SUBSTITUTE_NOT_STRICT_EQUAL_001
- **Category**: operator_substitution
- **Priority**: 10
- **Replaces**: !==
- **Substitute**: isUnequal
- **Reason**: isUnequal is semantic, null-safe, and reads like English
- **Import**: @sitebender/toolsmith/vanilla/validation/isUnequal/index.ts
- **Examples**:
  - Wrong: if (a !== b)
  - Right: if (isUnequal(a)(b))
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Instead of + Operator for Integers, Use AddInteger Function from Toolsmith

- **Description**: Instead of + operator for integers, use addInteger function from Toolsmith
- **Rule ID**: SUBSTITUTE_ADD_INTEGER_001
- **Category**: operator_substitution
- **Priority**: 9
- **Replaces**: +
- **Substitute**: addInteger
- **Data Type**: integer
- **Reason**: addInteger is semantic, handles integer-specific logic, and is composable
- **Import**: @sitebender/toolsmith/vanilla/math/addInteger/index.ts
- **Examples**:
  - Wrong: const result = a + b
  - Right: const result = addInteger(a)(b)
- **Context**: Use for integer math operations
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Instead of array.map() Method, Use Map Function from Toolsmith

- **Description**: Instead of array.map() method, use map function from Toolsmith
- **Rule ID**: SUBSTITUTE_MAP_001
- **Category**: operator_substitution
- **Priority**: 10
- **Replaces**: .map()
- **Substitute**: map
- **Reason**: map function is curried, composable, and follows functional programming principles
- **Import**: @sitebender/toolsmith/vanilla/array/map/index.ts
- **Examples**:
  - Wrong: const doubled = numbers.map(x => x * 2)
  - Right: import map from '@sitebender/toolsmith/vanilla/array/map/index.ts'; const doubled = map(double)(numbers)
- **Note**: Wraps native .map() for performance but provides functional interface
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Instead of === Operator, Use IsEqual Function from Toolsmith

- **Description**: Instead of === operator, use isEqual function from Toolsmith
- **Rule ID**: SUBSTITUTE_STRICT_EQUAL_001
- **Category**: operator_substitution
- **Priority**: 10
- **Replaces**: ===
- **Substitute**: isEqual
- **Reason**: isEqual is semantic, null-safe, and reads like English
- **Import**: @sitebender/toolsmith/vanilla/validation/isEqual/index.ts
- **Examples**:
  - Wrong: if (a === b)
  - Right: if (isEqual(a)(b))
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Instead of array.push() Method, Use Append Function from Toolsmith

- **Description**: Instead of array.push() method, use append function from Toolsmith or spread operator for immutability
- **Rule ID**: SUBSTITUTE_PUSH_001
- **Category**: operator_substitution
- **Priority**: 10
- **Replaces**: .push()
- **Substitute**: append
- **Reason**: append returns new array maintaining immutability, .push() mutates original
- **Import**: @sitebender/toolsmith/vanilla/array/append/index.ts
- **Examples**:
  - Wrong: arr.push(newItem); return arr
  - Right: return append(newItem)(arr)
- **Alternative**: return [...arr, newItem]
- **Note**: .push() only allowed in Toolsmith internals on new arrays that will be returned
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Instead of arr.length > 0, Use IsNotEmpty Function from Toolsmith

- **Description**: Instead of arr.length > 0, use isNotEmpty function from Toolsmith
- **Rule ID**: SUBSTITUTE_IS_NOT_EMPTY_001
- **Category**: operator_substitution
- **Priority**: 10
- **Replaces**: arr.length > 0
- **Substitute**: isNotEmpty
- **Reason**: isNotEmpty is semantic, checks isArray first, and returns null for non-arrays
- **Import**: @sitebender/toolsmith/vanilla/validation/isNotEmpty/index.ts
- **Examples**:
  - Wrong: if (arr.length > 0)
  - Right: if (isNotEmpty(arr))
- **Note**: Handles type checking automatically - no need for isArray(arr) && arr.length > 0
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Instead of + Operator for Floats, Use Add Function

- **Description**: Instead of + operator for floats, use add function from @sitebender/toolsmith/vanilla/math/float/add/index.ts
- **Rule ID**: SUBSTITUTE_ADD_FLOAT_001
- **Category**: operator_substitution
- **Priority**: 9
- **Replaces**: +
- **Substitute**: add
- **Data Type**: float
- **Reason**: add function provides consistent interface for floating point math
- **Import**: @sitebender/toolsmith/vanilla/math/float/add/index.ts
- **Examples**:
  - Wrong: const result = a + b
  - Right: import add from '@sitebender/toolsmith/vanilla/math/float/add/index.ts'; const result = add(a)(b)
- **Context**: Use for regular floating point numbers
- **Note**: Same function name 'add' - path determines float type
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx
