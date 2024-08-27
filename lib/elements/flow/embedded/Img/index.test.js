// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import {
	CROSS_ORIGINS,
	DECODING_HINTS,
	FETCH_PRIORITIES,
	LOADINGS,
	REFERRER_POLICIES,
} from "../../../../rendering/constants"
import Img from "."

test("[Img] (constructors::flow::heading) returns <img> element with supplied attributes", () => {
	renderTo(document.body)(
		Img({
			alt: "alt",
			crossOrigin: CROSS_ORIGINS.useCredentials,
			decoding: DECODING_HINTS.async,
			fetchPriority: FETCH_PRIORITIES.high,
			grizmo: "gribbet",
			height: 50,
			id: "id",
			isMap: true,
			loading: LOADINGS.lazy,
			longDesc: "longDesc",
			referrerPolicy: REFERRER_POLICIES.noReferrerWhenDowngrade,
			sizes: "10,20,30",
			src: "src",
			srcset: "src,set",
			useMap: true,
			width: 100,
		}),
	)()

	expect(document.body.innerHTML).toEqual(
		`<img id="id" alt="alt" height="50" ismap="" longdesc="longDesc" sizes="10,20,30" src="src" srcset="src,set" width="100">`,
	)

	document.body.innerHTML = ""
})
