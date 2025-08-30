import buildDomTree from "../index.ts"

type ElementChild = { tag: string } | { tag: "TextNode"; content: string }
type Options = { level?: number }

const handleFragment = (parent: HTMLElement) => (children: ElementChild[] = []) => (options: Options) => {
	children.forEach((child) => buildDomTree(parent)(child as unknown as { tag: string })(options))
}

export default handleFragment
