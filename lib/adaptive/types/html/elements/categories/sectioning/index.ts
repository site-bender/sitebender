import type { ArticleElement } from "../sections/article"
import type { AsideElement } from "../sections/aside"
import type { NavigationElement } from "../sections/nav"
import type { SectionElement } from "../sections/section"

export type SectioningContent =
	| ArticleElement
	| AsideElement
	| NavigationElement
	| SectionElement
