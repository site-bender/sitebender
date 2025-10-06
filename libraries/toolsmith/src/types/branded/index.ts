//++ Brand utility for creating nominal types - prevents mixing semantically different values of the same primitive type
export type Brand<K, T> = K & { readonly __brand: T }

//++ Safe integer within JavaScript's Number.MIN_SAFE_INTEGER to Number.MAX_SAFE_INTEGER range
export type Integer = Brand<number, "Integer">

//++ Arbitrary precision integer using bigint primitive
export type BigInteger = Brand<bigint, "BigInteger">

//++ Finite floating point number (excludes Infinity, -Infinity, NaN)
export type Float = Brand<number, "Float">

//++ Monetary amount with exactly 2 decimal places
export type Currency = Brand<number, "Currency">

//++ Whole number with 0 decimal places (integer stored as number)
export type Decimal0 = Brand<number, "Decimal0">

//++ Decimal number with at most 1 decimal place
export type Decimal1 = Brand<number, "Decimal1">

//++ Decimal number with at most 3 decimal places
export type Decimal3 = Brand<number, "Decimal3">

//++ Decimal number with at most 4 decimal places
export type Decimal4 = Brand<number, "Decimal4">

//++ Decimal number with at most 8 decimal places
export type Decimal8 = Brand<number, "Decimal8">

//++ Percentage value between 0 and 1 (0% to 100%) with at most 4 decimal places
export type Percentage = Brand<number, "Percentage">
