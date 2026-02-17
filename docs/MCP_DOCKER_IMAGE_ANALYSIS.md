# GitHub Projects MCP Docker Image Analysis

## Question

Is `ghcr.io/marioalvial/gh-project-manager-mcp:latest` still needed for project manager functionality?

## Answer

**YES**, the Docker image is still required for GitHub Projects integration.

## Why It's Still Needed

### 1. GitHub Copilot Has No Native GitHub Projects v2 Tools

As of February 2026, GitHub Copilot does **not** include built-in tools for GitHub Projects v2 management. The tools available for project management are provided exclusively through the external MCP (Model Context Protocol) server.

### 2. The MCP Server Provides Essential Functionality

The Docker image `ghcr.io/marioalvial/gh-project-manager-mcp:latest` provides 12 critical tools that enable the coding agent to:

**Issue Management:**
- `create_issue` — Create new issues
- `get_issue` — Retrieve issue details
- `list_issues` — Query and filter issues
- `close_issue` — Close completed issues
- `edit_issue` — Update issue properties

**Project Management:**
- `add_project_item` — Add issues/PRs to project boards
- `create_project_item` — Create draft project items
- `edit_project_item` — Update custom field values (Priority, Size, Sprint, Status)
- `list_project_items` — Query project board items
- `list_project_fields` — Get project field schemas
- `view_project` — Get project metadata
- `create_project_field` — Add new custom fields

### 3. Historical Context

The Docker image was added in response to PR #22, where the coding agent successfully created issues but couldn't add them to Project #2 due to permission limitations. The MCP server solved this by providing authenticated GitHub Projects API access.

**From `docs/MCP_SETUP.md`:**
> "The agent lacked the necessary permissions to:
> - Add issues to GitHub Projects
> - Update custom field values (Priority, Size, Sprint/Iteration)
> - Query project board status and fields"

### 4. Current Integration Status

The MCP configuration in `.github/mcp.json` explicitly configures this Docker image:

```json
{
  "mcpServers": {
    "github-projects": {
      "type": "local",
      "command": "docker",
      "args": [
        "run", "-i", "--rm", "-e", "GH_TOKEN",
        "ghcr.io/marioalvial/gh-project-manager-mcp:latest"
      ],
      "env": {
        "GH_TOKEN": "COPILOT_MCP_GITHUB_TOKEN"
      },
      "tools": [...]
    }
  }
}
```

This configuration is actively used by:
- The main coding agent (via `.github/copilot-instructions.md`)
- The GitHub Project Manager custom agent (via `.github/agents/github-project-manager.agent.md`)
- Documentation workflows and guides

## Alternative Solutions Considered

### GitHub CLI (`gh project`)

While the GitHub CLI provides project management capabilities, it:
- Requires similar authentication setup
- Is not integrated with the coding agent's tool ecosystem
- Would require manual script invocation rather than seamless API calls
- Doesn't provide the same programmatic interface for agent workflows

### Direct GitHub API Calls

Directly calling the GitHub API would:
- Require implementing authentication and error handling
- Duplicate functionality already provided by the MCP server
- Increase maintenance burden
- Lose the structured tool interface the agent expects

## Impact of Removing the Docker Image

If the Docker image were removed:

❌ **Loss of Functionality:**
- No ability to add issues to Project #2 automatically
- No automated priority/size/sprint assignment
- No project field updates via agent workflows
- GitHub Project Manager custom agent would be non-functional

❌ **Workflow Disruption:**
- Manual project board management required
- Increased administrative overhead
- Inconsistent project organization
- Loss of automation benefits

## Known Issues and Workarounds

### Owner Parameter in Non-Interactive Mode

When using the MCP tools in non-interactive environments, some operations may fail with "owner is required" errors. According to `docs/GITHUB_PROJECTS_CLOUD_OPERATIONS.md`, use `@me` or the specific owner name:

```javascript
// For user projects
view_project({ owner: "@me", project_id: "2" })
// OR
view_project({ owner: "eloise-normal-name", project_id: "2" })
```

The MCP server handles these calls appropriately based on the authentication context.

## Recommendation

**KEEP the Docker image.** It provides essential functionality that is:
- Not available through native GitHub Copilot tools
- Actively used in agent workflows
- Critical for project automation
- Well-documented and maintained

## Future Considerations

**Monitor GitHub Copilot Updates:**
- GitHub may add native GitHub Projects v2 support in future releases
- Periodically review GitHub Copilot release notes for new project management features
- If native tools become available, migration path would be straightforward

**MCP Server Maintenance:**
- Verify the Docker image remains accessible and maintained
- Consider pinning to a specific version tag for stability
- Monitor the upstream repository: https://github.com/marioalvial/gh-project-manager-mcp

## References

- **MCP Setup Guide**: `docs/MCP_SETUP.md`
- **MCP Configuration**: `.github/mcp.json`
- **Agent Instructions**: `.github/copilot-instructions.md`
- **Project Manager Agent**: `.github/agents/github-project-manager.agent.md`
- **Cloud Operations Guide**: `docs/GITHUB_PROJECTS_CLOUD_OPERATIONS.md`

## Last Reviewed

February 17, 2026
