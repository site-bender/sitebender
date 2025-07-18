import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../../types/index.ts"
import type InformActionProps from "../../../../../../../types/Thing/InformAction/index.ts"
import type RsvpActionProps from "../../../../../../../types/Thing/RsvpAction/index.ts"

import InformAction from "../index.tsx"

export type Props = BaseComponentProps<
	RsvpActionProps,
	"RsvpAction",
	ExtractLevelProps<RsvpActionProps, InformActionProps>
>

export default function RsvpAction(
	{
		additionalNumberOfGuests,
		comment,
		rsvpResponse,
		schemaType = "RsvpAction",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
