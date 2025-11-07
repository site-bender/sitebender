# Toolsmith Functions

This directory contains plain JavaScript/TypeScript functions that form the foundation of the Toolsmith library. These functions are obsolete in that they do not depend on monads or advanced functional programming constructs. All or almost all Toolsmith utility functions (except predicates), will return plain, Result, or Validation response. We will specify exceptions as we go.

**VITALLY IMPORTANT: DO NOT USE THESE FILES. DO NOT LINK TO THEM. DO NOT IMPORT THEM. THESE ARE FOR REFERENCE ONLY WHILE BUILDING OUT THE _ACTUAL_ TOOLSMITH FUNCTIONS IN THE OTHER FOLDERS. DO NOT VIOLATE THIS RULE.**

## Error Handling Convention

**IMPORTANT:** Functions in this library follow a strict error handling convention:

### The Null Convention

1. **Never return `undefined`** - Functions MUST NOT return `undefined` for error conditions
2. **Return `null` for errors** - When a function encounters an error condition (invalid input, out-of-range values, etc.), it MUST return `null`. `null` is how the calling function determines that an error has occurred. THESE FUNCTIONS WILL BE REFACTORED TO ALSO RETURN Result OR Validation MONADS DEPENDING ON THE DATA PARAMETER: plain -> plain (possibly null) response, Ok<value> -> Result response, Success<value> -> Validation response.
3. **Never throw exceptions** - Functions should not throw errors; they return `null` instead. NO FUNCTION IN THE TOOLSMITH LIBRARY SHOULD EVER THROW AN ERROR. THIS IS A STRICT FP LIBRARY.

### Why This Convention?

These functions are utility functions for use throughout the Sitebender project (and by external consumers). Virtually all of those functions will work with monads to avoid null/undefined issues. This is the proper FP approach (we are doing "Haskell in TypeScript"). Only functions that cannot error (e.g., predicates, which just return false if the argument is not of the correct type) need not return monads.
