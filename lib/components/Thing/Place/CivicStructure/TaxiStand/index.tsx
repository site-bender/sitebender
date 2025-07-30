import type BaseProps from "../../../../../types/index.ts"
import type TaxiStandProps from "../../../../../types/Thing/Place/CivicStructure/TaxiStand/index.ts"

import CivicStructure from "../index.tsx"

export type Props = TaxiStandProps & BaseProps

export default function TaxiStand({
	_type = "TaxiStand",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CivicStructure
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</CivicStructure>
	)
}
