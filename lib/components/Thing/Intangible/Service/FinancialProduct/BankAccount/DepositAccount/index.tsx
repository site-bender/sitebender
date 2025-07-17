import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../../types/index.ts"
import type BankAccountProps from "../../../../../../../types/Thing/BankAccount/index.ts"
import type DepositAccountProps from "../../../../../../../types/Thing/DepositAccount/index.ts"

import BankAccount from "../index.tsx"

// DepositAccount adds no properties to the BankAccount schema type
export type Props = BaseComponentProps<
	DepositAccountProps,
	"DepositAccount",
	ExtractLevelProps<DepositAccountProps, BankAccountProps>
>

export default function DepositAccount({
	schemaType = "DepositAccount",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<BankAccount
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
