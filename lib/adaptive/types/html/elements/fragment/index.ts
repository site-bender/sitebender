import { Element } from "."

export type Fragment = {
	children?: Array<Element>
	readonly tagName: "FRAGMENT"
}
