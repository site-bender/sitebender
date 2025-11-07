import type { HeadingGroupElement } from "../../sections/hgroup/index.ts"
import type {
	Heading1Element,
	Heading2Element,
	Heading3Element,
	Heading4Element,
	Heading5Element,
	Heading6Element,
	HeadingElement,
} from "../sections/hn"

export type HeadingContent =
	| Heading1Element
	| Heading2Element
	| Heading3Element
	| Heading4Element
	| Heading5Element
	| Heading6Element
	| HeadingElement
	| HeadingGroupElement
