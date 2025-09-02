import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../index.ts"
import type { AutoPartsStoreType } from "./AutoPartsStore/index.ts"
import type { BikeStoreType } from "./BikeStore/index.ts"
import type { BookStoreType } from "./BookStore/index.ts"
import type { ClothingStoreType } from "./ClothingStore/index.ts"
import type { ComputerStoreType } from "./ComputerStore/index.ts"
import type { ConvenienceStoreType } from "./ConvenienceStore/index.ts"
import type { DepartmentStoreType } from "./DepartmentStore/index.ts"
import type { ElectronicsStoreType } from "./ElectronicsStore/index.ts"
import type { FloristType } from "./Florist/index.ts"
import type { FurnitureStoreType } from "./FurnitureStore/index.ts"
import type { GardenStoreType } from "./GardenStore/index.ts"
import type { GroceryStoreType } from "./GroceryStore/index.ts"
import type { HardwareStoreType } from "./HardwareStore/index.ts"
import type { HobbyShopType } from "./HobbyShop/index.ts"
import type { HomeGoodsStoreType } from "./HomeGoodsStore/index.ts"
import type { JewelryStoreType } from "./JewelryStore/index.ts"
import type { LiquorStoreType } from "./LiquorStore/index.ts"
import type { MensClothingStoreType } from "./MensClothingStore/index.ts"
import type { MobilePhoneStoreType } from "./MobilePhoneStore/index.ts"
import type { MovieRentalStoreType } from "./MovieRentalStore/index.ts"
import type { MusicStoreType } from "./MusicStore/index.ts"
import type { OfficeEquipmentStoreType } from "./OfficeEquipmentStore/index.ts"
import type { OutletStoreType } from "./OutletStore/index.ts"
import type { PawnShopType } from "./PawnShop/index.ts"
import type { PetStoreType } from "./PetStore/index.ts"
import type { ShoeStoreType } from "./ShoeStore/index.ts"
import type { SportingGoodsStoreType } from "./SportingGoodsStore/index.ts"
import type { TireShopType } from "./TireShop/index.ts"
import type { ToyStoreType } from "./ToyStore/index.ts"
import type { WholesaleStoreType } from "./WholesaleStore/index.ts"

export type StoreType =
	| "Store"
	| MusicStoreType
	| OfficeEquipmentStoreType
	| WholesaleStoreType
	| LiquorStoreType
	| FloristType
	| SportingGoodsStoreType
	| HardwareStoreType
	| ToyStoreType
	| MobilePhoneStoreType
	| ConvenienceStoreType
	| AutoPartsStoreType
	| GardenStoreType
	| MovieRentalStoreType
	| BookStoreType
	| GroceryStoreType
	| TireShopType
	| ClothingStoreType
	| ShoeStoreType
	| MensClothingStoreType
	| ComputerStoreType
	| FurnitureStoreType
	| DepartmentStoreType
	| HomeGoodsStoreType
	| ElectronicsStoreType
	| PawnShopType
	| OutletStoreType
	| PetStoreType
	| HobbyShopType
	| JewelryStoreType
	| BikeStoreType

export interface StoreProps {
	"@type"?: StoreType
}

type Store =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& StoreProps

export default Store
