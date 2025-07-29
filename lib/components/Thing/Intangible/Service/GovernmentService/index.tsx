import type BaseProps from "../../../../../types/index.ts"
import type GovernmentServiceProps from "../../../../../types/Thing/Intangible/Service/GovernmentService/index.ts"

import Service from "../index.tsx"

export type Props = GovernmentServiceProps & BaseProps

export default function GovernmentService({
	jurisdiction,
	serviceOperator,
	_type = "GovernmentService",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Service
			{...props}
			_type={_type}
			subtypeProperties={{
				jurisdiction,
				serviceOperator,
				...subtypeProperties,
			}}
		/>
	)
}
