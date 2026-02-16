# GitHub Projects MCP Integration Setup

## Why This Was Needed

In PR #22, the Copilot coding agent successfully created issues #23–30 for project organization, but encountered permission limitations when attempting to add them to Project #2 (see [comment](https://github.com/eloise-normal-name/dopamine/pull/22#issuecomment-3910776344)).

The agent lacked the necessary permissions to:
- Add issues to GitHub Projects
- Update custom field values (Priority, Size, Sprint/Iteration)
- Query project board status and fields

To enable full project management capabilities, we configured an MCP (Model Context Protocol) server that provides the coding agent with GitHub Projects API access through authenticated tools.

## MCP Server Configuration

### 1. Navigate to Repository Settings

Go to **Settings → Copilot → Coding agent** in the repository settings on GitHub.

### 2. Configure MCP Server

Add an MCP server configuration using the following JSON:

```json
{
  "mcpServers": {
    "github-projects": {
      "type": "local",
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "GH_TOKEN",
        "ghcr.io/marioalvial/gh-project-manager-mcp:latest"
      ],
      "env": {
        "GH_TOKEN": "COPILOT_MCP_GH_TOKEN"
      },
      "tools": [
        "create_issue",
        "get_issue",
        "list_issues",
        "close_issue",
        "edit_issue",
        "add_project_item",
        "create_project_item",
        "edit_project_item",
        "list_project_items",
        "list_project_fields",
        "view_project",
        "create_project_field"
      ]
    }
  }
}
```

This configuration is stored in `.github/mcp.json` in the repository.

### 3. Create a Personal Access Token (PAT)

The MCP server requires a GitHub Personal Access Token with appropriate permissions:

1. Go to **GitHub Settings → Developer settings → Personal access tokens → Fine-grained tokens**
2. Click **Generate new token**
3. Configure the token:
   - **Token name**: `Copilot MCP GitHub Projects`
   - **Expiration**: Choose an appropriate expiration period
   - **Repository access**: Select "Only select repositories" and choose this repository
   - **Permissions**:
     - **Repository permissions**:
       - `Contents`: Read and write (for issue management)
       - `Issues`: Read and write
       - `Metadata`: Read-only (automatically included)
     - **Organization permissions** (if using organization projects):
       - `Projects`: Read and write
4. Generate the token and copy it immediately

### 4. Add the Secret to Repository

1. Go to **Repository Settings → Secrets and variables → Codespaces**
2. Click **New repository secret**
3. Add the secret:
   - **Name**: `COPILOT_MCP_GH_TOKEN`
   - **Value**: Paste the PAT you created
4. Click **Add secret**

> **Note**: The secret name `COPILOT_MCP_GH_TOKEN` must match the reference in the MCP configuration's `env` section.

## Required Permissions

The Personal Access Token must have the following permissions:

### Repository Permissions
- **`Contents`**: Read and write — For creating/editing repository files if needed
- **`Issues`**: Read and write — For creating and managing issues
- **`Metadata`**: Read-only — Automatically included, provides access to repository metadata

### Organization Permissions (for org-level projects)
- **`Projects`**: Read and write — For querying and modifying GitHub Projects (Project #2)

## Enabled Tools and Functions

The MCP server exposes the following tools to the coding agent:

### Issue Management Tools
- **`create_issue`** — Create new issues in the repository
- **`get_issue`** — Retrieve details of a specific issue
- **`list_issues`** — Query and list repository issues with filters
- **`close_issue`** — Close issues when work is complete
- **`edit_issue`** — Update issue titles, descriptions, labels, etc.

### Project Management Tools
- **`add_project_item`** — Add an existing issue to a project board
- **`create_project_item`** — Create a draft project item (note-style card)
- **`edit_project_item`** — Update custom field values (Priority, Size, Sprint, Status)
- **`list_project_items`** — Query all items in a project with their field values
- **`list_project_fields`** — Get the schema of custom fields in a project
- **`view_project`** — Get high-level project information and metadata
- **`create_project_field`** — Add new custom fields to a project (admin operation)

### Usage Example

The agent can now perform operations like:

```javascript
// 1. Create an issue
const issue = await create_issue({
  title: "Implement audio mixing",
  body: "Add background music with fade controls",
  labels: ["enhancement", "audio"]
});

// 2. Add to Project #2
await add_project_item({
  project_id: 2,
  issue_id: issue.id
});

// 3. Set custom fields
await edit_project_item({
  project_id: 2,
  item_id: project_item.id,
  fields: {
    "Priority": "High",
    "Size": "L",
    "Sprint": "Sprint 1"
  }
});
```

## Troubleshooting

### Authentication Errors
- Verify the `COPILOT_MCP_GH_TOKEN` secret is set correctly
- Ensure the PAT hasn't expired
- Check that the PAT has the required permissions

### Permission Denied
- Verify the PAT has `project` read/write permissions
- For organization projects, ensure the PAT's organization permissions are configured

### Tool Not Found
- Ensure the MCP server configuration in `.github/mcp.json` is correct
- Verify the Docker image is accessible: `ghcr.io/marioalvial/gh-project-manager-mcp:latest`

## Reference

- **MCP Configuration**: `.github/mcp.json`
- **Agent Instructions**: `.github/copilot-instructions.md`
- **MCP Server**: [gh-project-manager-mcp](https://github.com/marioalvial/gh-project-manager-mcp)
