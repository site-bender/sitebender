import initSwc, { parse } from "npm:@swc/wasm-web@1.13.20"

await initSwc()

const source = `
export function add(a: number): number {
	return a
}
`

const ast = await parse(source, {
	syntax: "typescript",
	tsx: false,
})

console.log("Export AST:", JSON.stringify(ast.body[0], null, 2))
