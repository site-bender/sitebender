#!/usr/bin/env python3
"""
Rebuild the rules correctly with all fixes applied
"""

import json
import urllib.request
from pathlib import Path

QDRANT_URL = "http://localhost:6333"

def rebuild_with_fixes():
    # Load original backup
    with open('qdrant_backup_20250929_195738/revolutionary_rules.json', 'r') as f:
        backup = json.load(f)

    # Filter out the nonsense rules and apply fixes
    fixed_points = []
    rules_to_remove = ["FILE_ORGANIZATION_001", "IMPORT_A_LA_CARTE_001"]

    for point in backup['points']:
        rule_id = point['payload'].get('rule_id')

        # Skip deleted rules
        if rule_id in rules_to_remove:
            print(f"✗ Removing {rule_id}")
            continue

        # Apply fixes
        if rule_id == "IMPORT_DEFAULT_ONLY_001":
            point['payload']['rule_text'] = "Functions and components: ALWAYS import AS DEFAULT directly from the function/component file"
            point['payload']['reason'] = "Clearest and simplest for default exports. Shows exact dependency. Enables vigorous tree shaking"
            point['payload']['scope'] = {
                "applies_to": {
                    "extensions": [".ts", ".tsx", ".js", ".jsx"],
                    "contexts": ["functions", "components"]
                }
            }
            print(f"✓ Fixed {rule_id}")

        elif rule_id == "IMPORT_NO_BARREL_001":
            point['payload']['rule_text'] = "NO BARREL FILES. EVER. No index.ts that re-exports. mod.ts limited to comments only"
            point['payload']['reason'] = "Barrel files destroy tree shaking, create circular dependency nightmares, and obscure import paths. mod.ts can only contain documentation"
            print(f"✓ Fixed {rule_id}")

        elif rule_id == "IMPORT_ORDER_001":
            point['payload']['rule_text'] = "Imports grouped in order: type external, type internal, named external, const external, default external, named internal, const internal, default internal. Alphabetize within groups, blank line between groups"
            point['payload']['reason'] = "Consistent order = instant recognition. Grouping shows relationships. Types before values shows structure before implementation"
            print(f"✓ Fixed {rule_id}")

        elif rule_id == "NAMING_NO_ABBREV_001":
            point['payload']['rule_text'] = "NO abbreviations at all (initialisms/acronyms OK). Whitelist: id, db, max, min, src, dist, i18n, a11y"
            point['payload']['reason'] = "Saving 3 characters isn't worth the cognitive load of decoding abbreviations. Full words are self-documenting"
            print(f"✓ Fixed {rule_id}")

        elif rule_id == "STYLE_ARRAY_TYPE_001":
            point['payload']['rule_text'] = "Use Array<T> not T[] for array types to improve legibility"
            point['payload']['reason'] = "Brackets [] are hard to see, Array<> is obvious and explicit. Reduces cognitive load and improves code readability"
            print(f"✓ Fixed {rule_id}")

        # Remove React exceptions
        if rule_id == "RULE_FUNDAMENTAL_001" and point['payload'].get('exceptions'):
            del point['payload']['exceptions']
            print(f"✓ Removed React exception from {rule_id}")

        fixed_points.append(point)

    print(f"\n{len(fixed_points)} rules after fixes (was {len(backup['points'])})")

    # Delete and recreate collection
    print("\nRecreating collection...")
    try:
        delete_req = urllib.request.Request(
            f"{QDRANT_URL}/collections/revolutionary_rules",
            method='DELETE'
        )
        urllib.request.urlopen(delete_req)
        print("Deleted old collection")
    except:
        pass

    # Create with MCP vector config
    create_payload = {
        "vectors": {
            "fast-all-minilm-l6-v2": {
                "size": 384,
                "distance": "Cosine"
            }
        }
    }

    create_req = urllib.request.Request(
        f"{QDRANT_URL}/collections/revolutionary_rules",
        method='PUT',
        data=json.dumps(create_payload).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    with urllib.request.urlopen(create_req) as response:
        print("Created new collection")

    # Re-insert all fixed rules
    print("\nInserting fixed rules...")
    for i, point in enumerate(fixed_points, 1):
        payload = point['payload']

        # Create document field for MCP
        info_parts = []
        if 'rule_text' in payload:
            info_parts.append(payload['rule_text'])
        if 'reason' in payload:
            info_parts.append(f"REASON: {payload['reason']}")
        if 'consequences' in payload:
            info_parts.append(f"CONSEQUENCES: {payload['consequences']}")

        payload['document'] = " | ".join(info_parts)

        # Use fake embedding (MCP will generate real one)
        upsert_payload = {
            "points": [{
                "id": i,
                "vectors": {"fast-all-minilm-l6-v2": [0.1] * 384},
                "payload": payload
            }]
        }

        upsert_req = urllib.request.Request(
            f"{QDRANT_URL}/collections/revolutionary_rules/points",
            method='PUT',
            data=json.dumps(upsert_payload).encode('utf-8'),
            headers={'Content-Type': 'application/json'}
        )

        with urllib.request.urlopen(upsert_req) as response:
            if i % 10 == 0:
                print(f"  Inserted {i}/{len(fixed_points)}")

    print(f"\n✅ Rebuilt with {len(fixed_points)} fixed rules!")

    return len(fixed_points)

if __name__ == "__main__":
    count = rebuild_with_fixes()