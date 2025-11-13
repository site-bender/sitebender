import listCollections from "./libraries/pathfinder/src/vector/listCollections/index.ts"
import isOk from "./libraries/toolsmith/src/monads/result/isOk/index.ts"
import type { VectorStoreConnection } from "./libraries/pathfinder/src/types/index.ts"

const mockConnection: VectorStoreConnection = {
	baseUrl: "http://localhost:6333",
	collectionsEndpoint: "http://localhost:6333/collections",
}

const result = await listCollections(mockConnection)()
console.log("Result:", result)
console.log("isOk(result):", isOk(result))
console.log("Result._tag:", result._tag)
console.log("Result value:", result.value)
