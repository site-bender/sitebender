import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type DefinedTermProps from "../../../../types/Thing/DefinedTerm/index.ts"
import type IntangibleProps from "../../../../types/Thing/Intangible/index.ts"

import Intangible from "./index.tsx"

export type Props = BaseComponentProps<
	DefinedTermProps,
	"DefinedTerm",
	ExtractLevelProps<DefinedTermProps, IntangibleProps>
>

export default function DefinedTerm(
	{
		inDefinedTermSet,
		termCode,
		schemaType = "DefinedTerm",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				inDefinedTermSet,
				termCode,
				...subtypeProperties,
			}}
		/>
	)
}
