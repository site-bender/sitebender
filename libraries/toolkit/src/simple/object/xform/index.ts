import type { Value } from "../../../../types/index.ts"

/**
 * Transforms an object structure recursively
 * 
 * Recursively transforms an object and all its nested objects using a
 * transformation function. The transformer receives each object (including
 * nested ones) and can modify its structure. Handles circular references
 * by tracking visited objects. Arrays are traversed but not transformed
 * unless they contain objects.
 * 
 * @curried (transformer) => (obj) => result
 * @param transformer - Function to transform each object in the structure
 * @param obj - The object to transform recursively
 * @returns A new object with the transformation applied recursively
 * @example
 * ```typescript
 * // Basic recursive transformation
 * xform((obj: any) => ({
 *   ...obj,
 *   transformed: true
 * }))({
 *   a: 1,
 *   b: { c: 2 }
 * })
 * // {
 * //   a: 1,
 * //   b: { c: 2, transformed: true },
 * //   transformed: true
 * // }
 * 
 * // Add timestamps to all objects
 * xform((obj: any) => ({
 *   ...obj,
 *   timestamp: Date.now()
 * }))({
 *   user: {
 *     name: "Alice",
 *     settings: {
 *       theme: "dark"
 *     }
 *   }
 * })
 * // All objects get timestamp property
 * 
 * // Convert keys to uppercase recursively
 * xform((obj: any) => {
 *   const result: any = {}
 *   for (const key in obj) {
 *     result[key.toUpperCase()] = obj[key]
 *   }
 *   return result
 * })({
 *   name: "Bob",
 *   address: {
 *     street: "Main",
 *     city: "NYC"
 *   }
 * })
 * // {
 * //   NAME: "Bob",
 * //   ADDRESS: {
 * //     STREET: "Main",
 * //     CITY: "NYC"
 * //   }
 * // }
 * 
 * // Filter properties recursively
 * xform((obj: any) => {
 *   const result: any = {}
 *   for (const key in obj) {
 *     if (!key.startsWith("_")) {
 *       result[key] = obj[key]
 *     }
 *   }
 *   return result
 * })({
 *   name: "Item",
 *   _internal: "hidden",
 *   data: {
 *     value: 100,
 *     _secret: "removed"
 *   }
 * })
 * // {
 * //   name: "Item",
 * //   data: { value: 100 }
 * // }
 * 
 * // Arrays with objects
 * xform((obj: any) => ({
 *   ...obj,
 *   processed: true
 * }))({
 *   items: [
 *     { id: 1, name: "First" },
 *     { id: 2, name: "Second" }
 *   ]
 * })
 * // {
 * //   items: [
 * //     { id: 1, name: "First", processed: true },
 * //     { id: 2, name: "Second", processed: true }
 * //   ],
 * //   processed: true
 * // }
 * 
 * // Conditional transformation
 * xform((obj: any) => {
 *   if (obj.type === "user") {
 *     return { ...obj, role: obj.role || "guest" }
 *   }
 *   return obj
 * })({
 *   type: "user",
 *   name: "Alice",
 *   nested: {
 *     type: "user",
 *     name: "Bob"
 *   }
 * })
 * // Both user objects get default role
 * 
 * // Circular reference handling
 * const circular: any = { a: 1 }
 * circular.self = circular
 * 
 * xform((obj: any) => ({
 *   ...obj,
 *   visited: true
 * }))(circular)
 * // Handles circular reference without infinite loop
 * 
 * // Practical use cases
 * 
 * // Add metadata to all nested objects
 * const addMetadata = xform((obj: any) => ({
 *   ...obj,
 *   _meta: {
 *     processed: true,
 *     timestamp: Date.now(),
 *     version: 1
 *   }
 * }))
 * 
 * addMetadata({
 *   product: {
 *     name: "Widget",
 *     details: {
 *       weight: 100,
 *       dimensions: { w: 10, h: 20 }
 *     }
 *   }
 * })
 * // All nested objects get _meta property
 * 
 * // Clean data recursively
 * const cleanData = xform((obj: any) => {
 *   const cleaned: any = {}
 *   for (const key in obj) {
 *     const value = obj[key]
 *     if (value !== null && value !== undefined && value !== "") {
 *       cleaned[key] = value
 *     }
 *   }
 *   return cleaned
 * })
 * 
 * cleanData({
 *   name: "Item",
 *   value: null,
 *   data: {
 *     id: 1,
 *     empty: "",
 *     nested: {
 *       field: "value",
 *       blank: null
 *     }
 *   }
 * })
 * // Removes all null, undefined, and empty string values recursively
 * 
 * // Normalize keys recursively
 * const normalizeKeys = xform((obj: any) => {
 *   const normalized: any = {}
 *   for (const key in obj) {
 *     const newKey = key.replace(/([A-Z])/g, "_$1").toLowerCase()
 *     normalized[newKey] = obj[key]
 *   }
 *   return normalized
 * })
 * 
 * normalizeKeys({
 *   userName: "Alice",
 *   userSettings: {
 *     darkMode: true,
 *     fontSize: 14
 *   }
 * })
 * // {
 * //   user_name: "Alice",
 * //   user_settings: {
 * //     dark_mode: true,
 * //     font_size: 14
 * //   }
 * // }
 * 
 * // Add defaults recursively
 * const withDefaults = xform((obj: any) => {
 *   const defaults: Record<string, any> = {
 *     active: true,
 *     visible: true,
 *     editable: false
 *   }
 *   return { ...defaults, ...obj }
 * })
 * 
 * withDefaults({
 *   name: "Component",
 *   children: {
 *     type: "button",
 *     nested: {
 *       label: "Click"
 *     }
 *   }
 * })
 * // All objects get default properties
 * 
 * // Type tagging
 * const addTypeInfo = xform((obj: any) => ({
 *   ...obj,
 *   __type: Array.isArray(obj) ? "array" : "object",
 *   __keys: Object.keys(obj).length
 * }))
 * 
 * // Redact sensitive data
 * const redactSensitive = xform((obj: any) => {
 *   const redacted: any = {}
 *   const sensitiveKeys = ["password", "ssn", "creditCard", "secret"]
 *   
 *   for (const key in obj) {
 *     if (sensitiveKeys.includes(key)) {
 *       redacted[key] = "[REDACTED]"
 *     } else {
 *       redacted[key] = obj[key]
 *     }
 *   }
 *   return redacted
 * })
 * 
 * redactSensitive({
 *   user: "alice",
 *   password: "secret123",
 *   profile: {
 *     ssn: "123-45-6789",
 *     age: 30
 *   }
 * })
 * // {
 * //   user: "alice",
 * //   password: "[REDACTED]",
 * //   profile: {
 * //     ssn: "[REDACTED]",
 * //     age: 30
 * //   }
 * // }
 * 
 * // Partial application for specific transformations
 * const addId = xform((obj: any) => ({
 *   ...obj,
 *   id: Math.random().toString(36).substr(2, 9)
 * }))
 * 
 * const tree = {
 *   node: "root",
 *   children: [
 *     { node: "child1" },
 *     { node: "child2", children: [{ node: "grandchild" }] }
 *   ]
 * }
 * 
 * addId(tree)
 * // All objects in tree get unique id
 * ```
 * @property Deep recursion - transforms all nested objects
 * @property Circular safe - handles circular references
 * @property Array traversal - processes objects within arrays
 */
const xform = <T extends Record<string | symbol, Value>>(
	transformer: (obj: any) => any,
) => (
	obj: T,
): any => {
	// Handle primitives and null/undefined
	if (obj === null || obj === undefined || typeof obj !== "object") {
		return obj
	}
	
	// Track visited objects for circular reference handling
	const visited = new WeakMap()
	
	const transformRecursive = (current: any): any => {
		// Handle primitives
		if (current === null || current === undefined || typeof current !== "object") {
			return current
		}
		
		// Check for circular reference
		if (visited.has(current)) {
			return visited.get(current)
		}
		
		// Handle arrays - traverse but don't transform the array itself
		if (Array.isArray(current)) {
			const result: Array<any> = []
			visited.set(current, result)
			
			current.forEach((item, index) => {
				result[index] = transformRecursive(item)
			})
			
			return result
		}
		
		// Transform the object
		const transformed = transformer(current)
		visited.set(current, transformed)
		
		// Recursively transform nested objects
		const result: Record<string | symbol, any> = {}
		
		for (const key in transformed) {
			if (Object.prototype.hasOwnProperty.call(transformed, key)) {
				const value = transformed[key]
				result[key] = transformRecursive(value)
			}
		}
		
		// Handle symbol keys
		const symbols = Object.getOwnPropertySymbols(transformed)
		for (const sym of symbols) {
			const value = transformed[sym]
			result[sym] = transformRecursive(value)
		}
		
		return result
	}
	
	return transformRecursive(obj)
}

export default xform