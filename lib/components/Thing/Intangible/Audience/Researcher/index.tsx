import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type AudienceProps from "../../../../../types/Thing/Audience/index.ts"
import type ResearcherProps from "../../../../../types/Thing/Researcher/index.ts"

import Audience from "./index.tsx"

// Researcher adds no properties to the Audience schema type
export type Props = BaseComponentProps<
	ResearcherProps,
	"Researcher",
	ExtractLevelProps<ResearcherProps, AudienceProps>
>

export default function Researcher({
	schemaType = "Researcher",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Audience
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
