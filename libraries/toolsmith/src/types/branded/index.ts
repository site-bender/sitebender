//++ Brand utility for creating nominal types - prevents mixing semantically different values of the same primitive type
export type Brand<K, T> = K & { readonly __brand: T }

//++ Safe integer within JavaScript's Number.MIN_SAFE_INTEGER to Number.MAX_SAFE_INTEGER range
export type Integer = Brand<number, "Integer">

//++ Arbitrary precision integer using bigint primitive
export type BigInteger = Brand<bigint, "BigInteger">

//++ Finite floating point number with variable decimal places - WARNING: subject to floating point imprecision
export type ApproximateDecimal = Brand<number, "ApproximateDecimal">

//++ Exact decimal number with exactly 2 decimal places - commonly used for monetary amounts
export type ExactTwoDecimals = Brand<number, "ExactTwoDecimals">

//++ Exact decimal number with exactly 1 decimal place
export type ExactOneDecimal = Brand<number, "ExactOneDecimal">

//++ Exact decimal number with exactly 3 decimal places
export type ExactThreeDecimals = Brand<number, "ExactThreeDecimals">

//++ Exact decimal number with exactly 4 decimal places
export type ExactFourDecimals = Brand<number, "ExactFourDecimals">

//++ Exact decimal number with exactly 8 decimal places
export type ExactEightDecimals = Brand<number, "ExactEightDecimals">

//++ Percentage value between 0 and 1 (0% to 100%) with at most 4 decimal places
export type Percent = Brand<number, "Percent">
