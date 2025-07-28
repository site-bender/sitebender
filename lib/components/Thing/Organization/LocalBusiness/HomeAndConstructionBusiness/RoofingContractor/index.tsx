import type BaseProps from "../../../../../../types/index.ts"
import type { RoofingContractorProps } from "../../../../../../types/Thing/Organization/LocalBusiness/HomeAndConstructionBusiness/RoofingContractor/index.ts"

import HomeAndConstructionBusiness from "../index.tsx"

export type Props = RoofingContractorProps & BaseProps

export default function RoofingContractor({
	_type = "RoofingContractor",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<HomeAndConstructionBusiness
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
