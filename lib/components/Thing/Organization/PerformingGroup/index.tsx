import type BaseProps from "../../../../types/index.ts"
import type PerformingGroupProps from "../../../../types/Thing/Organization/PerformingGroup/index.ts"

import Organization from "../index.tsx"

export type Props = PerformingGroupProps & BaseProps

export default function PerformingGroup({
	_type = "PerformingGroup",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Organization
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</Organization>
	)
}
