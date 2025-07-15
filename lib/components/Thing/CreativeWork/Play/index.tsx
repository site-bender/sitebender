import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"
import type PlayProps from "../../../../types/Thing/Play/index.ts"

import CreativeWork from "./index.tsx"

// Play adds no properties to the CreativeWork schema type
export type Props = BaseComponentProps<
	PlayProps,
	"Play",
	ExtractLevelProps<PlayProps, CreativeWorkProps>
>

export default function Play({
	schemaType = "Play",
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
