import type BaseProps from "../../../../../types/index.ts"
import type { StateProps } from "../../../../../types/Thing/Place/AdministrativeArea/State/index.ts"

import AdministrativeArea from "../index.tsx"

export type Props = StateProps & BaseProps

export default function State({
	_type = "State",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<AdministrativeArea
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
