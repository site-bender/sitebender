import formatter from "../../../formatters/index.ts"
import collectDependencies from "../../../rendering/helpers/collectDependencies/index.ts"

type FormatFn = (
	arg: unknown,
	localValues?: Record<string, unknown>,
) => Promise<unknown>

const FROM_VALUE = ["DATA", "INPUT", "SELECT", "TEXTAREA"]

const addFormatter = (element: HTMLElement) => (fmt: unknown) => {
	const selectors = collectDependencies(fmt)
	const format = formatter(fmt as unknown as { tag: string }) as FormatFn

	element.__sbFormat = async function (
		_arg?: unknown,
		localValues?: Record<string, unknown>,
	) {
		const self = this as HTMLElement & {
			value?: unknown
			innerHTML: string
			tagName: string
		}
		const arg = FROM_VALUE.includes(self.tagName)
			? self.value
			: self.innerHTML
		const formatted = await format(arg, localValues)

		return formatted
	}

	element.dataset.format = JSON.stringify(fmt as unknown)

	document.__sbFormatters ??= new Set()
	document.__sbFormatters.add(element.id)

	// console.log("selectors", selectors)
	// console.log("__sbFormatters", document.__sbFormatters)

	selectors.forEach((selector) => {
		document.__sbFormatted ??= {}
		document.__sbFormatted[selector] ??= new Set()
		document.__sbFormatted[selector].add(element.id)
	})
}

export default addFormatter
