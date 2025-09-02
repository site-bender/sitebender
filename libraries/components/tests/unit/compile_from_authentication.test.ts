import type { InjectorNode, IrDocument } from "@engineTypes/ir/index.ts"

import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts"

import { compileToEngine } from "../../src/compile.ts"
import FromAuthentication from "../../src/constructors/injectors/From/Authenticator/index.tsx"
import On from "../../src/transform/control/On/index.tsx"

const el = (
	tag: string,
	props: Record<string, unknown> = {},
	children?: unknown,
) => ({
	type: tag,
	props: children === undefined ? props : { ...props, children },
})

Deno.test("From.Authenticator lowers to IR injector with path", () => {
	// This marker is not an event; the compiler ignores loose injectors, so we compile operand directly by placing in an action
	const ir = compileToEngine([
		el("div", { id: "x" }),
		On({
			event: "Click",
			children: {
				__kind: "action",
				action: "Act.SetValue",
				args: [
					{
						type: "injector",
						tag: "Constant",
						datatype: "String",
						value: "#x",
					},
					FromAuthentication({ path: "claims.sub" }) as unknown as JSX.Element,
				],
			} as unknown as JSX.Element,
		}) as unknown as JSX.Element,
	]) as IrDocument
	const evt = ir
		.children[
			0
		] as unknown as import("@engineTypes/ir/index.ts").EventBindingNode
	const handler = evt.handler as import("@engineTypes/ir/index.ts").ActionNode
	const inj = handler.args[1] as InjectorNode
	assertEquals(inj.kind, "injector")
	assertEquals(inj.injector, "From.Authenticator")
	assertEquals(inj.args.path, "claims.sub")
})
