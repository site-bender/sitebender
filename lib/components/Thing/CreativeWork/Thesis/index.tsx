import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"
import type ThesisProps from "../../../../types/Thing/Thesis/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	ThesisProps,
	"Thesis",
	ExtractLevelProps<ThesisProps, CreativeWorkProps>
>

export default function Thesis(
	{
		inSupportOf,
		schemaType = "Thesis",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				inSupportOf,
				...subtypeProperties,
			}}
		/>
	)
}
