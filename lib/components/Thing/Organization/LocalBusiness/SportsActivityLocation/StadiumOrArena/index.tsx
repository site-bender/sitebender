import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type SportsActivityLocationProps from "../../../../../../types/Thing/SportsActivityLocation/index.ts"
import type StadiumOrArenaProps from "../../../../../../types/Thing/StadiumOrArena/index.ts"

import SportsActivityLocation from "./index.tsx"

// StadiumOrArena adds no properties to the SportsActivityLocation schema type
export type Props = BaseComponentProps<
	StadiumOrArenaProps,
	"StadiumOrArena",
	ExtractLevelProps<StadiumOrArenaProps, SportsActivityLocationProps>
>

export default function StadiumOrArena({
	schemaType = "StadiumOrArena",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<SportsActivityLocation
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
