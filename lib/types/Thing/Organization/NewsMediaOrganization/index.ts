import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"
import type AboutPage from "../../CreativeWork/WebPage/AboutPage/index.ts"
import type Article from "../../CreativeWork/Article/index.ts"
import type CreativeWork from "../../CreativeWork/index.ts"

import NewsMediaOrganizationComponent from "../../../../../components/Thing/Organization/NewsMediaOrganization/index.tsx"

export interface NewsMediaOrganizationProps {
	actionableFeedbackPolicy?: CreativeWork | URL
	correctionsPolicy?: CreativeWork | URL
	diversityPolicy?: CreativeWork | URL
	diversityStaffingReport?: Article | URL
	ethicsPolicy?: CreativeWork | URL
	masthead?: CreativeWork | URL
	missionCoveragePrioritiesPolicy?: CreativeWork | URL
	noBylinesPolicy?: CreativeWork | URL
	ownershipFundingInfo?: AboutPage | CreativeWork | Text | URL
	unnamedSourcesPolicy?: CreativeWork | URL
	verificationFactCheckingPolicy?: CreativeWork | URL
}

type NewsMediaOrganization =
	& Thing
	& OrganizationProps
	& NewsMediaOrganizationProps

export default NewsMediaOrganization
