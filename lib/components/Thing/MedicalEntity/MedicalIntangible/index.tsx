import type BaseProps from "../../../../types/index.ts"
import type MedicalIntangibleProps from "../../../../types/Thing/MedicalEntity/MedicalIntangible/index.ts"

import MedicalEntity from "../index.tsx"

export type Props = MedicalIntangibleProps & BaseProps

export default function MedicalIntangible({
	_type = "MedicalIntangible",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalEntity
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</MedicalEntity>
	)
}
