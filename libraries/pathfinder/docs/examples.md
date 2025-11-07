# Pathfinder Usage Examples

This document provides comprehensive examples of using Pathfinder for working with RDF triple stores and SPARQL queries.

## Table of Contents

1. [Basic Connection](#basic-connection)
2. [Simple Queries](#simple-queries)
3. [Advanced Query Building](#advanced-query-building)
4. [Data Manipulation](#data-manipulation)
5. [Error Handling Patterns](#error-handling-patterns)
6. [Query Builder Immutability](#query-builder-immutability)
7. [Real-World Examples](#real-world-examples)

## Basic Connection

### Connecting to Oxigraph

```typescript
import createTripleStore from "@sitebender/pathfinder/connection/createTripleStore/index.ts"

async function connectToDatabase() {
	const result = await createTripleStore({
		host: "localhost",
		port: 7878,
		timeout: 5000,
	})

	if (result._tag === "Error") {
		console.error("Connection failed:", result.value.message)
		return null
	}

	return result.value
}

const connection = await connectToDatabase()
```

### Custom Timeout Configuration

```typescript
// Quick timeout for health checks
const quickConnection = await createTripleStore({
	host: "localhost",
	port: 7878,
	timeout: 1000, // 1 second
})

// Longer timeout for slower networks
const patientConnection = await createTripleStore({
	host: "remote-server.example.com",
	port: 7878,
	timeout: 30000, // 30 seconds
})
```

## Simple Queries

### Using Helper Functions

```typescript
import getAllTriples from "@sitebender/pathfinder/sparql/helpers/getAllTriples/index.ts"
import getBySubject from "@sitebender/pathfinder/sparql/helpers/getBySubject/index.ts"
import getByPredicate from "@sitebender/pathfinder/sparql/helpers/getByPredicate/index.ts"
import execute from "@sitebender/pathfinder/sparql/execute/index.ts"

// Get all triples in the database
async function fetchAllData(connection) {
	const query = getAllTriples()
	const result = await execute(query)(connection)

	if (result._tag === "Ok") {
		return result.value
	}

	return []
}

// Get all properties and values for a specific subject
async function fetchPersonData(connection, personUri) {
	const query = getBySubject(personUri)
	const result = await execute(query)(connection)

	if (result._tag === "Ok") {
		return result.value
	}

	return []
}

// Find all entities with a specific property
async function findAllWithName(connection) {
	const nameUri = "<http://xmlns.com/foaf/0.1/name>"
	const query = getByPredicate(nameUri)
	const result = await execute(query)(connection)

	if (result._tag === "Ok") {
		return result.value
	}

	return []
}
```

### Basic SELECT Query

```typescript
import select from "@sitebender/pathfinder/sparql/select/index.ts"
import execute from "@sitebender/pathfinder/sparql/execute/index.ts"

async function findPeopleNames(connection) {
	const query = select("?person", "?name")
		.where([
			{
				subject: "?person",
				predicate: "<http://xmlns.com/foaf/0.1/name>",
				object: "?name",
			},
		])
		.build()

	const result = await execute(query)(connection)

	if (result._tag === "Ok") {
		return result.value
	}

	return []
}
```

## Advanced Query Building

### Multiple Triple Patterns

```typescript
import select from "@sitebender/pathfinder/sparql/select/index.ts"

function buildCompletePersonQuery() {
	return select("?person", "?name", "?age", "?email")
		.where([
			{
				subject: "?person",
				predicate: "<http://xmlns.com/foaf/0.1/name>",
				object: "?name",
			},
			{
				subject: "?person",
				predicate: "<http://xmlns.com/foaf/0.1/age>",
				object: "?age",
			},
			{
				subject: "?person",
				predicate: "<http://xmlns.com/foaf/0.1/mbox>",
				object: "?email",
			},
		])
		.build()
}
```

### Single Filter

```typescript
function findAdults() {
	return select("?person", "?age")
		.where([
			{
				subject: "?person",
				predicate: "<http://xmlns.com/foaf/0.1/age>",
				object: "?age",
			},
		])
		.filter("?age >= 18")
		.build()
}
```

### Multiple Filters (AND Logic)

```typescript
function findYoungAdults() {
	return select("?person", "?name", "?age")
		.where([
			{
				subject: "?person",
				predicate: "<http://xmlns.com/foaf/0.1/name>",
				object: "?name",
			},
			{
				subject: "?person",
				predicate: "<http://xmlns.com/foaf/0.1/age>",
				object: "?age",
			},
		])
		.filter("?age >= 18")
		.filter("?age <= 35")
		.build()
}
```

### String Matching Filters

```typescript
function findAlices() {
	return select("?person", "?name")
		.where([
			{
				subject: "?person",
				predicate: "<http://xmlns.com/foaf/0.1/name>",
				object: "?name",
			},
		])
		.filter('?name = "Alice"')
		.build()
}

// Using SPARQL regex for partial matches
function findNamesStartingWithA() {
	return select("?person", "?name")
		.where([
			{
				subject: "?person",
				predicate: "<http://xmlns.com/foaf/0.1/name>",
				object: "?name",
			},
		])
		.filter('regex(?name, "^A")')
		.build()
}
```

## Data Manipulation

### Inserting Data

```typescript
import insert from "@sitebender/pathfinder/sparql/insert/index.ts"

async function addPerson(connection, uri, name, age) {
	const turtle = `
		<${uri}> <http://xmlns.com/foaf/0.1/name> "${name}" .
		<${uri}> <http://xmlns.com/foaf/0.1/age> ${age} .
	`

	const result = await insert(turtle)(connection)

	if (result._tag === "Ok") {
		console.log("Person added successfully")
		return true
	}

	console.error("Failed to add person:", result.value.message)
	return false
}

// Usage
await addPerson(
	connection,
	"http://example.org/people/alice",
	"Alice",
	30,
)
```

### Inserting Multiple Entities

```typescript
async function addMultiplePeople(connection) {
	const turtle = `
		<http://example.org/people/alice> <http://xmlns.com/foaf/0.1/name> "Alice" .
		<http://example.org/people/alice> <http://xmlns.com/foaf/0.1/age> 30 .
		<http://example.org/people/alice> <http://xmlns.com/foaf/0.1/mbox> "alice@example.org" .

		<http://example.org/people/bob> <http://xmlns.com/foaf/0.1/name> "Bob" .
		<http://example.org/people/bob> <http://xmlns.com/foaf/0.1/age> 25 .
		<http://example.org/people/bob> <http://xmlns.com/foaf/0.1/mbox> "bob@example.org" .
	`

	return await insert(turtle)(connection)
}
```

### Deleting Data

```typescript
import deleteQuery from "@sitebender/pathfinder/sparql/delete/index.ts"

async function deletePerson(connection, uri) {
	// Delete all triples for a specific subject
	const turtle = `<${uri}> ?p ?o .`

	const result = await deleteQuery(turtle)(connection)

	if (result._tag === "Ok") {
		console.log("Person deleted successfully")
		return true
	}

	console.error("Failed to delete person:", result.value.message)
	return false
}

// Delete specific property
async function deletePersonAge(connection, uri) {
	const turtle = `<${uri}> <http://xmlns.com/foaf/0.1/age> ?age .`

	return await deleteQuery(turtle)(connection)
}
```

## Error Handling Patterns

### Basic Error Handling

```typescript
async function safeQuery(connection) {
	const query = select("?name")
		.where([
			{
				subject: "?person",
				predicate: "<http://xmlns.com/foaf/0.1/name>",
				object: "?name",
			},
		])
		.build()

	const result = await execute(query)(connection)

	if (result._tag === "Error") {
		const error = result.value
		console.error("Query failed:", error.message)
		console.error("SPARQL:", error.sparql)

		if (error.cause) {
			console.error("Root cause:", error.cause)
		}

		return []
	}

	return result.value
}
```

### Handling Connection Errors

```typescript
async function robustConnection(host, port) {
	const result = await createTripleStore({
		host,
		port,
		timeout: 5000,
	})

	if (result._tag === "Error") {
		const error = result.value

		console.error(`Failed to connect to ${error.host}:${error.port}`)
		console.error(`Reason: ${error.message}`)

		if (error.kind === "TripleStoreInitFailed") {
			console.error("Triple store may not be running")
		}

		if (error.cause) {
			console.error("Technical details:", error.cause)
		}

		return null
	}

	return result.value
}
```

### Combining Operations with Error Handling

```typescript
async function insertAndVerify(connection, turtle) {
	// Insert data
	const insertResult = await insert(turtle)(connection)

	if (insertResult._tag === "Error") {
		console.error("Insert failed:", insertResult.value.message)
		return false
	}

	// Verify insertion by querying
	const verifyQuery = getAllTriples()
	const queryResult = await execute(verifyQuery)(connection)

	if (queryResult._tag === "Error") {
		console.error("Verification failed:", queryResult.value.message)
		return false
	}

	console.log("Data inserted and verified successfully")
	console.log("Total triples:", queryResult.value.length)
	return true
}
```

## Query Builder Immutability

### Creating Query Templates

```typescript
// Create a base query template
const personQueryTemplate = select("?person", "?name", "?age")
	.where([
		{
			subject: "?person",
			predicate: "<http://xmlns.com/foaf/0.1/name>",
			object: "?name",
		},
		{
			subject: "?person",
			predicate: "<http://xmlns.com/foaf/0.1/age>",
			object: "?age",
		},
	])

// Create multiple specialized queries from the template
const adultsQuery = personQueryTemplate.filter("?age >= 18").build()
const minorsQuery = personQueryTemplate.filter("?age < 18").build()
const thirtyYearOldsQuery = personQueryTemplate.filter("?age = 30").build()

// Template remains unchanged
const allPeopleQuery = personQueryTemplate.build()
```

### Reusable Filter Chains

```typescript
function createAgeRangeQuery(minAge, maxAge) {
	const baseQuery = select("?person", "?name", "?age")
		.where([
			{
				subject: "?person",
				predicate: "<http://xmlns.com/foaf/0.1/name>",
				object: "?name",
			},
			{
				subject: "?person",
				predicate: "<http://xmlns.com/foaf/0.1/age>",
				object: "?age",
			},
		])

	return baseQuery
		.filter(`?age >= ${minAge}`)
		.filter(`?age <= ${maxAge}`)
		.build()
}

// Create different age range queries
const teenagersQuery = createAgeRangeQuery(13, 19)
const youngAdultsQuery = createAgeRangeQuery(18, 35)
const middleAgedQuery = createAgeRangeQuery(36, 55)
```

## Real-World Examples

### Building a Person Directory

```typescript
import createTripleStore from "@sitebender/pathfinder/connection/createTripleStore/index.ts"
import insert from "@sitebender/pathfinder/sparql/insert/index.ts"
import select from "@sitebender/pathfinder/sparql/select/index.ts"
import execute from "@sitebender/pathfinder/sparql/execute/index.ts"

type Person = {
	readonly uri: string
	readonly name: string
	readonly age: number
	readonly email: string
}

async function initializeDirectory() {
	const connection = await createTripleStore({
		host: "localhost",
		port: 7878,
		timeout: 5000,
	})

	if (connection._tag === "Error") {
		throw new Error("Failed to connect to database")
	}

	return connection.value
}

function personToTurtle(person: Person): string {
	return `
		<${person.uri}> <http://xmlns.com/foaf/0.1/name> "${person.name}" .
		<${person.uri}> <http://xmlns.com/foaf/0.1/age> ${person.age} .
		<${person.uri}> <http://xmlns.com/foaf/0.1/mbox> "${person.email}" .
	`
}

async function addPersonToDirectory(connection, person: Person) {
	const turtle = personToTurtle(person)
	const result = await insert(turtle)(connection)

	return result._tag === "Ok"
}

async function searchDirectoryByName(connection, name: string) {
	const query = select("?person", "?name", "?age", "?email")
		.where([
			{
				subject: "?person",
				predicate: "<http://xmlns.com/foaf/0.1/name>",
				object: "?name",
			},
			{
				subject: "?person",
				predicate: "<http://xmlns.com/foaf/0.1/age>",
				object: "?age",
			},
			{
				subject: "?person",
				predicate: "<http://xmlns.com/foaf/0.1/mbox>",
				object: "?email",
			},
		])
		.filter(`?name = "${name}"`)
		.build()

	const result = await execute(query)(connection)

	if (result._tag === "Ok") {
		return result.value
	}

	return []
}

async function findPeopleInAgeRange(connection, minAge, maxAge) {
	const query = select("?person", "?name", "?age")
		.where([
			{
				subject: "?person",
				predicate: "<http://xmlns.com/foaf/0.1/name>",
				object: "?name",
			},
			{
				subject: "?person",
				predicate: "<http://xmlns.com/foaf/0.1/age>",
				object: "?age",
			},
		])
		.filter(`?age >= ${minAge}`)
		.filter(`?age <= ${maxAge}`)
		.build()

	const result = await execute(query)(connection)

	if (result._tag === "Ok") {
		return result.value
	}

	return []
}

// Usage example
async function main() {
	const connection = await initializeDirectory()

	// Add people
	await addPersonToDirectory(connection, {
		uri: "http://example.org/people/alice",
		name: "Alice",
		age: 30,
		email: "alice@example.org",
	})

	await addPersonToDirectory(connection, {
		uri: "http://example.org/people/bob",
		name: "Bob",
		age: 25,
		email: "bob@example.org",
	})

	// Search
	const aliceResults = await searchDirectoryByName(connection, "Alice")
	console.log("Found Alice:", aliceResults)

	const youngPeople = await findPeopleInAgeRange(connection, 20, 30)
	console.log("People aged 20-30:", youngPeople)
}
```

### Knowledge Graph Querying

```typescript
// Query for relationships between entities
async function findFriendships(connection) {
	const query = select("?person1", "?name1", "?person2", "?name2")
		.where([
			{
				subject: "?person1",
				predicate: "<http://xmlns.com/foaf/0.1/name>",
				object: "?name1",
			},
			{
				subject: "?person1",
				predicate: "<http://xmlns.com/foaf/0.1/knows>",
				object: "?person2",
			},
			{
				subject: "?person2",
				predicate: "<http://xmlns.com/foaf/0.1/name>",
				object: "?name2",
			},
		])
		.build()

	const result = await execute(query)(connection)

	if (result._tag === "Ok") {
		return result.value.map((row) => ({
			person1: row.name1,
			person2: row.name2,
		}))
	}

	return []
}

// Add friendships
async function addFriendship(connection, person1Uri, person2Uri) {
	const turtle = `
		<${person1Uri}> <http://xmlns.com/foaf/0.1/knows> <${person2Uri}> .
		<${person2Uri}> <http://xmlns.com/foaf/0.1/knows> <${person1Uri}> .
	`

	return await insert(turtle)(connection)
}
```

### Data Validation Pattern

```typescript
async function validateDataExists(connection, uri) {
	const query = select("?p", "?o")
		.where([
			{
				subject: `<${uri}>`,
				predicate: "?p",
				object: "?o",
			},
		])
		.build()

	const result = await execute(query)(connection)

	if (result._tag === "Ok") {
		return result.value.length > 0
	}

	return false
}

async function countTriples(connection) {
	const query = getAllTriples()
	const result = await execute(query)(connection)

	if (result._tag === "Ok") {
		return result.value.length
	}

	return 0
}
```

## Best Practices

1. **Always handle Result types**: Never assume operations succeed
2. **Reuse query templates**: Take advantage of immutability
3. **Use helper functions**: For common query patterns
4. **Close over configuration**: Create curried functions with connection baked in
5. **Validate before insert**: Check data exists before assuming operations worked
6. **Use proper URIs**: Always use full URIs in angle brackets for predicates
7. **Escape strings**: Properly escape quotes in SPARQL string literals

## Common Patterns

### Curried Database Operations

```typescript
function createDatabaseOperations(connection) {
	return {
		insert: function insertData(turtle: string) {
			return insert(turtle)(connection)
		},
		execute: function executeQuery(sparql: string) {
			return execute(sparql)(connection)
		},
		delete: function deleteData(turtle: string) {
			return deleteQuery(turtle)(connection)
		},
	}
}

// Usage
const db = createDatabaseOperations(connection)
await db.insert(myTurtle)
await db.execute(myQuery)
```

### Batch Operations

```typescript
async function insertBatch(connection, turtleArray: ReadonlyArray<string>) {
	function processItem(turtle: string) {
		return insert(turtle)(connection)
	}

	const results = await Promise.all(Array.from(turtleArray, processItem))

	function isSuccess(result) {
		return result._tag === "Ok"
	}

	const successes = results.filter(isSuccess)

	return {
		total: results.length,
		successful: successes.length,
		failed: results.length - successes.length,
	}
}
```
