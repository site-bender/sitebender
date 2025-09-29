#!/usr/bin/env python3
"""
Safer version - fetch all rules, add examples, update only those that need it
"""

import json
import urllib.request
from datetime import datetime

QDRANT_URL = "http://localhost:6333"
COLLECTION = "revolutionary_rules"

# Examples to add
RULE_EXAMPLES = {
    "RULE_FUNDAMENTAL_001": {
        "correct": """// CORRECT: Pure, curried, composable
export default function add(x: number): (y: number) => number {
    return function addToX(y: number): number {
        return x + y
    }
}""",
        "incorrect": """// WRONG: Imperative, mutable
class Calculator {
    private result = 0
    add(x: number) {
        this.result += x
    }
}"""
    },

    "NAMING_NO_ABBREV_001": {
        "correct": """// CORRECT: Full words
function calculateMaximumValue(configuration: Configuration): number {
    return processDocument(configuration.document)
}""",
        "incorrect": """// WRONG: Abbreviations
function calcMaxVal(config: Config): number {
    return procDoc(config.doc)
}"""
    },

    "SAFETY_NO_DELETE_001": {
        "correct": """// CORRECT: Ask before destructive operations
function archiveOldFiles(directory: string): void {
    console.log('Would archive. Requires confirmation.')
}""",
        "incorrect": """// WRONG: Deletes without permission
execSync('rm -rf /important/files')  // NEVER"""
    },

    "FUNC_PURE_001": {
        "correct": """// CORRECT: Pure function
export default function multiply(x: number): (y: number) => number {
    return function multiplyByX(y: number): number {
        return x * y
    }
}""",
        "incorrect": """// WRONG: Side effects
let counter = 0
function multiply(x: number, y: number): number {
    counter++  // Side effect!
    return x * y
}"""
    },

    "TESTING_UNIT_001": {
        "correct": """// CORRECT: Pure function test
describe('add', () => {
    it('should return a function that adds to x', () => {
        const add5 = add(5)
        expect(add5(3)).toBe(8)
    })
})""",
        "incorrect": """// WRONG: Testing implementation details
test('internal state changes', () => {
    // Don't test private implementation
})"""
    }
}

def main():
    print("Fetching all rules from Qdrant...")

    # Get ALL rules
    all_points = []
    offset = None

    while True:
        payload = {"limit": 100, "with_payload": True, "with_vector": True}
        if offset:
            payload["offset"] = offset

        req = urllib.request.Request(
            f"{QDRANT_URL}/collections/{COLLECTION}/points/scroll",
            data=json.dumps(payload).encode('utf-8'),
            headers={'Content-Type': 'application/json'}
        )

        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read())["result"]

        all_points.extend(result["points"])
        offset = result.get("next_page_offset")
        if not offset:
            break

    print(f"Found {len(all_points)} rules total\n")

    # Process each rule
    updates = []
    for point in all_points:
        rule_id = point["payload"].get("rule_id")

        if rule_id in RULE_EXAMPLES:
            if "examples" not in point["payload"]:
                # Add examples
                point["payload"]["examples"] = RULE_EXAMPLES[rule_id]
                point["payload"]["updated_at"] = datetime.now().isoformat()

                updates.append({
                    "id": point["id"],
                    "payload": point["payload"],
                    "vector": point["vector"]
                })

                print(f"✓ Will add examples to: {rule_id}")
            else:
                print(f"⏭️  {rule_id} already has examples")

    if updates:
        print(f"\n\nUpdating {len(updates)} rules...")

        # Update in batches
        batch_size = 10
        for i in range(0, len(updates), batch_size):
            batch = updates[i:i+batch_size]

            update_req = urllib.request.Request(
                f"{QDRANT_URL}/collections/{COLLECTION}/points",
                method='PUT',
                data=json.dumps({"points": batch}).encode('utf-8'),
                headers={'Content-Type': 'application/json'}
            )

            with urllib.request.urlopen(update_req) as response:
                result = json.loads(response.read())

            if result["status"] == "ok":
                print(f"  ✓ Updated batch {i//batch_size + 1}")

        print(f"\n✅ Successfully added examples to {len(updates)} rules!")
    else:
        print("\n✅ All specified rules already have examples!")

if __name__ == "__main__":
    print("=" * 50)
    print("SAFE: This only adds examples to rules that don't have them")
    print("Backup available at: qdrant_backup_20250929_195738/")
    print("=" * 50 + "\n")

    main()