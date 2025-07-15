import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type IntangibleProps from "../../../../types/Thing/Intangible/index.ts"
import type SeriesProps from "../../../../types/Thing/Series/index.ts"

import Intangible from "./index.tsx"

// Series adds no properties to the Intangible schema type
export type Props = BaseComponentProps<
	SeriesProps,
	"Series",
	ExtractLevelProps<SeriesProps, IntangibleProps>
>

export default function Series({
	schemaType = "Series",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
