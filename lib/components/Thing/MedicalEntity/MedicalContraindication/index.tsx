import type BaseProps from "../../../../types/index.ts"
import type MedicalContraindicationProps from "../../../../types/Thing/MedicalEntity/MedicalContraindication/index.ts"

import MedicalEntity from "../index.tsx"

export type Props = MedicalContraindicationProps & BaseProps

export default function MedicalContraindication({
	_type = "MedicalContraindication",
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
