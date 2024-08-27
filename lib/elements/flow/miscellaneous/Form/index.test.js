// @vitest-environment jsdom

import { expect, test } from "vitest"

import {
	AUTOCOMPLETE,
	ENC_TYPE,
	FORM_METHOD,
	FORM_TARGET,
	REL_FOR_FORM,
} from "../../../../rendering/constants"
import renderTo from "../../../../rendering/renderTo"
import TextNode from "../../../TextNode"
import Form from "./"

test(`[Form] (constructors::flow::miscellaneous) returns a <form> with text content`, () => {
	renderTo(document.body)(Form()())()

	const form = document.body.querySelector("form")

	expect(form?.id).toBeDefined()

	document.body.innerHTML = ""
})

test(`[Form] (constructors::flow::miscellaneous) returns <form> element with supplied attributes and content`, () => {
	renderTo(document.body)(
		Form({
			acceptCharset: "utf-8",
			action: "/",
			autocomplete: AUTOCOMPLETE.addressLine1,
			enctype: ENC_TYPE.multipartFormData,
			grizmo: "gribbet",
			id: "id",
			method: FORM_METHOD.post,
			name: "name",
			noValidate: true,
			rel: REL_FOR_FORM.alternate,
			target: FORM_TARGET._top,
		})([TextNode("Hi!")]),
	)()

	expect(document.body.innerHTML).toEqual(
		`<form id="id" accept-charset="utf-8" action="/" autocomplete="address-line1" ` +
			`enctype="multipart/form-data" method="POST" name="name" novalidate="" ` +
			`rel="alternate" target="_top">Hi!</form>`,
	)

	document.body.innerHTML = ""
})
