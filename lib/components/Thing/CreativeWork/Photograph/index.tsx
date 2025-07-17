import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"
import type PhotographProps from "../../../../types/Thing/Photograph/index.ts"

import CreativeWork from "../index.tsx"

// Photograph adds no properties to the CreativeWork schema type
export type Props = BaseComponentProps<
	PhotographProps,
	"Photograph",
	ExtractLevelProps<PhotographProps, CreativeWorkProps>
>

export default function Photograph({
	schemaType = "Photograph",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
