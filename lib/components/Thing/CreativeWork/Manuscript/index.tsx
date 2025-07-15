import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"
import type ManuscriptProps from "../../../../types/Thing/Manuscript/index.ts"

import CreativeWork from "./index.tsx"

// Manuscript adds no properties to the CreativeWork schema type
export type Props = BaseComponentProps<
	ManuscriptProps,
	"Manuscript",
	ExtractLevelProps<ManuscriptProps, CreativeWorkProps>
>

export default function Manuscript({
	schemaType = "Manuscript",
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
