# Adding Issues to Project #2

**⚠️ CRITICAL WARNING: Always check issue state before setting project status!**

This guide explains how to add the created issues (#23-30) to Project #2 with proper metadata.

## ⚠️ Common Mistakes to Avoid

**DO NOT:**
- ❌ Set CLOSED issues to "Backlog" status (they should be "Done")
- ❌ Overwrite existing "Done" status when updating other fields
- ❌ Add issues to project without checking if they already exist
- ❌ Ignore the GitHub issue state (OPEN/CLOSED) when setting project status

**DO:**
- ✅ Check if issue is CLOSED → Set status to "Done"
- ✅ Check if issue is OPEN → Set status based on work progress
- ✅ Verify issue doesn't already exist in project before adding
- ✅ Preserve existing status when only updating Priority/Size

## Issues to Add

| Issue | Title | Priority | Size |
|-------|-------|----------|------|
| #23 | Implement Credit Cap with Overflow Celebration | Medium | S |
| #24 | Audio Mixing Strategy Decision and Implementation | High | S |
| #25 | Mobile Interaction Pattern Implementation | Medium | S |
| #26 | Minimal Unit Test Infrastructure for Pattern Detection | Medium | S |
| #27 | Responsive Layout with Debounced Resize Handler | Medium | M |
| #28 | Create PATTERN_RULES.md Documentation | High | M |
| #29 | Build Pattern Detection Prototype (pattern.test.js) | High | M |
| #30 | Phase 3 Minimum Asset Production (CRITICAL PATH) | High | XL |

## Method 1: GitHub Web Interface (Recommended)

**⚠️ IMPORTANT: Before adding issues, check if they are already in the project and what their current status is!**

1. **Check Issue State First**
   - View each issue on GitHub to see if it's OPEN or CLOSED
   - CLOSED issues should be marked as "Done" in the project
   - OPEN issues can be "Backlog", "Ready", or "In progress"
   
2. **Navigate to Project #2**
   - Go to: https://github.com/eloise-normal-name/dopamine/projects/2
   
3. **Check if Issue Already Exists**
   - Search the project board for the issue number before adding
   - If already exists, only update Priority/Size, DO NOT change Status unless needed
   
4. **Add Each Issue** (if not already in project)
   - Click the "+ Add item" button at the bottom of any column
   - Type the issue number (e.g., "#23") in the search box
   - Click the issue to add it to the project
   
5. **Set Metadata Fields**
   - Once added, click on the issue card
   - In the right sidebar, you'll see custom fields
   - Set **Priority**: High or Medium (from the table above)
   - Set **Size**: S, M, or XL (from the table above)
   - Set **Status**: 
     - **"Done"** if the issue is CLOSED
     - **"Backlog"** if OPEN and not started
     - **"Ready"** or **"In progress"** if OPEN and already being worked on

6. **Verify**
   - All 8 issues should appear in the project
   - Each should have Priority and Size values
   - **CRITICAL**: CLOSED issues must have "Done" status, not "Backlog"
   - The project board should now be organized for sprint planning

## Method 2: Using GitHub Copilot Chat (When Available)

If you have access to GitHub Copilot chat with MCP tools enabled:

```
@github-projects add issues #23-30 to Project #2 for eloise-normal-name/dopamine with metadata:
- #23: Priority=Medium, Size=S
- #24: Priority=High, Size=S
- #25: Priority=Medium, Size=S
- #26: Priority=Medium, Size=S
- #27: Priority=Medium, Size=M
- #28: Priority=High, Size=M
- #29: Priority=High, Size=M
- #30: Priority=High, Size=XL
```

The Copilot chat interface can use the MCP tools directly:
- `add_project_item` — Add each issue to the project
- `edit_project_item` — Set Priority and Size fields

## Method 3: GitHub CLI (Requires Project Permissions)

If you have a GitHub token with project write permissions:

```bash
# First, get the project node ID
gh project view 2 --owner eloise-normal-name --format json | jq -r '.id'

# Add each issue (replace PROJECT_NODE_ID with actual ID from above)
gh project item-add 2 --owner eloise-normal-name --url https://github.com/eloise-normal-name/dopamine/issues/23
gh project item-add 2 --owner eloise-normal-name --url https://github.com/eloise-normal-name/dopamine/issues/24
gh project item-add 2 --owner eloise-normal-name --url https://github.com/eloise-normal-name/dopamine/issues/25
gh project item-add 2 --owner eloise-normal-name --url https://github.com/eloise-normal-name/dopamine/issues/26
gh project item-add 2 --owner eloise-normal-name --url https://github.com/eloise-normal-name/dopamine/issues/27
gh project item-add 2 --owner eloise-normal-name --url https://github.com/eloise-normal-name/dopamine/issues/28
gh project item-add 2 --owner eloise-normal-name --url https://github.com/eloise-normal-name/dopamine/issues/29
gh project item-add 2 --owner eloise-normal-name --url https://github.com/eloise-normal-name/dopamine/issues/30

# Then set metadata for each (this requires field IDs which you can get with):
gh project field-list 2 --owner eloise-normal-name
```

**Note:** The standard GitHub CLI token may not have project write permissions. You'll need a Personal Access Token (PAT) with the `project` scope.

## Verification Checklist

After adding issues to Project #2, verify:

- [ ] All 8 issues (#23-30) appear in Project #2
- [ ] Each issue has a Priority value set (4 High, 4 Medium)
- [ ] Each issue has a Size value set (4 S, 3 M, 1 XL)
- [ ] Issue #30 (Asset Production) is marked as HIGH priority/CRITICAL
- [ ] Issues are in appropriate Status (Backlog for new work)

## Sprint Organization

Once added, organize into sprints:

**Sprint 1 (Phase 1 Completion):**
- #23, #24, #25 — Design decisions and basic implementations

**Sprint 2 (Phase 2 Preparation):**
- #26, #27, #28, #29 — Infrastructure for multi-reel patterns

**Critical Path (Parallel):**
- #30 — Asset production (must start immediately)

## Related Documentation

- [`.github/copilot-instructions.md`](../.github/copilot-instructions.md) — How Copilot uses MCP tools
- [`docs/MCP_SETUP.md`](MCP_SETUP.md) — MCP server configuration details
- [`docs/PHASE_1_NOTES.md`](PHASE_1_NOTES.md) — Source of these issues and recommendations
