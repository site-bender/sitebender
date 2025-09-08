import type { CRDT, Storage } from "../../types/index.ts"

interface StoredCRDT {
	key: string
	data: string
	version: number
	timestamp: number
}

function openDatabase(dbName: string, storeName: string): Promise<IDBDatabase> {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(dbName, 1)

		request.onerror = () => reject(request.error)
		request.onsuccess = () => resolve(request.result)

		request.onupgradeneeded = (event) => {
			const db = (event.target as IDBOpenDBRequest).result
			if (!db.objectStoreNames.contains(storeName)) {
				const store = db.createObjectStore(storeName, {
					keyPath: "key",
				})
				store.createIndex("timestamp", "timestamp", { unique: false })
				store.createIndex("version", "version", { unique: false })
			}
		}
	})
}

export default function createIndexedDBStorage(
	dbName: string = "sitebender-distributed",
	storeName: string = "crdts",
): Storage {
	return {
		async save(key: string, crdt: CRDT<unknown>): Promise<void> {
			const db = await openDatabase(dbName, storeName)

			return new Promise((resolve, reject) => {
				const transaction = db.transaction([storeName], "readwrite")
				const store = transaction.objectStore(storeName)

				const record: StoredCRDT = {
					key,
					data: crdt.serialize(),
					version: crdt.version,
					timestamp: Date.now(),
				}

				const request = store.put(record)
				request.onsuccess = () => {
					db.close()
					resolve()
				}
				request.onerror = () => {
					db.close()
					reject(request.error)
				}
			})
		},

		async load<T>(key: string): Promise<CRDT<T> | null> {
			const db = await openDatabase(dbName, storeName)

			return new Promise((resolve, reject) => {
				const transaction = db.transaction([storeName], "readonly")
				const store = transaction.objectStore(storeName)
				const request = store.get(key)

				request.onsuccess = () => {
					db.close()
					if (request.result) {
						// Parse the stored CRDT data
						// Note: In a real implementation, we'd need a deserialize function
						// that reconstructs the appropriate CRDT type
						const parsed = JSON.parse(request.result.data)
						resolve(parsed as CRDT<T>)
					} else {
						resolve(null)
					}
				}
				request.onerror = () => {
					db.close()
					reject(request.error)
				}
			})
		},

		async getAllKeys(): Promise<Array<string>> {
			const db = await openDatabase(dbName, storeName)

			return new Promise((resolve, reject) => {
				const transaction = db.transaction([storeName], "readonly")
				const store = transaction.objectStore(storeName)
				const request = store.getAllKeys()

				request.onsuccess = () => {
					db.close()
					resolve(request.result as Array<string>)
				}
				request.onerror = () => {
					db.close()
					reject(request.error)
				}
			})
		},

		async delete(key: string): Promise<void> {
			const db = await openDatabase(dbName, storeName)

			return new Promise((resolve, reject) => {
				const transaction = db.transaction([storeName], "readwrite")
				const store = transaction.objectStore(storeName)
				const request = store.delete(key)

				request.onsuccess = () => {
					db.close()
					resolve()
				}
				request.onerror = () => {
					db.close()
					reject(request.error)
				}
			})
		},
	}
}
