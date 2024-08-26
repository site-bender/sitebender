import { expect, test } from "vitest"

import getAriaAttributes from "./"

test("[getAriaAttributes] (utilities) creates a selector from a source object", async () => {
	expect(getAriaAttributes()).toMatchObject({})

	expect(
		getAriaAttributes({
			role: "banner",
			hidden: true,
		}),
	).toMatchObject({
		"aria-role": "banner",
		"aria-hidden": true,
	})
})
