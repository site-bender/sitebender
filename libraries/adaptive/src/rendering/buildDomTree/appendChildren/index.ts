import buildDomTree from "../index.ts"
import appendTextNode from "../appendTextNode/index.ts"

type ElementChild = { tag: string }
type Options = { level?: number }

const appendChildren = (elem: HTMLElement) => (children: ElementChild[] = []) => (options: Options) => {
	children.forEach((child: any) => {
		if (child.tag === "TextNode") {
			appendTextNode(elem)(child)

			return
		}

	buildDomTree(elem)(child as any)(options)

		return
	})
}

export default appendChildren
