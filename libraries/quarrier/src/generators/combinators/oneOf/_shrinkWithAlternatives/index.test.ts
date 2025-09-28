import test from "node:test"
import assert from "node:assert/strict"
import _shrinkWithAlternatives from "./index.ts"
import type {
	Generator,
	GeneratorResult,
	ShrinkTree,
} from "../../../../types/index.ts"
import type { Seed } from "../../../../types/index.ts"

function createMockGenerator<T>(
	value: T,
	shrinks: ReadonlyArray<T>,
): Generator<T> {
	return {
		next: function (seed: Seed): GeneratorResult<T> {
			return {
				value: value,
				nextSeed: seed,
				size: 10,
			}
		},
		shrink: function (v: T): ShrinkTree<T> {
			if (v !== value) {
				return {
					value: v,
					children: function () {
						return []
					},
				}
			}
			return {
				value: v,
				children: function () {
					return shrinks.map(function (shrunkValue) {
						return {
							value: shrunkValue,
							children: function () {
								return []
							},
						}
					})
				},
			}
		},
	}
}

test("_shrinkWithAlternatives with no generators returns value with no shrinks", function () {
	const shrinkFn = _shrinkWithAlternatives([])
	const result = shrinkFn(42)
	assert.equal(result.value, 42)
	assert.equal(result.children().length, 0)
})

test("_shrinkWithAlternatives with single generator returns its shrinks", function () {
	const gen = createMockGenerator(10, [9, 8, 5, 0])
	const shrinkFn = _shrinkWithAlternatives([gen])
	const result = shrinkFn(10)

	assert.equal(result.value, 10)
	const children = result.children()
	assert.equal(children.length, 4)
	const values = children.map(function (tree) {
		return tree.value
	})
	assert.deepEqual(values, [9, 8, 5, 0])
})

test("_shrinkWithAlternatives collects shrinks from all capable generators", function () {
	const gen1 = createMockGenerator(10, [9, 5])

	const gen2: Generator<number> = {
		next: function (seed: Seed): GeneratorResult<number> {
			return {
				value: 10,
				nextSeed: seed,
				size: 10,
			}
		},
		shrink: function (v: number): ShrinkTree<number> {
			return {
				value: v,
				children: function () {
					if (v === 10) {
						return [
							{
								value: 8,
								children: function () {
									return []
								},
							},
							{
								value: 0,
								children: function () {
									return []
								},
							},
						]
					}
					return []
				},
			}
		},
	}

	const gen3 = createMockGenerator(20, [19, 18])

	const shrinkFn = _shrinkWithAlternatives([gen1, gen2, gen3])
	const result = shrinkFn(10)

	assert.equal(result.value, 10)
	const children = result.children()
	assert.equal(children.length, 4)
	const values = children.map(function (tree) {
		return tree.value
	})
	assert.deepEqual(values, [9, 5, 8, 0])
})

test("_shrinkWithAlternatives returns empty children for unshrinkable value", function () {
	const gen1 = createMockGenerator(10, [9, 5])
	const gen2 = createMockGenerator(20, [19, 15])

	const shrinkFn = _shrinkWithAlternatives([gen1, gen2])

	const result = shrinkFn(30)
	assert.equal(result.value, 30)
	assert.equal(result.children().length, 0)
})

test("_shrinkWithAlternatives preserves recursive shrinking structure", function () {
	const gen: Generator<number> = {
		next: function (seed: Seed): GeneratorResult<number> {
			return {
				value: 10,
				nextSeed: seed,
				size: 10,
			}
		},
		shrink: function shrinkNumber(v: number): ShrinkTree<number> {
			return {
				value: v,
				children: function () {
					if (v <= 0) return []
					if (v === 10) {
						return [
							{
								value: 5,
								children: function () {
									return shrinkNumber(5).children()
								},
							},
							{
								value: 0,
								children: function () {
									return []
								},
							},
						]
					}
					if (v === 5) {
						return [
							{
								value: 2,
								children: function () {
									return shrinkNumber(2).children()
								},
							},
							{
								value: 0,
								children: function () {
									return []
								},
							},
						]
					}
					if (v === 2) {
						return [
							{
								value: 1,
								children: function () {
									return []
								},
							},
							{
								value: 0,
								children: function () {
									return []
								},
							},
						]
					}
					return []
				},
			}
		},
	}

	const shrinkFn = _shrinkWithAlternatives([gen])
	const result = shrinkFn(10)

	assert.equal(result.value, 10)
	const children = result.children()
	assert.equal(children.length, 2)
	assert.equal(children[0].value, 5)

	const childrenOf5 = children[0].children()
	assert.equal(childrenOf5.length, 2)
	assert.equal(childrenOf5[0].value, 2)
	assert.equal(childrenOf5[1].value, 0)

	const childrenOf2 = childrenOf5[0].children()
	assert.equal(childrenOf2.length, 2)
	assert.equal(childrenOf2[0].value, 1)
	assert.equal(childrenOf2[1].value, 0)
})

test("_shrinkWithAlternatives verifies shrinks are smaller", function () {
	const gen: Generator<number> = {
		next: function (seed: Seed): GeneratorResult<number> {
			return {
				value: 100,
				nextSeed: seed,
				size: 10,
			}
		},
		shrink: function (v: number): ShrinkTree<number> {
			return {
				value: v,
				children: function () {
					if (v === 100) {
						return [
							{
								value: 50,
								children: function () {
									return []
								},
							},
							{
								value: 25,
								children: function () {
									return []
								},
							},
							{
								value: 10,
								children: function () {
									return []
								},
							},
							{
								value: 0,
								children: function () {
									return []
								},
							},
						]
					}
					return []
				},
			}
		},
	}

	const shrinkFn = _shrinkWithAlternatives([gen])
	const result = shrinkFn(100)

	assert.equal(result.value, 100)
	const children = result.children()
	children.forEach(function (tree) {
		assert(
			(tree.value as number) < 100,
			`Shrunk value ${tree.value} should be smaller than 100`,
		)
	})

	const values = children.map(function (tree) {
		return tree.value
	})
	assert.deepEqual(values, [50, 25, 10, 0])
})
