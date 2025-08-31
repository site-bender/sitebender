import appendTextNode from "../appendTextNode/index.ts"
import buildDomTree from "../index.ts"

type ElementChild = { tag: string } | { tag: "TextNode"; content: string }
type Options = { level?: number }

const appendChildren =
	(elem: HTMLElement) =>
	(children: ElementChild[] = []) =>
	(options: Options) => {
		children.forEach((child: ElementChild) => {
			if (child.tag === "TextNode") {
				appendTextNode(elem)(child as { tag: "TextNode"; content: string })

				return
			}

			buildDomTree(elem)(child as unknown as { tag: string })(options)

			return
		})
	}

export default appendChildren
