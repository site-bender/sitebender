/**
 * Creates a predicate that returns true when none of the predicates pass
 *
 * Takes an array of predicate functions and returns a new predicate that
 * returns true only when ALL provided predicates return false. This is the
 * opposite of anyPass/some. Useful for ensuring a value doesn't match any
 * of several conditions, validation exclusions, and blacklist filtering.
 *
 * Evaluation rules:
 * - Returns true if all predicates return false
 * - Returns false if any predicate returns true
 * - Short-circuits on first true (stops evaluation)
 * - Empty array returns true (vacuous truth)
 *
 * @param predicates - Array of predicate functions to test
 * @returns A predicate that returns true when no input predicates pass
 * @example
 * ```typescript
 * // Basic usage
 * const isEven = (n: number) => n % 2 === 0
 * const isNegative = (n: number) => n < 0
 * const isZero = (n: number) => n === 0
 *
 * const noneOfThese = nonePass([isEven, isNegative, isZero])
 *
 * noneOfThese(5)                       // true (odd, positive, non-zero)
 * noneOfThese(3)                       // true
 * noneOfThese(2)                       // false (even)
 * noneOfThese(-3)                      // false (negative)
 * noneOfThese(0)                       // false (zero and even)
 *
 * // String validation exclusions
 * const isEmpty = (s: string) => s.length === 0
 * const hasSpaces = (s: string) => /\s/.test(s)
 * const hasNumbers = (s: string) => /\d/.test(s)
 * const hasSpecialChars = (s: string) => /[^a-zA-Z]/.test(s)
 *
 * const isSimpleWord = nonePass([
 *   isEmpty,
 *   hasSpaces,
 *   hasNumbers,
 *   hasSpecialChars
 * ])
 *
 * isSimpleWord("hello")                // true
 * isSimpleWord("Hello")                // true
 * isSimpleWord("")                     // false (empty)
 * isSimpleWord("hello world")          // false (has space)
 * isSimpleWord("hello123")             // false (has numbers)
 * isSimpleWord("hello!")               // false (has special char)
 *
 * // Type exclusion
 * const isNull = (v: unknown) => v === null
 * const isUndefined = (v: unknown) => v === undefined
 * const isNaN = (v: unknown) => Number.isNaN(v)
 * const isInfinity = (v: unknown) => v === Infinity || v === -Infinity
 *
 * const isNormalValue = nonePass([isNull, isUndefined, isNaN, isInfinity])
 *
 * isNormalValue(42)                    // true
 * isNormalValue("hello")               // true
 * isNormalValue(null)                  // false
 * isNormalValue(undefined)             // false
 * isNormalValue(NaN)                   // false
 * isNormalValue(Infinity)              // false
 *
 * // Blacklist filtering
 * const bannedWords = ["spam", "scam", "fake", "virus"]
 * const containsBannedWord = bannedWords.map(word =>
 *   (text: string) => text.toLowerCase().includes(word)
 * )
 *
 * const isCleanText = nonePass(containsBannedWord)
 *
 * isCleanText("This is a great product")  // true
 * isCleanText("This is not spam")         // false
 * isCleanText("Beware of scams")          // false
 * isCleanText("Genuine article")          // true
 *
 * // Error condition checking
 * const hasError = (state: any) => !!state.error
 * const isLoading = (state: any) => state.loading
 * const isDisabled = (state: any) => state.disabled
 * const isOffline = (state: any) => !state.online
 *
 * const canProceed = nonePass([
 *   hasError,
 *   isLoading,
 *   isDisabled,
 *   isOffline
 * ])
 *
 * canProceed({ online: true })         // true
 * canProceed({ loading: true, online: true }) // false
 * canProceed({ error: "Failed", online: true }) // false
 * canProceed({ disabled: true, online: true }) // false
 *
 * // Character class exclusion
 * const isVowel = (c: string) => /^[aeiouAEIOU]$/.test(c)
 * const isDigit = (c: string) => /^\d$/.test(c)
 * const isWhitespace = (c: string) => /^\s$/.test(c)
 *
 * const isConsonant = nonePass([isVowel, isDigit, isWhitespace])
 *
 * isConsonant("b")                     // true
 * isConsonant("a")                     // false (vowel)
 * isConsonant("5")                     // false (digit)
 * isConsonant(" ")                     // false (whitespace)
 * isConsonant("z")                     // true
 *
 * // Complex filtering
 * interface User {
 *   age: number
 *   role: string
 *   banned: boolean
 *   verified: boolean
 * }
 *
 * const isUnderage = (u: User) => u.age < 18
 * const isBanned = (u: User) => u.banned
 * const isUnverified = (u: User) => !u.verified
 * const isGuest = (u: User) => u.role === "guest"
 *
 * const canAccessContent = nonePass([
 *   isUnderage,
 *   isBanned,
 *   isUnverified,
 *   isGuest
 * ])
 *
 * canAccessContent({
 *   age: 25,
 *   role: "user",
 *   banned: false,
 *   verified: true
 * })                                   // true
 *
 * canAccessContent({
 *   age: 16,
 *   role: "user",
 *   banned: false,
 *   verified: true
 * })                                   // false (underage)
 *
 * // HTTP method exclusion
 * const isGet = (method: string) => method === "GET"
 * const isHead = (method: string) => method === "HEAD"
 * const isOptions = (method: string) => method === "OPTIONS"
 *
 * const isModifyingRequest = nonePass([isGet, isHead, isOptions])
 *
 * isModifyingRequest("POST")           // true
 * isModifyingRequest("PUT")            // true
 * isModifyingRequest("DELETE")         // true
 * isModifyingRequest("GET")            // false
 * isModifyingRequest("HEAD")           // false
 *
 * // Empty array edge case
 * const noConditions = nonePass<number>([])
 * noConditions(42)                     // true (no conditions to fail)
 * noConditions(0)                      // true
 * noConditions(-1)                     // true
 *
 * // File extension blacklist
 * const dangerousExtensions = [".exe", ".bat", ".cmd", ".com", ".scr"]
 * const hasDangerousExt = dangerousExtensions.map(ext =>
 *   (filename: string) => filename.toLowerCase().endsWith(ext)
 * )
 *
 * const isSafeFile = nonePass(hasDangerousExt)
 *
 * isSafeFile("document.pdf")           // true
 * isSafeFile("photo.jpg")              // true
 * isSafeFile("virus.exe")              // false
 * isSafeFile("script.bat")             // false
 *
 * // Date range exclusion
 * const isWeekend = (date: Date) => {
 *   const day = date.getDay()
 *   return day === 0 || day === 6
 * }
 * const isHoliday = (date: Date) => {
 *   const holidays = ["2024-12-25", "2024-01-01"]
 *   const dateStr = date.toISOString().split("T")[0]
 *   return holidays.includes(dateStr)
 * }
 * const isPastDate = (date: Date) => date < new Date()
 *
 * const isValidWorkday = nonePass([isWeekend, isHoliday, isPastDate])
 *
 * // Dynamic predicate building
 * function buildExclusionFilter(exclusions: string[]) {
 *   const predicates = exclusions.map(item =>
 *     (value: string) => value === item
 *   )
 *   return nonePass(predicates)
 * }
 *
 * const notFruit = buildExclusionFilter(["apple", "banana", "orange"])
 * notFruit("carrot")                   // true
 * notFruit("apple")                    // false
 *
 * // Combining with other combinators
 * const isPositive = (n: number) => n > 0
 * const isInteger = (n: number) => Number.isInteger(n)
 *
 * const notPositiveInteger = nonePass([
 *   (n: number) => isPositive(n) && isInteger(n)
 * ])
 *
 * notPositiveInteger(5)                // false
 * notPositiveInteger(-5)               // true
 * notPositiveInteger(5.5)              // true
 * notPositiveInteger(0)                // true
 *
 * // React form validation
 * const validators = [
 *   (value: string) => value.length < 3,
 *   (value: string) => value.length > 20,
 *   (value: string) => /^\d/.test(value), // starts with number
 *   (value: string) => /\s\s/.test(value) // has double spaces
 * ]
 *
 * const isValidUsername = nonePass(validators)
 *
 * isValidUsername("john_doe")          // true
 * isValidUsername("jo")                // false (too short)
 * isValidUsername("1user")             // false (starts with number)
 * isValidUsername("user  name")        // false (double space)
 * ```
 * @property Pure - Always returns the same result for the same input
 * @property Short-circuit - Stops evaluation on first true predicate
 * @property Vacuous-truth - Empty predicate array returns true
 * @property Complement - Opposite of anyPass/some logic
 */
const nonePass =
	<T>(predicates: Array<(value: T) => boolean>) => (value: T): boolean =>
		!predicates.some((pred) => pred(value))

export default nonePass
