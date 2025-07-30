import type { Text, URL } from "../../../DataType/index.ts"
import type Article from "../../CreativeWork/Article/index.ts"
import type CreativeWork from "../../CreativeWork/index.ts"
import type AboutPage from "../../CreativeWork/WebPage/AboutPage/index.ts"
import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

import ArticleComponent from "../../../../components/Thing/CreativeWork/Article/index.ts"
import CreativeWorkComponent from "../../../../components/Thing/CreativeWork/index.ts"
import AboutPageComponent from "../../../../components/Thing/CreativeWork/WebPage/AboutPage/index.ts"

export interface NewsMediaOrganizationProps {
	"@type"?: "NewsMediaOrganization"
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
