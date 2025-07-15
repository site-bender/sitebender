import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type EnumerationProps from "../../../../types/Thing/Enumeration/index.ts"
import type IntangibleProps from "../../../../types/Thing/Intangible/index.ts"

import Intangible from "./index.tsx"

export type Props = BaseComponentProps<
	EnumerationProps,
	"Enumeration",
	ExtractLevelProps<EnumerationProps, IntangibleProps>
>

export default function Enumeration(
	{
		supersededBy,
		schemaType = "Enumeration",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				supersededBy,
				...subtypeProperties,
			}}
		/>
	)
}
