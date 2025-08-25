/**
 * Returns a new array with elements randomly shuffled
 *
 * Creates a new array with all elements randomly reordered using the
 * Fisher-Yates shuffle algorithm. Produces a uniform distribution where
 * each permutation has equal probability. The original array is not
 * modified. Useful for randomizing order, card shuffling, random
 * presentation, or removing bias from sequential data.
 *
 * @curried No currying (single parameter)
 * @param array - Array to shuffle
 * @returns New array with elements in random order
 * @example
 * ```typescript
 * // Basic shuffle
 * shuffle([1, 2, 3, 4, 5])
 * // [3, 1, 5, 2, 4] (random order)
 *
 * // Shuffle again for different order
 * shuffle([1, 2, 3, 4, 5])
 * // [2, 4, 1, 5, 3] (different random order)
 *
 * // Card deck shuffling
 * const deck = [
 *   "A♠", "2♠", "3♠", "4♠", "5♠", "6♠", "7♠", "8♠", "9♠", "10♠", "J♠", "Q♠", "K♠",
 *   "A♥", "2♥", "3♥", "4♥", "5♥", "6♥", "7♥", "8♥", "9♥", "10♥", "J♥", "Q♥", "K♥",
 *   "A♦", "2♦", "3♦", "4♦", "5♦", "6♦", "7♦", "8♦", "9♦", "10♦", "J♦", "Q♦", "K♦",
 *   "A♣", "2♣", "3♣", "4♣", "5♣", "6♣", "7♣", "8♣", "9♣", "10♣", "J♣", "Q♣", "K♣"
 * ]
 * const shuffled = shuffle(deck)
 * // Complete deck in random order
 *
 * // Randomize quiz questions
 * const questions = [
 *   { id: 1, text: "Question 1" },
 *   { id: 2, text: "Question 2" },
 *   { id: 3, text: "Question 3" },
 *   { id: 4, text: "Question 4" },
 *   { id: 5, text: "Question 5" }
 * ]
 * shuffle(questions)
 * // Questions in random order
 *
 * // Randomize playlist
 * const playlist = ["Song A", "Song B", "Song C", "Song D", "Song E"]
 * shuffle(playlist)
 * // ["Song C", "Song E", "Song A", "Song D", "Song B"]
 *
 * // Random team order
 * const teams = ["Red", "Blue", "Green", "Yellow"]
 * shuffle(teams)
 * // ["Green", "Red", "Yellow", "Blue"]
 *
 * // Randomize answer choices
 * const answers = [
 *   { text: "Paris", correct: true },
 *   { text: "London", correct: false },
 *   { text: "Berlin", correct: false },
 *   { text: "Madrid", correct: false }
 * ]
 * shuffle(answers)
 * // Answers in random order (correct answer position randomized)
 *
 * // Lottery ball mixing
 * const balls = Array.from({ length: 49 }, (_, i) => i + 1)
 * shuffle(balls)
 * // [23, 7, 41, 15, ...] (all 49 numbers randomized)
 *
 * // Random seating arrangement
 * const guests = ["Alice", "Bob", "Charlie", "David", "Eve"]
 * shuffle(guests)
 * // ["David", "Alice", "Eve", "Charlie", "Bob"]
 *
 * // Randomize game board
 * const tiles = ["grass", "grass", "water", "mountain", "forest", "desert"]
 * shuffle(tiles)
 * // ["water", "grass", "desert", "grass", "forest", "mountain"]
 *
 * // Remove presentation bias
 * const products = [
 *   { id: 1, name: "Product A", price: 100 },
 *   { id: 2, name: "Product B", price: 150 },
 *   { id: 3, name: "Product C", price: 200 }
 * ]
 * shuffle(products)
 * // Products in random order (no position bias)
 *
 * // Random tournament bracket
 * const players = ["Player1", "Player2", "Player3", "Player4", "Player5", "Player6", "Player7", "Player8"]
 * shuffle(players)
 * // Random initial matchups
 *
 * // Dice roll simulation (not needed but works)
 * shuffle([1, 2, 3, 4, 5, 6])
 * // [4, 1, 6, 3, 5, 2] (all faces, random order)
 *
 * // Original unchanged
 * const original = [1, 2, 3, 4, 5]
 * const shuffled = shuffle(original)
 * console.log(original)  // [1, 2, 3, 4, 5] (unchanged)
 * console.log(shuffled)  // [3, 1, 5, 2, 4] (new array)
 *
 * // Single element (no change possible)
 * shuffle([42])
 * // [42]
 *
 * // Two elements (50% chance of swap)
 * shuffle([1, 2])
 * // [2, 1] or [1, 2]
 *
 * // Empty array
 * shuffle([])
 * // []
 *
 * // Handle null/undefined
 * shuffle(null)       // []
 * shuffle(undefined)  // []
 *
 * // Shuffle string characters
 * const chars = "HELLO".split("")
 * shuffle(chars).join("")
 * // "LHELO" (anagram)
 *
 * // Random color order
 * const colors = ["red", "green", "blue", "yellow", "purple", "orange"]
 * shuffle(colors)
 * // ["blue", "orange", "red", "purple", "green", "yellow"]
 *
 * // A/B test variations
 * const variations = ["Control", "Variant A", "Variant B", "Variant C"]
 * shuffle(variations)[0]  // Random variation for user
 * // "Variant B"
 *
 * // Random exercise routine
 * const exercises = ["Pushups", "Squats", "Lunges", "Planks", "Burpees"]
 * shuffle(exercises)
 * // ["Squats", "Burpees", "Pushups", "Planks", "Lunges"]
 *
 * // Shuffle matrix rows
 * const matrix = [
 *   [1, 2, 3],
 *   [4, 5, 6],
 *   [7, 8, 9]
 * ]
 * shuffle(matrix)
 * // [
 * //   [7, 8, 9],
 * //   [1, 2, 3],
 * //   [4, 5, 6]
 * // ]
 *
 * // Random schedule
 * const tasks = ["Task A", "Task B", "Task C", "Task D"]
 * const schedule = shuffle(tasks)
 * // ["Task C", "Task A", "Task D", "Task B"]
 *
 * // Multiple shuffles for more randomness
 * let result = [1, 2, 3, 4, 5]
 * for (let i = 0; i < 3; i++) {
 *   result = shuffle(result)
 * }
 * // Very randomized after 3 shuffles
 *
 * // Statistical uniformity test
 * const positions = { 0: 0, 1: 0, 2: 0 }
 * for (let i = 0; i < 30000; i++) {
 *   const first = shuffle(["a", "b", "c"])[0]
 *   positions[["a", "b", "c"].indexOf(first)]++
 * }
 * // positions ≈ { 0: 10000, 1: 10000, 2: 10000 }
 * // Each element has ~1/3 chance for each position
 *
 * // Random presentation order
 * const slides = ["Intro", "Problem", "Solution", "Demo", "Conclusion"]
 * shuffle(slides)
 * // ["Solution", "Intro", "Conclusion", "Problem", "Demo"]
 *
 * // Bingo number caller
 * const bingoNumbers = Array.from({ length: 75 }, (_, i) => i + 1)
 * const callingOrder = shuffle(bingoNumbers)
 * // All 75 numbers in random calling order
 *
 * // Random spawn order
 * const enemies = ["Goblin", "Orc", "Troll", "Dragon"]
 * const spawnOrder = shuffle(enemies)
 * // ["Troll", "Goblin", "Dragon", "Orc"]
 *
 * // Shuffle preserves all elements
 * const items = [1, 2, 3, 4, 5]
 * const result = shuffle(items)
 * result.length === items.length  // true
 * items.every(item => result.includes(item))  // true
 *
 * // Create randomized test data
 * const testData = Array.from({ length: 100 }, (_, i) => ({
 *   id: i,
 *   value: Math.random()
 * }))
 * const randomized = shuffle(testData)
 * // Same data, random order
 * ```
 * @property Immutable - doesn't modify input array
 * @property Random - Uses Fisher-Yates algorithm
 * @property Uniform - Each permutation equally likely
 */
const shuffle = <T>(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (array == null || !Array.isArray(array) || array.length === 0) {
		return []
	}

	// Create a copy to avoid mutating original
	const result = [...array]

	// Fisher-Yates shuffle algorithm
	for (let i = result.length - 1; i > 0; i--) {
		const randomIndex = Math.floor(Math.random() * (i + 1))
		// Swap elements at i and randomIndex
		const temp = result[i]
		result[i] = result[randomIndex]
		result[randomIndex] = temp
	}

	return result
}

export default shuffle
