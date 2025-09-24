import { assertEquals, assertExists } from "https://deno.land/std/assert/mod.ts"

import parseArgs from "./index.ts"

//++ Tests for parseArgs function that parses command-line arguments
Deno.test("parseArgs", async function testParseArgs(t) {
	await t.step("parses simple flags", function testSimpleFlags() {
		const result = parseArgs(["--verbose", "--debug"])

		assertExists(result.flags)
		assertExists(result.options)
		assertExists(result.positional)

		assertEquals(result.options.verbose, "true")
		assertEquals(result.options.debug, "true")
		assertEquals(result.positional.length, 0)
	})

	await t.step("parses boolean flags", function testBooleanFlags() {
		const result = parseArgs(["--verbose", "--no-debug"], {
			booleans: ["verbose", "debug"]
		})

		assertEquals(result.flags.verbose, true)
		assertEquals(result.flags.debug, false)
	})

	await t.step("parses string options", function testStringOptions() {
		const result = parseArgs(["--name", "test", "--output", "file.txt"], {
			strings: ["name", "output"]
		})

		assertEquals(result.options.name, "test")
		assertEquals(result.options.output, "file.txt")
	})

	await t.step("parses options with equals sign", function testEqualsOptions() {
		const result = parseArgs(["--name=test", "--count=5"])

		assertEquals(result.options.name, "test")
		assertEquals(result.options.count, "5")
	})

	await t.step("handles aliases", function testAliases() {
		const result = parseArgs(["-v", "-o", "output.txt"], {
			aliases: {
				v: "verbose",
				o: "output"
			},
			booleans: ["verbose"]
		})

		assertEquals(result.flags.verbose, true)
		assertEquals(result.options.output, "output.txt")
	})

	await t.step("collects positional arguments", function testPositional() {
		const result = parseArgs(["file1.txt", "--verbose", "file2.txt", "file3.txt"], {
			booleans: ["verbose"]
		})

		assertEquals(result.positional, ["file1.txt", "file2.txt", "file3.txt"])
		assertEquals(result.flags.verbose, true)
	})

	await t.step("handles double dash separator", function testDoubleDash() {
		const result = parseArgs(["--verbose", "--", "--not-a-flag", "file.txt"], {
			booleans: ["verbose"]
		})

		assertEquals(result.flags.verbose, true)
		assertEquals(result.positional, ["--not-a-flag", "file.txt"])
	})

	await t.step("handles short flag clusters", function testShortClusters() {
		const result = parseArgs(["-vqd"], {
			aliases: {
				v: "verbose",
				q: "quiet",
				d: "debug"
			},
			booleans: ["verbose", "quiet", "debug"]
		})

		assertEquals(result.flags.verbose, true)
		assertEquals(result.flags.quiet, true)
		assertEquals(result.flags.debug, true)
	})

	await t.step("handles repeated options as arrays", function testRepeatedOptions() {
		const result = parseArgs(["--file", "a.txt", "--file", "b.txt", "--file", "c.txt"])

		assertExists(result.options.file)
		assertEquals(result.options.file, ["a.txt", "b.txt", "c.txt"])
	})

	await t.step("handles --no- prefix for negation", function testNegation() {
		const result = parseArgs(["--no-color", "--no-verbose"], {
			booleans: ["color", "verbose"]
		})

		assertEquals(result.flags.color, false)
		assertEquals(result.flags.verbose, false)
	})

	await t.step("defaults boolean flags to false", function testBooleanDefaults() {
		const result = parseArgs([], {
			booleans: ["verbose", "debug", "quiet"]
		})

		assertEquals(result.flags.verbose, false)
		assertEquals(result.flags.debug, false)
		assertEquals(result.flags.quiet, false)
	})

	await t.step("handles mixed arguments", function testMixedArgs() {
		const result = parseArgs([
			"input.txt",
			"-v",
			"--output=result.txt",
			"--count",
			"5",
			"-q",
			"extra.txt"
		], {
			aliases: {
				v: "verbose",
				q: "quiet"
			},
			booleans: ["verbose", "quiet"],
			strings: ["output", "count"]
		})

		assertEquals(result.positional, ["input.txt", "extra.txt"])
		assertEquals(result.flags.verbose, true)
		assertEquals(result.flags.quiet, true)
		assertEquals(result.options.output, "result.txt")
		assertEquals(result.options.count, "5")
	})

	await t.step("handles empty arguments", function testEmptyArgs() {
		const result = parseArgs([])

		assertEquals(result.flags, {})
		assertEquals(result.options, {})
		assertEquals(result.positional, [])
	})

	await t.step("handles boolean with value", function testBooleanWithValue() {
		const result = parseArgs(["--enabled=false"], {
			booleans: ["enabled"]
		})

		assertEquals(result.flags.enabled, false)
	})

	await t.step("handles short option with value", function testShortWithValue() {
		const result = parseArgs(["-o", "output.txt"], {
			aliases: { o: "output" }
		})

		assertEquals(result.options.output, "output.txt")
	})
})

//?? [EXAMPLE] Run with: deno test scripts/utilities/cli/parseArgs/index.test.ts