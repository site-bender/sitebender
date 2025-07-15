import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type LibraryProps from "../../../../../types/Thing/Library/index.ts"
import type LocalBusinessProps from "../../../../../types/Thing/LocalBusiness/index.ts"

import LocalBusiness from "./index.tsx"

// Library adds no properties to the LocalBusiness schema type
export type Props = BaseComponentProps<
	LibraryProps,
	"Library",
	ExtractLevelProps<LibraryProps, LocalBusinessProps>
>

export default function Library({
	schemaType = "Library",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<LocalBusiness
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
