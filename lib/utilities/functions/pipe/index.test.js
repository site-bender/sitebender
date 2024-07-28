import { expect, test } from "vitest"

import pipe from "./"

const double = x => x * 2

test("[pipe] (functions) pipes the value through", () => {
	expect(pipe([])(2)).toEqual(2)
	expect(pipe([double])(2)).toEqual(4)
	expect(pipe([double, double])(2)).toEqual(8)
	expect(pipe([double, double, double])(2)).toEqual(16)
	expect(pipe([double, double, double, double])(2)).toEqual(32)
	expect(pipe([double, double, double, double, double])(2)).toEqual(64)
	expect(pipe([double, double, double, double, double, double])(2)).toEqual(128)
})
