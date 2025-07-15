import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type LandformProps from "../../../../../types/Thing/Landform/index.ts"
import type MountainProps from "../../../../../types/Thing/Mountain/index.ts"

import Landform from "./index.tsx"

// Mountain adds no properties to the Landform schema type
export type Props = BaseComponentProps<
	MountainProps,
	"Mountain",
	ExtractLevelProps<MountainProps, LandformProps>
>

export default function Mountain({
	schemaType = "Mountain",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Landform
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
