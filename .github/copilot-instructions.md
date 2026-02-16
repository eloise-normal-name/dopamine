# Copilot Coding Agent Instructions

## GitHub Projects Integration

This repository uses **GitHub Projects (Project #2)** to track all work items. When creating issues or managing project tasks, you should use the GitHub Projects MCP tools to ensure proper project board organization.

## Available MCP Tools

The coding agent has access to the following GitHub Projects MCP tools via the `github-projects` MCP server:

- **`projects_list`** — Discover available projects in the repository
- **`projects_get`** — Get project details, including custom fields, field options, and current items
- **`projects_write`** — Add items to a project and update custom field values

Additional tools available for issue management:
- `create_issue`, `get_issue`, `list_issues`, `close_issue`, `edit_issue`
- `add_project_item`, `create_project_item`, `edit_project_item`, `list_project_items`
- `list_project_fields`, `view_project`, `create_project_field`

## Workflow: Creating Issues for Project Tracking

When creating issues that should be tracked on the project board, follow this workflow:

1. **Create the issue first** using standard GitHub tools (e.g., `create_issue`)
2. **Add the issue to Project #2** using `add_project_item` or `create_project_item`
3. **Set custom field values** using `edit_project_item`:
   - **Priority**: High, Medium, or Low
   - **Size**: S, M, L, or XL
   - **Sprint/Iteration**: Assign to the appropriate sprint if specified

### Example Workflow

```
1. Create issue: "Implement audio mixing for slot machine"
2. Add to project: Use add_project_item(project_id=2, issue_id=<created_issue_id>)
3. Set fields:
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

If you need to discover project IDs, field names, or valid field options:

```
1. Use projects_list to find available projects
2. Use projects_get to retrieve project details and field schemas
3. Use list_project_items to see existing items and their field values
```

## Reference

For more details on the MCP integration setup, see [`docs/MCP_SETUP.md`](../docs/MCP_SETUP.md).
