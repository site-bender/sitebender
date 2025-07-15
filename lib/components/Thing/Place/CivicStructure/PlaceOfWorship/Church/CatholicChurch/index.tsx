import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../../types/index.ts"
import type CatholicChurchProps from "../../../../../../../types/Thing/CatholicChurch/index.ts"
import type ChurchProps from "../../../../../../../types/Thing/Church/index.ts"

import Church from "./index.tsx"

// CatholicChurch adds no properties to the Church schema type
export type Props = BaseComponentProps<
	CatholicChurchProps,
	"CatholicChurch",
	ExtractLevelProps<CatholicChurchProps, ChurchProps>
>

export default function CatholicChurch({
	schemaType = "CatholicChurch",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Church
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
