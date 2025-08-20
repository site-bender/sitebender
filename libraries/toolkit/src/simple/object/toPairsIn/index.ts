import type { Value } from "../../../types/index.ts"

/**
 * Converts an object to an array of [key, value] pairs including inherited properties
 * 
 * Like toPairs, but includes properties from the prototype chain. Transforms
 * an object into an array of tuples, where each tuple contains a key-value
 * pair from the object or its prototype chain. Useful when you need to
 * access all properties, not just own properties.
 * 
 * @param obj - The object to convert
 * @returns Array of [key, value] pairs including inherited properties
 * @example
 * ```typescript
 * // Basic conversion (same as toPairs for plain objects)
 * toPairsIn({ a: 1, b: 2, c: 3 })
 * // [["a", 1], ["b", 2], ["c", 3]]
 * 
 * // With prototype chain
 * class Animal {
 *   species = "unknown"
 *   breathe() { return "breathing" }
 * }
 * 
 * class Dog extends Animal {
 *   breed = "mixed"
 *   bark() { return "woof" }
 * }
 * 
 * const myDog = new Dog()
 * myDog.name = "Buddy"
 * 
 * toPairsIn(myDog)
 * // Includes own properties and instance properties from classes
 * // [["name", "Buddy"], ["breed", "mixed"], ["species", "unknown"]]
 * // Note: Methods on prototype are not enumerable by default
 * 
 * // Object with prototype
 * const parent = { inherited: "from parent" }
 * const child = Object.create(parent)
 * child.own = "child property"
 * 
 * toPairs(child)    // [["own", "child property"]]
 * toPairsIn(child)  // [["own", "child property"], ["inherited", "from parent"]]
 * 
 * // Constructor function pattern
 * function Person(name: string) {
 *   this.name = name
 * }
 * Person.prototype.type = "human"
 * Person.prototype.greet = function() { return "hello" }
 * 
 * const person = new Person("Alice")
 * person.age = 30
 * 
 * toPairsIn(person)
 * // [["name", "Alice"], ["age", 30], ["type", "human"], ["greet", function]]
 * 
 * // Multiple inheritance levels
 * const grandparent = { level1: "grandparent" }
 * const parent2 = Object.create(grandparent)
 * parent2.level2 = "parent"
 * const child2 = Object.create(parent2)
 * child2.level3 = "child"
 * 
 * toPairsIn(child2)
 * // [["level3", "child"], ["level2", "parent"], ["level1", "grandparent"]]
 * 
 * // Empty object with prototype
 * const proto = { fromProto: "value" }
 * const empty = Object.create(proto)
 * 
 * toPairs(empty)    // []
 * toPairsIn(empty)  // [["fromProto", "value"]]
 * 
 * // Symbol properties (own only, symbols not inherited)
 * const sym = Symbol("key")
 * const objWithSym = {
 *   regular: "value",
 *   [sym]: "symbol value"
 * }
 * const childWithSym = Object.create(objWithSym)
 * childWithSym.own = "own value"
 * 
 * toPairsIn(childWithSym)
 * // [["own", "own value"], ["regular", "value"]]
 * // Symbol is not included from prototype
 * 
 * // Built-in prototypes
 * const arr = [1, 2, 3]
 * arr.custom = "added"
 * 
 * toPairsIn(arr)
 * // Includes array indices, custom property, and enumerable Array.prototype properties
 * // [["0", 1], ["1", 2], ["2", 3], ["custom", "added"], ...]
 * 
 * // Practical use cases
 * 
 * // Configuration with defaults
 * const defaultConfig = {
 *   host: "localhost",
 *   port: 3000,
 *   ssl: false
 * }
 * 
 * const userConfig = Object.create(defaultConfig)
 * userConfig.port = 8080  // Override
 * userConfig.debug = true // Add new
 * 
 * toPairs(userConfig)    // [["port", 8080], ["debug", true]]
 * toPairsIn(userConfig)  // [["port", 8080], ["debug", true], ["host", "localhost"], ["ssl", false]]
 * 
 * // Merging with inherited properties
 * const base = { a: 1, b: 2 }
 * const extended = Object.create(base)
 * extended.b = 20  // Override
 * extended.c = 30  // New
 * 
 * const merged = Object.fromEntries(toPairsIn(extended))
 * // { b: 20, c: 30, a: 1 } (own properties override inherited)
 * 
 * // Class-based inheritance inspection
 * class Vehicle {
 *   wheels = 0
 *   move() { return "moving" }
 * }
 * 
 * class Car extends Vehicle {
 *   wheels = 4
 *   doors = 4
 * }
 * 
 * const myCar = new Car()
 * myCar.color = "red"
 * 
 * const allProps = toPairsIn(myCar)
 *   .filter(([k, v]) => typeof v !== "function")
 * // [["color", "red"], ["wheels", 4], ["doors", 4]]
 * 
 * // Debugging prototype chain
 * function debugPrototypeChain(obj: any) {
 *   const pairs = toPairsIn(obj)
 *   const ownKeys = Object.keys(obj)
 *   
 *   return pairs.map(([key, value]) => ({
 *     key,
 *     value,
 *     isOwn: ownKeys.includes(String(key))
 *   }))
 * }
 * 
 * const proto2 = { inherited: "yes" }
 * const obj2 = Object.create(proto2)
 * obj2.own = "property"
 * 
 * debugPrototypeChain(obj2)
 * // [
 * //   { key: "own", value: "property", isOwn: true },
 * //   { key: "inherited", value: "yes", isOwn: false }
 * // ]
 * 
 * // Settings with fallbacks
 * class DefaultSettings {
 *   theme = "light"
 *   fontSize = 14
 *   autoSave = true
 * }
 * 
 * class UserSettings extends DefaultSettings {
 *   theme = "dark"  // Override
 *   userName = "Alice"  // Additional
 * }
 * 
 * const settings = new UserSettings()
 * const allSettings = Object.fromEntries(toPairsIn(settings))
 * // { theme: "dark", userName: "Alice", fontSize: 14, autoSave: true }
 * 
 * // Checking all properties
 * const hasProperty = (obj: any, prop: string) =>
 *   toPairsIn(obj).some(([key]) => key === prop)
 * 
 * const parent3 = { parentProp: "value" }
 * const child3 = Object.create(parent3)
 * 
 * hasProperty(child3, "parentProp")  // true (found in prototype)
 * hasProperty(child3, "missing")     // false
 * 
 * // Flattening inheritance
 * const flatten = (obj: any) => 
 *   Object.fromEntries(toPairsIn(obj))
 * 
 * const base2 = { x: 1, y: 2 }
 * const derived = Object.create(base2)
 * derived.y = 20  // Override
 * derived.z = 30
 * 
 * flatten(derived)  // { y: 20, z: 30, x: 1 }
 * 
 * // Comparison: toPairs vs toPairsIn
 * const protoObj = { inherited: "value" }
 * const ownObj = Object.create(protoObj)
 * ownObj.own = "property"
 * 
 * console.log("toPairs:", toPairs(ownObj))
 * // [["own", "property"]]
 * 
 * console.log("toPairsIn:", toPairsIn(ownObj))
 * // [["own", "property"], ["inherited", "value"]]
 * ```
 * @property Includes inherited - traverses prototype chain for enumerable properties
 * @property Own properties first - own properties appear before inherited ones
 * @property No symbol inheritance - symbols are not inherited from prototypes
 */
const toPairsIn = <T extends Record<string | symbol, Value>>(
	obj: T,
): Array<[string | symbol, Value]> => {
	// Handle null/undefined
	if (!obj || typeof obj !== "object") {
		return []
	}
	
	const pairs: Array<[string | symbol, Value]> = []
	
	// Get all enumerable properties including inherited ones
	for (const key in obj) {
		pairs.push([key, obj[key]])
	}
	
	// Get own symbol properties (symbols are not inherited)
	const symbolPairs = Object.getOwnPropertySymbols(obj)
		.map(sym => [sym, obj[sym]] as [symbol, Value])
	
	// Combine regular and symbol pairs
	return [...pairs, ...symbolPairs]
}

export default toPairsIn