import type BaseProps from "../../../../../types/index.ts"
import type { DryCleaningOrLaundryProps } from "../../../../../types/Thing/Organization/LocalBusiness/DryCleaningOrLaundry/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = DryCleaningOrLaundryProps & BaseProps

export default function DryCleaningOrLaundry({
	_type = "DryCleaningOrLaundry",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<LocalBusiness
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
