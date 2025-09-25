import * as babelParser from "npm:@babel/arborist"
import babelTraverse from "npm:@babel/traverse"

import type { ComponentModule, IRNode, UnknownJSXNode } from "./types/index.ts"

import createIrFromJsx from "./createIrFromJsx/index.ts"
import renderIrToHtml from "./renderIrToHtml/index.ts"

//++ Demonstrates JSX/TSX parsing and conversion to intermediate representation with HTML rendering
export default async function demoJsxToIr(): Promise<void> {
	const source = `
type Props = { name: string };
export function Hello({ name }: Props) {
  return <div className="greeting">Hello, {name}!</div>;
}
const App = <Hello name="World" />;
`

	const ast = babelParser.parse(source, {
		sourceType: "module",
		plugins: ["typescript", "jsx"],
	})

	const topLevelIrRef = { value: null as IRNode | null }

	babelTraverse.default(ast, {
		VariableDeclarator(path: { node: { init?: UnknownJSXNode } }) {
			const hasJsxInit = path.node.init && path.node.init.type === "JSXElement"

			const irNode = hasJsxInit
				? createIrFromJsx(path.node.init as UnknownJSXNode)
				: null

			topLevelIrRef.value = irNode || topLevelIrRef.value
		},
	})

	const componentModule: ComponentModule = {
		Hello: (props) => ({
			type: "element",
			name: "div",
			props: { className: "greeting" },
			children: [
				{ type: "text", value: "Hello, " },
				{
					type: "text",
					value: String(
						(props as Record<string, unknown>).name ?? "",
					),
				},
				{ type: "text", value: "!" },
			],
		}),
	}

	console.log("IR JSON:")
	console.log(JSON.stringify(topLevelIrRef.value, null, 2))

	console.log("\nRendered HTML:")

	const safeIR: IRNode = topLevelIrRef.value ?? { type: "text", value: "" }

	console.log(
		await renderIrToHtml(safeIR, { name: "World" }, componentModule),
	)
}

//?? [GOTCHA] This module uses external babel dependencies which violates the rules that only Arborist and Agent can have external deps

const isMain = import.meta.main

const _runDemo = isMain ? await demoJsxToIr() : null
