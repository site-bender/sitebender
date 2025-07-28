import type BaseProps from "../../../../../../types/index.ts"
import type { BedAndBreakfastProps } from "../../../../../../types/Thing/Organization/LocalBusiness/LodgingBusiness/BedAndBreakfast/index.ts"

import LodgingBusiness from "../index.tsx"

export type Props = BedAndBreakfastProps & BaseProps

export default function BedAndBreakfast({
	_type = "BedAndBreakfast",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<LodgingBusiness
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
