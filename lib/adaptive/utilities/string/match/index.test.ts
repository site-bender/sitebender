import { assertEquals } from "jsr:@std/assert"

import match from "./index.ts"

const str1 = "bobity bob bob bobbers!"
const str2 = "sam is as sam does"

Deno.test("[match] (string) returns an array of matches for the regular expression in the passed string", () => {
	assertEquals(match(/bob/g)(str1), ["bob", "bob", "bob", "bob"])
	assertEquals(match(/sam/g)(str2), ["sam", "sam"])
})

Deno.test("[match] (string) returns an empty array if no matches are found", () => {
	assertEquals(match(/blob/g)(str1), [])
	assertEquals(match(/scam/g)(str2), [])
})
