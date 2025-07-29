import type BaseProps from "../../../../types/index.ts"
import type CorporationProps from "../../../../types/Thing/Organization/Corporation/index.ts"

import Organization from "../index.tsx"

export type Props = CorporationProps & BaseProps

export default function Corporation({
	tickerSymbol,
	_type = "Corporation",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Organization
			{...props}
			_type={_type}
			subtypeProperties={{
				tickerSymbol,
				...subtypeProperties,
			}}
		/>
	)
}
