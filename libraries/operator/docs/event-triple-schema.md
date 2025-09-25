# Event Triple Store Schema

## Core Event Triple Structure

All Operator events are stored as RDF triples in the triple store, enabling SPARQL queries, perfect replay, and cryptographic verification.

### Base Triple Format

```turtle
@prefix op: <https://sitebender.studio/operator/> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix time: <http://www.w3.org/2006/time#> .
@prefix prov: <http://www.w3.org/ns/prov#> .

# Basic event triple
<event:123> a op:Event ;
    op:subject <user:alice> ;
    op:predicate op:clicked ;
    op:object <button:save> ;
    op:timestamp "2024-01-20T10:30:00Z"^^xsd:dateTime ;
    op:vectorClock "alice:5,bob:3,carol:7" ;
    op:signature "ed25519:..." ;
    op:channel <channel:ui-events> .
```

### SHACL Shape Validation

```turtle
@prefix sh: <http://www.w3.org/ns/shacl#> .

op:EventShape a sh:NodeShape ;
    sh:targetClass op:Event ;
    sh:property [
        sh:path op:subject ;
        sh:minCount 1 ;
        sh:maxCount 1 ;
        sh:nodeKind sh:IRI ;
    ] ;
    sh:property [
        sh:path op:predicate ;
        sh:minCount 1 ;
        sh:maxCount 1 ;
        sh:nodeKind sh:IRI ;
    ] ;
    sh:property [
        sh:path op:object ;
        sh:minCount 1 ;
        sh:maxCount 1 ;
    ] ;
    sh:property [
        sh:path op:timestamp ;
        sh:minCount 1 ;
        sh:maxCount 1 ;
        sh:datatype xsd:dateTime ;
    ] ;
    sh:property [
        sh:path op:vectorClock ;
        sh:maxCount 1 ;
        sh:datatype xsd:string ;
        sh:pattern "^([a-zA-Z0-9]+:[0-9]+,)*[a-zA-Z0-9]+:[0-9]+$" ;
    ] .
```

## Event Metadata Triples

### Temporal Metadata

```turtle
# Event with Temporal API precision
<event:123> op:temporalInstant [
    a time:Instant ;
    time:inXSDDateTimeStamp "2024-01-20T10:30:00.123456789Z"^^xsd:dateTime ;
    time:hasTRS <http://www.opengis.net/def/trs/BIPM/0/UTC> ;
    op:epochNanoseconds "1705749000123456789"^^xsd:long ;
] .

# Event duration for long-running events
<event:456> op:duration [
    a time:Duration ;
    time:numericDuration "3.5"^^xsd:decimal ;
    time:unitType time:unitSecond ;
] .
```

### Causality and Ordering

```turtle
# Causal relationships
<event:124> op:causes <event:125> .
<event:125> op:causedBy <event:124> .

# Happened-before relationships
<event:123> op:happenedBefore <event:124> .
<event:124> op:happenedAfter <event:123> .

# Concurrent events
<event:126> op:concurrent <event:127> .

# Event chains
<event:200> op:inChain <chain:payment-flow> ;
    op:chainPosition "3"^^xsd:integer ;
    op:chainLength "7"^^xsd:integer .
```

### Security and Privacy

```turtle
# Encrypted event content
<event:789> op:encrypted true ;
    op:encryptionAlgorithm "nacl-box" ;
    op:encryptedFor <did:key:z6MkhaXgBZD...> ;
    op:ephemeralKey "..." ;
    op:nonce "..." .

# Ring signature for anonymous publishing
<event:890> op:anonymousSignature [
    a op:RingSignature ;
    op:ringMembers (<did:key:alice> <did:key:bob> <did:key:carol>) ;
    op:signature "..." ;
] .

# Zero-knowledge proof
<event:901> op:zkProof [
    a op:ZeroKnowledgeProof ;
    op:proves "amount > 1000" ;
    op:proofSystem "bulletproofs" ;
    op:proof "..." ;
] .
```

## Channel and Transport Metadata

```turtle
# Channel configuration
<channel:ui-events> a op:Channel ;
    op:scope "broadcast" ;
    op:ordering "causal" ;
    op:transport "BroadcastChannel" ;
    op:encryption "optional" ;
    op:persistence "event-log" ;
    op:retention "P30D"^^xsd:duration .

# Transport routing
<event:234> op:transportPath [
    op:origin "local" ;
    op:via "broadcast" ;
    op:destination "network" ;
    op:hops "2"^^xsd:integer ;
    op:latency "15"^^xsd:decimal ; # milliseconds
] .
```

## CRDT Event Operations

```turtle
# LWW-Element-Set operation
<event:345> a op:CrdtOperation ;
    op:crdtType "lww-element-set" ;
    op:operation "add" ;
    op:element <item:xyz> ;
    op:timestamp "2024-01-20T10:30:00Z"^^xsd:dateTime ;
    op:replicaId "replica-1" .

# OR-Set operation
<event:456> a op:CrdtOperation ;
    op:crdtType "or-set" ;
    op:operation "remove" ;
    op:element <item:abc> ;
    op:uniqueTag "replica-2:uuid:..." ;
    op:vectorClock "replica-1:10,replica-2:15" .

# RGA (Replicated Growable Array) operation
<event:567> a op:CrdtOperation ;
    op:crdtType "rga" ;
    op:operation "insert" ;
    op:position [
        op:afterElement <elem:123> ;
        op:beforeElement <elem:124> ;
    ] ;
    op:value "inserted text" ;
    op:timestamp "2024-01-20T10:30:00Z"^^xsd:dateTime .
```

## Event Aggregations and Windows

```turtle
# Windowed aggregation
<window:temp-5min> a op:Window ;
    op:type "sliding" ;
    op:size "PT5M"^^xsd:duration ;
    op:slide "PT1M"^^xsd:duration ;
    op:aggregation [
        op:function "average" ;
        op:value "25.5"^^xsd:decimal ;
        op:count "300"^^xsd:integer ;
        op:startTime "2024-01-20T10:25:00Z"^^xsd:dateTime ;
        op:endTime "2024-01-20T10:30:00Z"^^xsd:dateTime ;
    ] .

# Event batch
<batch:001> a op:EventBatch ;
    op:events (<event:100> <event:101> <event:102>) ;
    op:batchSize "3"^^xsd:integer ;
    op:compressed true ;
    op:compressionRatio "0.45"^^xsd:decimal .
```

## Provenance and Audit Trail

```turtle
# Event provenance using PROV-O
<event:678> prov:wasGeneratedBy <activity:user-interaction> ;
    prov:wasAttributedTo <user:alice> ;
    prov:generatedAtTime "2024-01-20T10:30:00Z"^^xsd:dateTime ;
    prov:wasInfluencedBy <event:677> ;
    prov:hadPlan <plan:save-document> .

# Audit trail
<event:789> op:auditTrail [
    op:processed "2024-01-20T10:30:01Z"^^xsd:dateTime ;
    op:processedBy <service:event-processor> ;
    op:validationStatus "passed" ;
    op:subscribers "5"^^xsd:integer ;
    op:deliveryStatus "completed" ;
] .
```

## Query Examples

### Find All Events in Time Range

```sparql
PREFIX op: <https://sitebender.studio/operator/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT ?event ?subject ?predicate ?object ?timestamp
WHERE {
    ?event a op:Event ;
        op:subject ?subject ;
        op:predicate ?predicate ;
        op:object ?object ;
        op:timestamp ?timestamp .
    FILTER (?timestamp >= "2024-01-20T10:00:00Z"^^xsd:dateTime &&
            ?timestamp <= "2024-01-20T11:00:00Z"^^xsd:dateTime)
}
ORDER BY ?timestamp
```

### Find Causal Event Chains

```sparql
PREFIX op: <https://sitebender.studio/operator/>

SELECT ?event1 ?event2 ?event3
WHERE {
    ?event1 op:causes ?event2 .
    ?event2 op:causes ?event3 .
    ?event1 op:subject <user:alice> .
}
```

### Aggregate Events by Type

```sparql
PREFIX op: <https://sitebender.studio/operator/>

SELECT ?predicate (COUNT(?event) AS ?count)
WHERE {
    ?event a op:Event ;
        op:predicate ?predicate ;
        op:channel <channel:ui-events> .
}
GROUP BY ?predicate
ORDER BY DESC(?count)
```

### Find Concurrent Events

```sparql
PREFIX op: <https://sitebender.studio/operator/>

SELECT ?event1 ?event2
WHERE {
    ?event1 op:concurrent ?event2 ;
        op:timestamp ?time1 .
    ?event2 op:timestamp ?time2 .
    FILTER (ABS(?time1 - ?time2) < "PT0.1S"^^xsd:duration)
}
```

## Storage Optimizations

### Content Addressing

Events are content-addressed using their triple hash:

```turtle
<event:sha256:abc123...> a op:Event ;
    op:contentHash "sha256:abc123..." ;
    op:ipfsHash "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco" .
```

### Delta Encoding

Store only changes for event streams:

```turtle
<event:1001> a op:DeltaEvent ;
    op:baseEvent <event:1000> ;
    op:changes [
        op:changedProperty op:object ;
        op:oldValue <button:save> ;
        op:newValue <button:submit> ;
    ] .
```

### Compression Dictionaries

Shared dictionaries for common patterns:

```turtle
<dict:ui-events> a op:CompressionDictionary ;
    op:version "1.0" ;
    op:patterns [
        op:pattern "user:clicked:" ;
        op:code "001" ;
    ] .
```

## Integration Points

### With Architect

```turtle
# Link events to DOM elements
<event:123> op:targetElement <element:button-save> .
<element:button-save> op:generatesEvents <event:123> .
```

### With Agent

```turtle
# Distributed sync metadata
<event:456> op:syncStatus "synchronized" ;
    op:syncedTo (<peer:node1> <peer:node2>) ;
    op:syncProtocol "ipfs-pubsub" .
```

### With Warden

```turtle
# Capability grants
<event:789> op:requiredCapability <cap:publish-payment> .
<cap:publish-payment> op:grantedTo <did:key:alice> ;
    op:validUntil "2024-12-31T23:59:59Z"^^xsd:dateTime .
```

This schema ensures every event is fully queryable, cryptographically verifiable, and perfectly reproducible from the triple store.
