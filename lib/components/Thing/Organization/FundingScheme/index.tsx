import type BaseProps from "../../../../types/index.ts"
import type FundingSchemeProps from "../../../../types/Thing/Organization/FundingScheme/index.ts"

import Organization from "../index.tsx"

export type Props = FundingSchemeProps & BaseProps

export default function FundingScheme({
	_type = "FundingScheme",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Organization
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</Organization>
	)
}
