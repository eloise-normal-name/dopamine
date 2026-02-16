# GitHub Projects v2 Cloud Operations Guide

## YES - You CAN Use GitHub Projects v2 in the Cloud! 🎉

This document demonstrates that GitHub Projects v2 operations **are fully supported in cloud environments** like GitHub Codespaces and GitHub Actions through the MCP (Model Context Protocol) integration.

## What's Already Set Up

### 1. MCP Server Configuration
The repository has a fully configured GitHub Projects MCP server at `.github/mcp.json`:

```json
{
  "mcpServers": {
    "github-projects": {
      "type": "local",
      "command": "docker",
      "args": ["run", "-i", "--rm", "-e", "GH_TOKEN", 
               "ghcr.io/marioalvial/gh-project-manager-mcp:latest"],
      "env": {
        "GH_TOKEN": "COPILOT_MCP_GITHUB_TOKEN"
      },
      "tools": [
        "create_issue", "get_issue", "list_issues", "close_issue", "edit_issue",
        "add_project_item", "create_project_item", "edit_project_item",
        "list_project_items", "list_project_fields", "view_project", "create_project_field"
      ]
    }
  }
}
```

### 2. Authentication
- Uses a Personal Access Token stored as `COPILOT_MCP_GITHUB_TOKEN` in repository secrets
- Token has the necessary permissions for both Issues and Projects
- See `docs/MCP_SETUP.md` for complete setup instructions

### 3. Project Board Structure
**Project #2** is the main tracking board with these custom fields:

| Field | Type | Options |
|-------|------|---------|
| **Status** | Single Select | Backlog, Ready, In progress, In review, Done |
| **Priority** | Single Select | P0 (highest), P1, P2 |
| **Size** | Single Select | XS, S, M, L, XL |
| **Iteration** | Iteration | Sprint-based tracking |
| **Estimate** | Number | Story point estimates |

## Available Operations in the Cloud

### Issue Management
```javascript
// Create a new issue
create_issue({
  title: "Add audio mixing system",
  body: "Implement background music with fade controls",
  labels: ["enhancement", "audio"]
})

// Get issue details
get_issue({ issue_number: 23 })

// List issues with filters
list_issues({
  state: "OPEN",
  labels: ["enhancement"]
})

// Update an issue
edit_issue({
  issue_number: 23,
  title: "Updated title",
  body: "Updated description"
})

// Close an issue
close_issue({ issue_number: 23 })
```

### Project Board Operations
```javascript
// View project information
view_project({
  owner: "eloise-normal-name",
  project_id: "2"
})

// List all custom fields
list_project_fields({
  owner: "eloise-normal-name", 
  project_id: "2"
})

// List project items (issues/PRs on the board)
list_project_items({
  owner: "eloise-normal-name",
  project_id: "2",
  limit: 50
})
```

### Adding Items to Project
```javascript
// Add an existing issue to the project board
add_project_item({
  url: "https://github.com/eloise-normal-name/dopamine/issues/23",
  project_id: "2",
  owner: "eloise-normal-name"
})

// Create a draft note directly on the board
create_project_item({
  title: "Planning Note",
  body: "Discussion points for next sprint",
  project_id: "2",
  owner: "eloise-normal-name"
})
```

### Updating Custom Fields
```javascript
// Set Priority, Size, and other custom fields
edit_project_item({
  item_id: "PVTI_...",           // Item ID from list_project_items
  field_id: "PVTSSF_...",         // Field ID from list_project_fields
  project_node_id: "PVT_...",    // Project node ID
  
  // For single-select fields (Priority, Size, Status):
  single_select_option_id: "79628723",  // Option ID (e.g., "P0")
  
  // For text fields:
  text_value: "Critical bug fix",
  
  // For number fields (Estimate):
  number_value: 5,
  
  // For date fields:
  date_value: "2026-02-20",
  
  // For iteration fields (Sprint):
  iteration_id: "ITERATION_ID",
  
  // To clear a field:
  clear: true
})
```

## Real-World Examples

### Example 1: Create Issue and Add to Project
```javascript
// Step 1: Create the issue
const issue = await create_issue({
  title: "Implement audio mixing",
  body: "Add background music with fade controls",
  labels: ["enhancement", "audio"]
})

// Step 2: Add to Project #2
const projectItem = await add_project_item({
  url: issue.html_url,
  project_id: "2",
  owner: "eloise-normal-name"
})

// Step 3: Set Priority to P0 (highest)
await edit_project_item({
  item_id: projectItem.id,
  field_id: "PVTSSF_lAHOCG6UpM4BPTH7zg9v040",  // Priority field ID
  project_node_id: "PVT_kwHOCG6UpM4BPTH7",    // Project #2 node ID
  single_select_option_id: "79628723"          // P0 option ID
})

// Step 4: Set Size to L (Large)
await edit_project_item({
  item_id: projectItem.id,
  field_id: "PVTSSF_lAHOCG6UpM4BPTH7zg9v044",  // Size field ID
  project_node_id: "PVT_kwHOCG6UpM4BPTH7",
  single_select_option_id: "853c8207"          // L option ID
})

// Step 5: Set Status to "In progress"
await edit_project_item({
  item_id: projectItem.id,
  field_id: "PVTSSF_lAHOCG6UpM4BPTH7zg9v01w",  // Status field ID
  project_node_id: "PVT_kwHOCG6UpM4BPTH7",
  single_select_option_id: "47fc9ee4"          // "In progress" option ID
})
```

### Example 2: Query and Update Existing Items
```javascript
// List all items to find what needs updating
const items = await list_project_items({
  owner: "eloise-normal-name",
  project_id: "2",
  limit: 100
})

// Filter items in "Backlog" status
const backlogItems = items.items.filter(item => 
  item.fieldValues.Status === "Backlog"
)

// Move high-priority items to "Ready"
for (const item of backlogItems) {
  if (item.fieldValues.Priority === "P0") {
    await edit_project_item({
      item_id: item.id,
      field_id: "PVTSSF_lAHOCG6UpM4BPTH7zg9v01w",
      project_node_id: "PVT_kwHOCG6UpM4BPTH7",
      single_select_option_id: "e18bf179"  // "Ready" status
    })
  }
}
```

### Example 3: Add Items to Current Sprint

```javascript
// Step 1: Get current iteration/sprint information
// First, query the iteration field to see available sprints
const iterations = await gh_api_query(`
  query {
    user(login: "eloise-normal-name") {
      projectV2(number: 2) {
        field(name: "Iteration") {
          ... on ProjectV2IterationField {
            configuration {
              iterations {
                id
                title
                startDate
                duration
              }
            }
          }
        }
      }
    }
  }
`)

// Current sprint: "Iteration 1" (started Feb 15, 2026)
const currentSprintId = "381c7c80"

// Step 2: Create an issue and add to current sprint
const issue = await create_issue({
  title: "Implement audio mixing for slot machine",
  body: "Add background music with fade controls and volume settings",
  labels: ["enhancement", "audio"]
})

// Step 3: Add issue to Project #2
const projectItem = await add_project_item({
  url: issue.html_url,
  project_id: "2",
  owner: "eloise-normal-name"
})

// Step 4: Assign to current sprint (Iteration 1)
await edit_project_item({
  item_id: projectItem.id,
  field_id: "PVTIF_lAHOCG6UpM4BPTH7zg9v05A",  // Iteration field ID
  project_node_id: "PVT_kwHOCG6UpM4BPTH7",
  iteration_id: currentSprintId                 // Current sprint ID
})

// Step 5: Set other fields for sprint planning
await edit_project_item({
  item_id: projectItem.id,
  field_id: "PVTSSF_lAHOCG6UpM4BPTH7zg9v040",  // Priority field
  project_node_id: "PVT_kwHOCG6UpM4BPTH7",
  single_select_option_id: "79628723"          // P0 (highest priority)
})

await edit_project_item({
  item_id: projectItem.id,
  field_id: "PVTSSF_lAHOCG6UpM4BPTH7zg9v044",  // Size field
  project_node_id: "PVT_kwHOCG6UpM4BPTH7",
  single_select_option_id: "853c8207"          // L (Large)
})

await edit_project_item({
  item_id: projectItem.id,
  field_id: "PVTSSF_lAHOCG6UpM4BPTH7zg9v01w",  // Status field
  project_node_id: "PVT_kwHOCG6UpM4BPTH7",
  single_select_option_id: "e18bf179"          // "Ready" status
})
```

**Using GitHub CLI to add items to current sprint:**

```bash
# Get current iteration ID
gh api graphql -f query='
query {
  user(login: "eloise-normal-name") {
    projectV2(number: 2) {
      field(name: "Iteration") {
        ... on ProjectV2IterationField {
          configuration {
            iterations {
              id
              title
              startDate
            }
          }
        }
      }
    }
  }
}' --jq '.data.user.projectV2.field.configuration.iterations[] | select(.title == "Iteration 1")'

# Add an existing issue to Project #2
gh project item-add 2 --owner @me --url https://github.com/eloise-normal-name/dopamine/issues/24

# Set the iteration field (requires the item ID from previous command)
gh project item-edit \
  --id <ITEM_ID> \
  --project-id 2 \
  --owner @me \
  --field-id PVTIF_lAHOCG6UpM4BPTH7zg9v05A \
  --iteration-id 381c7c80
```

**Batch add multiple issues to current sprint:**

```bash
#!/bin/bash
# Script to add multiple issues to current sprint

PROJECT_ID="2"
SPRINT_ID="381c7c80"  # Iteration 1
ITERATION_FIELD="PVTIF_lAHOCG6UpM4BPTH7zg9v05A"
PROJECT_NODE_ID="PVT_kwHOCG6UpM4BPTH7"

# List of issue numbers to add to sprint
ISSUES=(23 24 25 26 27)

for ISSUE_NUM in "${ISSUES[@]}"; do
  echo "Adding issue #$ISSUE_NUM to current sprint..."
  
  # Add to project (if not already added)
  ITEM_ID=$(gh project item-add $PROJECT_ID \
    --owner @me \
    --url "https://github.com/eloise-normal-name/dopamine/issues/$ISSUE_NUM" \
    --format json 2>/dev/null | jq -r '.id')
  
  # If already in project, get the item ID
  if [ -z "$ITEM_ID" ]; then
    ITEM_ID=$(gh project item-list $PROJECT_ID --owner @me --format json \
      | jq -r ".items[] | select(.content.number == $ISSUE_NUM) | .id")
  fi
  
  # Set iteration
  if [ -n "$ITEM_ID" ]; then
    gh project item-edit \
      --id "$ITEM_ID" \
      --project-id $PROJECT_ID \
      --owner @me \
      --field-id $ITERATION_FIELD \
      --iteration-id $SPRINT_ID
    echo "✓ Issue #$ISSUE_NUM added to sprint"
  fi
done
```

## Cloud Environment Benefits

### 1. **Automation**
- Run project management operations in GitHub Actions workflows
- Automatically add PRs to project boards when created
- Update status based on CI/CD results

### 2. **Consistency**
- Enforce standard Priority/Size values across all issues
- Automatically assign new issues to current sprint
- Apply labels based on project field values

### 3. **Integration**
- Link project operations with code changes
- Update project status when features are merged
- Generate reports from project data

### 4. **Collaboration**
- Multiple team members can manage projects simultaneously
- Operations are audited in GitHub's activity log
- Changes are immediately visible to all stakeholders

## Field IDs Reference (Project #2)

For quick copy-paste access, here are the current field IDs:

```javascript
const PROJECT_2_IDS = {
  projectNodeId: "PVT_kwHOCG6UpM4BPTH7",
  
  fields: {
    title: "PVTF_lAHOCG6UpM4BPTH7zg9v01o",
    assignees: "PVTF_lAHOCG6UpM4BPTH7zg9v01s",
    status: "PVTSSF_lAHOCG6UpM4BPTH7zg9v01w",
    labels: "PVTF_lAHOCG6UpM4BPTH7zg9v010",
    linkedPRs: "PVTF_lAHOCG6UpM4BPTH7zg9v014",
    milestone: "PVTF_lAHOCG6UpM4BPTH7zg9v018",
    repository: "PVTF_lAHOCG6UpM4BPTH7zg9v02A",
    reviewers: "PVTF_lAHOCG6UpM4BPTH7zg9v02E",
    parentIssue: "PVTF_lAHOCG6UpM4BPTH7zg9v02I",
    subIssueProgress: "PVTF_lAHOCG6UpM4BPTH7zg9v02M",
    priority: "PVTSSF_lAHOCG6UpM4BPTH7zg9v040",
    size: "PVTSSF_lAHOCG6UpM4BPTH7zg9v044",
    estimate: "PVTF_lAHOCG6UpM4BPTH7zg9v048",
    iteration: "PVTIF_lAHOCG6UpM4BPTH7zg9v05A"
  },
  
  statusOptions: {
    backlog: "f75ad846",
    ready: "e18bf179",
    inProgress: "47fc9ee4",
    inReview: "aba860b9",
    done: "98236657"
  },
  
  priorityOptions: {
    p0: "79628723",
    p1: "0a877460",
    p2: "da944a9c"
  },
  
  sizeOptions: {
    xs: "911790be",
    s: "b277fb01",
    m: "86db8eb3",
    l: "853c8207",
    xl: "2d0801e2"
  },
  
  iterationOptions: {
    iteration1: "381c7c80",  // Feb 15 - Feb 28, 2026 (CURRENT)
    iteration2: "54cf5c95",  // Mar 01 - Mar 14, 2026
    iteration3: "d2c335bc",  // Mar 15 - Mar 28, 2026
    iteration4: "b6a8f1bb",  // Mar 29 - Apr 11, 2026
    iteration5: "955c1297"   // Apr 12 - Apr 25, 2026
  }
}
```

## Command-Line Access

You can also use the GitHub CLI directly in cloud environments:

```bash
# View project
gh project view 2 --owner @me --format json

# List fields
gh project field-list 2 --owner @me --format json

# List items
gh project item-list 2 --owner @me --format json --limit 50

# Add an issue to the project
gh project item-add 2 \
  --owner @me \
  --url https://github.com/eloise-normal-name/dopamine/issues/23

# Update a field
gh project item-edit \
  --id PVTI_... \
  --project-id 2 \
  --owner @me \
  --field-id PVTSSF_... \
  --single-select-option-id 79628723
```

## Troubleshooting

### "unknown owner type" Error
**Solution**: Use `@me` as the owner when calling `gh` commands:
```bash
gh project view 2 --owner @me  # ✓ Works
gh project view 2 --owner eloise-normal-name  # ✗ May fail for user accounts
```

### Authentication Issues
1. Verify `COPILOT_MCP_GITHUB_TOKEN` secret is set
2. Check token permissions include "Projects" (read/write)
3. Ensure token hasn't expired

### Field Value Not Updating
1. Use `list_project_fields` to get the correct field ID
2. Use `list_project_items` to get the correct item ID
3. Ensure option IDs match exactly (case-sensitive)

## Next Steps

1. **Read the setup guide**: `docs/MCP_SETUP.md` for complete configuration
2. **Review best practices**: `.github/copilot-instructions.md` for workflow conventions
3. **Try it yourself**: Create a test issue and add it to Project #2
4. **Automate**: Set up GitHub Actions workflows to manage projects automatically

## Summary

✅ **GitHub Projects v2 operations ARE fully supported in the cloud**
✅ **All MCP tools work in Codespaces and GitHub Actions**
✅ **Complete CRUD operations available for issues and project items**
✅ **Custom field operations (Priority, Size, Status, etc.) fully functional**
✅ **Both API (MCP) and CLI (gh) access methods available**

The cloud-based setup provides powerful automation capabilities while maintaining full GitHub Projects v2 functionality!
