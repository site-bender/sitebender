import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"
import type StatementProps from "../../../../types/Thing/Statement/index.ts"

import CreativeWork from "../index.tsx"

// Statement adds no properties to the CreativeWork schema type
export type Props = BaseComponentProps<
	StatementProps,
	"Statement",
	ExtractLevelProps<StatementProps, CreativeWorkProps>
>

export default function Statement({
	schemaType = "Statement",
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
