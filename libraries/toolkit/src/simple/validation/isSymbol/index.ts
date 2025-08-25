/**
 * Type guard that checks if a value is a symbol primitive
 *
 * Determines whether a value is a symbol, a primitive data type introduced in ES6.
 * Symbols are unique and immutable identifiers often used for object property keys
 * to avoid naming collisions. Every symbol is unique, even if created with the same
 * description. This function uses typeof operator and provides TypeScript type narrowing.
 *
 * Symbol detection:
 * - Symbol(): Creates unique symbols
 * - Symbol("description"): Symbols with descriptions
 * - Symbol.for("key"): Global registry symbols
 * - Well-known symbols: Symbol.iterator, Symbol.hasInstance, etc.
 * - Not included: Symbol objects (Object(Symbol()))
 * - Type narrowing: provides TypeScript type guard
 *
 * @param value - The value to check
 * @returns True if the value is a symbol primitive, false otherwise
 * @example
 * ```typescript
 * // Symbol creation
 * isSymbol(Symbol())                   // true
 * isSymbol(Symbol("id"))               // true
 * isSymbol(Symbol("id"))               // true (different from above)
 * isSymbol(Symbol.for("global"))       // true
 * isSymbol(Symbol.for("global"))       // true (same as above)
 *
 * // Well-known symbols
 * isSymbol(Symbol.iterator)            // true
 * isSymbol(Symbol.hasInstance)         // true
 * isSymbol(Symbol.toPrimitive)         // true
 * isSymbol(Symbol.toStringTag)         // true
 * isSymbol(Symbol.asyncIterator)       // true
 *
 * // Not symbols
 * isSymbol("Symbol()")                 // false (string)
 * isSymbol("symbol")                   // false (string)
 * isSymbol(123)                        // false (number)
 * isSymbol(true)                       // false (boolean)
 * isSymbol(null)                       // false
 * isSymbol(undefined)                  // false
 * isSymbol({})                         // false (object)
 * isSymbol([])                         // false (array)
 *
 * // Boxed symbols (not primitives)
 * isSymbol(Object(Symbol()))           // false (Symbol object)
 * isSymbol(new Object(Symbol()))       // false (Symbol object)
 *
 * // Type narrowing in TypeScript
 * function getSymbolDescription(value: unknown): string | undefined {
 *   if (isSymbol(value)) {
 *     // TypeScript knows value is symbol here
 *     return value.description
 *   }
 *   return undefined
 * }
 *
 * getSymbolDescription(Symbol("test")) // "test"
 * getSymbolDescription(Symbol())       // undefined
 * getSymbolDescription("not symbol")   // undefined
 *
 * // Filtering symbols from mixed array
 * const mixed = [
 *   Symbol("a"),
 *   "string",
 *   123,
 *   Symbol.for("global"),
 *   null,
 *   Symbol.iterator,
 *   true
 * ]
 *
 * const symbols = mixed.filter(isSymbol)
 * // [Symbol(a), Symbol.for("global"), Symbol.iterator]
 *
 * // Symbol registry checking
 * function isGlobalSymbol(value: unknown): boolean {
 *   if (!isSymbol(value)) return false
 *
 *   const key = Symbol.keyFor(value)
 *   return key !== undefined
 * }
 *
 * isGlobalSymbol(Symbol.for("app.id")) // true
 * isGlobalSymbol(Symbol("local"))      // false
 * isGlobalSymbol("not symbol")         // false
 *
 * // Object property keys
 * interface SymbolKeyed {
 *   [key: symbol]: unknown
 *   [key: string]: unknown
 * }
 *
 * function getSymbolProperties(obj: SymbolKeyed): Array<symbol> {
 *   return Object.getOwnPropertySymbols(obj)
 *     .filter(isSymbol)  // Always true, but for demonstration
 * }
 *
 * const obj = {
 *   [Symbol("private")]: "hidden",
 *   public: "visible"
 * }
 * getSymbolProperties(obj)            // [Symbol(private)]
 *
 * // Unique ID generation
 * function createId(description?: unknown): symbol {
 *   if (isString(description)) {
 *     return Symbol(description)
 *   }
 *   return Symbol()
 * }
 *
 * const id1 = createId("user")        // Symbol(user)
 * const id2 = createId("user")        // Symbol(user) - different!
 * id1 === id2                         // false
 *
 * // Symbol comparison
 * function symbolsEqual(a: unknown, b: unknown): boolean {
 *   if (!isSymbol(a) || !isSymbol(b)) {
 *     return false
 *   }
 *   // Symbols are only equal to themselves
 *   return a === b
 * }
 *
 * const sym = Symbol("test")
 * symbolsEqual(sym, sym)              // true
 * symbolsEqual(Symbol("a"), Symbol("a")) // false
 * symbolsEqual(Symbol.for("x"), Symbol.for("x")) // true
 *
 * // Private property implementation
 * const _private = Symbol("private")
 *
 * class SecureClass {
 *   [_private]: string = "secret"
 *
 *   getPrivate(): string | undefined {
 *     const key = _private
 *     if (isSymbol(key)) {
 *       return this[key]
 *     }
 *     return undefined
 *   }
 * }
 *
 * // Symbol to string conversion
 * function symbolToString(value: unknown): string {
 *   if (isSymbol(value)) {
 *     return value.toString()
 *   }
 *   return ""
 * }
 *
 * symbolToString(Symbol("test"))      // "Symbol(test)"
 * symbolToString(Symbol())            // "Symbol()"
 * symbolToString(Symbol.for("global")) // "Symbol(global)"
 * symbolToString("not symbol")        // ""
 *
 * // Metadata system using symbols
 * const metadata = new Map<symbol, unknown>()
 *
 * function setMetadata(key: unknown, value: unknown): void {
 *   if (isSymbol(key)) {
 *     metadata.set(key, value)
 *   }
 * }
 *
 * function getMetadata(key: unknown): unknown {
 *   if (isSymbol(key)) {
 *     return metadata.get(key)
 *   }
 *   return undefined
 * }
 *
 * const META_TYPE = Symbol("type")
 * setMetadata(META_TYPE, "user")
 * getMetadata(META_TYPE)              // "user"
 *
 * // Enum-like constants with symbols
 * const Colors = {
 *   RED: Symbol("red"),
 *   GREEN: Symbol("green"),
 *   BLUE: Symbol("blue")
 * } as const
 *
 * function isColor(value: unknown): boolean {
 *   return isSymbol(value) &&
 *          Object.values(Colors).includes(value as symbol)
 * }
 *
 * isColor(Colors.RED)                 // true
 * isColor(Symbol("red"))              // false (different symbol)
 * isColor("red")                      // false
 *
 * // Iterator protocol
 * class Collection {
 *   private items: Array<unknown> = []
 *
 *   [Symbol.iterator]() {
 *     let index = 0
 *     const items = this.items
 *
 *     return {
 *       next() {
 *         if (index < items.length) {
 *           return { value: items[index++], done: false }
 *         }
 *         return { done: true }
 *       }
 *     }
 *   }
 * }
 *
 * const coll = new Collection()
 * isSymbol(Symbol.iterator)           // true
 * Symbol.iterator in coll             // true
 *
 * // React prop filtering (symbols not allowed)
 * function filterProps(props: Record<string | symbol, unknown>) {
 *   const filtered: Record<string, unknown> = {}
 *
 *   for (const [key, value] of Object.entries(props)) {
 *     // Only string keys pass to React
 *     if (!isSymbol(key)) {
 *       filtered[key] = value
 *     }
 *   }
 *
 *   return filtered
 * }
 *
 * // Symbol serialization check
 * function canSerialize(value: unknown): boolean {
 *   // Symbols can't be JSON serialized
 *   if (isSymbol(value)) return false
 *
 *   if (typeof value === "object" && value !== null) {
 *     return !Object.getOwnPropertySymbols(value).length
 *   }
 *
 *   return true
 * }
 *
 * canSerialize(Symbol("test"))        // false
 * canSerialize({ [Symbol("a")]: 1 })  // false
 * canSerialize({ a: 1 })              // true
 *
 * // WeakMap key validation
 * function isValidWeakMapKey(value: unknown): boolean {
 *   // WeakMap keys must be objects, not symbols
 *   return typeof value === "object" &&
 *          value !== null &&
 *          !isSymbol(value)
 * }
 *
 * isValidWeakMapKey({})               // true
 * isValidWeakMapKey(Symbol())         // false
 * isValidWeakMapKey("string")         // false
 *
 * // Type branding with symbols
 * const BrandKey = Symbol("brand")
 * type Branded<T, B> = T & { [BrandKey]: B }
 *
 * function isBranded(value: unknown): boolean {
 *   return typeof value === "object" &&
 *          value !== null &&
 *          isSymbol(BrandKey) &&
 *          BrandKey in value
 * }
 * ```
 * @property Pure - Always returns the same result for the same input
 * @property TypeGuard - Narrows TypeScript types to symbol
 * @property Primitive - Only checks for symbol primitives, not objects
 * @property ES6+ - Symbols are ES6/ES2015+ feature
 */
const isSymbol = (value: unknown): value is symbol => typeof value === "symbol"

export default isSymbol
