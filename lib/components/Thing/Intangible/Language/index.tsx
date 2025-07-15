import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type IntangibleProps from "../../../../types/Thing/Intangible/index.ts"
import type LanguageProps from "../../../../types/Thing/Language/index.ts"

import Intangible from "./index.tsx"

// Language adds no properties to the Intangible schema type
export type Props = BaseComponentProps<
	LanguageProps,
	"Language",
	ExtractLevelProps<LanguageProps, IntangibleProps>
>

export default function Language({
	schemaType = "Language",
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
