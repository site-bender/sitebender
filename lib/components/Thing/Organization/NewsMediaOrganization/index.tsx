import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { OrganizationProps } from "../../../../types/Thing/Organization/index.ts"
import type { NewsMediaOrganizationProps } from "../../../../types/Thing/Organization/NewsMediaOrganization/index.ts"

import Organization from "../index.tsx"

export type Props = BaseComponentProps<
	NewsMediaOrganizationProps,
	"NewsMediaOrganization",
	ExtractLevelProps<ThingProps, OrganizationProps>
>

export default function NewsMediaOrganization({
	actionableFeedbackPolicy,
	correctionsPolicy,
	diversityPolicy,
	diversityStaffingReport,
	ethicsPolicy,
	masthead,
	missionCoveragePrioritiesPolicy,
	noBylinesPolicy,
	ownershipFundingInfo,
	unnamedSourcesPolicy,
	verificationFactCheckingPolicy,
	schemaType = "NewsMediaOrganization",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Organization
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				actionableFeedbackPolicy,
				correctionsPolicy,
				diversityPolicy,
				diversityStaffingReport,
				ethicsPolicy,
				masthead,
				missionCoveragePrioritiesPolicy,
				noBylinesPolicy,
				ownershipFundingInfo,
				unnamedSourcesPolicy,
				verificationFactCheckingPolicy,
				...subtypeProperties,
			}}
		/>
	)
}
