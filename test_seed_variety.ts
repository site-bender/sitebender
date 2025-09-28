import createSeed from "./libraries/quarrier/src/random/createSeed/index.ts"
import splitSeed from "./libraries/quarrier/src/random/splitSeed/index.ts"
import _boundedInt from "./libraries/quarrier/src/random/_boundedInt/index.ts"

const results = new Set<number>()
for (let i = 0; i < 100; i++) {
  const seed = createSeed(1000 + i * 137)
  if (seed._tag === "Ok") {
    const { left } = splitSeed(seed.value)
    const result = _boundedInt(left, 0, 9)
    if (result._tag === "Ok") {
      results.add(result.value.value)
      console.log(`Seed ${1000 + i * 137}: selected index ${result.value.value}`)
    }
  }
}
console.log(`Unique values: ${results.size} out of 10 possible`)
