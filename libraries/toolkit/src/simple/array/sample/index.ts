/**
 * Returns a random element from the array
 *
 * Selects a single random element from the array using uniform distribution.
 * Each element has an equal probability of being selected. Returns undefined
 * for empty arrays or null/undefined inputs. Uses Math.random() internally
 * for randomness. Useful for random selection, sampling, Monte Carlo methods,
 * or game mechanics.
 *
 * @curried No currying (single parameter)
 * @param array - Array to sample from
 * @returns Random element from the array, or undefined if array is empty
 * @example
 * ```typescript
 * // Basic usage
 * const items = [1, 2, 3, 4, 5]
 * sample(items)
 * // 3 (random element, could be any from 1-5)
 *
 * // String array
 * const colors = ["red", "green", "blue", "yellow", "purple"]
 * sample(colors)
 * // "blue" (random color)
 *
 * // Random selection from options
 * const choices = ["rock", "paper", "scissors"]
 * sample(choices)
 * // "scissors" (random choice)
 *
 * // Random user selection
 * const users = [
 *   { id: 1, name: "Alice" },
 *   { id: 2, name: "Bob" },
 *   { id: 3, name: "Charlie" }
 * ]
 * sample(users)
 * // { id: 2, name: "Bob" } (random user)
 *
 * // Dice roll simulation
 * const d6 = [1, 2, 3, 4, 5, 6]
 * sample(d6)
 * // 4 (random die face)
 *
 * // Random quote
 * const quotes = [
 *   "To be or not to be",
 *   "I think therefore I am",
 *   "Knowledge is power"
 * ]
 * sample(quotes)
 * // "Knowledge is power" (random quote)
 *
 * // Random reward
 * const rewards = [10, 20, 50, 100, 500]
 * sample(rewards)
 * // 50 (random reward amount)
 *
 * // Lottery drawing
 * const numbers = Array.from({ length: 49 }, (_, i) => i + 1)
 * sample(numbers)
 * // 27 (random lottery number)
 *
 * // Random team assignment
 * const teams = ["Team A", "Team B", "Team C", "Team D"]
 * sample(teams)
 * // "Team C" (random team)
 *
 * // Random direction
 * const directions = ["north", "south", "east", "west"]
 * sample(directions)
 * // "east" (random direction)
 *
 * // Random action selection
 * const actions = ["attack", "defend", "heal", "flee"]
 * sample(actions)
 * // "defend" (random action)
 *
 * // Random card draw
 * const deck = ["A♠", "K♥", "Q♦", "J♣", "10♠", "9♥", "8♦", "7♣"]
 * sample(deck)
 * // "K♥" (random card)
 *
 * // Random spawn point
 * const spawnPoints = [
 *   { x: 0, y: 0 },
 *   { x: 100, y: 50 },
 *   { x: -50, y: 75 }
 * ]
 * sample(spawnPoints)
 * // { x: 100, y: 50 } (random spawn)
 *
 * // Random menu item
 * const menu = ["Pizza", "Burger", "Salad", "Pasta", "Soup"]
 * sample(menu)
 * // "Pasta" (random dish)
 *
 * // Random emoji
 * const emojis = ["😀", "😎", "🎉", "🚀", "💡"]
 * sample(emojis)
 * // "🎉" (random emoji)
 *
 * // Single element (always returns it)
 * sample([42])
 * // 42
 *
 * // Empty array
 * sample([])
 * // undefined
 *
 * // Handle null/undefined
 * sample(null)       // undefined
 * sample(undefined)  // undefined
 *
 * // Random boolean
 * sample([true, false])
 * // false (50% chance of each)
 *
 * // Weighted selection (duplicate for higher probability)
 * const weighted = ["common", "common", "common", "rare", "legendary"]
 * sample(weighted)
 * // "common" (60% chance)
 *
 * // Random test data
 * const testData = [
 *   { status: "success", value: 100 },
 *   { status: "pending", value: 50 },
 *   { status: "failed", value: 0 }
 * ]
 * sample(testData)
 * // { status: "pending", value: 50 } (random test case)
 *
 * // Multiple samples (call multiple times)
 * const roll = () => sample([1, 2, 3, 4, 5, 6])
 * [roll(), roll(), roll()]
 * // [3, 6, 2] (three random dice rolls)
 *
 * // Random playlist song
 * const playlist = ["Song A", "Song B", "Song C", "Song D"]
 * const nowPlaying = sample(playlist)
 * // "Song B" (random song)
 *
 * // Random AI behavior
 * const behaviors = ["aggressive", "defensive", "neutral", "friendly"]
 * sample(behaviors)
 * // "neutral" (random AI behavior)
 *
 * // Random password character
 * const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%".split("")
 * sample(chars)
 * // "M" (random character)
 *
 * // Random color generation
 * const r = sample(Array.from({ length: 256 }, (_, i) => i))
 * const g = sample(Array.from({ length: 256 }, (_, i) => i))
 * const b = sample(Array.from({ length: 256 }, (_, i) => i))
 * // rgb(128, 45, 200) (random RGB color)
 *
 * // Random scheduling
 * const timeslots = ["9:00", "10:00", "11:00", "14:00", "15:00"]
 * sample(timeslots)
 * // "11:00" (random time slot)
 *
 * // Random difficulty
 * const difficulties = ["easy", "medium", "hard", "expert"]
 * sample(difficulties)
 * // "medium" (random difficulty)
 *
 * // Random theme
 * const themes = ["light", "dark", "sepia", "high-contrast"]
 * sample(themes)
 * // "dark" (random theme)
 *
 * // Distribution test (approximately uniform)
 * const counts = { a: 0, b: 0, c: 0 }
 * for (let i = 0; i < 30000; i++) {
 *   const result = sample(["a", "b", "c"])
 *   counts[result]++
 * }
 * // counts ≈ { a: 10000, b: 10000, c: 10000 }
 *
 * // Random error simulation
 * const errors = [null, null, null, null, new Error("Random failure")]
 * sample(errors)
 * // null (80% success rate)
 *
 * // Random decision making
 * const decide = (options: string[]) => {
 *   console.log("Randomly selected:", sample(options))
 * }
 * decide(["Option A", "Option B", "Option C"])
 * // "Randomly selected: Option B"
 * ```
 * @property Pure - Same array may return different elements
 * @property Random - Uses Math.random() for selection
 * @property Uniform - Equal probability for each element
 */
const sample = <T>(
	array: ReadonlyArray<T> | null | undefined,
): T | undefined => {
	if (array == null || !Array.isArray(array) || array.length === 0) {
		return undefined
	}

	const index = Math.floor(Math.random() * array.length)
	return array[index]
}

export default sample
