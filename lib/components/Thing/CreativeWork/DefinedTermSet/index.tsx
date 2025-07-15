import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"
import type DefinedTermSetProps from "../../../../types/Thing/DefinedTermSet/index.ts"

import CreativeWork from "./index.tsx"

export type Props = BaseComponentProps<
	DefinedTermSetProps,
	"DefinedTermSet",
	ExtractLevelProps<DefinedTermSetProps, CreativeWorkProps>
>

export default function DefinedTermSet(
	{
		hasDefinedTerm,
		schemaType = "DefinedTermSet",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				hasDefinedTerm,
				...subtypeProperties,
			}}
		/>
	)
}
