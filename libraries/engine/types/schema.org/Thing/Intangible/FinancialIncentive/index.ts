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

import { AdministrativeArea as AdministrativeAreaComponent } from "../../../../../components/index.tsx"
import { DefinedTerm as DefinedTermComponent } from "../../../../../components/index.tsx"
import { GeoShape as GeoShapeComponent } from "../../../../../components/index.tsx"
import { IncentiveQualifiedExpenseType as IncentiveQualifiedExpenseTypeComponent } from "../../../../../components/index.tsx"
import { IncentiveStatus as IncentiveStatusComponent } from "../../../../../components/index.tsx"
import { IncentiveType as IncentiveTypeComponent } from "../../../../../components/index.tsx"
import { LoanOrCredit as LoanOrCreditComponent } from "../../../../../components/index.tsx"
import { MonetaryAmount as MonetaryAmountComponent } from "../../../../../components/index.tsx"
import { Organization as OrganizationComponent } from "../../../../../components/index.tsx"
import { Person as PersonComponent } from "../../../../../components/index.tsx"
import { Place as PlaceComponent } from "../../../../../components/index.tsx"
import { Product as ProductComponent } from "../../../../../components/index.tsx"
import { PurchaseType as PurchaseTypeComponent } from "../../../../../components/index.tsx"
import { QuantitativeValue as QuantitativeValueComponent } from "../../../../../components/index.tsx"
import { UnitPriceSpecification as UnitPriceSpecificationComponent } from "../../../../../components/index.tsx"

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
