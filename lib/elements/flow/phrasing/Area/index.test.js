// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import {
	REFERRER_POLICY,
	REL_FOR_AREA_AND_A,
	SHAPE,
	TARGET,
} from "../../../../rendering/constants"
import Area from "."

test("[Area] (constructors::flow::heading) returns <area> element with attributes", () => {
	renderTo(document.body)(
		Area({
			alt: "alt",
			coords: "1,2,3,4",
			download: "download",
			grizmo: "gribbet",
			href: "/",
			hrefLang: "en-GB",
			id: "id",
			media: "print",
			ping: "ping",
			referrerPolicy: REFERRER_POLICY.noReferrer,
			rel: REL_FOR_AREA_AND_A.opener,
			shape: SHAPE.circle,
			target: TARGET._parent,
		}),
	)()

	expect(document.body.innerHTML).toEqual(
		`<area id="id" alt="alt" coords="1,2,3,4" download="download" ` +
			`href="/" hreflang="en-GB" media="print" ping="ping" ` +
			`referrerpolicy="no-referrer" rel="opener" shape="circle" ` +
			`target="_parent">`,
	)

	document.body.innerHTML = ""
})
