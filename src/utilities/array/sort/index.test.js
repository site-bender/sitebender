import { expect, test } from "vitest"

import sort from "."

const arr = [1, 5, 3, 2, 4]
const obj = [{ age: 12 }, { age: 7 }, { age: 42 }, { age: 2 }]

test("[sort] (array) returns the array sorted ascending when no function passed", () => {
	expect(sort()(arr)).toStrictEqual([1, 2, 3, 4, 5])
})

test("[sort] (array) returns the array sorted using the comparator when passed", () => {
	expect(sort((a, b) => b.age - a.age)(obj)).toStrictEqual([
		{
			age: 42,
		},
		{
			age: 12,
		},
		{
			age: 7,
		},
		{
			age: 2,
		},
	])
	expect(sort((a, b) => a.age - b.age)(obj)).toStrictEqual([
		{
			age: 2,
		},
		{
			age: 7,
		},
		{
			age: 12,
		},
		{
			age: 42,
		},
	])
	expect(sort((a, b) => b - a)(arr)).toStrictEqual([5, 4, 3, 2, 1])
})
