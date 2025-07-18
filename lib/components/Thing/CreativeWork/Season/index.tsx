import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"
import type SeasonProps from "../../../../types/Thing/Season/index.ts"

import CreativeWork from "../index.tsx"

// Season adds no properties to the CreativeWork schema type
export type Props = BaseComponentProps<
	SeasonProps,
	"Season",
	ExtractLevelProps<SeasonProps, CreativeWorkProps>
>

export default function Season({
	schemaType = "Season",
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
