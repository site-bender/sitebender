import type BaseProps from "../../../../../../types/index.ts"
import type ActionStatusTypeProps from "../../../../../../types/Thing/Intangible/Enumeration/StatusEnumeration/ActionStatusType/index.ts"

import StatusEnumeration from "../index.tsx"

export type Props = ActionStatusTypeProps & BaseProps

export default function ActionStatusType({
	_type = "ActionStatusType",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<StatusEnumeration
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
