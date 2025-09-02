import type { Text, URL } from "../../../DataType/index.ts"
import type Article from "../../CreativeWork/Article/index.ts"
import type CreativeWork from "../../CreativeWork/index.ts"
import type AboutPage from "../../CreativeWork/WebPage/AboutPage/index.ts"
import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

import { AboutPage as AboutPageComponent } from "../../../../../components/index.tsx"
import { Article as ArticleComponent } from "../../../../../components/index.tsx"
import { CreativeWork as CreativeWorkComponent } from "../../../../../components/index.tsx"

export type NewsMediaOrganizationType = "NewsMediaOrganization"

export interface NewsMediaOrganizationProps {
	"@type"?: NewsMediaOrganizationType
	actionableFeedbackPolicy?:
		| CreativeWork
		| URL
		| ReturnType<typeof CreativeWorkComponent>
	correctionsPolicy?:
		| CreativeWork
		| URL
		| ReturnType<typeof CreativeWorkComponent>
	diversityPolicy?:
		| CreativeWork
		| URL
		| ReturnType<typeof CreativeWorkComponent>
	diversityStaffingReport?: Article | URL | ReturnType<typeof ArticleComponent>
	ethicsPolicy?: CreativeWork | URL | ReturnType<typeof CreativeWorkComponent>
	masthead?: CreativeWork | URL | ReturnType<typeof CreativeWorkComponent>
	missionCoveragePrioritiesPolicy?:
		| CreativeWork
		| URL
		| ReturnType<typeof CreativeWorkComponent>
	noBylinesPolicy?:
		| CreativeWork
		| URL
		| ReturnType<typeof CreativeWorkComponent>
	ownershipFundingInfo?:
		| AboutPage
		| CreativeWork
		| Text
		| URL
		| ReturnType<typeof AboutPageComponent>
		| ReturnType<typeof CreativeWorkComponent>
	unnamedSourcesPolicy?:
		| CreativeWork
		| URL
		| ReturnType<typeof CreativeWorkComponent>
	verificationFactCheckingPolicy?:
		| CreativeWork
		| URL
		| ReturnType<typeof CreativeWorkComponent>
}

type NewsMediaOrganization =
	& Thing
	& OrganizationProps
	& NewsMediaOrganizationProps

export default NewsMediaOrganization
