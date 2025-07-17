import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type ComputerLanguageProps from "../../../../types/Thing/ComputerLanguage/index.ts"
import type IntangibleProps from "../../../../types/Thing/Intangible/index.ts"

import Intangible from "../index.tsx"

// ComputerLanguage adds no properties to the Intangible schema type
export type Props = BaseComponentProps<
	ComputerLanguageProps,
	"ComputerLanguage",
	ExtractLevelProps<ComputerLanguageProps, IntangibleProps>
>

export default function ComputerLanguage({
	schemaType = "ComputerLanguage",
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
