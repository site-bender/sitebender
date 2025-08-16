// Run in Node, Deno, or Bun
import * as babelParser from "npm:@babel/parser"
import traverse from "npm:@babel/traverse"

// --- Sample TSX source (with component) ---
const source = `
type Props = { name: string };
export function Hello({ name }: Props) {
  return <div className="greeting">Hello, {name}!</div>;
}
const App = <Hello name="World" />;
`

// --- Parse TSX ---
const ast = babelParser.parse(source, {
	sourceType: "module",
	plugins: ["typescript", "jsx"],
})

// --- IR Node Types ---
function createIRFromJSX(node) {
	if (node.type === "JSXText") {
		return { type: "text", value: node.value }
	}
	if (node.type === "JSXExpressionContainer") {
		return { type: "expression", expr: serializeExpression(node.expression) }
	}
	if (node.type === "JSXFragment") {
		return {
			type: "fragment",
			children: node.children.map(createIRFromJSX),
		}
	}
	if (node.type === "JSXElement") {
		const tag = node.openingElement.name
		const isIntrinsic = tag.type === "JSXIdentifier" && /^[a-z]/.test(tag.name)
		const type = isIntrinsic ? "element" : "component"
		const name = tag.type === "JSXIdentifier"
			? tag.name
			: tag.name.name || "Unknown"
		const props = {}
		node.openingElement.attributes.forEach((attr) => {
			if (attr.type === "JSXAttribute") {
				if (attr.value?.type === "StringLiteral") {
					props[attr.name.name] = attr.value.value
				} else if (attr.value?.type === "JSXExpressionContainer") {
					props[attr.name.name] = {
						type: "expression",
						expr: serializeExpression(attr.value.expression),
					}
				}
			}
		})
		return {
			type,
			name,
			props,
			children: node.children.map(createIRFromJSX),
		}
	}
	return { type: "text", value: "" }
}

// --- Serialize minimal expression AST ---
function serializeExpression(expr) {
	if (expr.type === "Identifier") {
		return { type: "Identifier", name: expr.name }
	}
	if (expr.type === "StringLiteral") {
		return { type: "StringLiteral", value: expr.value }
	}
	if (expr.type === "NumericLiteral") {
		return { type: "NumericLiteral", value: expr.value }
	}
	return { type: "Unsupported", raw: expr.type }
}

// --- Evaluate expression AST safely (demo only) ---
function evalExpressionAst(ast, context) {
	switch (ast.type) {
		case "Identifier":
			return context[ast.name]
		case "StringLiteral":
			return ast.value
		case "NumericLiteral":
			return ast.value
		default:
			return ""
	}
}

// --- Render IR to HTML ---
async function renderIRToHTML(node, context, componentModule) {
	switch (node.type) {
		case "text":
			return node.value
		case "expression":
			return evalExpressionAst(node.expr, context)
		case "element":
			const propsStr = Object.entries(node.props || {})
				.map(([k, v]) =>
					v.type === "expression"
						? `${k}="${evalExpressionAst(v.expr, context)}"`
						: `${k}="${v}"`
				)
				.join(" ")
			const openTag = `<${node.name}${propsStr ? " " + propsStr : ""}>`
			const closeTag = `</${node.name}>`
			return (
				openTag +
				(await Promise.all(
					node.children.map((c) => renderIRToHTML(c, context, componentModule)),
				)).join("") +
				closeTag
			)
		case "fragment":
			return (
				await Promise.all(
					node.children.map((c) => renderIRToHTML(c, context, componentModule)),
				)
			).join("")
		case "component": {
			if (!componentModule[node.name]) {
				throw new Error(`Component '${node.name}' not found in module`)
			}
			const evaluatedProps = {}
			for (const [k, v] of Object.entries(node.props)) {
				evaluatedProps[k] = v?.type === "expression"
					? evalExpressionAst(v.expr, context)
					: v
			}
			// Call the component to get IR
			const childIR = componentModule[node.name](evaluatedProps)
			return renderIRToHTML(childIR, context, componentModule)
		}
	}
}

/* ***** below this line is included temporarily for testing purposes — remove before deployment */

// --- Collect IR from AST ---
let topLevelIR = null
traverse(ast, {
	VariableDeclarator(path) {
		if (
			path.node.init &&
			path.node.init.type === "JSXElement"
		) {
			topLevelIR = createIRFromJSX(path.node.init)
		}
	},
})

// --- Fake dynamic import (in real usage, load from file) ---
const componentModule = {
	Hello: ({ name }) => ({
		type: "element",
		name: "div",
		props: { className: "greeting" },
		children: [
			{ type: "text", value: "Hello, " },
			{ type: "text", value: name },
			{ type: "text", value: "!" },
		],
	}),
}

// --- Demo output ---
console.log("IR JSON:")
console.log(JSON.stringify(topLevelIR, null, 2))

console.log("\nRendered HTML:")
console.log(
	await renderIRToHTML(topLevelIR, { name: "World" }, componentModule),
)
