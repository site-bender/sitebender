import initSwc, { parse } from "npm:@swc/wasm-web@1.13.20"

await initSwc()

const source = `
function identity<T>(value: T): T {
	return value
}
`

const ast = await parse(source, {
	syntax: "typescript",
	tsx: false,
})

const func = ast.body[0] as Record<string, unknown>
console.log("Type params:", JSON.stringify(func.typeParameters, null, 2))
