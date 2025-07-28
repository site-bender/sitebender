import type BaseProps from "../../../../../../../types/index.ts"
import type { RsvpActionProps } from "../../../../../../../types/Thing/Action/InteractAction/CommunicateAction/InformAction/RsvpAction/index.ts"

import InformAction from "../index.tsx"

export type Props = RsvpActionProps & BaseProps

export default function RsvpAction({
	additionalNumberOfGuests,
	comment,
	rsvpResponse,
	_type = "RsvpAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<InformAction
			{...props}
			_type={_type}
			subtypeProperties={{
				additionalNumberOfGuests,
				comment,
				rsvpResponse,
				...subtypeProperties,
			}}
		/>
	)
}
