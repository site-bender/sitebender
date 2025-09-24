import compileToArchitect from "../../compile/toArchitectIr.ts"

export type Props = {
	id?: string // script element id
	type?: string // MIME type
	children?: JSX.Element | Array<JSX.Element>
}

export default function Program(
	{ id = "ir-root", type = "application/architect+json", children }: Props,
) {
	const ir = compileToArchitect(children as unknown)
	return {
		type: "script",
		props: {
			id,
			type,
			children: JSON.stringify(ir),
		},
	}
}
