import type BaseProps from "../../../../../types/index.ts"
import type DDxElementProps from "../../../../../types/Thing/MedicalEntity/MedicalIntangible/DDxElement/index.ts"

import MedicalIntangible from "../index.tsx"

export type Props = DDxElementProps & BaseProps

export default function DDxElement({
	diagnosis,
	distinguishingSign,
	_type = "DDxElement",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalIntangible
			{...props}
			_type={_type}
			subtypeProperties={{
				diagnosis,
				distinguishingSign,
				...subtypeProperties,
			}}
		/>
	)
}
