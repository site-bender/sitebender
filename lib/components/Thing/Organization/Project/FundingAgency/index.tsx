import type BaseProps from "../../../../../types/index.ts"
import type FundingAgencyProps from "../../../../../types/Thing/Organization/Project/FundingAgency/index.ts"

import Project from "../index.tsx"

export type Props = FundingAgencyProps & BaseProps

export default function FundingAgency({
	_type = "FundingAgency",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Project
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</Project>
	)
}
