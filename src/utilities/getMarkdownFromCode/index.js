import rehypeFormat from "rehype-format"
import rehypeStringify from "rehype-stringify"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypePrettyCode from "rehype-pretty-code"
import { unified } from "unified"

const getMarkdownFromCode = async code => {
	const js =
		typeof code === "string"
			? code
			: code.default.toString().replaceAll(/\t/g, "  ")
	const snippet = `
\`\`\`js
${js}
\`\`\`
`

	const out = await unified()
		.use(remarkParse)
		.use(remarkRehype)
		.use(rehypePrettyCode, {
			// See Options section below.
		})
		.use(rehypeFormat)
		.use(rehypeStringify)
		.process(snippet)

	return out.value
}

export default getMarkdownFromCode
