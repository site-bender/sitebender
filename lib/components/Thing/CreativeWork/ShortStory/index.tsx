import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"
import type ShortStoryProps from "../../../../types/Thing/ShortStory/index.ts"

import CreativeWork from "../index.tsx"

// ShortStory adds no properties to the CreativeWork schema type
export type Props = BaseComponentProps<
	ShortStoryProps,
	"ShortStory",
	ExtractLevelProps<ShortStoryProps, CreativeWorkProps>
>

export default function ShortStory({
	schemaType = "ShortStory",
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
