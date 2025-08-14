import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import * as fc from "fast-check"
import toCamel from "../../../string/toCamel/index.ts"
import toKebab from "../../../string/toKebab/index.ts"
import toPascal from "../../../string/toPascal/index.ts"
import toSnake from "../../../string/toSnake/index.ts"
import toScreamingSnake from "../../../string/toScreamingSnake/index.ts"
import toTitle from "../../../string/toTitle/index.ts"
import toSentence from "../../../string/toSentence/index.ts"
import toTrain from "../../../string/toTrain/index.ts"
import toUpper from "../../../string/toUpper/index.ts"
import toLower from "../../../string/toLower/index.ts"
import toCase from "../../../string/toCase/index.ts"

describe("String Case Conversion Behaviors", () => {
	const testCases = [
		{
			input: "hello world",
			camel: "helloWorld",
			kebab: "hello-world",
			pascal: "HelloWorld",
			snake: "hello_world",
			screamingSnake: "HELLO_WORLD",
			title: "Hello World",
			sentence: "Hello world",
			train: "Hello-World",
		},
		{
			input: "hello-world",
			camel: "helloWorld",
			kebab: "hello-world",
			pascal: "HelloWorld",
			snake: "hello_world",
			screamingSnake: "HELLO_WORLD",
			title: "Hello World",
			sentence: "Hello world",
			train: "Hello-World",
		},
		{
			input: "hello_world",
			camel: "helloWorld",
			kebab: "hello-world",
			pascal: "HelloWorld",
			snake: "hello_world",
			screamingSnake: "HELLO_WORLD",
			title: "Hello World",
			sentence: "Hello world",
			train: "Hello-World",
		},
		{
			input: "HelloWorld",
			camel: "helloworld",
			kebab: "helloworld",
			pascal: "Helloworld",
			snake: "helloworld",
			screamingSnake: "HELLOWORLD",
			title: "Helloworld",
			sentence: "Helloworld",
			train: "Helloworld",
		},
	]

	describe("when converting to camelCase", () => {
		testCases.forEach(({ input, camel }) => {
			it(`converts "${input}" to "${camel}"`, () => {
				expect(toCamel(input)).toBe(camel)
			})
		})

		it("handles empty string", () => {
			expect(toCamel("")).toBe("")
		})

		it("handles single word", () => {
			expect(toCamel("hello")).toBe("hello")
			expect(toCamel("HELLO")).toBe("hello")
		})

		it("handles multiple separators", () => {
			expect(toCamel("hello--world")).toBe("helloWorld")
			expect(toCamel("hello__world")).toBe("helloWorld")
			expect(toCamel("hello  world")).toBe("helloWorld")
		})

		it("handles mixed separators", () => {
			expect(toCamel("hello-world_test case")).toBe("helloWorldTestCase")
		})

		it("handles numbers", () => {
			expect(toCamel("hello-2-world")).toBe("hello2World")
			expect(toCamel("test-123")).toBe("test123")
		})
	})

	describe("when converting to kebab-case", () => {
		testCases.forEach(({ input, kebab }) => {
			it(`converts "${input}" to "${kebab}"`, () => {
				expect(toKebab(input)).toBe(kebab)
			})
		})

		it("handles empty string", () => {
			expect(toKebab("")).toBe("")
		})

		it("handles single word", () => {
			expect(toKebab("hello")).toBe("hello")
			expect(toKebab("HELLO")).toBe("hello")
		})

		it("handles already kebab-case", () => {
			expect(toKebab("already-kebab-case")).toBe("already-kebab-case")
		})

		it("handles consecutive capitals", () => {
			expect(toKebab("XMLHttpRequest")).toBe("xmlhttprequest")
		})
	})

	describe("when converting to PascalCase", () => {
		testCases.forEach(({ input, pascal }) => {
			it(`converts "${input}" to "${pascal}"`, () => {
				expect(toPascal(input)).toBe(pascal)
			})
		})

		it("handles empty string", () => {
			expect(toPascal("")).toBe("")
		})

		it("handles single word", () => {
			expect(toPascal("hello")).toBe("Hello")
			expect(toPascal("HELLO")).toBe("Hello")
		})

		it("capitalizes first letter of each word", () => {
			expect(toPascal("the quick brown fox")).toBe("TheQuickBrownFox")
		})
	})

	describe("when converting to snake_case", () => {
		testCases.forEach(({ input, snake }) => {
			it(`converts "${input}" to "${snake}"`, () => {
				expect(toSnake(input)).toBe(snake)
			})
		})

		it("handles empty string", () => {
			expect(toSnake("")).toBe("")
		})

		it("handles single word", () => {
			expect(toSnake("hello")).toBe("hello")
			expect(toSnake("HELLO")).toBe("hello")
		})

		it("handles already snake_case", () => {
			expect(toSnake("already_snake_case")).toBe("already_snake_case")
		})
	})

	describe("when converting to SCREAMING_SNAKE_CASE", () => {
		testCases.forEach(({ input, screamingSnake }) => {
			it(`converts "${input}" to "${screamingSnake}"`, () => {
				expect(toScreamingSnake(input)).toBe(screamingSnake)
			})
		})

		it("handles empty string", () => {
			expect(toScreamingSnake("")).toBe("")
		})

		it("handles single word", () => {
			expect(toScreamingSnake("hello")).toBe("HELLO")
			expect(toScreamingSnake("HELLO")).toBe("HELLO")
		})

		it("preserves all caps", () => {
			expect(toScreamingSnake("ALREADY_SCREAMING")).toBe("ALREADY_SCREAMING")
		})
	})

	describe("when converting to Title Case", () => {
		it("capitalizes first letter of each word", () => {
			expect(toTitle("hello world")).toBe("Hello World")
			expect(toTitle("the quick brown fox")).toBe("The Quick Brown Fox")
		})

		it("handles various separators", () => {
			expect(toTitle("hello-world")).toBe("Hello World")
			expect(toTitle("hello_world")).toBe("Hello World")
			expect(toTitle("hello.world")).toBe("Hello.world")
		})

		it("handles empty string", () => {
			expect(toTitle("")).toBe("")
		})

		it("handles single word", () => {
			expect(toTitle("hello")).toBe("Hello")
			expect(toTitle("HELLO")).toBe("Hello")
		})

		it("handles mixed case input", () => {
			expect(toTitle("hElLo WoRlD")).toBe("Hello World")
		})
	})

	describe("when converting to sentence case", () => {
		it("capitalizes only first letter", () => {
			expect(toSentence("hello world")).toBe("Hello world")
			expect(toSentence("HELLO WORLD")).toBe("Hello world")
		})

		it("handles various separators", () => {
			expect(toSentence("hello-world")).toBe("Hello world")
			expect(toSentence("hello_world")).toBe("Hello world")
		})

		it("handles empty string", () => {
			expect(toSentence("")).toBe("")
		})

		it("handles single word", () => {
			expect(toSentence("hello")).toBe("Hello")
			expect(toSentence("HELLO")).toBe("Hello")
		})

		it("preserves sentence structure", () => {
			expect(toSentence("the quick brown fox")).toBe("The quick brown fox")
		})
	})

	describe("when converting to Train-Case", () => {
		it("capitalizes first letter of each word with hyphens", () => {
			expect(toTrain("hello world")).toBe("Hello-World")
			expect(toTrain("hello_world")).toBe("Hello-World")
		})

		it("handles empty string", () => {
			expect(toTrain("")).toBe("")
		})

		it("handles single word", () => {
			expect(toTrain("hello")).toBe("Hello")
			expect(toTrain("HELLO")).toBe("Hello")
		})

		it("handles already train-case", () => {
			expect(toTrain("Already-Train-Case")).toBe("Already-Train-Case")
		})
	})

	describe("when converting to upper and lower case", () => {
		it("converts to uppercase", () => {
			expect(toUpper("hello world")).toBe("HELLO WORLD")
			expect(toUpper("Hello World")).toBe("HELLO WORLD")
			expect(toUpper("123abc")).toBe("123ABC")
		})

		it("converts to lowercase", () => {
			expect(toLower("HELLO WORLD")).toBe("hello world")
			expect(toLower("Hello World")).toBe("hello world")
			expect(toLower("123ABC")).toBe("123abc")
		})

		it("handles empty strings", () => {
			expect(toUpper("")).toBe("")
			expect(toLower("")).toBe("")
		})

		it("preserves non-alphabetic characters", () => {
			expect(toUpper("hello-world_123")).toBe("HELLO-WORLD_123")
			expect(toLower("HELLO-WORLD_123")).toBe("hello-world_123")
		})
	})

	describe("when using generic case converter", () => {
		it("converts to specified case", () => {
			expect(toCase("camel")("hello world")).toBe("helloWorld")
			expect(toCase("pascal")("hello world")).toBe("HelloWorld")
			expect(toCase("kebab")("hello world")).toBe("hello-world")
			expect(toCase("snake")("hello world")).toBe("hello_world")
			expect(toCase("constant")("hello world")).toBe("HELLO_WORLD")
			expect(toCase("title")("hello world")).toBe("Hello World")
			expect(toCase("sentence")("hello world")).toBe("Hello world")
			expect(toCase("train")("hello world")).toBe("Hello-World")
			expect(toCase("upper")("hello world")).toBe("HELLO WORLD")
			expect(toCase("lower")("HELLO WORLD")).toBe("hello world")
		})

		it("returns original for unknown case", () => {
			expect(toCase("unknown" as any)("hello world")).toBe("hello world")
		})

		it("handles empty string", () => {
			expect(toCase("camel")("")).toBe("")
			expect(toCase("pascal")("")).toBe("")
		})
	})

	describe("property-based tests", () => {
		describe("idempotency properties", () => {
			it("case conversions are idempotent", () => {
				fc.assert(fc.property(
					fc.string().filter(s => s.length > 0 && /^[a-zA-Z]/.test(s)),
					(str) => {
						// Apply conversion twice and check if result is the same
						expect(toCamel(toCamel(str))).toBe(toCamel(str))
						expect(toKebab(toKebab(str))).toBe(toKebab(str))
						expect(toPascal(toPascal(str))).toBe(toPascal(str))
						expect(toSnake(toSnake(str))).toBe(toSnake(str))
						expect(toScreamingSnake(toScreamingSnake(str))).toBe(toScreamingSnake(str))
						expect(toTitle(toTitle(str))).toBe(toTitle(str))
						expect(toSentence(toSentence(str))).toBe(toSentence(str))
						expect(toTrain(toTrain(str))).toBe(toTrain(str))
					}
				))
			})

			it("upper and lower are idempotent", () => {
				fc.assert(fc.property(
					fc.string(),
					(str) => {
						expect(toUpper(toUpper(str))).toBe(toUpper(str))
						expect(toLower(toLower(str))).toBe(toLower(str))
					}
				))
			})
		})

		describe("length preservation properties", () => {
			it("some conversions preserve string length", () => {
				fc.assert(fc.property(
					fc.string().filter(s => /^[a-zA-Z]+$/.test(s) && s.length > 0),
					(str) => {
						// Upper and lower preserve length exactly
						expect(toUpper(str).length).toBe(str.length)
						expect(toLower(str).length).toBe(str.length)
						
						// PascalCase preserves length for single words
						if (!str.includes(' ') && !str.includes('-') && !str.includes('_')) {
							expect(toPascal(str).length).toBe(str.length)
						}
					}
				))
			})

			it("camelCase removes separators", () => {
				fc.assert(fc.property(
					fc.array(fc.string().filter(s => /^[a-zA-Z]+$/.test(s) && s.length > 0), { minLength: 2, maxLength: 5 }),
					(words) => {
						const withSpaces = words.join(' ')
						const withDashes = words.join('-')
						const withUnderscores = words.join('_')
						
						const camelSpaces = toCamel(withSpaces)
						const camelDashes = toCamel(withDashes)
						const camelUnderscores = toCamel(withUnderscores)
						
						// Should not contain separators
						expect(camelSpaces).not.toContain(' ')
						expect(camelDashes).not.toContain('-')
						expect(camelUnderscores).not.toContain('_')
					}
				))
			})
		})

		describe("character case properties", () => {
			it("first character rules", () => {
				fc.assert(fc.property(
					fc.string().filter(s => /^[a-zA-Z]/.test(s) && s.length > 0),
					(str) => {
						const camelResult = toCamel(str)
						const pascalResult = toPascal(str)
						const sentenceResult = toSentence(str)
						const titleResult = toTitle(str)
						const trainResult = toTrain(str)
						
						// camelCase starts with lowercase
						if (camelResult.length > 0) {
							expect(camelResult[0]).toBe(camelResult[0].toLowerCase())
						}
						
						// PascalCase starts with uppercase
						if (pascalResult.length > 0) {
							expect(pascalResult[0]).toBe(pascalResult[0].toUpperCase())
						}
						
						// Sentence case starts with uppercase
						if (sentenceResult.length > 0) {
							expect(sentenceResult[0]).toBe(sentenceResult[0].toUpperCase())
						}
						
						// Title case starts with uppercase
						if (titleResult.length > 0) {
							expect(titleResult[0]).toBe(titleResult[0].toUpperCase())
						}
						
						// Train case starts with uppercase
						if (trainResult.length > 0) {
							expect(trainResult[0]).toBe(trainResult[0].toUpperCase())
						}
					}
				))
			})

			it("case consistency", () => {
				fc.assert(fc.property(
					fc.string().filter(s => /^[a-zA-Z]+$/.test(s) && s.length > 0),
					(str) => {
						const upperResult = toUpper(str)
						const lowerResult = toLower(str)
						const screamingResult = toScreamingSnake(str)
						
						// All characters should be uppercase
						expect(upperResult).toBe(upperResult.toUpperCase())
						expect(screamingResult.replace(/_/g, '')).toBe(screamingResult.replace(/_/g, '').toUpperCase())
						
						// All characters should be lowercase
						expect(lowerResult).toBe(lowerResult.toLowerCase())
					}
				))
			})
		})

		describe("separator consistency properties", () => {
			it("kebab-case uses hyphens", () => {
				fc.assert(fc.property(
					fc.array(fc.string().filter(s => /^[a-zA-Z]+$/.test(s) && s.length > 0), { minLength: 2, maxLength: 5 }),
					(words) => {
						const withSpaces = words.join(' ')
						const result = toKebab(withSpaces)
						
						// Should contain hyphens if multiple words
						if (words.length > 1) {
							expect(result).toContain('-')
						}
						
						// Should not contain spaces or underscores
						expect(result).not.toContain(' ')
						expect(result).not.toContain('_')
					}
				))
			})

			it("snake_case uses underscores", () => {
				fc.assert(fc.property(
					fc.array(fc.string().filter(s => /^[a-zA-Z]+$/.test(s) && s.length > 0), { minLength: 2, maxLength: 5 }),
					(words) => {
						const withSpaces = words.join(' ')
						const result = toSnake(withSpaces)
						
						// Should contain underscores if multiple words
						if (words.length > 1) {
							expect(result).toContain('_')
						}
						
						// Should not contain spaces or hyphens
						expect(result).not.toContain(' ')
						expect(result).not.toContain('-')
					}
				))
			})

			it("Train-Case uses hyphens with capitals", () => {
				fc.assert(fc.property(
					fc.array(fc.string().filter(s => /^[a-zA-Z]+$/.test(s) && s.length > 0), { minLength: 2, maxLength: 5 }),
					(words) => {
						const withSpaces = words.join(' ')
						const result = toTrain(withSpaces)
						
						// Should contain hyphens if multiple words
						if (words.length > 1) {
							expect(result).toContain('-')
						}
						
						// Should not contain spaces or underscores
						expect(result).not.toContain(' ')
						expect(result).not.toContain('_')
						
						// Each word should start with uppercase
						const parts = result.split('-')
						parts.forEach(part => {
							if (part.length > 0) {
								expect(part[0]).toBe(part[0].toUpperCase())
							}
						})
					}
				))
			})
		})

		describe("reversibility properties", () => {
			it("upper and lower are inverse operations", () => {
				fc.assert(fc.property(
					fc.string().filter(s => /^[a-zA-Z]+$/.test(s)),
					(str) => {
						const upper = toUpper(str)
						const lower = toLower(str)
						
						expect(toLower(upper)).toBe(lower)
						expect(toUpper(lower)).toBe(upper)
					}
				))
			})

			it("case conversions preserve word boundaries", () => {
				fc.assert(fc.property(
					fc.array(fc.string().filter(s => /^[a-zA-Z]+$/.test(s) && s.length > 0), { minLength: 2, maxLength: 4 }),
					(words) => {
						const original = words.join(' ')
						
						// Count words in original vs converted
						const originalWords = original.split(/\s+/).filter(w => w.length > 0)
						
						// Title case should have same number of words (separated by spaces)
						const titleWords = toTitle(original).split(/\s+/).filter(w => w.length > 0)
						expect(titleWords.length).toBe(originalWords.length)
						
						// Kebab should have same number of parts (separated by hyphens)
						const kebabParts = toKebab(original).split('-').filter(p => p.length > 0)
						expect(kebabParts.length).toBe(originalWords.length)
						
						// Snake should have same number of parts (separated by underscores)
						const snakeParts = toSnake(original).split('_').filter(p => p.length > 0)
						expect(snakeParts.length).toBe(originalWords.length)
					}
				))
			})
		})

		describe("generic case converter properties", () => {
			it("toCase produces same results as specific functions", () => {
				fc.assert(fc.property(
					fc.string().filter(s => /^[a-zA-Z\s\-_]+$/.test(s) && s.length > 0),
					(str) => {
						expect(toCase("camel")(str)).toBe(toCamel(str))
						expect(toCase("pascal")(str)).toBe(toPascal(str))
						expect(toCase("kebab")(str)).toBe(toKebab(str))
						expect(toCase("snake")(str)).toBe(toSnake(str))
						expect(toCase("constant")(str)).toBe(toScreamingSnake(str))
						expect(toCase("title")(str)).toBe(toTitle(str))
						expect(toCase("sentence")(str)).toBe(toSentence(str))
						expect(toCase("train")(str)).toBe(toTrain(str))
						expect(toCase("upper")(str)).toBe(toUpper(str))
						expect(toCase("lower")(str)).toBe(toLower(str))
					}
				))
			})

			it("toCase with unknown case returns original", () => {
				fc.assert(fc.property(
					fc.string(),
					(str) => {
						expect(toCase("unknown" as any)(str)).toBe(str)
						expect(toCase("invalid" as any)(str)).toBe(str)
						expect(toCase("" as any)(str)).toBe(str)
					}
				))
			})
		})

		describe("empty string properties", () => {
			it("all conversions handle empty strings", () => {
				const empty = ""
				
				expect(toCamel(empty)).toBe("")
				expect(toKebab(empty)).toBe("")
				expect(toPascal(empty)).toBe("")
				expect(toSnake(empty)).toBe("")
				expect(toScreamingSnake(empty)).toBe("")
				expect(toTitle(empty)).toBe("")
				expect(toSentence(empty)).toBe("")
				expect(toTrain(empty)).toBe("")
				expect(toUpper(empty)).toBe("")
				expect(toLower(empty)).toBe("")
			})
		})

		describe("special character handling", () => {
			it("non-alphabetic characters are handled consistently", () => {
				fc.assert(fc.property(
					fc.string().filter(s => /[0-9]/.test(s) && s.length > 0),
					(str) => {
						// Numbers should be preserved in most conversions
						const upper = toUpper(str)
						const lower = toLower(str)
						
						// Extract just the numeric parts
						const originalNumbers = str.match(/[0-9]/g) || []
						const upperNumbers = upper.match(/[0-9]/g) || []
						const lowerNumbers = lower.match(/[0-9]/g) || []
						
						expect(upperNumbers).toEqual(originalNumbers)
						expect(lowerNumbers).toEqual(originalNumbers)
					}
				))
			})
		})

		describe("mathematical properties", () => {
			it("conversions compose in predictable ways", () => {
				fc.assert(fc.property(
					fc.string().filter(s => /^[a-zA-Z\s]+$/.test(s) && s.length > 0),
					(str) => {
						// toUpper(toLower(x)) should equal toUpper(x)
						expect(toUpper(toLower(str))).toBe(toUpper(str))
						
						// toLower(toUpper(x)) should equal toLower(x)
						expect(toLower(toUpper(str))).toBe(toLower(str))
						
						// toKebab should produce consistent results regardless of input case
						expect(toKebab(toUpper(str))).toBe(toKebab(toLower(str)))
						expect(toSnake(toUpper(str))).toBe(toSnake(toLower(str)))
					}
				))
			})
		})
	})
})