/*++
 + Valid element config tag types for discriminated union
 + Used to validate that a child is a valid ElementConfig
 + [EXCEPTION] as const required to:
 + - Narrow type to literal tuple instead of string[]
 + - Make array readonly at type level
 + - Enable proper type checking with includes predicate
 */
export const ELEMENT_TYPES = ["comment", "element", "error", "text"] as const
