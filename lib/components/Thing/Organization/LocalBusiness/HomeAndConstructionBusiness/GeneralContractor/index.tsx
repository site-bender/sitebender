import type BaseProps from "../../../../../../types/index.ts"
import type GeneralContractorProps from "../../../../../../types/Thing/Organization/LocalBusiness/HomeAndConstructionBusiness/GeneralContractor/index.ts"

import HomeAndConstructionBusiness from "../index.tsx"

export type Props = GeneralContractorProps & BaseProps

export default function GeneralContractor({
	_type = "GeneralContractor",
	children,
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
		>
			{children}
		</HomeAndConstructionBusiness>
	)
}
