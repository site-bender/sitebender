import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"
import type PosterProps from "../../../../types/Thing/Poster/index.ts"

import CreativeWork from "./index.tsx"

// Poster adds no properties to the CreativeWork schema type
export type Props = BaseComponentProps<
	PosterProps,
	"Poster",
	ExtractLevelProps<PosterProps, CreativeWorkProps>
>

export default function Poster({
	schemaType = "Poster",
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
