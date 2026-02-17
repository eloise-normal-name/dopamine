# Add Issues to Current Sprint - Instructions

## Overview
This document provides instructions for adding issues #23-30 to Project #2 and assigning them to the current sprint (Iteration 1).

## Prerequisites
- Issues #23-30 must already be created (✅ Done)
- GitHub Projects MCP tools must be available
- Access to `COPILOT_MCP_GITHUB_TOKEN` secret

## Project Information

**Project #2 Details:**
- Node ID: `PVT_kwHOCG6UpM4BPTH7`
- Current Sprint: "Iteration 1" (ID: `381c7c80`, Feb 15-28, 2026)

**Field IDs:**
- Iteration: `PVTIF_lAHOCG6UpM4BPTH7zg9v05A`
- Priority: `PVTSSF_lAHOCG6UpM4BPTH7zg9v040`
- Size: `PVTSSF_lAHOCG6UpM4BPTH7zg9v044`
- Status: `PVTSSF_lAHOCG6UpM4BPTH7zg9v01w`

**Priority Option IDs:**
- P0 (High): `79628723`
- P1 (Medium): `0a877460`
- P2 (Low): `da944a9c`

**Size Option IDs:**
- XS: `911790be`
- S: `b277fb01`
- M: `86db8eb3`
- L: `853c8207`
- XL: `2d0801e2`

**Status Option IDs:**
- Backlog: `f75ad846`
- Ready: `e18bf179`
- In progress: `47fc9ee4`
- In review: `aba860b9`
- Done: `98236657`

## Issue Metadata

| Issue | Title | Priority | Size | Sprint |
|-------|-------|----------|------|--------|
| #23 | Credit Cap | P1 (Medium) | S | Iteration 1 |
| #24 | Audio Mixing | P0 (High) | S | Iteration 1 |
| #25 | Mobile Interaction | P1 (Medium) | S | Iteration 1 |
| #26 | Unit Tests | P1 (Medium) | S | Iteration 1 |
| #27 | Responsive Layout | P1 (Medium) | M | Iteration 1 |
| #28 | PATTERN_RULES.md | P0 (High) | M | Iteration 1 |
| #29 | Pattern Prototype | P0 (High) | M | Iteration 1 |
| #30 | Asset Production | P0 (High) | XL | Iteration 1 |

## Using MCP Tools (Recommended)

If you have access to GitHub Copilot chat with MCP tools enabled:

```javascript
// For each issue, perform these steps:

// 1. Add issue to project
const item = await add_project_item({
  url: "https://github.com/eloise-normal-name/dopamine/issues/23",
  project_id: "2",
  owner: "eloise-normal-name"
})

// 2. Assign to Iteration 1
await edit_project_item({
  item_id: item.id,
  field_id: "PVTIF_lAHOCG6UpM4BPTH7zg9v05A",
  project_node_id: "PVT_kwHOCG6UpM4BPTH7",
  iteration_id: "381c7c80"
})

// 3. Set Priority (P1 for #23)
await edit_project_item({
  item_id: item.id,
  field_id: "PVTSSF_lAHOCG6UpM4BPTH7zg9v040",
  project_node_id: "PVT_kwHOCG6UpM4BPTH7",
  single_select_option_id: "0a877460"  // P1 (Medium)
})

// 4. Set Size (S for #23)
await edit_project_item({
  item_id: item.id,
  field_id: "PVTSSF_lAHOCG6UpM4BPTH7zg9v044",
  project_node_id: "PVT_kwHOCG6UpM4BPTH7",
  single_select_option_id: "b277fb01"  // S
})

// 5. Set Status to Ready
await edit_project_item({
  item_id: item.id,
  field_id: "PVTSSF_lAHOCG6UpM4BPTH7zg9v01w",
  project_node_id: "PVT_kwHOCG6UpM4BPTH7",
  single_select_option_id: "e18bf179"  // Ready
})
```

## Using GitHub CLI with GraphQL

If you have a Personal Access Token with project permissions:

```bash
export GH_TOKEN="your_token_here"

# For issue #23
ISSUE_ID=$(gh api graphql -f query='
  query {
    repository(owner: "eloise-normal-name", name: "dopamine") {
      issue(number: 23) { id }
    }
  }
' --jq '.data.repository.issue.id')

# Add to project
ITEM_ID=$(gh api graphql -f query='
  mutation {
    addProjectV2ItemById(input: {
      projectId: "PVT_kwHOCG6UpM4BPTH7"
      contentId: "'$ISSUE_ID'"
    }) {
      item { id }
    }
  }
' --jq '.data.addProjectV2ItemById.item.id')

# Set iteration
gh api graphql -f query='
  mutation {
    updateProjectV2ItemFieldValue(input: {
      projectId: "PVT_kwHOCG6UpM4BPTH7"
      itemId: "'$ITEM_ID'"
      fieldId: "PVTIF_lAHOCG6UpM4BPTH7zg9v05A"
      value: { iterationId: "381c7c80" }
    }) {
      projectV2Item { id }
    }
  }
'

# Set priority (P1)
gh api graphql -f query='
  mutation {
    updateProjectV2ItemFieldValue(input: {
      projectId: "PVT_kwHOCG6UpM4BPTH7"
      itemId: "'$ITEM_ID'"
      fieldId: "PVTSSF_lAHOCG6UpM4BPTH7zg9v040"
      value: { singleSelectOptionId: "0a877460" }
    }) {
      projectV2Item { id }
    }
  }
'

# Set size (S)
gh api graphql -f query='
  mutation {
    updateProjectV2ItemFieldValue(input: {
      projectId: "PVT_kwHOCG6UpM4BPTH7"
      itemId: "'$ITEM_ID'"
      fieldId: "PVTSSF_lAHOCG6UpM4BPTH7zg9v044"
      value: { singleSelectOptionId: "b277fb01" }
    }) {
      projectV2Item { id }
    }
  }
'

# Set status (Ready)
gh api graphql -f query='
  mutation {
    updateProjectV2ItemFieldValue(input: {
      projectId: "PVT_kwHOCG6UpM4BPTH7"
      itemId: "'$ITEM_ID'"
      fieldId: "PVTSSF_lAHOCG6UpM4BPTH7zg9v01w"
      value: { singleSelectOptionId: "e18bf179" }
    }) {
      projectV2Item { id }
    }
  }
'
```

Repeat for all issues #23-30 with their respective priority/size values from the table above.

## Using GitHub Web UI

1. Go to https://github.com/eloise-normal-name/dopamine/projects/2
2. For each issue #23-30:
   - Click "+ Add item" and search for the issue number
   - Click the issue to add it
   - In the sidebar, set:
     - **Iteration**: "Iteration 1"
     - **Priority**: P0 or P1 (see table above)
     - **Size**: S, M, or XL (see table above)
     - **Status**: "Ready"

## Verification

After adding all issues, verify in Project #2 that:
- [ ] All 8 issues (#23-30) are present
- [ ] All have Iteration = "Iteration 1"
- [ ] Priorities match: 4× P0 (High), 4× P1 (Medium)
- [ ] Sizes match: 4× S, 3× M, 1× XL
- [ ] All have Status = "Ready"

## Next Steps

Once issues are added to the sprint:
1. Begin implementation of Sprint 1 items (#23-25)
2. Start Phase 2 prep items (#26-29) in parallel
3. Immediately begin asset production (#30 - Critical Path)

## References

- Full documentation: `docs/GITHUB_PROJECTS_CLOUD_OPERATIONS.md`
- MCP setup: `docs/MCP_SETUP.md`
- Copilot instructions: `.github/copilot-instructions.md`
