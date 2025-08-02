import type BaseProps from "../../../../../../types/index.ts"
import type HousePainterProps from "../../../../../../types/Thing/Organization/LocalBusiness/HomeAndConstructionBusiness/HousePainter/index.ts"

import HomeAndConstructionBusiness from "../index.tsx"

export type Props = HousePainterProps & BaseProps

export default function HousePainter({
	_type = "HousePainter",
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
