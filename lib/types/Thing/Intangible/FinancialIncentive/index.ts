import type { Date, DateTime, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import type DefinedTerm from "../DefinedTerm/index.ts"
import type GeoShape from "../StructuredValue/GeoShape/index.ts"
import type IncentiveQualifiedExpenseType from "../Enumeration/IncentiveQualifiedExpenseType/index.ts"
import type IncentiveStatus from "../Enumeration/IncentiveStatus/index.ts"
import type IncentiveType from "../Enumeration/IncentiveType/index.ts"
import type LoanOrCredit from "../Service/FinancialProduct/LoanOrCredit/index.ts"
import type MonetaryAmount from "../StructuredValue/MonetaryAmount/index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type Place from "../../Place/index.ts"
import type Product from "../../Product/index.ts"
import type PurchaseType from "../Enumeration/PurchaseType/index.ts"
import type QuantitativeValue from "../StructuredValue/QuantitativeValue/index.ts"
import type UnitPriceSpecification from "../StructuredValue/PriceSpecification/UnitPriceSpecification/index.ts"

export interface FinancialIncentiveProps {
	areaServed?: AdministrativeArea | GeoShape | Place | Text
	eligibleWithSupplier?: Organization
	incentiveAmount?: LoanOrCredit | QuantitativeValue | UnitPriceSpecification
	incentiveStatus?: IncentiveStatus
	incentiveType?: IncentiveType
	incentivizedItem?: DefinedTerm | Product
	incomeLimit?: MonetaryAmount | Text
	provider?: Organization | Person
	publisher?: Organization | Person
	purchasePriceLimit?: MonetaryAmount
	purchaseType?: PurchaseType
	qualifiedExpense?: IncentiveQualifiedExpenseType
	validFrom?: Date | DateTime
	validThrough?: Date | DateTime
}

type FinancialIncentive =
	& Thing
	& IntangibleProps
	& FinancialIncentiveProps

export default FinancialIncentive
