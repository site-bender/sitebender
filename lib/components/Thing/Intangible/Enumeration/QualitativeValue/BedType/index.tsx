import type BaseProps from "../../../../../../types/index.ts"
import type BedTypeProps from "../../../../../../types/Thing/Intangible/Enumeration/QualitativeValue/BedType/index.ts"

import QualitativeValue from "../index.tsx"

export type Props = BedTypeProps & BaseProps

export default function BedType({
	_type = "BedType",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<QualitativeValue
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
