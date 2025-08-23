/**
 * Returns an infinite repetition of the given array (generator function)
 * 
 * Creates a generator that yields elements from the array in a continuous
 * cycle, starting over from the beginning when it reaches the end. The
 * generator runs infinitely, so use with caution and always include a
 * termination condition when consuming it. Useful for round-robin selection,
 * creating repeating patterns, or infinite sequences.
 * 
 * @param array - Array to cycle through infinitely
 * @returns Generator that yields array elements in cycles
 * @example
 * ```typescript
 * // Basic cycling
 * const gen = cycle([1, 2, 3])
 * const result = []
 * for (let i = 0; i < 7; i++) {
 *   result.push(gen.next().value)
 * }
 * // result: [1, 2, 3, 1, 2, 3, 1]
 * 
 * // Take first n elements
 * function* take<T>(n: number, gen: Generator<T>): Generator<T> {
 *   for (let i = 0; i < n; i++) {
 *     const { value, done } = gen.next()
 *     if (done) break
 *     yield value
 *   }
 * }
 * Array.from(take(10, cycle([1, 2, 3])))
 * // [1, 2, 3, 1, 2, 3, 1, 2, 3, 1]
 * 
 * // Round-robin assignment
 * const workers = ["Alice", "Bob", "Charlie"]
 * const tasks = ["Task1", "Task2", "Task3", "Task4", "Task5", "Task6", "Task7"]
 * const assignments = []
 * const workerCycle = cycle(workers)
 * for (const task of tasks) {
 *   assignments.push({ task, assignedTo: workerCycle.next().value })
 * }
 * // [
 * //   { task: "Task1", assignedTo: "Alice" },
 * //   { task: "Task2", assignedTo: "Bob" },
 * //   { task: "Task3", assignedTo: "Charlie" },
 * //   { task: "Task4", assignedTo: "Alice" },
 * //   { task: "Task5", assignedTo: "Bob" },
 * //   { task: "Task6", assignedTo: "Charlie" },
 * //   { task: "Task7", assignedTo: "Alice" }
 * // ]
 * 
 * // Create repeating pattern
 * const pattern = cycle(["●", "○"])
 * let output = ""
 * for (let i = 0; i < 10; i++) {
 *   output += pattern.next().value
 * }
 * // output: "●○●○●○●○●○"
 * 
 * // Traffic light simulation
 * const lights = cycle(["green", "yellow", "red"])
 * const simulation = []
 * for (let i = 0; i < 7; i++) {
 *   simulation.push(lights.next().value)
 * }
 * // ["green", "yellow", "red", "green", "yellow", "red", "green"]
 * 
 * // Day rotation
 * const days = cycle(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"])
 * const week = []
 * for (let i = 0; i < 10; i++) {
 *   week.push(days.next().value)
 * }
 * // ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"]
 * 
 * // Color cycling for UI elements
 * const colors = cycle(["#FF0000", "#00FF00", "#0000FF"])
 * const elements = ["Header", "Nav", "Main", "Sidebar", "Footer"]
 * const styled = elements.map(el => ({
 *   element: el,
 *   color: colors.next().value
 * }))
 * // [
 * //   { element: "Header", color: "#FF0000" },
 * //   { element: "Nav", color: "#00FF00" },
 * //   { element: "Main", color: "#0000FF" },
 * //   { element: "Sidebar", color: "#FF0000" },
 * //   { element: "Footer", color: "#00FF00" }
 * // ]
 * 
 * // Alternating row styles
 * const rowStyles = cycle(["odd", "even"])
 * const data = ["Row1", "Row2", "Row3", "Row4", "Row5"]
 * const styledRows = data.map(row => ({
 *   content: row,
 *   class: rowStyles.next().value
 * }))
 * // [
 * //   { content: "Row1", class: "odd" },
 * //   { content: "Row2", class: "even" },
 * //   { content: "Row3", class: "odd" },
 * //   { content: "Row4", class: "even" },
 * //   { content: "Row5", class: "odd" }
 * // ]
 * 
 * // Menu cycling
 * const menuOptions = cycle(["Pizza", "Burger", "Salad"])
 * const weekMenu = []
 * for (let day = 1; day <= 7; day++) {
 *   weekMenu.push(`Day ${day}: ${menuOptions.next().value}`)
 * }
 * // [
 * //   "Day 1: Pizza",
 * //   "Day 2: Burger",
 * //   "Day 3: Salad",
 * //   "Day 4: Pizza",
 * //   "Day 5: Burger",
 * //   "Day 6: Salad",
 * //   "Day 7: Pizza"
 * // ]
 * 
 * // Single element cycles forever
 * const single = cycle([42])
 * const values = []
 * for (let i = 0; i < 5; i++) {
 *   values.push(single.next().value)
 * }
 * // [42, 42, 42, 42, 42]
 * 
 * // Empty array yields nothing
 * const empty = cycle([])
 * const emptyResult = empty.next()
 * // { value: undefined, done: true }
 * 
 * // Complex objects
 * const configs = cycle([
 *   { mode: "development", debug: true },
 *   { mode: "staging", debug: false },
 *   { mode: "production", debug: false }
 * ])
 * const deployments = []
 * for (let i = 0; i < 5; i++) {
 *   deployments.push(configs.next().value)
 * }
 * // [
 * //   { mode: "development", debug: true },
 * //   { mode: "staging", debug: false },
 * //   { mode: "production", debug: false },
 * //   { mode: "development", debug: true },
 * //   { mode: "staging", debug: false }
 * // ]
 * 
 * // Use with for...of and break condition
 * const alphabet = cycle(["a", "b", "c"])
 * const letters = []
 * let count = 0
 * for (const letter of alphabet) {
 *   letters.push(letter)
 *   count++
 *   if (count >= 8) break
 * }
 * // letters: ["a", "b", "c", "a", "b", "c", "a", "b"]
 * 
 * // Combine with other generators
 * function* zip<T, U>(gen1: Generator<T>, gen2: Generator<U>): Generator<[T, U]> {
 *   while (true) {
 *     const v1 = gen1.next()
 *     const v2 = gen2.next()
 *     if (v1.done || v2.done) break
 *     yield [v1.value, v2.value]
 *   }
 * }
 * const nums = cycle([1, 2])
 * const chars = cycle(["a", "b", "c"])
 * const paired = []
 * const zipped = zip(nums, chars)
 * for (let i = 0; i < 6; i++) {
 *   const next = zipped.next()
 *   if (!next.done) paired.push(next.value)
 * }
 * // [[1, "a"], [2, "b"], [1, "c"], [2, "a"], [1, "b"], [2, "c"]]
 * 
 * // Handle null/undefined gracefully
 * const nullGen = cycle(null)
 * nullGen.next() // { value: undefined, done: true }
 * 
 * const undefinedGen = cycle(undefined)
 * undefinedGen.next() // { value: undefined, done: true }
 * 
 * // Rotation schedule
 * const shifts = cycle(["morning", "afternoon", "night"])
 * const schedule = []
 * for (let day = 1; day <= 9; day++) {
 *   schedule.push({ day, shift: shifts.next().value })
 * }
 * // [
 * //   { day: 1, shift: "morning" },
 * //   { day: 2, shift: "afternoon" },
 * //   { day: 3, shift: "night" },
 * //   { day: 4, shift: "morning" },
 * //   { day: 5, shift: "afternoon" },
 * //   { day: 6, shift: "night" },
 * //   { day: 7, shift: "morning" },
 * //   { day: 8, shift: "afternoon" },
 * //   { day: 9, shift: "night" }
 * // ]
 * ```
 * @property Generator - returns an infinite generator
 * @property Lazy - elements are yielded on demand
 * @property Infinite - cycles forever, use with termination conditions
 */
function* cycle<T>(
	array: ReadonlyArray<T> | null | undefined
): Generator<T, void, unknown> {
	if (array == null || !Array.isArray(array) || array.length === 0) {
		return
	}
	
	while (true) {
		for (const element of array) {
			yield element
		}
	}
}

export default cycle