import {
	dirname,
	join,
	relative,
} from "https://deno.land/std@0.224.0/path/mod.ts"

interface ConsolidationTask {
	typeName: string
	primaryPath: string
	currentExtends: string[]
	newExtends: string[]
	newImports: ImportTask[]
}

interface ImportTask {
	typeName: string
	importPath: string
}

class TypeConsolidator {
	private thingPath: string
	private dryRun: boolean

	constructor(workspacePath: string, dryRun = true) {
		this.thingPath = join(workspacePath, "lib/types/Thing")
		this.dryRun = dryRun
	}

	async consolidateAllTypes(): Promise<void> {
		console.log(
			`🚀 Starting full consolidation (${
				this.dryRun ? "DRY RUN" : "LIVE MODE"
			})...\n`,
		)

		// Using the ACTUAL paths from the file listing - CORRECTED VERSION
		const allTasks: ConsolidationTask[] = [
			{
				typeName: "EducationalOrganization",
				primaryPath: "Organization/EducationalOrganization/index.ts",
				currentExtends: ["Organization"],
				newExtends: ["Organization", "CivicStructure"],
				newImports: [{
					typeName: "CivicStructure",
					importPath: "../../Place/CivicStructure/index.ts",
				}],
			},
			{
				typeName: "Pharmacy",
				primaryPath: "Organization/MedicalOrganization/Pharmacy/index.ts",
				currentExtends: ["MedicalOrganization"],
				newExtends: ["MedicalOrganization", "MedicalBusiness"],
				newImports: [{
					typeName: "MedicalBusiness",
					importPath: "../../../Place/LocalBusiness/MedicalBusiness/index.ts",
				}],
			},
			{
				typeName: "MedicalClinic",
				primaryPath: "Organization/MedicalOrganization/MedicalClinic/index.ts",
				currentExtends: ["MedicalOrganization"],
				newExtends: ["MedicalOrganization", "MedicalBusiness"],
				newImports: [{
					typeName: "MedicalBusiness",
					importPath: "../../../Place/LocalBusiness/MedicalBusiness/index.ts",
				}],
			},
			{
				typeName: "Dentist",
				primaryPath: "Organization/MedicalOrganization/Dentist/index.ts",
				currentExtends: ["MedicalOrganization"],
				newExtends: ["MedicalOrganization", "MedicalBusiness", "LocalBusiness"],
				newImports: [
					{
						typeName: "MedicalBusiness",
						importPath: "../../../Place/LocalBusiness/MedicalBusiness/index.ts",
					},
					{
						typeName: "LocalBusiness",
						importPath: "../../../Place/LocalBusiness/index.ts",
					},
				],
			},
			{
				typeName: "Hospital",
				primaryPath: "Organization/MedicalOrganization/Hospital/index.ts",
				currentExtends: ["MedicalOrganization"],
				newExtends: [
					"MedicalOrganization",
					"EmergencyService",
					"CivicStructure",
				],
				newImports: [
					{
						typeName: "EmergencyService",
						importPath:
							"../../../Place/LocalBusiness/EmergencyService/index.ts",
					},
					{
						typeName: "CivicStructure",
						importPath: "../../../Place/CivicStructure/index.ts",
					},
				],
			},
			{
				typeName: "Physician",
				primaryPath: "Organization/MedicalOrganization/Physician/index.ts",
				currentExtends: ["MedicalOrganization"],
				newExtends: ["MedicalOrganization", "MedicalBusiness"],
				newImports: [{
					typeName: "MedicalBusiness",
					importPath: "../../../Place/LocalBusiness/MedicalBusiness/index.ts",
				}],
			},
			{
				typeName: "HealthClub",
				primaryPath:
					"Place/LocalBusiness/SportsActivityLocation/HealthClub/index.ts",
				currentExtends: ["SportsActivityLocation"],
				newExtends: ["SportsActivityLocation", "HealthAndBeautyBusiness"],
				newImports: [{
					typeName: "HealthAndBeautyBusiness",
					importPath: "../../HealthAndBeautyBusiness/index.ts",
				}],
			},
			{
				typeName: "SkiResort",
				primaryPath:
					"Place/LocalBusiness/LodgingBusiness/Resort/SkiResort/index.ts",
				currentExtends: ["Resort"],
				newExtends: ["Resort", "SportsActivityLocation"],
				newImports: [{
					typeName: "SportsActivityLocation",
					importPath: "../../../SportsActivityLocation/index.ts",
				}],
			},
			{
				typeName: "StadiumOrArena",
				primaryPath: "Place/CivicStructure/StadiumOrArena/index.ts",
				currentExtends: ["CivicStructure"],
				newExtends: ["CivicStructure", "SportsActivityLocation"],
				newImports: [{
					typeName: "SportsActivityLocation",
					importPath: "../../LocalBusiness/SportsActivityLocation/index.ts",
				}],
			},
			{
				typeName: "MovieTheater",
				primaryPath: "Place/CivicStructure/MovieTheater/index.ts",
				currentExtends: ["CivicStructure"],
				newExtends: ["CivicStructure", "EntertainmentBusiness"],
				newImports: [{
					typeName: "EntertainmentBusiness",
					importPath: "../../LocalBusiness/EntertainmentBusiness/index.ts",
				}],
			},
			{
				typeName: "PoliceStation",
				primaryPath: "Place/CivicStructure/PoliceStation/index.ts",
				currentExtends: ["CivicStructure"],
				newExtends: ["CivicStructure", "EmergencyService"],
				newImports: [{
					typeName: "EmergencyService",
					importPath: "../../LocalBusiness/EmergencyService/index.ts",
				}],
			},
			{
				typeName: "FireStation",
				primaryPath: "Place/CivicStructure/FireStation/index.ts",
				currentExtends: ["CivicStructure"],
				newExtends: ["CivicStructure", "EmergencyService"],
				newImports: [{
					typeName: "EmergencyService",
					importPath: "../../LocalBusiness/EmergencyService/index.ts",
				}],
			},
			{
				typeName: "AutoPartsStore",
				primaryPath: "Place/LocalBusiness/Store/AutoPartsStore/index.ts",
				currentExtends: ["Store"],
				newExtends: ["Store", "AutomotiveBusiness"],
				newImports: [{
					typeName: "AutomotiveBusiness",
					importPath: "../../AutomotiveBusiness/index.ts",
				}],
			},
			{
				typeName: "LocalBusiness",
				primaryPath: "Place/LocalBusiness/index.ts",
				currentExtends: ["LocalBusiness"],
				newExtends: ["Organization", "Place"],
				newImports: [
					{
						typeName: "Organization",
						importPath: "../../Organization/index.ts",
					},
					{ typeName: "Place", importPath: "../index.ts" },
				],
			},
			{
				typeName: "Campground",
				primaryPath: "Place/CivicStructure/Campground/index.ts",
				currentExtends: ["CivicStructure"],
				newExtends: ["CivicStructure", "LodgingBusiness"],
				newImports: [{
					typeName: "LodgingBusiness",
					importPath: "../../LocalBusiness/LodgingBusiness/index.ts",
				}],
			},
			{
				typeName: "Patient",
				primaryPath: "Person/Patient/index.ts",
				currentExtends: ["Person"],
				newExtends: ["Person", "MedicalAudience"],
				newImports: [{
					typeName: "MedicalAudience",
					importPath: "../../Intangible/Audience/MedicalAudience/index.ts",
				}],
			},
			{
				typeName: "ComicCoverArt",
				primaryPath:
					"CreativeWork/VisualArtwork/CoverArt/ComicCoverArt/index.ts",
				currentExtends: ["CoverArt"],
				newExtends: ["CoverArt", "ComicStory"],
				newImports: [{
					typeName: "ComicStory",
					importPath: "../../../ComicStory/index.ts",
				}],
			},
			{
				typeName: "AmpStory",
				primaryPath: "CreativeWork/AmpStory/index.ts",
				currentExtends: ["CreativeWork"],
				newExtends: ["CreativeWork", "MediaObject"],
				newImports: [{
					typeName: "MediaObject",
					importPath: "../../MediaObject/index.ts",
				}],
			},
			{
				typeName: "HowToTip",
				primaryPath: "CreativeWork/HowToTip/index.ts",
				currentExtends: ["CreativeWork"],
				newExtends: ["CreativeWork", "ListItem"],
				newImports: [{
					typeName: "ListItem",
					importPath: "../../Intangible/ListItem/index.ts",
				}],
			},
			{
				typeName: "MedicalAudience",
				primaryPath:
					"Intangible/Audience/PeopleAudience/MedicalAudience/index.ts",
				currentExtends: ["PeopleAudience"],
				newExtends: ["PeopleAudience", "Audience"],
				newImports: [{ typeName: "Audience", importPath: "../../index.ts" }],
			},
			{
				typeName: "Course",
				primaryPath: "CreativeWork/Course/index.ts",
				currentExtends: ["CreativeWork"],
				newExtends: ["CreativeWork", "LearningResource"],
				newImports: [{
					typeName: "LearningResource",
					importPath: "../../LearningResource/index.ts",
				}],
			},
			{
				typeName: "TVSeries",
				primaryPath: "CreativeWork/CreativeWorkSeries/TVSeries/index.ts",
				currentExtends: ["CreativeWorkSeries"],
				newExtends: ["CreativeWorkSeries", "Series"],
				newImports: [{
					typeName: "Series",
					importPath: "../../../Intangible/Series/index.ts",
				}],
			},
			{
				typeName: "ProductCollection",
				primaryPath: "Product/ProductCollection/index.ts",
				currentExtends: ["Product"],
				newExtends: ["Product", "Collection"],
				newImports: [{
					typeName: "Collection",
					importPath: "../../CreativeWork/Collection/index.ts",
				}],
			},
			{
				typeName: "TVSeason",
				primaryPath: "CreativeWork/TVSeason/index.ts",
				currentExtends: ["CreativeWork"],
				newExtends: ["CreativeWork", "Season"],
				newImports: [{ typeName: "Season", importPath: "../Season/index.ts" }],
			},
			{
				typeName: "Audiobook",
				primaryPath: "CreativeWork/Book/Audiobook/index.ts",
				currentExtends: ["Book"],
				newExtends: ["Book", "AudioObject"],
				newImports: [{
					typeName: "AudioObject",
					importPath: "../../../MediaObject/AudioObject/index.ts",
				}],
			},
			{
				typeName: "HowToDirection",
				primaryPath: "CreativeWork/HowToDirection/index.ts",
				currentExtends: ["CreativeWork"],
				newExtends: ["CreativeWork", "ListItem"],
				newImports: [{
					typeName: "ListItem",
					importPath: "../../Intangible/ListItem/index.ts",
				}],
			},
			{
				typeName: "HowToSection",
				primaryPath: "CreativeWork/HowToSection/index.ts",
				currentExtends: ["CreativeWork"],
				newExtends: ["CreativeWork", "ListItem", "ItemList"],
				newImports: [
					{
						typeName: "ListItem",
						importPath: "../../Intangible/ListItem/index.ts",
					},
					{
						typeName: "ItemList",
						importPath: "../../Intangible/ItemList/index.ts",
					},
				],
			},
			{
				typeName: "HowToStep",
				primaryPath: "CreativeWork/HowToStep/index.ts",
				currentExtends: ["CreativeWork"],
				newExtends: ["CreativeWork", "ListItem", "HowToDirection"],
				newImports: [
					{
						typeName: "ListItem",
						importPath: "../../Intangible/ListItem/index.ts",
					},
					{
						typeName: "HowToDirection",
						importPath: "../HowToDirection/index.ts",
					},
				],
			},
			{
				typeName: "VideoGameSeries",
				primaryPath: "CreativeWork/CreativeWorkSeries/VideoGameSeries/index.ts",
				currentExtends: ["CreativeWorkSeries"],
				newExtends: ["CreativeWorkSeries", "Series"],
				newImports: [{
					typeName: "Series",
					importPath: "../../../Intangible/Series/index.ts",
				}],
			},
			{
				typeName: "PodcastSeries",
				primaryPath: "CreativeWork/CreativeWorkSeries/PodcastSeries/index.ts",
				currentExtends: ["CreativeWorkSeries"],
				newExtends: ["CreativeWorkSeries", "Series"],
				newImports: [{
					typeName: "Series",
					importPath: "../../../Intangible/Series/index.ts",
				}],
			},
			{
				typeName: "MovieSeries",
				primaryPath: "CreativeWork/CreativeWorkSeries/MovieSeries/index.ts",
				currentExtends: ["CreativeWorkSeries"],
				newExtends: ["CreativeWorkSeries", "Series"],
				newImports: [{
					typeName: "Series",
					importPath: "../../../Intangible/Series/index.ts",
				}],
			},
			{
				typeName: "RadioSeries",
				primaryPath: "CreativeWork/CreativeWorkSeries/RadioSeries/index.ts",
				currentExtends: ["CreativeWorkSeries"],
				newExtends: ["CreativeWorkSeries", "Series"],
				newImports: [{
					typeName: "Series",
					importPath: "../../../Intangible/Series/index.ts",
				}],
			},
			{
				typeName: "CreativeWorkSeries",
				primaryPath: "CreativeWork/CreativeWorkSeries/index.ts",
				currentExtends: ["CreativeWork"],
				newExtends: ["CreativeWork", "Series"],
				newImports: [{
					typeName: "Series",
					importPath: "../../Intangible/Series/index.ts",
				}],
			},
			{
				typeName: "BookSeries",
				primaryPath: "CreativeWork/CreativeWorkSeries/BookSeries/index.ts",
				currentExtends: ["CreativeWorkSeries"],
				newExtends: ["CreativeWorkSeries", "Series"],
				newImports: [{
					typeName: "Series",
					importPath: "../../../Intangible/Series/index.ts",
				}],
			},
			{
				typeName: "DietarySupplement",
				primaryPath: "Product/DietarySupplement/index.ts",
				currentExtends: ["Product"],
				newExtends: ["Product", "Substance"],
				newImports: [{
					typeName: "Substance",
					importPath: "../../MedicalEntity/Substance/index.ts",
				}],
			},
			{
				typeName: "Drug",
				primaryPath: "Product/Drug/index.ts",
				currentExtends: ["Product"],
				newExtends: ["Product", "Substance"],
				newImports: [{
					typeName: "Substance",
					importPath: "../../MedicalEntity/Substance/index.ts",
				}],
			},
			{
				typeName: "PhysicalExam",
				primaryPath: "MedicalEntity/MedicalProcedure/PhysicalExam/index.ts",
				currentExtends: ["MedicalProcedure"],
				newExtends: ["MedicalProcedure", "MedicalTest"],
				newImports: [{
					typeName: "MedicalTest",
					importPath: "../../MedicalTest/index.ts",
				}],
			},
			{
				typeName: "PalliativeProcedure",
				primaryPath:
					"MedicalEntity/MedicalProcedure/PalliativeProcedure/index.ts",
				currentExtends: ["MedicalProcedure"],
				newExtends: ["MedicalProcedure", "MedicalTherapy"],
				newImports: [{
					typeName: "MedicalTherapy",
					importPath: "../TherapeuticProcedure/MedicalTherapy/index.ts",
				}],
			},
			{
				typeName: "CreditCard",
				primaryPath:
					"Intangible/Service/FinancialProduct/LoanOrCredit/CreditCard/index.ts",
				currentExtends: ["LoanOrCredit"],
				newExtends: ["LoanOrCredit", "PaymentCard"],
				newImports: [{
					typeName: "PaymentCard",
					importPath: "../../../../PaymentMethod/PaymentCard/index.ts",
				}],
			},
			{
				typeName: "PaymentCard",
				primaryPath: "Intangible/PaymentMethod/PaymentCard/index.ts",
				currentExtends: ["PaymentMethod"],
				newExtends: ["PaymentMethod", "FinancialProduct"],
				newImports: [{
					typeName: "FinancialProduct",
					importPath: "../../Service/FinancialProduct/index.ts",
				}],
			},
			{
				typeName: "PaymentService",
				primaryPath: "Intangible/PaymentMethod/PaymentService/index.ts",
				currentExtends: ["PaymentMethod"],
				newExtends: ["PaymentMethod", "FinancialProduct"],
				newImports: [{
					typeName: "FinancialProduct",
					importPath: "../../Service/FinancialProduct/index.ts",
				}],
			},
			{
				typeName: "Observation",
				primaryPath:
					"Intangible/StructuredValue/QuantitativeValue/Observation/index.ts",
				currentExtends: ["QuantitativeValue"],
				newExtends: ["QuantitativeValue", "Intangible"],
				newImports: [{
					typeName: "Intangible",
					importPath: "../../../index.ts",
				}],
			},
			{
				typeName: "EventSeries",
				primaryPath: "Event/EventSeries/index.ts",
				currentExtends: ["Event"],
				newExtends: ["Event", "Series"],
				newImports: [{
					typeName: "Series",
					importPath: "../../Intangible/Series/index.ts",
				}],
			},
			{
				typeName: "MedicalSpecialty",
				primaryPath:
					"Intangible/Enumeration/MedicalEnumeration/MedicalSpecialty/index.ts",
				currentExtends: ["MedicalEnumeration"],
				newExtends: ["MedicalEnumeration", "Specialty"],
				newImports: [{
					typeName: "Specialty",
					importPath: "../../../Specialty/index.ts",
				}],
			},
			{
				typeName: "DepositAccount",
				primaryPath:
					"Intangible/Service/FinancialProduct/BankAccount/DepositAccount/index.ts",
				currentExtends: ["BankAccount"],
				newExtends: ["BankAccount", "InvestmentOrDeposit"],
				newImports: [{
					typeName: "InvestmentOrDeposit",
					importPath: "../../InvestmentOrDeposit/index.ts",
				}],
			},
		]

		// Process in batches of 5 to avoid overwhelming
		const batchSize = 5
		for (let i = 0; i < allTasks.length; i += batchSize) {
			const batch = allTasks.slice(i, i + batchSize)
			console.log(
				`📦 Processing batch ${Math.floor(i / batchSize) + 1}/${
					Math.ceil(allTasks.length / batchSize)
				}`,
			)

			for (const task of batch) {
				await this.consolidateType(task)
			}

			console.log()
		}

		console.log(`✅ All ${allTasks.length} types processed!`)
	}

	private async consolidateType(task: ConsolidationTask): Promise<void> {
		console.log(`🔧 ${task.typeName}...`)

		try {
			const filePath = join(this.thingPath, task.primaryPath)
			const content = await Deno.readTextFile(filePath)

			// 1. Add missing imports
			let newContent = this.addMissingImports(content, task.newImports)

			// 2. Update extends clause
			newContent = this.updateExtendsClause(
				newContent,
				task.typeName,
				task.newExtends,
			)

			if (this.dryRun) {
				console.log(`   📝 Would extend: ${task.newExtends.join(", ")}`)
			} else {
				await Deno.writeTextFile(filePath, newContent)
				console.log(`   ✅ Updated`)
			}
		} catch (error) {
			console.error(`   ❌ Failed: ${error.message}`)
		}
	}

	private addMissingImports(content: string, newImports: ImportTask[]): string {
		const lines = content.split("\n")

		let lastImportIndex = -1
		for (let i = 0; i < lines.length; i++) {
			if (lines[i].trim().startsWith("import ")) {
				lastImportIndex = i
			}
		}

		const insertIndex = lastImportIndex + 1

		for (const importTask of newImports) {
			const importLine =
				`import ${importTask.typeName} from "${importTask.importPath}"`

			if (!content.includes(importLine)) {
				lines.splice(insertIndex, 0, importLine)
			}
		}

		return lines.join("\n")
	}

	private updateExtendsClause(
		content: string,
		typeName: string,
		newExtends: string[],
	): string {
		const interfacePattern = new RegExp(
			`export\\s+default\\s+interface\\s+${typeName}(?:\\s+extends\\s+[\\w\\s,]+)?\\s*{`,
			"g",
		)

		const newExtendsClause = `export default interface ${typeName} extends ${
			newExtends.join(", ")
		} {`
		return content.replace(interfacePattern, newExtendsClause)
	}
}

async function main() {
	const workspacePath = "/Users/guy/Workspace/@sitebender/metadata-components"

	const args = Deno.args
	const isLive = args.includes("--live")

	const consolidator = new TypeConsolidator(workspacePath, !isLive)

	try {
		await consolidator.consolidateAllTypes()

		if (!isLive) {
			console.log("\n🎯 DRY RUN COMPLETE")
			console.log("Review the changes above. To apply them, run:")
			console.log(
				"deno run --allow-read --allow-write scripts/consolidation-script.ts --live",
			)
		}
	} catch (error) {
		console.error("Consolidation failed:", error)
		Deno.exit(1)
	}
}

if (import.meta.main) {
	await main()
}
