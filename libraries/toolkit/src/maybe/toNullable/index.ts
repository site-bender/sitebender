import type { Maybe } from "../../types/fp/maybe/index.ts"

import isNothing from "../isNothing/index.ts"

/**
 * Converts a Maybe to a nullable value
 *
 * Extracts the value from a Maybe, returning null for Nothing cases.
 * This is the inverse of fromNullable and provides a way to exit the
 * Maybe context when interfacing with APIs or code that expects nullable
 * values. Just values are unwrapped to their contained value, while
 * Nothing becomes null.
 *
 * @param maybe - The Maybe to convert
 * @returns The Just value or null if Nothing
 * @example
 * ```typescript
 * import { just } from "../just/index.ts"
 * import { nothing } from "../nothing/index.ts"
 *
 * // Basic conversion
 * toNullable(just(42))     // 42
 * toNullable(nothing())    // null
 * toNullable(just("hello")) // "hello"
 * toNullable(just(false))  // false
 * toNullable(just(0))      // 0
 *
 * // Round-trip with fromNullable
 * import { fromNullable } from "../fromNullable/index.ts"
 *
 * const value1 = 42
 * const value2 = null
 * const value3 = undefined
 *
 * toNullable(fromNullable(value1))  // 42
 * toNullable(fromNullable(value2))  // null
 * toNullable(fromNullable(value3))  // null (undefined becomes null)
 *
 * // API response preparation
 * interface ApiResponse {
 *   id: number
 *   name: string
 *   email: string | null
 *   phone: string | null
 * }
 *
 * const prepareUserResponse = (
 *   id: number,
 *   name: string,
 *   email: Maybe<string>,
 *   phone: Maybe<string>
 * ): ApiResponse => ({
 *   id,
 *   name,
 *   email: toNullable(email),
 *   phone: toNullable(phone)
 * })
 *
 * prepareUserResponse(
 *   1,
 *   "Alice",
 *   just("alice@example.com"),
 *   nothing()
 * )
 * // { id: 1, name: "Alice", email: "alice@example.com", phone: null }
 *
 * // Database updates with nullable fields
 * interface UpdateUserDto {
 *   name?: string
 *   email?: string | null
 *   age?: number | null
 * }
 *
 * const buildUpdateQuery = (
 *   maybeName: Maybe<string>,
 *   maybeEmail: Maybe<string>,
 *   maybeAge: Maybe<number>
 * ): UpdateUserDto => {
 *   const dto: UpdateUserDto = {}
 *
 *   const name = toNullable(maybeName)
 *   if (name !== null) dto.name = name
 *
 *   // Explicitly set null for email and age if Nothing
 *   dto.email = toNullable(maybeEmail)
 *   dto.age = toNullable(maybeAge)
 *
 *   return dto
 * }
 *
 * buildUpdateQuery(just("Bob"), nothing(), just(30))
 * // { name: "Bob", email: null, age: 30 }
 *
 * // LocalStorage operations
 * const saveToStorage = (key: string, value: Maybe<string>): void => {
 *   const nullable = toNullable(value)
 *   if (nullable === null) {
 *     localStorage.removeItem(key)
 *   } else {
 *     localStorage.setItem(key, nullable)
 *   }
 * }
 *
 * saveToStorage("theme", just("dark"))   // Sets item
 * saveToStorage("theme", nothing())      // Removes item
 *
 * // JSON serialization
 * interface UserPreferences {
 *   theme: string
 *   language: string
 *   notifications: boolean
 *   customColor: string | null
 * }
 *
 * const serializePreferences = (
 *   theme: string,
 *   language: string,
 *   notifications: boolean,
 *   customColor: Maybe<string>
 * ): string => {
 *   const prefs: UserPreferences = {
 *     theme,
 *     language,
 *     notifications,
 *     customColor: toNullable(customColor)
 *   }
 *   return JSON.stringify(prefs)
 * }
 *
 * serializePreferences("light", "en", true, just("#FF5733"))
 * // '{"theme":"light","language":"en","notifications":true,"customColor":"#FF5733"}'
 *
 * serializePreferences("dark", "fr", false, nothing())
 * // '{"theme":"dark","language":"fr","notifications":false,"customColor":null}'
 *
 * // DOM manipulation
 * const setElementText = (
 *   element: HTMLElement,
 *   text: Maybe<string>
 * ): void => {
 *   const content = toNullable(text)
 *   element.textContent = content  // null clears the content
 * }
 *
 * const div = document.createElement("div")
 * setElementText(div, just("Hello"))  // Sets text to "Hello"
 * setElementText(div, nothing())      // Clears the text
 *
 * // Array filtering with nullables
 * const maybeValues = [
 *   just(1),
 *   nothing(),
 *   just(2),
 *   nothing(),
 *   just(3)
 * ]
 *
 * const nullableValues = maybeValues.map(toNullable)
 * // [1, null, 2, null, 3]
 *
 * const nonNullValues = nullableValues.filter(v => v !== null)
 * // [1, 2, 3]
 *
 * // Conditional rendering in frameworks
 * const renderOptionalField = (
 *   label: string,
 *   value: Maybe<string>
 * ): string => {
 *   const nullable = toNullable(value)
 *   return nullable === null
 *     ? ""
 *     : `<div><label>${label}:</label><span>${nullable}</span></div>`
 * }
 *
 * renderOptionalField("Email", just("user@example.com"))
 * // "<div><label>Email:</label><span>user@example.com</span></div>"
 *
 * renderOptionalField("Phone", nothing())
 * // ""
 *
 * // Type guards and narrowing
 * const processValue = (maybe: Maybe<number>): void => {
 *   const value = toNullable(maybe)
 *   if (value !== null) {
 *     // TypeScript knows value is number here
 *     console.log(value * 2)
 *   } else {
 *     console.log("No value")
 *   }
 * }
 *
 * processValue(just(5))    // logs: 10
 * processValue(nothing())  // logs: "No value"
 *
 * // Async operations
 * const fetchData = async (
 *   id: Maybe<number>
 * ): Promise<Data | null> => {
 *   const nullableId = toNullable(id)
 *   if (nullableId === null) {
 *     return null
 *   }
 *
 *   const response = await fetch(`/api/data/${nullableId}`)
 *   return response.json()
 * }
 *
 * // Chaining with other operations
 * import { pipe } from "../../simple/combinator/pipe/index.ts"
 * import { map } from "../map/index.ts"
 * import { filter } from "../filter/index.ts"
 *
 * const processAndConvert = (input: Maybe<number>): number | null =>
 *   pipe(
 *     input,
 *     map(x => x * 2),
 *     filter(x => x < 100),
 *     toNullable
 *   )
 *
 * processAndConvert(just(30))  // 60
 * processAndConvert(just(60))  // null (120 > 100)
 * processAndConvert(nothing())  // null
 *
 * // Default vs null distinction
 * const getConfigValue = (
 *   primary: Maybe<string>,
 *   fallback: string
 * ): string => {
 *   const nullable = toNullable(primary)
 *   return nullable ?? fallback  // nullish coalescing
 * }
 *
 * getConfigValue(just("custom"), "default")  // "custom"
 * getConfigValue(nothing(), "default")       // "default"
 * ```
 *
 * @property Exit-point - Exits the Maybe context to nullable
 * @property Null-conversion - Nothing always becomes null
 * @property Type-safe - Maintains type information for non-null values
 */
const toNullable = <A>(maybe: Maybe<A>): A | null => {
	if (isNothing(maybe)) {
		return null
	}

	return maybe.value
}

export default toNullable
