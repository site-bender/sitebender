import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type AtlasProps from "../../../../types/Thing/Atlas/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"

import CreativeWork from "../index.tsx"

// Atlas adds no properties to the CreativeWork schema type
export type Props = BaseComponentProps<
	AtlasProps,
	"Atlas",
	ExtractLevelProps<AtlasProps, CreativeWorkProps>
>

export default function Atlas({
	schemaType = "Atlas",
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
