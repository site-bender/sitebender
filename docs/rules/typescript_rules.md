# TypeScript Rules

## Generic Constraints

- **Description**: TS_GEN_014 - Generic Constraints: Generic constraints ensure type parameters meet specific requirements, providing compile-time safety while maintaining flexibility. Use extends clauses to constrain type parameters and ensure they have required properties or behaviors. Example: type HasId = { id: string; }; function updateEntity<T extends HasId>(entity: Readonly<T>) { return function updateEntityWithEntity(updates: Readonly<Partial<Omit<T, 'id'>>>): Readonly<T> { return { ...entity, ...updates }; } } function processStringifiable<T extends { toString(): string }>(value: T) { return function processStringifiableValue(): string { return `Processed: ${value.toString()}`; } }
- **Rule ID**: TS_GEN_014
- **Category**: generics
- **Priority**: 8
- **Reason**: Generic constraints ensure type parameters meet specific requirements, providing compile-time safety while maintaining flexibility
- **Consequences**: Unconstrained generics allow invalid type combinations and reduce type safety in generic functions
- **Philosophy**: Generic Constraints - use extends clauses to constrain type parameters and ensure they have required properties or behaviors
- **Encoding Type**: principle
- **Severity**: warning
- **Applies To**:
  1. .ts
  2. .tsx

## Function Composition Types

- **Description**: TS_FUN_012 - Function Composition Types: Proper function composition types enable type-safe pipeline operations and make complex transformations more readable and maintainable. Design types to support currying, piping, and composition patterns for functional programming. Example: type Unary<A, B> = (a: A) => B; type Binary<A, B, C> = (a: A) => (b: B) => C; function pipe<A, B, C>(f: Unary<A, B>): (g: Unary<B, C>) => Unary<A, C> { return function pipeWithF(g: Unary<B, C>): Unary<A, C> { return function pipedFunction(a: A): C { return g(f(a)); } } }
- **Rule ID**: TS_FUN_012
- **Category**: function-composition
- **Priority**: 8
- **Reason**: Proper function composition types enable type-safe pipeline operations and make complex transformations more readable and maintainable
- **Consequences**: Improper composition types lead to type errors and make it difficult to build reusable, composable functions
- **Philosophy**: Function Composition Types - design types to support currying, piping, and composition patterns for functional programming
- **Encoding Type**: principle
- **Severity**: warning
- **Applies To**:
  1. .ts
  2. .tsx

## Readonly Types for Immutability

- **Description**: TS_IMM_004 - Readonly Types for Immutability: Readonly types enforce immutability at the type level, preventing accidental mutations and supporting functional programming patterns. Use Readonly<T> and ReadonlyArray<T> to encode immutability constraints in the type system. Example: function updateUser(user: Readonly<User>, updates: Readonly<Partial<User>>): Readonly<User> { return { ...user, ...updates }; } function mapUsers(users: ReadonlyArray<User>): ReadonlyArray<ProcessedUser> { return users.map(processUser); }
- **Rule ID**: TS_IMM_004
- **Category**: immutability
- **Priority**: 9
- **Reason**: Readonly types enforce immutability at the type level, preventing accidental mutations and supporting functional programming patterns
- **Consequences**: Mutable types allow accidental mutations that break immutability guarantees and cause hard-to-debug side effects
- **Philosophy**: Readonly Types for Immutability - use Readonly<T> and ReadonlyArray<T> to encode immutability constraints in the type system
- **Encoding Type**: principle
- **Severity**: blocking
- **Applies To**:
  1. .ts
  2. .tsx

## Smart Constructor Pattern

- **Description**: TS_BRT_009 - Smart Constructor Pattern: Smart constructors validate input and return Result types, ensuring branded types are always valid and providing clear error handling. Validate input and return Result<BrandedType, Error> to ensure branded types are always valid. Example: function userId(str: string): Result<UserId, ValidationError> { if (isNotEmpty(str) && str.length <= 50 && /^[a-zA-Z0-9_-]+$/.test(str)) { return success(str as UserId); } return failure({ _tag: 'ValidationError', field: 'userId', message: 'UserId must be 1-50 alphanumeric characters' }); }
- **Rule ID**: TS_BRT_009
- **Category**: brand-types
- **Priority**: 8
- **Reason**: Smart constructors validate input and return Result types, ensuring branded types are always valid and providing clear error handling
- **Consequences**: Direct casting to branded types skips validation and allows invalid values to be treated as valid
- **Philosophy**: Smart Constructor Pattern - validate input and return Result<BrandedType, Error> to ensure branded types are always valid
- **Encoding Type**: principle
- **Severity**: warning
- **Applies To**:
  1. .ts
  2. .tsx

## Type-Level Programming

- **Description**: TS_ADV_005 - Type-Level Programming: Type-level programming encodes constraints and relationships in the type system, providing compile-time guarantees and reducing runtime errors. Leverage mapped types, conditional types, and template literals to encode constraints and computations in the type system. Example: type NonEmptyArray<T> = readonly [T, ...T[]]; type EventName<T extends string> = `on${Capitalize<T>}`; type RequiredKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? never : K; }[keyof T];
- **Rule ID**: TS_ADV_005
- **Category**: type-level-programming
- **Priority**: 8
- **Reason**: Type-level programming encodes constraints and relationships in the type system, providing compile-time guarantees and reducing runtime errors
- **Consequences**: Runtime-only constraints allow invalid states to compile and fail at runtime, reducing system reliability
- **Philosophy**: Type-Level Programming - leverage mapped types, conditional types, and template literals to encode constraints and computations in the type system
- **Encoding Type**: principle
- **Severity**: warning
- **Applies To**:
  1. .ts
  2. .tsx

## Unknown Type Alternatives

- **Description**: TS_UNK_008 - Unknown Type Alternatives: Unknown type requires explicit type checking before use, providing safety for truly unknown data while maintaining type system benefits. Use unknown for untrusted data and require type guards before accessing properties. Example: function isUser(value: unknown): value is User { return typeof value === 'object' && value !== null && 'id' in value && 'name' in value; } function processUnknownData(data: unknown): Result<User, ValidationError> { return isUser(data) ? success(data) : failure({ _tag: 'ValidationError', message: 'Not a valid user' }); }
- **Rule ID**: TS_UNK_008
- **Category**: type-safety
- **Priority**: 9
- **Reason**: Unknown type requires explicit type checking before use, providing safety for truly unknown data while maintaining type system benefits
- **Consequences**: Using any or skipping type validation on unknown data leads to runtime errors and eliminates type safety
- **Philosophy**: Unknown Type Alternatives - use unknown for untrusted data and require type guards before accessing properties
- **Encoding Type**: principle
- **Severity**: blocking
- **Applies To**:
  1. .ts
  2. .tsx

## Discriminated Unions for Safe Variants

- **Description**: TS_ADT_001 - Discriminated Unions for Safe Variants: Discriminated unions provide type-safe variant types with exhaustive pattern matching, eliminating null/undefined errors and enabling robust error handling. Use tagged unions with _tag field to enable exhaustive pattern matching and type-safe handling of variant types. Example: type Result<T, E> = | { _tag: "success"; value: T } | { _tag: "failure"; error: E }; function handleResult<T, E>(result: Result<T, E>): string { switch (result._tag) { case "success": return `Success: ${result.value}`; case "failure": return `Error: ${result.error}`; } }
- **Rule ID**: TS_ADT_001
- **Category**: algebraic-data-types
- **Priority**: 10
- **Reason**: Discriminated unions provide type-safe variant types with exhaustive pattern matching, eliminating null/undefined errors and enabling robust error handling
- **Consequences**: Using null/undefined or boolean flags leads to runtime errors, non-exhaustive handling, and loss of type safety
- **Philosophy**: Discriminated Unions for Safe Variants - tagged unions with _tag field enable exhaustive pattern matching and type-safe handling of variant types
- **Encoding Type**: principle
- **Severity**: blocking
- **Applies To**:
  1. .ts
  2. .tsx

## Error Type Design

- **Description**: TS_ERR_013 - Error Type Design: Proper error type design with discriminated unions provides type-safe error handling without exceptions and clear error categorization. Use discriminated unions for error types with specific error categories and structured error information. Example: type ValidationError = { _tag: 'ValidationError'; field: string; message: string; }; type NetworkError = { _tag: 'NetworkError'; status: number; message: string; }; type AppError = ValidationError | NetworkError; function handleError(error: AppError): string { switch (error._tag) { case 'ValidationError': return `Validation failed for ${error.field}: ${error.message}`; case 'NetworkError': return `Network error ${error.status}: ${error.message}`; } }
- **Rule ID**: TS_ERR_013
- **Category**: error-handling
- **Priority**: 9
- **Reason**: Proper error type design with discriminated unions provides type-safe error handling without exceptions and clear error categorization
- **Consequences**: Using exceptions or untyped errors leads to unhandled errors, unclear error contracts, and runtime crashes
- **Philosophy**: Error Type Design - use discriminated unions for error types with specific error categories and structured error information
- **Encoding Type**: principle
- **Severity**: blocking
- **Applies To**:
  1. .ts
  2. .tsx

## Array<T> Syntax Consistency

- **Description**: TS_ARR_006 - Array<T> Syntax Consistency: Array<T> syntax is more explicit and consistent with generic type patterns, improving readability especially for complex nested types. Use Array<T> and ReadonlyArray<T> for consistency with generic patterns and clarity with complex types. Example: function processUsers(users: ReadonlyArray<User>, processors: ReadonlyArray<(user: User) => ProcessedUser>): ReadonlyArray<ProcessedUser> { return users.map(processors[0]); }
- **Rule ID**: TS_ARR_006
- **Category**: array-syntax
- **Priority**: 7
- **Reason**: Array<T> syntax is more explicit and consistent with generic type patterns, improving readability especially for complex nested types
- **Consequences**: T[] syntax becomes unclear with complex types and doesn't consistently follow generic type conventions
- **Philosophy**: Array<T> Syntax Consistency - use Array<T> and ReadonlyArray<T> for consistency with generic patterns and clarity with complex types
- **Encoding Type**: principle
- **Severity**: advisory
- **Applies To**:
  1. .ts
  2. .tsx

## Explicit Type Annotations

- **Description**: TS_TYP_003 - Explicit Type Annotations: Explicit type annotations provide clear contracts, improve code readability, and catch type errors early in development. Always annotate function parameters and return types to create clear, self-documenting contracts. Example: function processUser(user: Readonly<User>, options: Readonly<ProcessOptions>): Result<ProcessedUser, ProcessError> { return processUserWithOptions(user, options); }
- **Rule ID**: TS_TYP_003
- **Category**: type-safety
- **Priority**: 9
- **Reason**: Explicit type annotations provide clear contracts, improve code readability, and catch type errors early in development
- **Consequences**: Relying on type inference for public APIs creates unclear contracts and makes refactoring dangerous
- **Philosophy**: Explicit Type Annotations - always annotate function parameters and return types to create clear, self-documenting contracts
- **Encoding Type**: principle
- **Severity**: blocking
- **Applies To**:
  1. .ts
  2. .tsx

## Unwrap Function Pattern

- **Description**: TS_BRT_011 - Unwrap Function Pattern: Unwrap functions provide a clear, named way to extract raw values from branded types for external APIs and serialization. Provide named unwrap functions to make extraction of raw values explicit and searchable. Example: function unwrapUserId(id: UserId): string { return id as string; } // Usage: Passing to external API const response = await fetch(`/api/users/${unwrapUserId(userId)}`); const dbQuery = 'SELECT * FROM users WHERE id = ?'; const result = await db.query(dbQuery, [unwrapUserId(userId)]);
- **Rule ID**: TS_BRT_011
- **Category**: brand-types
- **Priority**: 7
- **Reason**: Unwrap functions provide a clear, named way to extract raw values from branded types for external APIs and serialization
- **Consequences**: Direct casting makes it unclear when and why branded types are being converted back to raw values
- **Philosophy**: Unwrap Function Pattern - provide named unwrap functions to make extraction of raw values explicit and searchable
- **Encoding Type**: principle
- **Severity**: advisory
- **Applies To**:
  1. .ts
  2. .tsx

## Toolsmith Type Usage

- **Description**: Rule TS_UNK_008: Toolsmith Type Usage - NEVER use TypeScript's built-in unknown type - it is prohibited. Always use Toolsmith's PrimitiveValue, Serializable, Value, or Unknown types instead which provide better semantic meaning and type safety. We know what our types are, so use the appropriate Toolsmith type. Priority: 10. Applies to .ts, .tsx files.
- **Rule ID**: TS_UNK_008
- **Category**: type-safety
- **Priority**: 10
- **Reason**: NEVER use TypeScript's built-in unknown type - it is prohibited. Always use Toolsmith's PrimitiveValue, Serializable, Value, or Unknown types instead which provide better semantic meaning and type safety
- **Consequences**: Using unknown violates type safety principles, reduces code clarity, and conflicts with our type system design that knows what types we're working with
- **Philosophy**: Toolsmith Type Usage - TypeScript has limited basic types, and the Toolsmith types provide better semantic meaning. We know what our types are, so use PrimitiveValue, Serializable, Value, or Unknown from Toolsmith
- **Examples**:
  - Correct: import { Value, Serializable, PrimitiveValue, Unknown } from '@sitebender/toolsmith';

function isUser(value: Value): value is User {
  return typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value;
}

function processUnknownData(data: Unknown): Result<User, ValidationError> {
  return isUser(data)
    ? success(data)
    : failure({ _tag: 'ValidationError', message: 'Not a valid user' });
}

function handlePrimitive(value: PrimitiveValue): string {
  return String(value);
}

function serializeData(data: Serializable): string {
  return JSON.stringify(data);
}
  - Anti Pattern: function processUnknownData(data: unknown): User {
  // PROHIBITED: Never use TypeScript's unknown type
  return data as User;
}

function handleValue(value: unknown): string {
  // PROHIBITED: unknown type not allowed
  return String(value);
}
- **Encoding Type**: principle
- **Severity**: blocking
- **Applies To**:
  1. .ts
  2. .tsx

## Any Type Prohibition

- **Description**: TS_ANY_007 - Any Type Prohibition: The any type completely disables TypeScript's type checking, eliminating the benefits of static typing and making code unsafe. Never use any; use unknown for truly unknown types and proper type definitions for known shapes. Example: function processApiResponse(response: unknown): Result<ProcessedData, ApiError> { if (isApiResponse(response)) { return success(processValidResponse(response)); } return failure({ _tag: 'ApiError', message: 'Invalid response' }); }
- **Rule ID**: TS_ANY_007
- **Category**: type-safety
- **Priority**: 10
- **Reason**: The any type completely disables TypeScript's type checking, eliminating the benefits of static typing and making code unsafe
- **Consequences**: Using any allows runtime errors that TypeScript could prevent and eliminates intellisense and refactoring safety
- **Philosophy**: Any Type Prohibition - never use any; use unknown for truly unknown types and proper type definitions for known shapes
- **Encoding Type**: principle
- **Severity**: blocking
- **Applies To**:
  1. .ts
  2. .tsx

## Branded Types with __brand

- **Description**: TS_BRT_002 - Branded Types with __brand: Branded types prevent mixing semantically different values that share the same structural type, providing compile-time safety without runtime cost. Use intersection types with unique brands to create nominal typing for domain concepts while maintaining zero runtime overhead. Example: type UserId = string & { readonly __brand: 'UserId' }; type Email = string & { readonly __brand: 'Email' }; function getUser(id: UserId): User { return findUserById(id); }
- **Rule ID**: TS_BRT_002
- **Category**: brand-types
- **Priority**: 9
- **Reason**: Branded types prevent mixing semantically different values that share the same structural type, providing compile-time safety without runtime cost
- **Consequences**: Using raw primitives allows accidental mixing of different domain concepts, leading to semantic errors that pass type checking
- **Philosophy**: Branded Types with __brand - intersection types with unique brands create nominal typing for domain concepts while maintaining zero runtime overhead
- **Encoding Type**: principle
- **Severity**: blocking
- **Applies To**:
  1. .ts
  2. .tsx

## Nominal Typing Support

- **Description**: TS_NOM_015 - Nominal Typing Support: Nominal typing support through branded types and proper type design creates stronger type safety and clearer domain modeling. Combine branded types, smart constructors, and proper abstractions to achieve nominal typing benefits in TypeScript's structural system. Example: type UserId = string & { readonly __brand: 'UserId' }; type PostId = string & { readonly __brand: 'PostId' }; type CommentId = string & { readonly __brand: 'CommentId' }; // These are now nominally different despite same structure function getUser(id: UserId): Promise<User> { ... } function getPost(id: PostId): Promise<Post> { ... } function getComment(id: CommentId): Promise<Comment> { ... }
- **Rule ID**: TS_NOM_015
- **Category**: nominal-typing
- **Priority**: 8
- **Reason**: Nominal typing support through branded types and proper type design creates stronger type safety and clearer domain modeling
- **Consequences**: Relying only on structural typing allows semantically different types with same structure to be used interchangeably
- **Philosophy**: Nominal Typing Support - combine branded types, smart constructors, and proper abstractions to achieve nominal typing benefits in TypeScript's structural system
- **Encoding Type**: principle
- **Severity**: warning
- **Applies To**:
  1. .ts
  2. .tsx

## Use type, Never interface

- **Description**: TS_TYPE_INTERFACE_001 - Use type, Never interface: Always use type aliases, never use interface keyword. Interfaces are mutable, support declaration merging, and are designed for OOP patterns with classes. Types are immutable, sealed, and align with functional programming principles. Example correct: type User = { readonly id: string; readonly name: string; }; type ApiResponse<T> = { readonly data: T; readonly status: number; }. Example wrong: interface User { id: string; name: string; } interface ApiResponse<T> { data: T; status: number; }. Exception: Only use interface with explicit architect permission for specific interop requirements.
- **Rule ID**: TS_TYPE_INTERFACE_001
- **Category**: type-definitions
- **Priority**: 10
- **Reason**: Interfaces are mutable, support declaration merging, and are designed for OOP patterns. Types align with FP principles of immutability and sealed definitions
- **Consequences**: Using interface allows mutation, declaration merging creates hidden dependencies, and encourages OOP patterns that violate our functional architecture
- **Philosophy**: Type vs Interface - types are immutable and sealed, interfaces are mutable and extensible. FP requires immutability
- **Encoding Type**: principle
- **Severity**: blocking
- **Applies To**:
  1. .ts
  2. .tsx

## Unsafe Constructor Naming

- **Description**: TS_BRT_010 - Unsafe Constructor Naming: Unsafe constructors make the escape hatch explicit and should only be used for trusted data where validation already occurred. Prefix with 'unsafe' to make validation bypass explicit and document trusted data sources. Example: function unsafeUserId(str: string): UserId { return str as UserId; } // Usage: Reading from database where validation already occurred const user = await db.query('SELECT id FROM users WHERE id = ?', [validId]); const userId = unsafeUserId(user.id); // Database constraint ensures validity
- **Rule ID**: TS_BRT_010
- **Category**: brand-types
- **Priority**: 8
- **Reason**: Unsafe constructors make the escape hatch explicit and should only be used for trusted data where validation already occurred
- **Consequences**: Implicit casting hides the fact that validation is being skipped, making it unclear when values might be invalid
- **Philosophy**: Unsafe Constructor Naming - prefix with 'unsafe' to make validation bypass explicit and document trusted data sources
- **Encoding Type**: principle
- **Severity**: warning
- **Applies To**:
  1. .ts
  2. .tsx
