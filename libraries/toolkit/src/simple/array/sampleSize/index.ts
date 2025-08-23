/**
 * Returns n random elements from the array
 * 
 * Selects n random elements from the array without replacement. Each element
 * can be selected at most once. If n is greater than array length, returns
 * all elements in random order. Uses Fisher-Yates algorithm for efficient
 * random sampling. Useful for random sampling, lottery drawings, random
 * subsets, or statistical sampling.
 * 
 * @curried (n) => (array) => result
 * @param n - Number of elements to sample
 * @param array - Array to sample from
 * @returns Array of n random elements (or all elements if n > length)
 * @example
 * ```typescript
 * // Basic sampling
 * sampleSize(3)([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
 * // [7, 2, 9] (3 random elements)
 * 
 * // Sample half the array
 * sampleSize(5)([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
 * // [3, 8, 1, 6, 10] (5 random elements)
 * 
 * // Lottery drawing
 * const numbers = Array.from({ length: 49 }, (_, i) => i + 1)
 * sampleSize(6)(numbers)
 * // [14, 7, 31, 22, 45, 3] (6 random lottery numbers)
 * 
 * // Random team selection
 * const players = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank"]
 * sampleSize(3)(players)
 * // ["Charlie", "Alice", "Frank"] (random team of 3)
 * 
 * // Random card hand
 * const deck = [
 *   "A♠", "K♠", "Q♠", "J♠", "10♠",
 *   "A♥", "K♥", "Q♥", "J♥", "10♥",
 *   "A♦", "K♦", "Q♦", "J♦", "10♦",
 *   "A♣", "K♣", "Q♣", "J♣", "10♣"
 * ]
 * sampleSize(5)(deck)
 * // ["K♥", "A♣", "10♠", "Q♦", "J♥"] (random 5-card hand)
 * 
 * // Random test cases
 * const testCases = [
 *   { input: 1, expected: 1 },
 *   { input: 2, expected: 4 },
 *   { input: 3, expected: 9 },
 *   { input: 4, expected: 16 },
 *   { input: 5, expected: 25 }
 * ]
 * sampleSize(2)(testCases)
 * // [{ input: 3, expected: 9 }, { input: 1, expected: 1 }]
 * 
 * // Random subset selection
 * const features = ["A", "B", "C", "D", "E", "F", "G", "H"]
 * sampleSize(4)(features)
 * // ["C", "F", "A", "H"] (random feature subset)
 * 
 * // Random survey participants
 * const population = Array.from({ length: 1000 }, (_, i) => ({
 *   id: i + 1,
 *   age: 18 + Math.floor(Math.random() * 62)
 * }))
 * const surveySample = sampleSize(100)(population)
 * // 100 random participants
 * 
 * // Random prize winners
 * const contestants = ["User1", "User2", "User3", "User4", "User5", "User6"]
 * const winners = sampleSize(3)(contestants)
 * // ["User4", "User1", "User6"] (3 random winners)
 * 
 * // Random color palette
 * const allColors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "cyan"]
 * sampleSize(4)(allColors)
 * // ["green", "pink", "blue", "yellow"] (random palette)
 * 
 * // Request more than available (returns all in random order)
 * sampleSize(10)([1, 2, 3, 4, 5])
 * // [3, 1, 5, 2, 4] (all elements, random order)
 * 
 * // Sample size 0
 * sampleSize(0)([1, 2, 3, 4, 5])
 * // []
 * 
 * // Sample size 1 (like sample but returns array)
 * sampleSize(1)([1, 2, 3, 4, 5])
 * // [3] (single element in array)
 * 
 * // Negative sample size (treated as 0)
 * sampleSize(-5)([1, 2, 3, 4, 5])
 * // []
 * 
 * // Empty array
 * sampleSize(3)([])
 * // []
 * 
 * // Handle null/undefined
 * sampleSize(3)(null)       // []
 * sampleSize(3)(undefined)  // []
 * 
 * // Random pairs (for matching/pairing)
 * const items = ["A", "B", "C", "D", "E", "F"]
 * const pair1 = sampleSize(2)(items)
 * // ["B", "E"]
 * const remaining = items.filter(x => !pair1.includes(x))
 * const pair2 = sampleSize(2)(remaining)
 * // ["A", "D"]
 * 
 * // Random question selection
 * const questions = [
 *   "Question 1", "Question 2", "Question 3",
 *   "Question 4", "Question 5", "Question 6",
 *   "Question 7", "Question 8", "Question 9", "Question 10"
 * ]
 * sampleSize(5)(questions)
 * // ["Question 3", "Question 7", "Question 1", "Question 9", "Question 4"]
 * 
 * // Bootstrap sampling (with replacement needs multiple calls)
 * const data = [1, 2, 3, 4, 5]
 * const bootstrap = Array.from({ length: 5 }, () => 
 *   sampleSize(1)(data)[0]
 * )
 * // [2, 5, 2, 1, 4] (may contain duplicates)
 * 
 * // Random training/test split
 * const dataset = Array.from({ length: 100 }, (_, i) => i)
 * const testSize = 20
 * const testSet = sampleSize(testSize)(dataset)
 * const trainSet = dataset.filter(x => !testSet.includes(x))
 * // testSet: 20 random samples
 * // trainSet: remaining 80 samples
 * 
 * // Random enemy spawn
 * const enemyTypes = ["goblin", "orc", "troll", "dragon", "skeleton"]
 * sampleSize(3)(enemyTypes)
 * // ["orc", "dragon", "goblin"] (3 random enemy types)
 * 
 * // Random menu selection
 * const menu = [
 *   "Appetizer1", "Appetizer2", "Appetizer3",
 *   "Main1", "Main2", "Main3", "Main4",
 *   "Dessert1", "Dessert2"
 * ]
 * sampleSize(3)(menu)
 * // ["Main2", "Appetizer1", "Dessert2"] (random 3-course meal)
 * 
 * // Partial application for common sizes
 * const pickThree = sampleSize(3)
 * pickThree([1, 2, 3, 4, 5, 6, 7])  // [4, 1, 6]
 * pickThree(["a", "b", "c", "d", "e"])  // ["b", "e", "a"]
 * 
 * // Random jury selection
 * const jurorPool = Array.from({ length: 50 }, (_, i) => `Juror${i + 1}`)
 * sampleSize(12)(jurorPool)
 * // ["Juror23", "Juror7", "Juror41", ...] (12 random jurors)
 * 
 * // Random playlist
 * const songs = [
 *   "Song1", "Song2", "Song3", "Song4", "Song5",
 *   "Song6", "Song7", "Song8", "Song9", "Song10"
 * ]
 * sampleSize(7)(songs)
 * // ["Song3", "Song8", "Song1", "Song10", "Song5", "Song2", "Song9"]
 * 
 * // A/B testing groups
 * const users = ["User1", "User2", "User3", "User4", "User5", "User6", "User7", "User8"]
 * const groupA = sampleSize(4)(users)
 * const groupB = users.filter(u => !groupA.includes(u))
 * // groupA: 4 random users
 * // groupB: remaining 4 users
 * 
 * // Random board game setup
 * const tiles = ["forest", "mountain", "lake", "desert", "plains"]
 * const board = Array.from({ length: 5 }, () => 
 *   sampleSize(5)(tiles)
 * )
 * // 5x5 grid of random terrain
 * 
 * // No duplicates guarantee
 * const unique = [1, 2, 3, 4, 5]
 * const sampled = sampleSize(5)(unique)
 * new Set(sampled).size === sampled.length
 * // true (no duplicates in result)
 * ```
 * @property Pure - Same input may return different elements
 * @property Random - Uses Fisher-Yates for uniform distribution
 * @property Without-replacement - Each element selected at most once
 */
const sampleSize = <T>(
	n: number
) => (
	array: ReadonlyArray<T> | null | undefined
): Array<T> => {
	if (array == null || !Array.isArray(array) || array.length === 0 || n <= 0) {
		return []
	}
	
	// If requesting more than available, return all in random order
	const sampleCount = Math.min(n, array.length)
	
	// Create a copy to avoid mutating original
	const copy = [...array]
	const result: Array<T> = []
	
	// Fisher-Yates shuffle, but only for n elements
	for (let i = 0; i < sampleCount; i++) {
		const randomIndex = Math.floor(Math.random() * (copy.length - i)) + i
		// Swap current with random element
		const temp = copy[i]
		copy[i] = copy[randomIndex]
		copy[randomIndex] = temp
		result.push(copy[i])
	}
	
	return result
}

export default sampleSize