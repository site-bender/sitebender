// Run in Node, Deno, or Bun
import * as babelParser from 'npm:@babel/parser';
import traverse from 'npm:@babel/traverse';

// Minimal IR and AST helper types for this demo script
type IRText = { type: 'text'; value: string };
type IRExpr = { type: 'expression'; expr: SerializedExpr };
type IRElement = {
	type: 'element' | 'component';
	name: string;
	props: Record<string, string | { type: 'expression'; expr: SerializedExpr }>;
	children: IRNode[];
};
type IRFragment = { type: 'fragment'; children: IRNode[] };
type IRNode = IRText | IRExpr | IRElement | IRFragment;

type SerializedExpr =
	| { type: 'Identifier'; name: string }
	| { type: 'StringLiteral'; value: string }
	| { type: 'NumericLiteral'; value: number }
	| { type: 'Unsupported'; raw: string };

// Minimal JSX AST shapes we rely on (subset of Babel AST)
type JSXTextNode = { type: 'JSXText'; value: string };
type JSXExpressionContainerNode = {
	type: 'JSXExpressionContainer';
	expression: unknown;
};
type JSXFragmentNode = { type: 'JSXFragment'; children: UnknownJSXNode[] };
type JSXIdentifierNode = { type: 'JSXIdentifier'; name: string };
type JSXAttributeValue =
	| { type: 'StringLiteral'; value: string }
	| { type: 'JSXExpressionContainer'; expression: unknown };
type JSXAttributeNode = {
	type: 'JSXAttribute';
	name: { name: string };
	value?: JSXAttributeValue;
};
type JSXOpeningElementNode = {
	name: JSXIdentifierNode | { name?: { name?: string } };
	attributes: JSXAttributeNode[];
};
type JSXElementNode = {
	type: 'JSXElement';
	openingElement: JSXOpeningElementNode;
	children: UnknownJSXNode[];
};
type UnknownJSXNode =
	| JSXTextNode
	| JSXExpressionContainerNode
	| JSXFragmentNode
	| JSXElementNode
	| { type: string; [k: string]: unknown };

// --- Sample TSX source (with component) ---
const source = `
type Props = { name: string };
export function Hello({ name }: Props) {
  return <div className="greeting">Hello, {name}!</div>;
}
const App = <Hello name="World" />;
`;

// --- Parse TSX ---
const ast = babelParser.parse(source, {
	sourceType: 'module',
	plugins: ['typescript', 'jsx'],
});

// --- IR Node Types ---
function createIRFromJSX(node: UnknownJSXNode): IRNode {
	if (node.type === 'JSXText') {
		return { type: 'text', value: (node as JSXTextNode).value };
	}
	if (node.type === 'JSXExpressionContainer') {
		return {
			type: 'expression',
			expr: serializeExpression(
				(node as JSXExpressionContainerNode).expression,
			),
		};
	}
	if (node.type === 'JSXFragment') {
		return {
			type: 'fragment',
			children: (node as JSXFragmentNode).children.map(createIRFromJSX),
		};
	}
	if (node.type === 'JSXElement') {
		const opening = (node as JSXElementNode).openingElement;
		const tag = opening.name;
		const tagIsIdentifier = (tag as { type?: string }).type === 'JSXIdentifier';
		const tagName = tagIsIdentifier
			? (tag as JSXIdentifierNode).name
			: ((tag as { name?: { name?: string } }).name?.name ?? 'Unknown');
		const isIntrinsic = tagIsIdentifier && /^[a-z]/.test(tagName);
		const type = isIntrinsic ? 'element' : 'component';
		const name = tagName;
		const props: IRElement['props'] = {};
		for (const attr of opening.attributes) {
			if (attr.type === 'JSXAttribute') {
				const a = attr as JSXAttributeNode;
				if (a.value?.type === 'StringLiteral') {
					props[a.name.name] = a.value.value;
				} else if (a.value?.type === 'JSXExpressionContainer') {
					props[a.name.name] = {
						type: 'expression',
						expr: serializeExpression(a.value.expression),
					};
				}
			}
		}
		return {
			type,
			name,
			props,
			children: (node as JSXElementNode).children.map(createIRFromJSX),
		};
	}
	return { type: 'text', value: '' };
}

// --- Serialize minimal expression AST ---
function serializeExpression(expr: unknown): SerializedExpr {
	const e = expr as Record<string, unknown>;
	const t = e?.type as string | undefined;
	if (t === 'Identifier') {
		return { type: 'Identifier', name: String(e.name ?? '') };
	}
	if (t === 'StringLiteral') {
		return { type: 'StringLiteral', value: String(e.value ?? '') };
	}
	if (t === 'NumericLiteral') {
		return { type: 'NumericLiteral', value: Number(e.value ?? 0) };
	}
	return { type: 'Unsupported', raw: String(t ?? 'unknown') };
}

// --- Evaluate expression AST safely (demo only) ---
function evalExpressionAst(
	ast: SerializedExpr,
	context: Record<string, unknown>,
) {
	switch (ast.type) {
		case 'Identifier':
			return (context as Record<string, unknown>)[ast.name];
		case 'StringLiteral':
			return ast.value;
		case 'NumericLiteral':
			return ast.value;
		default:
			return '';
	}
}

// --- Render IR to HTML ---
async function renderIRToHTML(
	node: IRNode,
	context: Record<string, unknown>,
	componentModule: Record<
		string,
		(props: Record<string, unknown>) => IRNode | Promise<IRNode>
	>,
): Promise<string> {
	switch (node.type) {
		case 'text':
			return node.value;
		case 'expression':
			return String(evalExpressionAst(node.expr, context));
		case 'element': {
			const propsStr = Object.entries(node.props || {})
				.map(([k, v]) =>
					typeof v === 'object' && v !== null &&
						(v as { type?: string }).type === 'expression'
						? `${k}="${
							String(
								evalExpressionAst(
									(v as { type: string; expr: SerializedExpr }).expr,
									context,
								),
							)
						}"`
						: `${k}="${String(v)}"`
				)
				.join(' ');
			const openTag = `<${node.name}${propsStr ? ' ' + propsStr : ''}>`;
			const closeTag = `</${node.name}>`;
			return (
				openTag +
				(await Promise.all(
					node.children.map((c) => renderIRToHTML(c, context, componentModule)),
				)).join('') +
				closeTag
			);
		}
		case 'fragment': {
			return (
				await Promise.all(
					node.children.map((c) => renderIRToHTML(c, context, componentModule)),
				)
			).join('');
		}
		case 'component': {
			if (!componentModule[node.name]) {
				throw new Error(`Component '${node.name}' not found in module`);
			}
			const evaluatedProps: Record<string, unknown> = {};
			for (const [k, v] of Object.entries(node.props)) {
				const ve = v as unknown;
				const maybeExpr = ve as { type?: string; expr?: SerializedExpr };
				evaluatedProps[k] = maybeExpr?.type === 'expression'
					? evalExpressionAst(maybeExpr.expr as SerializedExpr, context)
					: ve;
			}
			// Call the component to get IR
			const childIR = await componentModule[node.name](evaluatedProps);
			return renderIRToHTML(childIR as IRNode, context, componentModule);
		}
	}
}

/* ***** below this line is included temporarily for testing purposes — remove before deployment */

// --- Collect IR from AST ---
let topLevelIR: IRNode | null = null;
traverse(ast, {
	VariableDeclarator(path: { node: { init?: UnknownJSXNode } }) {
		if (
			path.node.init &&
			path.node.init.type === 'JSXElement'
		) {
			topLevelIR = createIRFromJSX(path.node.init);
		}
	},
});

// --- Fake dynamic import (in real usage, load from file) ---
const componentModule: Record<
	string,
	(props: Record<string, unknown>) => IRNode
> = {
	Hello: (props) => ({
		type: 'element',
		name: 'div',
		props: { className: 'greeting' },
		children: [
			{ type: 'text', value: 'Hello, ' },
			{
				type: 'text',
				value: String((props as Record<string, unknown>).name ?? ''),
			},
			{ type: 'text', value: '!' },
		],
	}),
};

// --- Demo output ---
console.log('IR JSON:');
console.log(JSON.stringify(topLevelIR, null, 2));

console.log('\nRendered HTML:');
const safeIR: IRNode = topLevelIR ?? { type: 'text', value: '' };
console.log(
	await renderIRToHTML(safeIR, { name: 'World' }, componentModule),
);
