import type { Maybe } from "../../types/fp/maybe/index.ts"
import just from "../just/index.ts"
import nothing from "../nothing/index.ts"

/**
 * Converts a nullable value to a Maybe
 * 
 * Safely wraps a value that might be null or undefined into the Maybe context.
 * Non-null values become Just, while null and undefined become Nothing. This
 * is the primary entry point for bringing nullable values from JavaScript/TypeScript
 * into the safe Maybe monad, enabling functional handling of optional values.
 * 
 * @param value - The nullable value to convert
 * @returns Just if value is not null/undefined, otherwise Nothing
 * @example
 * ```typescript
 * // Basic nullable conversion
 * fromNullable(42)          // Just(42)
 * fromNullable(null)        // Nothing
 * fromNullable(undefined)   // Nothing
 * fromNullable("")          // Just("") - empty string is not null
 * fromNullable(0)           // Just(0) - zero is not null
 * fromNullable(false)       // Just(false) - false is not null
 * 
 * // Object property access
 * interface User {
 *   id: number
 *   name: string
 *   email?: string
 *   age?: number | null
 * }
 * 
 * const user: User = {
 *   id: 1,
 *   name: "Alice",
 *   email: "alice@example.com",
 *   age: null
 * }
 * 
 * fromNullable(user.email)  // Just("alice@example.com")
 * fromNullable(user.age)    // Nothing (null)
 * 
 * const user2: User = {
 *   id: 2,
 *   name: "Bob"
 *   // email and age are undefined
 * }
 * 
 * fromNullable(user2.email)  // Nothing (undefined)
 * fromNullable(user2.age)    // Nothing (undefined)
 * 
 * // Array element access
 * const arr = [1, 2, 3]
 * 
 * fromNullable(arr[0])   // Just(1)
 * fromNullable(arr[10])  // Nothing (undefined)
 * 
 * // Map/Object lookups
 * const config = {
 *   apiUrl: "https://api.example.com",
 *   timeout: 5000,
 *   retries: null
 * }
 * 
 * fromNullable(config.apiUrl)    // Just("https://api.example.com")
 * fromNullable(config.retries)   // Nothing (null)
 * fromNullable(config['missing']) // Nothing (undefined)
 * 
 * // DOM element queries
 * const element = document.getElementById("my-element")
 * const maybeElement = fromNullable(element)
 * // Just(element) if exists, Nothing if not
 * 
 * // Environment variables
 * const getEnvVar = (name: string): Maybe<string> =>
 *   fromNullable(process.env[name])
 * 
 * getEnvVar("PATH")         // Just("/usr/bin:...") or Nothing
 * getEnvVar("NONEXISTENT")  // Nothing
 * 
 * // API response handling
 * interface ApiResponse {
 *   data?: {
 *     user?: User
 *     error?: string
 *   }
 * }
 * 
 * const handleResponse = (response: ApiResponse): Maybe<User> =>
 *   pipe(
 *     fromNullable(response.data),
 *     chain(data => fromNullable(data.user))
 *   )
 * 
 * handleResponse({ data: { user: { id: 1, name: "Alice" } } })
 * // Just({ id: 1, name: "Alice" })
 * 
 * handleResponse({ data: { error: "Not found" } })
 * // Nothing (no user property)
 * 
 * handleResponse({})
 * // Nothing (no data property)
 * 
 * // Function return values
 * const find = <T>(arr: Array<T>, predicate: (item: T) => boolean): T | undefined =>
 *   arr.find(predicate)
 * 
 * const safeFindUser = (users: Array<User>, id: number): Maybe<User> =>
 *   fromNullable(find(users, u => u.id === id))
 * 
 * const users = [
 *   { id: 1, name: "Alice" },
 *   { id: 2, name: "Bob" }
 * ]
 * 
 * safeFindUser(users, 1)  // Just({ id: 1, name: "Alice" })
 * safeFindUser(users, 3)  // Nothing
 * 
 * // Chaining with other Maybe operations
 * import { pipe } from "../../simple/combinator/pipe/index.ts"
 * import { map } from "../map/index.ts"
 * import { chain } from "../chain/index.ts"
 * import { getOrElse } from "../getOrElse/index.ts"
 * 
 * const processNullable = (value: string | null | undefined): string =>
 *   pipe(
 *     fromNullable(value),
 *     map(s => s.trim()),
 *     map(s => s.toUpperCase()),
 *     getOrElse(() => "DEFAULT")
 *   )
 * 
 * processNullable("  hello  ")  // "HELLO"
 * processNullable(null)         // "DEFAULT"
 * processNullable(undefined)    // "DEFAULT"
 * 
 * // LocalStorage access
 * const getFromStorage = (key: string): Maybe<string> =>
 *   fromNullable(localStorage.getItem(key))
 * 
 * pipe(
 *   getFromStorage("user-preferences"),
 *   chain(json => {
 *     try {
 *       return just(JSON.parse(json))
 *     } catch {
 *       return nothing()
 *     }
 *   }),
 *   map(prefs => prefs.theme),
 *   getOrElse(() => "light")
 * )
 * 
 * // Database query results
 * const queryDatabase = async (id: number): Promise<User | null> => {
 *   // ... database query
 *   return id === 1 ? { id: 1, name: "Alice" } : null
 * }
 * 
 * const getUser = async (id: number): Promise<Maybe<User>> =>
 *   queryDatabase(id).then(fromNullable)
 * 
 * await getUser(1)  // Just({ id: 1, name: "Alice" })
 * await getUser(2)  // Nothing
 * 
 * // Nested nullable access
 * interface Company {
 *   name: string
 *   address?: {
 *     street?: string
 *     city?: string
 *     country?: string | null
 *   }
 * }
 * 
 * const getCountry = (company: Company): Maybe<string> =>
 *   pipe(
 *     fromNullable(company.address),
 *     chain(addr => fromNullable(addr.country))
 *   )
 * 
 * const company1: Company = {
 *   name: "TechCorp",
 *   address: {
 *     street: "123 Main St",
 *     city: "NYC",
 *     country: "USA"
 *   }
 * }
 * 
 * const company2: Company = {
 *   name: "StartupInc",
 *   address: {
 *     city: "SF",
 *     country: null
 *   }
 * }
 * 
 * const company3: Company = {
 *   name: "RemoteCo"
 * }
 * 
 * getCountry(company1)  // Just("USA")
 * getCountry(company2)  // Nothing (country is null)
 * getCountry(company3)  // Nothing (no address)
 * 
 * // Type narrowing with non-null assertion
 * const processIfPresent = <T>(value: T | null | undefined): Maybe<string> =>
 *   pipe(
 *     fromNullable(value),
 *     map(v => String(v))  // TypeScript knows v is T here, not null/undefined
 *   )
 * 
 * processIfPresent(42)         // Just("42")
 * processIfPresent(null)       // Nothing
 * processIfPresent(undefined)  // Nothing
 * ```
 * 
 * @property Null-safe - Handles both null and undefined
 * @property Type-narrowing - Removes null/undefined from type
 * @property Entry-point - Main way to bring nullable values into Maybe
 */
const fromNullable = <A>(value: A | null | undefined): Maybe<A> => {
	return value === null || value === undefined 
		? nothing() 
		: just(value)
}

export default fromNullable