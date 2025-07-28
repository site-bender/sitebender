import type { BaseComponentProps, ExtractLevelProps } from "../../../../../../../types/index.ts"
import type ThingProps from "../../../../../../../types/Thing/index.ts"
import type { ActionProps } from "../../../../../../../types/Thing/Action/index.ts"
import type { InteractActionProps } from "../../../../../../../types/Thing/Action/InteractAction/index.ts"
import type { CommunicateActionProps } from "../../../../../../../types/Thing/Action/InteractAction/CommunicateAction/index.ts"
import type { InformActionProps } from "../../../../../../../types/Thing/Action/InteractAction/CommunicateAction/InformAction/index.ts"
import type { RsvpActionProps } from "../../../../../../../types/Thing/Action/InteractAction/CommunicateAction/InformAction/RsvpAction/index.ts"

import InformAction from "../index.tsx"

export type Props = BaseComponentProps<
	RsvpActionProps,
	"RsvpAction",
	ExtractLevelProps<ThingProps, ActionProps, InteractActionProps, CommunicateActionProps, InformActionProps>
>

export default function RsvpAction({
	additionalNumberOfGuests,
	comment,
	rsvpResponse,
	schemaType = "RsvpAction",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<InformAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				additionalNumberOfGuests,
				comment,
				rsvpResponse,
				...subtypeProperties,
			}}
		/>
	)
}
