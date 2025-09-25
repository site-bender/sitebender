import { assertEquals } from "https://deno.land/std/assert/mod.ts"

import type { ImportInfo } from "../../../../types/index.ts"

import removeDuplicateImports from "./index.ts"

//++ Tests for removeDuplicateImports function that filters duplicate imports
Deno.test(
	"removeDuplicateImports",
	async function testRemoveDuplicateImports(t) {
		await t.step("returns empty array for empty input", function testEmpty() {
			const result = removeDuplicateImports([])
			assertEquals(result, [])
		})

		await t.step("preserves single import", function testSingle() {
			const imports: ImportInfo[] = [{
				type: "value",
				source: "./module",
				text: 'import { foo } from "./module"',
				position: 0,
				specifiers: ["foo"],
				category: "local",
			}]

			const result = removeDuplicateImports(imports)
			assertEquals(result.length, 1)
			assertEquals(result[0], imports[0])
		})

		await t.step("removes exact duplicates", function testExactDuplicates() {
			const imports: ImportInfo[] = [
				{
					type: "value",
					source: "./module",
					text: 'import { foo } from "./module"',
					position: 0,
					specifiers: ["foo"],
					category: "local",
				},
				{
					type: "value",
					source: "./module",
					text: 'import { foo } from "./module"',
					position: 10,
					specifiers: ["foo"],
					category: "local",
				},
			]

			const result = removeDuplicateImports(imports)
			assertEquals(result.length, 1)
			assertEquals(result[0].position, 0) // Keeps first occurrence
		})

		await t.step(
			"preserves imports with different types",
			function testDifferentTypes() {
				const imports: ImportInfo[] = [
					{
						type: "value",
						source: "./module",
						text: 'import { foo } from "./module"',
						position: 0,
						specifiers: ["foo"],
						category: "local",
					},
					{
						type: "type",
						source: "./module",
						text: 'import type { Foo } from "./module"',
						position: 10,
						specifiers: ["Foo"],
						category: "local",
					},
				]

				const result = removeDuplicateImports(imports)
				assertEquals(result.length, 2)
			},
		)

		await t.step(
			"preserves imports with different sources",
			function testDifferentSources() {
				const imports: ImportInfo[] = [
					{
						type: "value",
						source: "./module1",
						text: 'import { foo } from "./module1"',
						position: 0,
						specifiers: ["foo"],
						category: "local",
					},
					{
						type: "value",
						source: "./module2",
						text: 'import { foo } from "./module2"',
						position: 10,
						specifiers: ["foo"],
						category: "local",
					},
				]

				const result = removeDuplicateImports(imports)
				assertEquals(result.length, 2)
			},
		)

		await t.step(
			"preserves imports with different text",
			function testDifferentText() {
				const imports: ImportInfo[] = [
					{
						type: "value",
						source: "./module",
						text: 'import { foo } from "./module"',
						position: 0,
						specifiers: ["foo"],
						category: "local",
					},
					{
						type: "value",
						source: "./module",
						text: 'import { bar } from "./module"',
						position: 10,
						specifiers: ["bar"],
						category: "local",
					},
				]

				const result = removeDuplicateImports(imports)
				assertEquals(result.length, 2)
			},
		)

		await t.step(
			"handles multiple duplicates",
			function testMultipleDuplicates() {
				const imports: ImportInfo[] = [
					{
						type: "value",
						source: "./module1",
						text: 'import { foo } from "./module1"',
						position: 0,
						specifiers: ["foo"],
						category: "local",
					},
					{
						type: "value",
						source: "./module1",
						text: 'import { foo } from "./module1"',
						position: 10,
						specifiers: ["foo"],
						category: "local",
					},
					{
						type: "value",
						source: "./module2",
						text: 'import { bar } from "./module2"',
						position: 20,
						specifiers: ["bar"],
						category: "local",
					},
					{
						type: "value",
						source: "./module1",
						text: 'import { foo } from "./module1"',
						position: 30,
						specifiers: ["foo"],
						category: "local",
					},
					{
						type: "value",
						source: "./module2",
						text: 'import { bar } from "./module2"',
						position: 40,
						specifiers: ["bar"],
						category: "local",
					},
				]

				const result = removeDuplicateImports(imports)
				assertEquals(result.length, 2)
				assertEquals(result[0].source, "./module1")
				assertEquals(result[1].source, "./module2")
			},
		)

		await t.step(
			"preserves order of first occurrences",
			function testPreservesOrder() {
				const imports: ImportInfo[] = [
					{
						type: "value",
						source: "./third",
						text: 'import { third } from "./third"',
						position: 0,
						specifiers: ["third"],
						category: "local",
					},
					{
						type: "value",
						source: "./first",
						text: 'import { first } from "./first"',
						position: 10,
						specifiers: ["first"],
						category: "local",
					},
					{
						type: "value",
						source: "./third",
						text: 'import { third } from "./third"',
						position: 20,
						specifiers: ["third"],
						category: "local",
					},
					{
						type: "value",
						source: "./second",
						text: 'import { second } from "./second"',
						position: 30,
						specifiers: ["second"],
						category: "local",
					},
					{
						type: "value",
						source: "./first",
						text: 'import { first } from "./first"',
						position: 40,
						specifiers: ["first"],
						category: "local",
					},
				]

				const result = removeDuplicateImports(imports)
				assertEquals(result.length, 3)
				assertEquals(result[0].source, "./third")
				assertEquals(result[1].source, "./first")
				assertEquals(result[2].source, "./second")
			},
		)

		await t.step("handles mixed import types", function testMixedTypes() {
			const imports: ImportInfo[] = [
				{
					type: "type",
					source: "react",
					text: 'import type { FC } from "react"',
					position: 0,
					specifiers: ["FC"],
					category: "external",
				},
				{
					type: "value",
					source: "react",
					text: 'import React from "react"',
					position: 10,
					specifiers: ["React"],
					category: "external",
				},
				{
					type: "type",
					source: "react",
					text: 'import type { FC } from "react"',
					position: 20,
					specifiers: ["FC"],
					category: "external",
				},
				{
					type: "value",
					source: "react",
					text: 'import React from "react"',
					position: 30,
					specifiers: ["React"],
					category: "external",
				},
			]

			const result = removeDuplicateImports(imports)
			assertEquals(result.length, 2)
			assertEquals(result[0].type, "type")
			assertEquals(result[1].type, "value")
		})
	},
)

//?? [EXAMPLE] Run with: deno test scripts/sortImports/sortFileImports/extractImports/removeDuplicateImports/index.test.ts
