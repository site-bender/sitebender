import type BaseProps from "../../../../../types/index.ts"
import type ProfessionalServiceProps from "../../../../../types/Thing/Organization/LocalBusiness/ProfessionalService/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = ProfessionalServiceProps & BaseProps

export default function ProfessionalService({
	_type = "ProfessionalService",
	children,
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
		>{children}</LocalBusiness>
	)
}
