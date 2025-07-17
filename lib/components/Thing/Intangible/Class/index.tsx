import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type ClassProps from "../../../../types/Thing/Class/index.ts"
import type IntangibleProps from "../../../../types/Thing/Intangible/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	ClassProps,
	"Class",
	ExtractLevelProps<ClassProps, IntangibleProps>
>

export default function Class(
	{
		supersededBy,
		schemaType = "Class",
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
