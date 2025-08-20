import type { ElementConfig } from "../../../types/html/index.ts"

const collectScriptElements = (
	component: Record<string, any>,
): Array<string> => {
	const scriptElements = Object.entries(component).reduce(
		(scripts: Array<string>, [key, value]: [string, any]) => {
			if (key === "scripts") {
				scripts.push(...value)
			}

			if (key === "children") {
				const childScripts = value?.reduce(
					(out: Array<string>, item: ElementConfig) => {
						return out.concat(collectScriptElements(item))
					},
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
