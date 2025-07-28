import type BaseProps from "../../../../types/index.ts"
import type { BedDetailsProps } from "../../../../types/Thing/Intangible/BedDetails/index.ts"

import Intangible from "../index.tsx"

export type Props = BedDetailsProps & BaseProps

export default function BedDetails({
	numberOfBeds,
	typeOfBed,
	_type = "BedDetails",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				numberOfBeds,
				typeOfBed,
				...subtypeProperties,
			}}
		/>
	)
}
