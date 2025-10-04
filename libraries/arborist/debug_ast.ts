import initSwc, { parse } from "npm:@swc/wasm-web@1.13.20"

await initSwc()

const source = `
export default function add(a: number, b?: number): number {
	return a + (b || 0)
}
`

const ast = await parse(source, {
	syntax: "typescript",
	tsx: false,
})

console.log("AST Body:", JSON.stringify(ast.body, null, 2))
