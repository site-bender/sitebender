import initSwc, { parse } from "npm:@swc/wasm-web@1.13.20"

await initSwc()

const source = `
export function add(a: number, b: number): number {
	return a + b
}
`

const ast = await parse(source, {
	syntax: "typescript",
	tsx: false,
})

const astBody = ast.body as Array<unknown>
const found = astBody.find((node: unknown) => {
	const nodeObj = node as Record<string, unknown>
	return nodeObj.type === "FunctionDeclaration"
})

console.log("Found with FunctionDeclaration search:", found)
console.log("\nActual first node type:", (astBody[0] as Record<string, unknown>).type)
