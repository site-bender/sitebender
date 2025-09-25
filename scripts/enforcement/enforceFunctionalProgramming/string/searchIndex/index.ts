export default function searchIndex(regex: RegExp) {
	return function inText(text: string): number {
		const m = regex.exec(text)

		return m ? m.index : -1
	}
}
