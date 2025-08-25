import type { Value } from "../../../types/index.ts"

/**
 * Transforms an object using a transformation specification
 *
 * Applies a set of transformation functions to an object's properties based
 * on a specification object. Each key in the spec corresponds to a key in the
 * result, and each value is a function that computes the result value from
 * the input object. Powerful for reshaping and deriving new data structures.
 *
 * @curried (spec) => (obj) => result
 * @param spec - Object mapping result keys to transformation functions
 * @param obj - The object to transform
 * @returns A new object with transformed values according to the spec
 * @example
 * ```typescript
 * // Basic transformation
 * transform({
 *   fullName: (obj: any) => `${obj.firstName} ${obj.lastName}`,
 *   age: (obj: any) => obj.age,
 *   isAdult: (obj: any) => obj.age >= 18
 * })({
 *   firstName: "John",
 *   lastName: "Doe",
 *   age: 25
 * })
 * // { fullName: "John Doe", age: 25, isAdult: true }
 *
 * // Property renaming and computation
 * transform({
 *   id: (obj: any) => obj.user_id,
 *   name: (obj: any) => obj.user_name,
 *   email: (obj: any) => obj.user_email.toLowerCase(),
 *   joined: (obj: any) => new Date(obj.created_at)
 * })({
 *   user_id: 123,
 *   user_name: "Alice",
 *   user_email: "ALICE@EXAMPLE.COM",
 *   created_at: "2024-01-01"
 * })
 * // { id: 123, name: "Alice", email: "alice@example.com", joined: Date(...) }
 *
 * // Nested property access
 * transform({
 *   street: (obj: any) => obj.address.street,
 *   city: (obj: any) => obj.address.city,
 *   fullAddress: (obj: any) => `${obj.address.street}, ${obj.address.city}`
 * })({
 *   name: "Bob",
 *   address: {
 *     street: "123 Main St",
 *     city: "NYC",
 *     zip: "10001"
 *   }
 * })
 * // { street: "123 Main St", city: "NYC", fullAddress: "123 Main St, NYC" }
 *
 * // Conditional transformations
 * transform({
 *   status: (obj: any) => obj.active ? "active" : "inactive",
 *   discount: (obj: any) => obj.premium ? 0.2 : 0,
 *   price: (obj: any) => obj.basePrice * (1 - (obj.premium ? 0.2 : 0))
 * })({
 *   active: true,
 *   premium: true,
 *   basePrice: 100
 * })
 * // { status: "active", discount: 0.2, price: 80 }
 *
 * // Array aggregation
 * transform({
 *   total: (obj: any) => obj.items.reduce((sum: number, item: any) => sum + item.price, 0),
 *   count: (obj: any) => obj.items.length,
 *   average: (obj: any) => obj.items.reduce((sum: number, item: any) => sum + item.price, 0) / obj.items.length
 * })({
 *   items: [
 *     { name: "A", price: 10 },
 *     { name: "B", price: 20 },
 *     { name: "C", price: 30 }
 *   ]
 * })
 * // { total: 60, count: 3, average: 20 }
 *
 * // Constant values
 * transform({
 *   type: () => "user",
 *   version: () => 2,
 *   timestamp: () => Date.now(),
 *   data: (obj: any) => obj
 * })({
 *   name: "Carol",
 *   age: 30
 * })
 * // { type: "user", version: 2, timestamp: 1234567890, data: { name: "Carol", age: 30 } }
 *
 * // Missing properties handled gracefully
 * transform({
 *   name: (obj: any) => obj.name || "Anonymous",
 *   email: (obj: any) => obj.email || "no-email@example.com",
 *   age: (obj: any) => obj.age || 0
 * })({
 *   name: "Dave"
 * })
 * // { name: "Dave", email: "no-email@example.com", age: 0 }
 *
 * // Practical use cases
 *
 * // API response transformation
 * const transformApiResponse = transform({
 *   id: (r: any) => r.data.id,
 *   items: (r: any) => r.data.results,
 *   hasMore: (r: any) => r.data.page < r.data.total_pages,
 *   nextPage: (r: any) => r.data.page + 1,
 *   totalCount: (r: any) => r.data.total_count
 * })
 *
 * transformApiResponse({
 *   data: {
 *     id: "abc123",
 *     results: [1, 2, 3],
 *     page: 1,
 *     total_pages: 5,
 *     total_count: 50
 *   },
 *   status: 200
 * })
 * // { id: "abc123", items: [1, 2, 3], hasMore: true, nextPage: 2, totalCount: 50 }
 *
 * // User profile formatting
 * const formatUserProfile = transform({
 *   displayName: (u: any) => `${u.firstName} ${u.lastName}`,
 *   avatar: (u: any) => u.avatarUrl || "/default-avatar.png",
 *   memberSince: (u: any) => new Date(u.createdAt).getFullYear(),
 *   badges: (u: any) => u.achievements.map((a: any) => a.badge),
 *   isPremium: (u: any) => u.subscription === "premium"
 * })
 *
 * formatUserProfile({
 *   firstName: "Jane",
 *   lastName: "Smith",
 *   avatarUrl: null,
 *   createdAt: "2020-06-15",
 *   achievements: [
 *     { badge: "gold", date: "2021-01-01" },
 *     { badge: "silver", date: "2020-08-01" }
 *   ],
 *   subscription: "premium"
 * })
 * // {
 * //   displayName: "Jane Smith",
 * //   avatar: "/default-avatar.png",
 * //   memberSince: 2020,
 * //   badges: ["gold", "silver"],
 * //   isPremium: true
 * // }
 *
 * // Order summary calculation
 * const calculateOrderSummary = transform({
 *   subtotal: (o: any) => o.items.reduce((sum: number, item: any) =>
 *     sum + (item.price * item.quantity), 0),
 *   tax: (o: any) => o.items.reduce((sum: number, item: any) =>
 *     sum + (item.price * item.quantity), 0) * o.taxRate,
 *   shipping: (o: any) => o.items.reduce((sum: number, item: any) =>
 *     sum + (item.price * item.quantity), 0) > 100 ? 0 : 10,
 *   total: (o: any) => {
 *     const subtotal = o.items.reduce((sum: number, item: any) =>
 *       sum + (item.price * item.quantity), 0)
 *     const tax = subtotal * o.taxRate
 *     const shipping = subtotal > 100 ? 0 : 10
 *     return subtotal + tax + shipping
 *   }
 * })
 *
 * calculateOrderSummary({
 *   items: [
 *     { name: "Widget", price: 25, quantity: 2 },
 *     { name: "Gadget", price: 35, quantity: 1 }
 *   ],
 *   taxRate: 0.08
 * })
 * // { subtotal: 85, tax: 6.8, shipping: 10, total: 101.8 }
 *
 * // Data normalization
 * const normalizeRecord = transform({
 *   id: (r: any) => String(r.id || r._id || r.ID),
 *   type: (r: any) => r.type || r.kind || r.category || "unknown",
 *   name: (r: any) => (r.name || r.title || r.label || "").trim(),
 *   createdAt: (r: any) => r.createdAt || r.created_at || r.timestamp || null,
 *   metadata: (r: any) => ({
 *     source: r.source || "unknown",
 *     version: r.version || 1
 *   })
 * })
 *
 * // Metric calculation
 * const calculateMetrics = transform({
 *   clickRate: (d: any) => (d.clicks / d.impressions * 100).toFixed(2) + "%",
 *   conversionRate: (d: any) => (d.conversions / d.clicks * 100).toFixed(2) + "%",
 *   costPerClick: (d: any) => "$" + (d.cost / d.clicks).toFixed(2),
 *   roi: (d: any) => ((d.revenue - d.cost) / d.cost * 100).toFixed(2) + "%"
 * })
 *
 * calculateMetrics({
 *   impressions: 10000,
 *   clicks: 500,
 *   conversions: 25,
 *   cost: 100,
 *   revenue: 500
 * })
 * // { clickRate: "5.00%", conversionRate: "5.00%", costPerClick: "$0.20", roi: "400.00%" }
 *
 * // Partial application for reusable transformers
 * const pickAndRename = (mapping: Record<string, string>) =>
 *   transform(
 *     Object.fromEntries(
 *       Object.entries(mapping).map(([newKey, oldKey]) =>
 *         [newKey, (obj: any) => obj[oldKey]]
 *       )
 *     )
 *   )
 *
 * const renamer = pickAndRename({
 *   id: "user_id",
 *   name: "user_name",
 *   email: "user_email"
 * })
 *
 * renamer({
 *   user_id: 1,
 *   user_name: "Alice",
 *   user_email: "alice@ex.com",
 *   extra: "data"
 * })
 * // { id: 1, name: "Alice", email: "alice@ex.com" }
 * ```
 * @property Flexible transformation - each property can have custom logic
 * @property Derived values - compute new values from multiple source properties
 * @property Type transformation - can change types during transformation
 */
const transform = <S extends Record<string, (obj: any) => Value>>(
	spec: S,
) =>
<T extends Record<string | symbol, Value>>(
	obj: T,
): { [K in keyof S]: ReturnType<S[K]> } => {
	// Handle null/undefined
	if (!obj || typeof obj !== "object") {
		// Still run transformations with empty object
		obj = {} as T
	}

	const result = {} as { [K in keyof S]: ReturnType<S[K]> }

	// Apply each transformation in the spec
	for (const key in spec) {
		if (Object.prototype.hasOwnProperty.call(spec, key)) {
			const transformer = spec[key]
			result[key] = transformer(obj) as ReturnType<S[typeof key]>
		}
	}

	return result
}

export default transform
