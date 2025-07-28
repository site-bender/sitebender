import type BaseProps from "../../../../types/index.ts"
import type { NewsMediaOrganizationProps } from "../../../../types/Thing/Organization/NewsMediaOrganization/index.ts"

import Organization from "../index.tsx"

export type Props = NewsMediaOrganizationProps & BaseProps

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
	_type = "NewsMediaOrganization",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Organization
			{...props}
			_type={_type}
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
