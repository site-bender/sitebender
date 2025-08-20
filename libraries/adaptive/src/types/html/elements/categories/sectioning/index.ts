import type { ArticleElement } from "../../sections/article/index.ts"
import type { AsideElement } from "../../sections/aside/index.ts"
import type { NavigationElement } from "../../sections/nav/index.ts"
import type { SectionElement } from "../../sections/section/index.ts"

export type SectioningContent =
	| ArticleElement
	| AsideElement
	| NavigationElement
	| SectionElement
