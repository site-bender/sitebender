import { expect, test } from "vitest"

import generateShortId from "."

test("[generateShortId] (utilities) generated id starts with _", () => {
	expect(generateShortId()).toMatch(/^_/)
})

test("[generateShortId] (utilities) generated id has right length", () => {
	expect(generateShortId().length).toBeGreaterThanOrEqual(22)
	expect(generateShortId().length).toBeLessThanOrEqual(23)
})
