import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type CasinoProps from "../../../../../../types/Thing/Casino/index.ts"
import type EntertainmentBusinessProps from "../../../../../../types/Thing/EntertainmentBusiness/index.ts"

import EntertainmentBusiness from "./index.tsx"

// Casino adds no properties to the EntertainmentBusiness schema type
export type Props = BaseComponentProps<
	CasinoProps,
	"Casino",
	ExtractLevelProps<CasinoProps, EntertainmentBusinessProps>
>

export default function Casino({
	schemaType = "Casino",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<EntertainmentBusiness
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
