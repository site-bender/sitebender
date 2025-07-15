import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"
import type SheetMusicProps from "../../../../types/Thing/SheetMusic/index.ts"

import CreativeWork from "./index.tsx"

// SheetMusic adds no properties to the CreativeWork schema type
export type Props = BaseComponentProps<
	SheetMusicProps,
	"SheetMusic",
	ExtractLevelProps<SheetMusicProps, CreativeWorkProps>
>

export default function SheetMusic({
	schemaType = "SheetMusic",
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
