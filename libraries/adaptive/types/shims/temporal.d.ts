// Minimal ambient declarations for Temporal types used in Adaptive Value union
// Note: Deno type-checks may not include Temporal lib types in all contexts.
// These interfaces are intentionally empty; they provide nominal typing only.
// This file is ambient and has no runtime effect.

declare namespace Temporal {
  interface PlainDate { readonly __temporalPlainDateBrand: unique symbol }
  interface PlainTime { readonly __temporalPlainTimeBrand: unique symbol }
  interface PlainDateTime { readonly __temporalPlainDateTimeBrand: unique symbol }
  interface ZonedDateTime { readonly __temporalZonedDateTimeBrand: unique symbol }
}
