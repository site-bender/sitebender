import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../index.ts"
import type { ElectricianType } from "./Electrician/index.ts"
import type { GeneralContractorType } from "./GeneralContractor/index.ts"
import type { HousePainterType } from "./HousePainter/index.ts"
import type { HVACBusinessType } from "./HVACBusiness/index.ts"
import type { LocksmithType } from "./Locksmith/index.ts"
import type { MovingCompanyType } from "./MovingCompany/index.ts"
import type { PlumberType } from "./Plumber/index.ts"
import type { RoofingContractorType } from "./RoofingContractor/index.ts"

export type HomeAndConstructionBusinessType =
	| "HomeAndConstructionBusiness"
	| ElectricianType
	| PlumberType
	| GeneralContractorType
	| MovingCompanyType
	| LocksmithType
	| HousePainterType
	| HVACBusinessType
	| RoofingContractorType

export interface HomeAndConstructionBusinessProps {
	"@type"?: HomeAndConstructionBusinessType
}

type HomeAndConstructionBusiness =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& HomeAndConstructionBusinessProps

export default HomeAndConstructionBusiness
