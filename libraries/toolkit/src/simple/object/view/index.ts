import type { Lens } from "../lens/index.ts"

/**
 * Extracts a value using a lens
 *
 * Uses a lens to extract and return the focused value from a data structure.
 * This is the primary way to read values through lenses. Equivalent to calling
 * lens.get(obj) but provided as a standalone function for composition.
 *
 * @curried (lens) => (obj) => value
 * @param lens - The lens to look through
 * @param obj - The object to extract from
 * @returns The value at the lens focus
 * @example
 * ```typescript
 * import lens from "../lens/index.ts"
 * import lensProp from "../lensProp/index.ts"
 * import lensPath from "../lensPath/index.ts"
 * import lensIndex from "../lensIndex/index.ts"
 *
 * // Basic usage with lensProp
 * const nameLens = lensProp("name")
 * const person = { name: "Alice", age: 30 }
 *
 * view(nameLens)(person)                          // "Alice"
 *
 * const ageLens = lensProp("age")
 * view(ageLens)(person)                           // 30
 *
 * // With lensPath for nested values
 * const cityLens = lensPath(["address", "city"])
 * const user = {
 *   name: "Bob",
 *   address: {
 *     street: "123 Main St",
 *     city: "NYC",
 *     zip: "10001"
 *   }
 * }
 *
 * view(cityLens)(user)                            // "NYC"
 *
 * const zipLens = lensPath(["address", "zip"])
 * view(zipLens)(user)                             // "10001"
 *
 * // With lensIndex for array access
 * const firstLens = lensIndex(0)
 * const numbers = [10, 20, 30, 40, 50]
 *
 * view(firstLens)(numbers)                        // 10
 *
 * const thirdLens = lensIndex(2)
 * view(thirdLens)(numbers)                        // 30
 *
 * const lastLens = lensIndex(-1)
 * view(lastLens)(numbers)                         // 50
 *
 * // Custom lens
 * const priceLens = lens<{ price: number }, number>(
 *   (item) => item.price,
 *   (price) => (item) => ({ ...item, price })
 * )
 *
 * const product = { name: "Widget", price: 99.99 }
 * view(priceLens)(product)                        // 99.99
 *
 * // Composed lenses (manual)
 * const userLens = lensProp("user")
 * const emailLens = lensProp("email")
 *
 * const userEmailLens = lens<any, string>(
 *   (obj) => view(emailLens)(view(userLens)(obj)),
 *   (email) => (obj) => {
 *     const user = view(userLens)(obj)
 *     return { ...obj, user: { ...user, email } }
 *   }
 * )
 *
 * const data = {
 *   user: { id: 1, email: "old@ex.com" },
 *   timestamp: Date.now()
 * }
 *
 * view(userEmailLens)(data)                       // "old@ex.com"
 *
 * // Missing values
 * const missingLens = lensPath(["does", "not", "exist"])
 * view(missingLens)({ some: "object" })           // undefined
 *
 * // Practical use cases
 *
 * // Configuration access
 * const portLens = lensPath(["server", "config", "port"])
 * const hostLens = lensPath(["server", "config", "host"])
 *
 * const config = {
 *   server: {
 *     config: {
 *       port: 3000,
 *       host: "localhost"
 *     }
 *   }
 * }
 *
 * view(portLens)(config)                          // 3000
 * view(hostLens)(config)                          // "localhost"
 *
 * // Form field extraction
 * const usernameLens = lensPath(["form", "fields", "username"])
 * const passwordLens = lensPath(["form", "fields", "password"])
 *
 * const state = {
 *   form: {
 *     fields: {
 *       username: "alice",
 *       password: "secret"
 *     },
 *     errors: {}
 *   }
 * }
 *
 * view(usernameLens)(state)                       // "alice"
 * view(passwordLens)(state)                       // "secret"
 *
 * // Array of objects navigation
 * const firstItemNameLens = lens<any, string>(
 *   (obj) => obj.items?.[0]?.name,
 *   (name) => (obj) => ({
 *     ...obj,
 *     items: [
 *       { ...obj.items[0], name },
 *       ...obj.items.slice(1)
 *     ]
 *   })
 * )
 *
 * const catalog = {
 *   items: [
 *     { id: 1, name: "First" },
 *     { id: 2, name: "Second" }
 *   ]
 * }
 *
 * view(firstItemNameLens)(catalog)                // "First"
 *
 * // Validation using view
 * const hasRequiredFields = (obj: any) => {
 *   const nameLens = lensProp("name")
 *   const emailLens = lensProp("email")
 *
 *   return view(nameLens)(obj) && view(emailLens)(obj)
 * }
 *
 * hasRequiredFields({ name: "Bob", email: "bob@ex.com" })  // true
 * hasRequiredFields({ name: "Bob" })                       // false
 *
 * // Extracting for comparison
 * const users = [
 *   { id: 1, score: 100 },
 *   { id: 2, score: 85 },
 *   { id: 3, score: 95 }
 * ]
 *
 * const scoreLens = lensProp("score")
 * const scores = users.map(view(scoreLens))      // [100, 85, 95]
 * const maxScore = Math.max(...scores)            // 100
 *
 * // Conditional logic based on lens values
 * const statusLens = lensProp("status")
 * const process = (obj: any) => {
 *   const status = view(statusLens)(obj)
 *   switch (status) {
 *     case "pending": return "Process later"
 *     case "active": return "Process now"
 *     default: return "Skip"
 *   }
 * }
 *
 * process({ status: "active", id: 1 })            // "Process now"
 *
 * // Debugging with lenses
 * const debugPath = (path: Array<string>) => (obj: any) => {
 *   const lens = lensPath(path)
 *   const value = view(lens)(obj)
 *   console.log(`Value at ${path.join(".")}: ${value}`)
 *   return value
 * }
 *
 * // Partial application patterns
 * const getValue = (lens: Lens<any, any>) => view(lens)
 *
 * const getName = getValue(lensProp("name"))
 * const getAge = getValue(lensProp("age"))
 *
 * const person2 = { name: "Carol", age: 35 }
 * getName(person2)                                // "Carol"
 * getAge(person2)                                 // 35
 *
 * // Safe navigation
 * const safePath = (path: Array<string>) => (defaultValue: any) => (obj: any) => {
 *   const lens = lensPath(path)
 *   return view(lens)(obj) ?? defaultValue
 * }
 *
 * const getWithDefault = safePath(["user", "settings", "theme"])("light")
 * getWithDefault({})                              // "light"
 * getWithDefault({ user: { settings: { theme: "dark" } } })  // "dark"
 * ```
 * @property Lens-based extraction - works with any lens type
 * @property Safe access - returns undefined for missing values
 * @property Composable - can be used in pipelines and higher-order functions
 */
const view = <S, A>(
	lens: Lens<S, A>,
) =>
(
	obj: S,
): A => {
	return lens.get(obj)
}

export default view
