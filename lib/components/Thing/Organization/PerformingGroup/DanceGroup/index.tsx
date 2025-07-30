import type BaseProps from "../../../../../types/index.ts"
import type DanceGroupProps from "../../../../../types/Thing/Organization/PerformingGroup/DanceGroup/index.ts"

import PerformingGroup from "../index.tsx"

export type Props = DanceGroupProps & BaseProps

export default function DanceGroup({
	_type = "DanceGroup",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<PerformingGroup
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</PerformingGroup>
	)
}
