import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CodeProps from "../../../../types/Thing/Code/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"

import CreativeWork from "./index.tsx"

// Code adds no properties to the CreativeWork schema type
export type Props = BaseComponentProps<
	CodeProps,
	"Code",
	ExtractLevelProps<CodeProps, CreativeWorkProps>
>

export default function Code({
	schemaType = "Code",
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
