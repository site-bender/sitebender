import listCollections from "./libraries/pathfinder/src/vector/listCollections/index.ts"
import type { VectorStoreConnection } from "./libraries/pathfinder/src/types/index.ts"

const mockConnection: VectorStoreConnection = {
	baseUrl: "http://localhost:6333",
	collectionsEndpoint: "http://localhost:6333/collections",
}

const result = await listCollections(mockConnection)()
console.log("Result:", result)
