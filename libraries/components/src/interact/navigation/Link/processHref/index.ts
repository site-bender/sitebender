export default function processHref(to: string): string {
	if (to.startsWith("@")) {
		switch (to) {
			case "@top":
				return "#"
			case "@top-alt":
				return "#top"
			case "@base":
				return "."
			case "@reload":
				return ""
			case "@query":
				return "?"
			case "@data":
				return "data:"
			default:
				if (to.startsWith("@media=")) {
					return to.replace("@media=", "")
				}
				return to
		}
	}
	return to
}
