import not from "../not"

export default function getLineNumberingWidth(codeBlock = "") {
	return codeBlock
		.trim()
		.split(/\n/)
		.filter(line => not(/^(```|<!-- markdownlint)/.test(line)))
		.length.toString().length
}
