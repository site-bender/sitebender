import { Element } from "./index.ts"

export type Fragment = {
	children?: Array<Element>
	readonly tagName: "FRAGMENT"
}
