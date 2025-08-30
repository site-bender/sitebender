import type { ElementConfig } from "../../../../types/html/index.ts"

const collectScriptElements = (
	component: Record<string, unknown>,
): Array<string> => {
	const scriptElements = Object.entries(component).reduce(
		(scripts: Array<string>, [key, value]: [string, unknown]) => {
			if (key === "scripts") {
				scripts.push(...(value as string[]))
			}

			if (key === "children") {
				const childScripts = (value as Array<ElementConfig> | undefined)?.reduce(
					(out: Array<string>, item: ElementConfig) => out.concat(collectScriptElements(item as unknown as Record<string, unknown>)),
					[],
				)

				if (childScripts) {
					scripts.push(...childScripts)
				}
			}

			return scripts
		},
		[],
	)

	return scriptElements
}

export default collectScriptElements
