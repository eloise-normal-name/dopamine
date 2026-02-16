# Copilot Coding Agent Instructions

## GitHub Projects Integration

This repository uses **GitHub Projects (Project #2)** to track all work items. When creating issues or managing project tasks, you should use the GitHub Projects MCP tools to ensure proper project board organization.

## Available MCP Tools

The coding agent has access to the following tools via the `github-projects` MCP server:

### Issue Management Tools
- **`create_issue`** — Create new issues in the repository
- **`get_issue`** — Retrieve details of a specific issue
- **`list_issues`** — Query and list repository issues with filters
- **`close_issue`** — Close issues when work is complete
- **`edit_issue`** — Update issue titles, descriptions, labels, etc.

### Project Management Tools
- **`add_project_item`** — Add an existing issue to a project board
- **`create_project_item`** — Create a draft project item (note-style card, not linked to an issue)
- **`edit_project_item`** — Update custom field values (Priority, Size, Sprint, Status)
- **`list_project_items`** — Query all items in a project with their field values
- **`list_project_fields`** — Get the schema of custom fields in a project
- **`view_project`** — Get high-level project information and metadata
- **`create_project_field`** — Add new custom fields to a project (admin operation)

## Workflow: Creating Issues for Project Tracking

When creating issues that should be tracked on the project board, follow this workflow:

1. **Create the issue first** using `create_issue`
2. **Add the issue to Project #2** using `add_project_item` (note: use `create_project_item` only for draft notes, not for issues)
3. **Set custom field values** using `edit_project_item`:
   - **Priority**: High, Medium, or Low
   - **Size**: S, M, L, or XL
   - **Sprint/Iteration**: Assign to the appropriate sprint if specified

### Example Workflow

```
1. Create issue: "Implement audio mixing for slot machine"
2. Add to project: Use add_project_item with the project node ID and issue ID
3. Set fields using edit_project_item:
   - Priority: High
   - Size: L
   - Sprint: Sprint 1
```

## Project Field Conventions

### Priority Field
Use these values to indicate work priority:
- **High** — Critical path items, blockers, security issues
- **Medium** — Important features, planned enhancements
- **Low** — Nice-to-have features, technical debt

### Size Field
Use these values to estimate work complexity:
- **S** — Small task (< 2 hours)
- **M** — Medium task (2-4 hours)
- **L** — Large task (4-8 hours)
- **XL** — Extra large task (> 8 hours, consider breaking down)

### Status Field
Items move through these states:
- **Backlog** — Not started, awaiting prioritization
- **In Progress** — Currently being worked on
- **Done** — Completed and verified

## Best Practices

1. **Always add created issues to Project #2** — Don't leave issues orphaned outside the project board
2. **Set Priority and Size on creation** — This helps with sprint planning and resource allocation
3. **Use consistent field values** — Match the exact values listed above (case-sensitive)
4. **Update status as work progresses** — Move items from Backlog → In Progress → Done
5. **Assign to sprints when known** — If a sprint/iteration is mentioned, set that field value

## Discovering Project Details

If you need to discover project node IDs, field names, or valid field options:

```
1. Use view_project to get project information and node ID
2. Use list_project_fields to retrieve field schemas and valid options
3. Use list_project_items to see existing items and their field values
```

## Reference

For more details on the MCP integration setup, see [`docs/MCP_SETUP.md`](../docs/MCP_SETUP.md).
