import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EntertainmentBusinessProps from "../../../../../types/Thing/EntertainmentBusiness/index.ts"
import type LocalBusinessProps from "../../../../../types/Thing/LocalBusiness/index.ts"

import LocalBusiness from "./index.tsx"

// EntertainmentBusiness adds no properties to the LocalBusiness schema type
export type Props = BaseComponentProps<
	EntertainmentBusinessProps,
	"EntertainmentBusiness",
	ExtractLevelProps<EntertainmentBusinessProps, LocalBusinessProps>
>

export default function EntertainmentBusiness({
	schemaType = "EntertainmentBusiness",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<LocalBusiness
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
