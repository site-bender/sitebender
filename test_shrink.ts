import makeTestGenerator from "./libraries/quarrier/src/generators/combinators/oneOf/_shrinkWithAlternatives/index.test.ts"
import _shrinkWithAlternatives from "./libraries/quarrier/src/generators/combinators/oneOf/_shrinkWithAlternatives/index.ts"

// Mock makeTestGenerator
function makeTestGen(value: number, shrinks: number[] = []) {
  return {
    next: function(seed: any) { return { value, nextSeed: seed, size: 1 } },
    shrink: function(v: number) {
      return {
        value: v,
        children: function() {
          if (v === value) {
            return shrinks.map(s => ({
              value: s,
              children: function() { return [] }
            }))
          }
          return []
        }
      }
    }
  }
}

const gen1 = makeTestGen(10)
const gen2 = makeTestGen(20)
const generators = [gen1, gen2]

const shrinker = _shrinkWithAlternatives(generators)
const trees = shrinker(99)

console.log("For value 99:")
console.log("gen1.shrink(99).value:", gen1.shrink(99).value)
console.log("gen2.shrink(99).value:", gen2.shrink(99).value)
console.log("Result length:", trees.length)
console.log("Result values:", trees.map(t => t.value))
