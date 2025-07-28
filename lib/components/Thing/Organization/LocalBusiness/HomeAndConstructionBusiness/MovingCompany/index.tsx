import type BaseProps from "../../../../../../types/index.ts"
import type { MovingCompanyProps } from "../../../../../../types/Thing/Organization/LocalBusiness/HomeAndConstructionBusiness/MovingCompany/index.ts"

import HomeAndConstructionBusiness from "../index.tsx"

export type Props = MovingCompanyProps & BaseProps

export default function MovingCompany({
	_type = "MovingCompany",
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
