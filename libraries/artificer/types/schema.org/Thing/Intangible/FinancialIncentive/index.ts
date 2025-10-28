import type { Date, DateTime, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import type Place from "../../Place/index.ts"
import type Product from "../../Product/index.ts"
import type DefinedTerm from "../DefinedTerm/index.ts"
import type IncentiveQualifiedExpenseType from "../Enumeration/IncentiveQualifiedExpenseType/index.ts"
import type IncentiveStatus from "../Enumeration/IncentiveStatus/index.ts"
import type IncentiveType from "../Enumeration/IncentiveType/index.ts"
import type PurchaseType from "../Enumeration/PurchaseType/index.ts"
import type { IntangibleProps } from "../index.ts"
import type LoanOrCredit from "../Service/FinancialProduct/LoanOrCredit/index.ts"
import type GeoShape from "../StructuredValue/GeoShape/index.ts"
import type MonetaryAmount from "../StructuredValue/MonetaryAmount/index.ts"
import type UnitPriceSpecification from "../StructuredValue/PriceSpecification/UnitPriceSpecification/index.ts"
import type QuantitativeValue from "../StructuredValue/QuantitativeValue/index.ts"

import DefinedTermComponent from "../../../../../../architect/src/define/Thing/Intangible/DefinedTerm/index.tsx"
import IncentiveQualifiedExpenseTypeComponent from "../../../../../../architect/src/define/Thing/Intangible/Enumeration/IncentiveQualifiedExpenseType/index.tsx"
import IncentiveStatusComponent from "../../../../../../architect/src/define/Thing/Intangible/Enumeration/IncentiveStatus/index.tsx"
import IncentiveTypeComponent from "../../../../../../architect/src/define/Thing/Intangible/Enumeration/IncentiveType/index.tsx"
import PurchaseTypeComponent from "../../../../../../architect/src/define/Thing/Intangible/Enumeration/PurchaseType/index.tsx"
import LoanOrCreditComponent from "../../../../../../architect/src/define/Thing/Intangible/Service/FinancialProduct/LoanOrCredit/index.tsx"
import GeoShapeComponent from "../../../../../../architect/src/define/Thing/Intangible/StructuredValue/GeoShape/index.tsx"
import MonetaryAmountComponent from "../../../../../../architect/src/define/Thing/Intangible/StructuredValue/MonetaryAmount/index.tsx"
import UnitPriceSpecificationComponent from "../../../../../../architect/src/define/Thing/Intangible/StructuredValue/PriceSpecification/UnitPriceSpecification/index.tsx"
import QuantitativeValueComponent from "../../../../../../architect/src/define/Thing/Intangible/StructuredValue/QuantitativeValue/index.tsx"
import OrganizationComponent from "../../../../../../architect/src/define/Thing/Organization/index.tsx"
import PersonComponent from "../../../../../../architect/src/define/Thing/Person/index.tsx"
import AdministrativeAreaComponent from "../../../../../../architect/src/define/Thing/Place/AdministrativeArea/index.tsx"
import PlaceComponent from "../../../../../../architect/src/define/Thing/Place/index.tsx"
import ProductComponent from "../../../../../../architect/src/define/Thing/Product/index.tsx"

export type FinancialIncentiveType = "FinancialIncentive"

export interface FinancialIncentiveProps {
	"@type"?: FinancialIncentiveType
	areaServed?:
		| AdministrativeArea
		| GeoShape
		| Place
		| Text
		| ReturnType<typeof AdministrativeAreaComponent>
		| ReturnType<typeof GeoShapeComponent>
		| ReturnType<typeof PlaceComponent>
	eligibleWithSupplier?:
		| Organization
		| ReturnType<typeof OrganizationComponent>
	incentiveAmount?:
		| LoanOrCredit
		| QuantitativeValue
		| UnitPriceSpecification
		| ReturnType<typeof LoanOrCreditComponent>
		| ReturnType<typeof QuantitativeValueComponent>
		| ReturnType<typeof UnitPriceSpecificationComponent>
	incentiveStatus?:
		| IncentiveStatus
		| ReturnType<typeof IncentiveStatusComponent>
	incentiveType?: IncentiveType | ReturnType<typeof IncentiveTypeComponent>
	incentivizedItem?:
		| DefinedTerm
		| Product
		| ReturnType<typeof DefinedTermComponent>
		| ReturnType<typeof ProductComponent>
	incomeLimit?:
		| MonetaryAmount
		| Text
		| ReturnType<typeof MonetaryAmountComponent>
	provider?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	publisher?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	purchasePriceLimit?:
		| MonetaryAmount
		| ReturnType<typeof MonetaryAmountComponent>
	purchaseType?: PurchaseType | ReturnType<typeof PurchaseTypeComponent>
	qualifiedExpense?:
		| IncentiveQualifiedExpenseType
		| ReturnType<typeof IncentiveQualifiedExpenseTypeComponent>
	validFrom?: Date | DateTime
	validThrough?: Date | DateTime
}

type FinancialIncentive = Thing & IntangibleProps & FinancialIncentiveProps

export default FinancialIncentive
