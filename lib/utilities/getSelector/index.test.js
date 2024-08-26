import { expect, test } from "vitest"

import getSelector from "./"

test("[getSelector] (utilities) creates a selector from a source object", async () => {
	expect(getSelector()).toEqual("")
	expect(getSelector({})).toEqual("")
	expect(getSelector({ form: "form" })).toEqual("#form ")
	expect(getSelector({ id: "id" })).toEqual("#id")
	expect(getSelector({ form: "form", id: "id" })).toEqual("#id")
	expect(getSelector({ form: "form", name: "name" })).toEqual(
		"#form [name=name]",
	)
	expect(getSelector({ name: "name" })).toEqual("[name=name]")
	expect(getSelector({ form: "form", selector: ".select#me" })).toEqual(
		".select#me",
	)
	expect(getSelector({ form: "form", tag: "INPUT" })).toEqual("#form input")
	expect(getSelector({ form: "form", name: "name", tag: "INPUT" })).toEqual(
		"#form input[name=name]",
	)
})
