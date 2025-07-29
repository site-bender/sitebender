import type BaseProps from "../../../../../types/index.ts"
import type TaxiProps from "../../../../../types/Thing/Intangible/Service/Taxi/index.ts"

import Service from "../index.tsx"

export type Props = TaxiProps & BaseProps

export default function Taxi({
	_type = "Taxi",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Service
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
