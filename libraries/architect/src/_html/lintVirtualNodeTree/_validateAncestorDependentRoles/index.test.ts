import { assertEquals } from "@std/assert"
import type { ElementNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"

import _validateAncestorDependentRoles from "./index.ts"

Deno.test(
	"_validateAncestorDependentRoles",
	async function validateAncestorDependentRolesTests(t) {
		await t.step(
			"allows div child of dl with no role",
			function allowsDivChildOfDlWithNoRole() {
				const div: ElementNode = {
					_tag: "element",
					tagName: "DIV",
					attributes: {},
					children: [],
				}

				const dl: ElementNode = {
					_tag: "element",
					tagName: "DL",
					attributes: {},
					children: [div],
				}

				const errors = _validateAncestorDependentRoles(div, [dl])

				assertEquals(errors.length, 0)
			},
		)

		await t.step(
			"allows div child of dl with role none",
			function allowsDivChildOfDlWithRoleNone() {
				const div: ElementNode = {
					_tag: "element",
					tagName: "DIV",
					attributes: { role: "none" },
					children: [],
				}

				const dl: ElementNode = {
					_tag: "element",
					tagName: "DL",
					attributes: {},
					children: [div],
				}

				const errors = _validateAncestorDependentRoles(div, [dl])

				assertEquals(errors.length, 0)
			},
		)

		await t.step(
			"rejects div child of dl with invalid role",
			function rejectsDivChildOfDlWithInvalidRole() {
				const div: ElementNode = {
					_tag: "element",
					tagName: "DIV",
					attributes: { role: "button" },
					children: [],
				}

				const dl: ElementNode = {
					_tag: "element",
					tagName: "DL",
					attributes: {},
					children: [div],
				}

				const errors = _validateAncestorDependentRoles(div, [dl])

				assertEquals(errors.length, 1)
				assertEquals(
					errors[0]?.errorType,
					"invalid-ancestor-dependent-role",
				)
				assertEquals(
					errors[0]?.message.includes("only have role=\"none\""),
					true,
				)
			},
		)

		await t.step(
			"allows footer outside sectioning with contentinfo role",
			function allowsFooterOutsideSectioningWithContentinfoRole() {
				const footer: ElementNode = {
					_tag: "element",
					tagName: "FOOTER",
					attributes: { role: "contentinfo" },
					children: [],
				}

				const body: ElementNode = {
					_tag: "element",
					tagName: "BODY",
					attributes: {},
					children: [footer],
				}

				const errors = _validateAncestorDependentRoles(footer, [body])

				assertEquals(errors.length, 0)
			},
		)

		await t.step(
			"rejects footer inside sectioning with contentinfo role",
			function rejectsFooterInsideSectioningWithContentinfoRole() {
				const footer: ElementNode = {
					_tag: "element",
					tagName: "FOOTER",
					attributes: { role: "contentinfo" },
					children: [],
				}

				const article: ElementNode = {
					_tag: "element",
					tagName: "ARTICLE",
					attributes: {},
					children: [footer],
				}

				const errors = _validateAncestorDependentRoles(footer, [article])

				assertEquals(errors.length, 1)
				assertEquals(
					errors[0]?.errorType,
					"invalid-ancestor-dependent-role",
				)
				assertEquals(
					errors[0]?.message.includes("cannot have role=\"contentinfo\""),
					true,
				)
			},
		)

		await t.step(
			"allows header outside sectioning with banner role",
			function allowsHeaderOutsideSectioningWithBannerRole() {
				const header: ElementNode = {
					_tag: "element",
					tagName: "HEADER",
					attributes: { role: "banner" },
					children: [],
				}

				const body: ElementNode = {
					_tag: "element",
					tagName: "BODY",
					attributes: {},
					children: [header],
				}

				const errors = _validateAncestorDependentRoles(header, [body])

				assertEquals(errors.length, 0)
			},
		)

		await t.step(
			"rejects header inside sectioning with banner role",
			function rejectsHeaderInsideSectioningWithBannerRole() {
				const header: ElementNode = {
					_tag: "element",
					tagName: "HEADER",
					attributes: { role: "banner" },
					children: [],
				}

				const section: ElementNode = {
					_tag: "element",
					tagName: "SECTION",
					attributes: {},
					children: [header],
				}

				const errors = _validateAncestorDependentRoles(header, [section])

				assertEquals(errors.length, 1)
				assertEquals(
					errors[0]?.errorType,
					"invalid-ancestor-dependent-role",
				)
				assertEquals(
					errors[0]?.message.includes("cannot have role=\"banner\""),
					true,
				)
			},
		)

		await t.step(
			"detects nested sectioning ancestors",
			function detectsNestedSectioningAncestors() {
				const header: ElementNode = {
					_tag: "element",
					tagName: "HEADER",
					attributes: { role: "banner" },
					children: [],
				}

				const div: ElementNode = {
					_tag: "element",
					tagName: "DIV",
					attributes: {},
					children: [header],
				}

				const article: ElementNode = {
					_tag: "element",
					tagName: "ARTICLE",
					attributes: {},
					children: [div],
				}

				/*++
				 + Ancestors: [div, article]
				 + article is a sectioning element, so header cannot have banner
				 */
				const errors = _validateAncestorDependentRoles(header, [
					div,
					article,
				])

				assertEquals(errors.length, 1)
				assertEquals(
					errors[0]?.message.includes("cannot have role=\"banner\""),
					true,
				)
			},
		)

		await t.step(
			"allows li child of ul with implicit listitem role",
			function allowsLiChildOfUlWithImplicitListitemRole() {
				const li: ElementNode = {
					_tag: "element",
					tagName: "LI",
					attributes: {},
					children: [],
				}

				const ul: ElementNode = {
					_tag: "element",
					tagName: "UL",
					attributes: {},
					children: [li],
				}

				const errors = _validateAncestorDependentRoles(li, [ul])

				assertEquals(errors.length, 0)
			},
		)

		await t.step(
			"rejects li with wrong role when parent has list role",
			function rejectsLiWithWrongRoleWhenParentHasListRole() {
				const li: ElementNode = {
					_tag: "element",
					tagName: "LI",
					attributes: { role: "button" },
					children: [],
				}

				const ul: ElementNode = {
					_tag: "element",
					tagName: "UL",
					attributes: { role: "list" },
					children: [li],
				}

				const errors = _validateAncestorDependentRoles(li, [ul])

				assertEquals(errors.length, 1)
				assertEquals(errors[0]?.errorType, "invalid-role-structure")
				assertEquals(
					errors[0]?.message.includes("must have role=\"listitem\""),
					true,
				)
			},
		)

		await t.step(
			"allows summary child of details with no role",
			function allowsSummaryChildOfDetailsWithNoRole() {
				const summary: ElementNode = {
					_tag: "element",
					tagName: "SUMMARY",
					attributes: {},
					children: [],
				}

				const details: ElementNode = {
					_tag: "element",
					tagName: "DETAILS",
					attributes: {},
					children: [summary],
				}

				const errors = _validateAncestorDependentRoles(summary, [details])

				assertEquals(errors.length, 0)
			},
		)

		await t.step(
			"rejects summary child of details with explicit role",
			function rejectsSummaryChildOfDetailsWithExplicitRole() {
				const summary: ElementNode = {
					_tag: "element",
					tagName: "SUMMARY",
					attributes: { role: "button" },
					children: [],
				}

				const details: ElementNode = {
					_tag: "element",
					tagName: "DETAILS",
					attributes: {},
					children: [summary],
				}

				const errors = _validateAncestorDependentRoles(summary, [details])

				assertEquals(errors.length, 1)
				assertEquals(
					errors[0]?.errorType,
					"invalid-ancestor-dependent-role",
				)
				assertEquals(
					errors[0]?.message.includes("cannot have explicit role"),
					true,
				)
			},
		)

		await t.step(
			"returns empty array for text nodes",
			function returnsEmptyArrayForTextNodes() {
				const textNode = {
					_tag: "text" as const,
					content: "Hello",
				}

				const errors = _validateAncestorDependentRoles(textNode, [])

				assertEquals(errors.length, 0)
			},
		)

		await t.step(
			"returns empty array for elements with no violations",
			function returnsEmptyArrayForElementsWithNoViolations() {
				const div: ElementNode = {
					_tag: "element",
					tagName: "DIV",
					attributes: {},
					children: [],
				}

				const body: ElementNode = {
					_tag: "element",
					tagName: "BODY",
					attributes: {},
					children: [div],
				}

				const errors = _validateAncestorDependentRoles(div, [body])

				assertEquals(errors.length, 0)
			},
		)
	},
)
