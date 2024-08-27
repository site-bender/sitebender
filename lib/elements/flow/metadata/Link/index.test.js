// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import {
	BLOCKING,
	CROSS_ORIGIN,
	DESTINATION,
	FETCH_PRIORITY,
	REFERRER_POLICY,
	REL_FOR_LINK,
} from "../../../../rendering/constants"
import Link from "."

test("[Link] (constructors::flow::metadata) returns <link> element with supplied attributes", () => {
	renderTo(document.body)(
		Link({
			as: DESTINATION.image,
			blocking: BLOCKING.render,
			color: "red",
			crossOrigin: CROSS_ORIGIN.useCredentials,
			disabled: true,
			fetchPriority: FETCH_PRIORITY.high,
			grizmo: "gribbet",
			href: "/",
			hreflang: "en-NZ",
			id: "id",
			imageSizes: "10,20,30",
			imageSrcset: "image,srcset",
			integrity: "integrity",
			media: "all",
			referrerPolicy: REFERRER_POLICY.noReferrerWhenDowngrade,
			rel: REL_FOR_LINK.canonical,
			sizes: "5,10,15",
			type: "type",
		}),
	)()

	expect(document.body.innerHTML).toEqual(
		`<link id="id" as="image" blocking="render" color="red" crossorigin="use-credentials" ` +
			`disabled="" fetchpriority="high" href="/" hreflang="en-NZ" imagesizes="10,20,30" ` +
			`imagesrcset="image,srcset" integrity="integrity" media="all" ` +
			`referrerpolicy="no-referrer-when-downgrade" rel="canonical" ` +
			`sizes="5,10,15" type="type">`,
	)

	document.body.innerHTML = ""
})
