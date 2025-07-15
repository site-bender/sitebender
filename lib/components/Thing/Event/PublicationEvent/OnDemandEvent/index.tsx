import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type OnDemandEventProps from "../../../../../types/Thing/OnDemandEvent/index.ts"
import type PublicationEventProps from "../../../../../types/Thing/PublicationEvent/index.ts"

import PublicationEvent from "./index.tsx"

// OnDemandEvent adds no properties to the PublicationEvent schema type
export type Props = BaseComponentProps<
	OnDemandEventProps,
	"OnDemandEvent",
	ExtractLevelProps<OnDemandEventProps, PublicationEventProps>
>

export default function OnDemandEvent({
	schemaType = "OnDemandEvent",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<PublicationEvent
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
