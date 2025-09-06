import { assertNotMatch, assertStringIncludes } from "jsr:@std/assert"

import type {
	ComparatorNode,
	ElementNode,
	EventBindingNode,
	IrDocument,
	ValidatorNode,
} from "../../../types/ir/index.ts"

import createDeterministicIdGenerator from "../../utilities/nodeId/index.ts"
import renderIrToHtml from "./index.ts"

const generateId = createDeterministicIdGenerator("conditional-rendering-test")
const nodeId = () => generateId()

Deno.test("[irToHtml] renders conditional content and ignores validators/events in SSR", async () => {
	const eqTrue: ComparatorNode = {
		v: "0.1.0",
		kind: "comparator",
		id: nodeId(),
		cmp: "Is.EqualTo",
		args: [
			{
				v: "0.1.0",
				kind: "injector",
				id: nodeId(),
				injector: "From.Constant",
				datatype: "String",
				args: { value: "x" },
			},
			{
				v: "0.1.0",
				kind: "injector",
				id: nodeId(),
				injector: "From.Constant",
				datatype: "String",
				args: { value: "x" },
			},
		],
	}

	const validatorNode: ValidatorNode = {
		v: "0.1.0",
		kind: "validator",
		id: nodeId(),
		rule: eqTrue,
		scope: "self",
	}

	const eventNode: EventBindingNode = {
		v: "0.1.0",
		kind: "on",
		id: nodeId(),
		event: "On.Input",
		handler: {
			v: "0.1.0",
			kind: "action",
			id: nodeId(),
			action: "Act.SetValue",
			args: [
				{
					v: "0.1.0",
					kind: "injector",
					id: nodeId(),
					injector: "From.Constant",
					datatype: "String",
					args: { value: "#out" },
				},
				{
					v: "0.1.0",
					kind: "injector",
					id: nodeId(),
					injector: "From.Constant",
					datatype: "String",
					args: { value: "value" },
				},
			],
		},
	}

	const doc: IrDocument = {
		v: "0.1.0",
		kind: "element",
		id: nodeId(),
		tag: "div",
		attrs: { id: "root" },
		children: [
			{
				v: "0.1.0",
				kind: "element",
				id: nodeId(),
				tag: "span",
				attrs: {},
				children: [
					{
						v: "0.1.0",
						kind: "conditional",
						id: nodeId(),
						condition: eqTrue,
						ifTrue: [
							{
								v: "0.1.0",
								kind: "injector",
								id: nodeId(),
								injector: "From.Constant",
								datatype: "String",
								args: { value: "T" },
							},
						],
						ifFalse: [
							{
								v: "0.1.0",
								kind: "injector",
								id: nodeId(),
								injector: "From.Constant",
								datatype: "String",
								args: { value: "F" },
							},
						],
					},
					validatorNode,
					eventNode,
				],
			} as ElementNode,
		],
	}

	const html = await renderIrToHtml(doc)
	// Conditional truthy branch renders "T" inside the span
	assertStringIncludes(html, '<div id="root"><span>T</span></div>')
	// Ensure "F" is not present
	assertNotMatch(html, /F<\/span>/)
	// Validators and events produce no SSR output
	assertNotMatch(html, /On\.Input|validator|Act\.SetValue/)
})
