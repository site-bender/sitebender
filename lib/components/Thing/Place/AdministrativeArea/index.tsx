import type BaseProps from "../../../../types/index.ts"
import type AdministrativeAreaProps from "../../../../types/Thing/Place/AdministrativeArea/index.ts"

import Place from "../index.tsx"

export type Props = AdministrativeAreaProps & BaseProps

export default function AdministrativeArea({
	_type = "AdministrativeArea",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Place
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</Place>
	)
}
