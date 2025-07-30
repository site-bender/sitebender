import type BaseProps from "../../../../../../types/index.ts"
import type AutoWashProps from "../../../../../../types/Thing/Organization/LocalBusiness/AutomotiveBusiness/AutoWash/index.ts"

import AutomotiveBusiness from "../index.tsx"

export type Props = AutoWashProps & BaseProps

export default function AutoWash({
	_type = "AutoWash",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<AutomotiveBusiness
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</AutomotiveBusiness>
	)
}
