/**
 * Standard error message templates
 * 
 * Reusable message templates for common error scenarios.
 * These ensure consistent error messaging across the library.
 */

export const TYPE_MISMATCH = (op: string) => (expected: string) => (actual: string) =>
  `${op} expected ${expected} but received ${actual}`

export const NULL_INPUT = (op: string) => (param: string) =>
  `${op} received null/undefined for required parameter '${param}'`

export const INVALID_ARGUMENT = (op: string) => (param: string) => (reason: string) =>
  `${op} received invalid ${param}: ${reason}`

export const OPERATION_FAILED = (op: string) => (reason: string) =>
  `${op} failed: ${reason}`

export const CALLBACK_THREW = (op: string) => (callbackName: string) => (message: string) =>
  `${op}: ${callbackName} threw an error: ${message}`

export const OUT_OF_RANGE = (op: string) => (param: string) => (min: number) => (max: number) => (actual: number) =>
  `${op}: ${param} must be between ${min} and ${max}, got ${actual}`

export const NOT_FOUND = (op: string) => (what: string) => (where: string) =>
  `${op}: ${what} not found in ${where}`

export const PARSE_ERROR = (op: string) => (what: string) => (input: string) =>
  `${op}: Could not parse ${what} from "${input}"`

export const VALIDATION_FAILED = (op: string) => (what: string) => (rules: string) =>
  `${op}: ${what} failed validation: ${rules}`

export const DIVISION_BY_ZERO = (op: string) => (context: string) =>
  `${op}: Division by zero${context ? ` in ${context}` : ""}`