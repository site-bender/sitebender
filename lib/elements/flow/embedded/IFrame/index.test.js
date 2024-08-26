// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import {
	ALLOWS,
	LOADINGS,
	REFERRER_POLICIES,
	SANDBOXES,
} from "../../../../rendering/constants"
import IFrame from "."

test("[IFrame] (constructors::flow::heading) returns <iframe> element with supplied attributes and children", () => {
	render(document.body)(
		IFrame({
			allow: ALLOWS.any,
			allowFullScreen: true,
			grizmo: "gribbet",
			height: 50,
			id: "id",
			loading: LOADINGS.eager,
			name: "name",
			referrerPolicy: REFERRER_POLICIES.originWhenCrossOrigin,
			sandbox: SANDBOXES.allowPopupsToEscapeSandbox,
			src: "src",
			srcDoc: "srcDoc",
			width: 100,
		}),
	)()

	expect(document.body.innerHTML).toEqual(
		`<iframe id="id" allowfullscreen="" height="50" name="name" src="src" srcdoc="srcDoc" width="100"></iframe>`,
	)

	document.body.innerHTML = ""
})
