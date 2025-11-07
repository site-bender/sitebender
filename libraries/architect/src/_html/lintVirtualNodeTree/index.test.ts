import { assertEquals } from "@std/assert"
import type { ElementNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"

import lintVirtualNodeTree from "./index.ts"

Deno.test("lintVirtualNodeTree", async function lintVirtualNodeTreeTests(t) {
	await t.step(
		"returns empty array for valid tree",
		function returnsEmptyArrayForValidTree() {
			const tree: ElementNode = {
				_tag: "element",
				tagName: "DIV",
				attributes: {},
				children: [
					{
						_tag: "element",
						tagName: "P",
						attributes: {},
						children: [
							{
								_tag: "text",
								content: "Hello",
							},
						],
					},
				],
			}

			const errors = lintVirtualNodeTree(tree)

			assertEquals(errors.length, 0)
		},
	)

	await t.step(
		"detects div child of dl with invalid role",
		function detectsDivChildOfDlWithInvalidRole() {
			const tree: ElementNode = {
				_tag: "element",
				tagName: "DL",
				attributes: {},
				children: [
					{
						_tag: "element",
						tagName: "DIV",
						attributes: { role: "button" },
						children: [],
					},
				],
			}

			const errors = lintVirtualNodeTree(tree)

			assertEquals(errors.length, 1)
			assertEquals(
				errors[0]?.errorType,
				"invalid-ancestor-dependent-role",
			)
		},
	)

	await t.step(
		"detects footer with contentinfo in sectioning element",
		function detectsFooterWithContentinfoInSectioning() {
			const tree: ElementNode = {
				_tag: "element",
				tagName: "ARTICLE",
				attributes: {},
				children: [
					{
						_tag: "element",
						tagName: "FOOTER",
						attributes: { role: "contentinfo" },
						children: [],
					},
				],
			}

			const errors = lintVirtualNodeTree(tree)

			assertEquals(errors.length, 1)
			assertEquals(
				errors[0]?.errorType,
				"invalid-ancestor-dependent-role",
			)
			assertEquals(
				errors[0]?.message.includes('cannot have role="contentinfo"'),
				true,
			)
		},
	)

	await t.step(
		"detects header with banner in nested sectioning element",
		function detectsHeaderWithBannerInNestedSectioning() {
			const tree: ElementNode = {
				_tag: "element",
				tagName: "BODY",
				attributes: {},
				children: [
					{
						_tag: "element",
						tagName: "ARTICLE",
						attributes: {},
						children: [
							{
								_tag: "element",
								tagName: "DIV",
								attributes: {},
								children: [
									{
										_tag: "element",
										tagName: "HEADER",
										attributes: { role: "banner" },
										children: [],
									},
								],
							},
						],
					},
				],
			}

			const errors = lintVirtualNodeTree(tree)

			assertEquals(errors.length, 1)
			assertEquals(
				errors[0]?.errorType,
				"invalid-ancestor-dependent-role",
			)
			assertEquals(
				errors[0]?.message.includes('cannot have role="banner"'),
				true,
			)
		},
	)

	await t.step(
		"detects multiple violations in complex tree",
		function detectsMultipleViolationsInComplexTree() {
			const tree: ElementNode = {
				_tag: "element",
				tagName: "BODY",
				attributes: {},
				children: [
					{
						_tag: "element",
						tagName: "DL",
						attributes: {},
						children: [
							{
								_tag: "element",
								tagName: "DIV",
								attributes: { role: "button" },
								children: [],
							},
						],
					},
					{
						_tag: "element",
						tagName: "ARTICLE",
						attributes: {},
						children: [
							{
								_tag: "element",
								tagName: "HEADER",
								attributes: { role: "banner" },
								children: [],
							},
							{
								_tag: "element",
								tagName: "FOOTER",
								attributes: { role: "contentinfo" },
								children: [],
							},
						],
					},
				],
			}

			const errors = lintVirtualNodeTree(tree)

			/*++
			 + Should find 3 violations:
			 + 1. div child of dl with button role
			 + 2. header with banner in article
			 + 3. footer with contentinfo in article
			 */
			assertEquals(errors.length, 3)
		},
	)

	await t.step(
		"detects summary with explicit role in details",
		function detectsSummaryWithExplicitRoleInDetails() {
			const tree: ElementNode = {
				_tag: "element",
				tagName: "DETAILS",
				attributes: {},
				children: [
					{
						_tag: "element",
						tagName: "SUMMARY",
						attributes: { role: "button" },
						children: [
							{
								_tag: "text",
								content: "Summary",
							},
						],
					},
				],
			}

			const errors = lintVirtualNodeTree(tree)

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
		"allows valid complex tree structure",
		function allowsValidComplexTreeStructure() {
			const tree: ElementNode = {
				_tag: "element",
				tagName: "BODY",
				attributes: {},
				children: [
					{
						_tag: "element",
						tagName: "HEADER",
						attributes: { role: "banner" },
						children: [
							{
								_tag: "element",
								tagName: "NAV",
								attributes: {},
								children: [
									{
										_tag: "element",
										tagName: "UL",
										attributes: {},
										children: [
											{
												_tag: "element",
												tagName: "LI",
												attributes: {},
												children: [
													{
														_tag: "text",
														content: "Item",
													},
												],
											},
										],
									},
								],
							},
						],
					},
					{
						_tag: "element",
						tagName: "ARTICLE",
						attributes: {},
						children: [
							{
								_tag: "element",
								tagName: "HEADER",
								attributes: { role: "group" },
								children: [],
							},
							{
								_tag: "element",
								tagName: "FOOTER",
								attributes: { role: "group" },
								children: [],
							},
						],
					},
					{
						_tag: "element",
						tagName: "FOOTER",
						attributes: { role: "contentinfo" },
						children: [],
					},
				],
			}

			const errors = lintVirtualNodeTree(tree)

			/*++
			 + All valid:
			 + - header with banner at body level (OK)
			 + - header with group in article (OK)
			 + - footer with group in article (OK)
			 + - footer with contentinfo at body level (OK)
			 */
			assertEquals(errors.length, 0)
		},
	)

	await t.step(
		"detects li with wrong role in list",
		function detectsLiWithWrongRoleInList() {
			const tree: ElementNode = {
				_tag: "element",
				tagName: "UL",
				attributes: { role: "list" },
				children: [
					{
						_tag: "element",
						tagName: "LI",
						attributes: { role: "button" },
						children: [],
					},
				],
			}

			const errors = lintVirtualNodeTree(tree)

			assertEquals(errors.length, 1)
			assertEquals(errors[0]?.errorType, "invalid-role-structure")
			assertEquals(
				errors[0]?.message.includes('must have role="listitem"'),
				true,
			)
		},
	)

	await t.step(
		"provides context in error objects",
		function providesContextInErrorObjects() {
			const tree: ElementNode = {
				_tag: "element",
				tagName: "DL",
				attributes: {},
				children: [
					{
						_tag: "element",
						tagName: "DIV",
						attributes: { role: "button" },
						children: [],
					},
				],
			}

			const errors = lintVirtualNodeTree(tree)

			assertEquals(errors.length, 1)
			assertEquals(errors[0]?.context?.parentTag, "DL")
			assertEquals(errors[0]?.context?.role, "button")
		},
	)
})
