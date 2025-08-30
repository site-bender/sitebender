import buildDomTree from "../index.ts"

type ElementChild = { tag: string }
type Options = { level?: number }

const handleFragment = (parent: HTMLElement) => (children: ElementChild[] = []) => (options: Options) => {
	children.forEach((child) => buildDomTree(parent)(child as any)(options))
}

export default handleFragment
