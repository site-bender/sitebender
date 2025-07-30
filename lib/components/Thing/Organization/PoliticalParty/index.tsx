import type BaseProps from "../../../../types/index.ts"
import type PoliticalPartyProps from "../../../../types/Thing/Organization/PoliticalParty/index.ts"

import Organization from "../index.tsx"

export type Props = PoliticalPartyProps & BaseProps

export default function PoliticalParty({
	_type = "PoliticalParty",
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
