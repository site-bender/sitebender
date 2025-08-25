import type { Lens } from "../../simple/object/lens/index.ts"

/**
 * Checks if value at lens focus is greater than or equal to another
 *
 * Creates a predicate function that checks if the value at the lens focus
 * is greater than or equal to a given value. Works with numbers, strings,
 * dates, and any comparable values. Useful for filtering, validation, and
 * range checks on nested properties.
 *
 * @curried (lens) => (value) => (subject) => boolean
 * @param lens - Lens to focus on a property
 * @param value - Value to compare against
 * @param subject - Object to check
 * @returns True if focused value is >= the given value
 * @example
 * ```typescript
 * import { lensProp } from "../../simple/object/lensProp/index.ts"
 * import { lensPath } from "../../simple/object/lensPath/index.ts"
 *
 * // Number comparison
 * const ageLens = lensProp("age")
 * const isAdult = lensGte(ageLens)(18)
 *
 * isAdult({ name: "Alice", age: 25 })          // true
 * isAdult({ name: "Bob", age: 17 })            // false
 * isAdult({ name: "Charlie", age: 18 })        // true (equal)
 *
 * // Filtering arrays
 * const scoreLens = lensProp("score")
 * const isPassing = lensGte(scoreLens)(60)
 *
 * const students = [
 *   { name: "Alice", score: 85 },
 *   { name: "Bob", score: 55 },
 *   { name: "Charlie", score: 60 },
 *   { name: "Diana", score: 92 }
 * ]
 *
 * students.filter(isPassing)
 * // [{ name: "Alice", score: 85 }, { name: "Charlie", score: 60 }, { name: "Diana", score: 92 }]
 *
 * // String comparison (alphabetical)
 * const nameLens = lensProp("name")
 * const isAfterM = lensGte(nameLens)("M")
 *
 * const people = [
 *   { name: "Alice" },
 *   { name: "Nancy" },
 *   { name: "Bob" },
 *   { name: "Zoe" }
 * ]
 *
 * people.filter(isAfterM)
 * // [{ name: "Nancy" }, { name: "Zoe" }]
 *
 * // Date comparison
 * const createdLens = lensProp("created")
 * const cutoffDate = new Date("2023-01-01")
 * const isRecent = lensGte(createdLens)(cutoffDate)
 *
 * const posts = [
 *   { title: "Old Post", created: new Date("2022-06-15") },
 *   { title: "New Post", created: new Date("2023-06-15") },
 *   { title: "Recent Post", created: new Date("2024-01-01") }
 * ]
 *
 * posts.filter(isRecent)
 * // [{ title: "New Post", ... }, { title: "Recent Post", ... }]
 *
 * // Nested property check
 * const priceLens = lensPath(["product", "price"])
 * const isExpensive = lensGte(priceLens)(100)
 *
 * const items = [
 *   { id: 1, product: { name: "Widget", price: 50 } },
 *   { id: 2, product: { name: "Gadget", price: 150 } },
 *   { id: 3, product: { name: "Tool", price: 100 } }
 * ]
 *
 * items.filter(isExpensive)
 * // [{ id: 2, ... price: 150 }, { id: 3, ... price: 100 }]
 *
 * // Array length check
 * import { composeLens } from "../composeLens/index.ts"
 *
 * const itemsLens = lensProp("items")
 * const lengthLens = lens<Array<any>, number>(
 *   arr => arr.length,
 *   len => arr => arr  // Read-only for length
 * )
 * const itemsLengthLens = composeLens(itemsLens, lengthLens)
 * const hasMinItems = lensGte(itemsLengthLens)(3)
 *
 * const orders = [
 *   { id: 1, items: ["a", "b"] },
 *   { id: 2, items: ["x", "y", "z"] },
 *   { id: 3, items: ["p", "q", "r", "s"] }
 * ]
 *
 * orders.filter(hasMinItems)
 * // [{ id: 2, items: [...] }, { id: 3, items: [...] }]
 *
 * // Salary range check
 * const salaryLens = lensProp("salary")
 * const checkSalaryBand = (min: number) => lensGte(salaryLens)(min)
 *
 * const isHighEarner = checkSalaryBand(100000)
 * const isMidLevel = checkSalaryBand(50000)
 *
 * const employees = [
 *   { name: "Alice", salary: 120000 },
 *   { name: "Bob", salary: 45000 },
 *   { name: "Charlie", salary: 75000 }
 * ]
 *
 * employees.filter(isHighEarner)               // [Alice]
 * employees.filter(isMidLevel)                 // [Alice, Charlie]
 *
 * // Version comparison
 * const versionLens = lensProp("version")
 * const isSupported = lensGte(versionLens)("2.0.0")
 *
 * const packages = [
 *   { name: "pkg-a", version: "1.5.0" },
 *   { name: "pkg-b", version: "2.0.0" },
 *   { name: "pkg-c", version: "3.1.0" }
 * ]
 *
 * packages.filter(isSupported)
 * // [{ name: "pkg-b", ... }, { name: "pkg-c", ... }]
 *
 * // Priority filtering
 * const priorityLens = lensProp("priority")
 * const isHighPriority = lensGte(priorityLens)(7)
 *
 * const tasks = [
 *   { task: "Bug fix", priority: 9 },
 *   { task: "Feature", priority: 5 },
 *   { task: "Critical", priority: 10 },
 *   { task: "Minor", priority: 3 }
 * ]
 *
 * tasks.filter(isHighPriority)
 * // [{ task: "Bug fix", priority: 9 }, { task: "Critical", priority: 10 }]
 *
 * // Percentage threshold
 * const completionLens = lensProp("completion")
 * const isAlmostDone = lensGte(completionLens)(0.9)
 *
 * const projects = [
 *   { name: "Project A", completion: 0.95 },
 *   { name: "Project B", completion: 0.60 },
 *   { name: "Project C", completion: 0.90 }
 * ]
 *
 * projects.filter(isAlmostDone)
 * // [{ name: "Project A", ... }, { name: "Project C", ... }]
 *
 * // Combined with other lens operations
 * const ratingLens = lensProp("rating")
 * const hasGoodRating = lensGte(ratingLens)(4)
 * const priceLens2 = lensProp("price")
 * const isAffordable = (item: any) =>
 *   hasGoodRating(item) && lens.get(priceLens2)(item) <= 50
 *
 * const products = [
 *   { name: "A", rating: 4.5, price: 30 },
 *   { name: "B", rating: 3.5, price: 20 },
 *   { name: "C", rating: 4.8, price: 60 }
 * ]
 *
 * products.filter(isAffordable)
 * // [{ name: "A", rating: 4.5, price: 30 }]
 * ```
 * @property Pure - No side effects
 * @property Curried - Can be partially applied
 * @property Type-safe - Maintains type information through lens
 */
const lensGte =
	<S, A>(lens: Lens<S, A>) => (value: A) => (subject: S): boolean =>
		lens.get(subject) >= value

export default lensGte
