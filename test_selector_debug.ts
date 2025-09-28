import createSeed from "./libraries/quarrier/src/random/createSeed/index.ts"
import _selectGenerator from "./libraries/quarrier/src/generators/combinators/oneOf/_selectGenerator/index.ts"

function makeTestGenerator(id: string) {
  return {
    next: function(seed: any) { return { value: id, nextSeed: seed, size: 1 } },
    shrink: function(v: any) { return { value: v, children: function() { return [] } } }
  }
}

const generators = Array.from({ length: 10 }, (_, i) => makeTestGenerator(`gen${i}`))
const selector = _selectGenerator(generators)
const selections = new Set()

for (let i = 0; i < 100; i++) {
  const seedResult = createSeed(1000 + i * 137)
  if (seedResult._tag === "Ok") {
    const result = selector(seedResult.value)
    if (result.generator) {
      const genResult = result.generator.next(result.nextSeed)
      selections.add(genResult.value)
    }
  }
}

console.log(`Selected ${selections.size} different generators`)
console.log("Values:", Array.from(selections))
