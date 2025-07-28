import type BaseProps from "../../../../../types/index.ts"
import type { OnDemandEventProps } from "../../../../../types/Thing/Event/PublicationEvent/OnDemandEvent/index.ts"

import PublicationEvent from "../index.tsx"

export type Props = OnDemandEventProps & BaseProps

export default function OnDemandEvent({
	_type = "OnDemandEvent",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<PublicationEvent
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
