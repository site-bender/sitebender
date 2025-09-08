import randomInteger from "../randomInteger/index.ts"

//++ Alias for randomInteger - generates random integers in a range
const randomInt = randomInteger

export default randomInt

//?? [EXAMPLE] randomInt(1)(6) // Random die roll: 1-6
//?? [EXAMPLE] randomInt(0)(9) // Single digit: 0-9
