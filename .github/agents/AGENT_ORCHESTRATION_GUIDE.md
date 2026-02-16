# Agent Orchestration Guide

This guide shows how to use the GitHub Project Manager agent to autonomously manage work and delegate to executor agents.

## Quick Start

### Basic Sprint Execution

Ask the PM agent to execute sprint work:

```
@github-project-manager Execute the current sprint items that are ready to work
```

The PM will:
1. List all sprint items in "Todo" status
2. Check each for readiness (clear requirements, no blockers)
3. Delegate ready items to Sprint Executor
4. Update project board status to "In Progress"
5. Monitor for PR creation and completion
6. Update items to "Done" when merged

### Single Issue Implementation

Ask the PM to handle a specific issue:

```
@github-project-manager Implement issue #45 by delegating to the executor
```

The PM will:
1. Review issue #45 details
2. Add to project board if not already there
3. Delegate to Sprint Executor with full context
4. Update status to "In Progress"
5. Track completion

### Urgent Bug Fix

Report a bug and ask PM to handle it:

```
@github-project-manager There's a critical bug in #67, please prioritize and execute ASAP
```

The PM will:
1. Review bug details
2. Set priority to High
3. Add to current sprint
4. Immediately delegate to Sprint Executor
5. Update project board
6. Monitor for quick resolution

### Multi-Issue Feature

Ask PM to orchestrate a complex feature:

```
@github-project-manager Implement the audio system feature which spans issues #50-54. Handle dependencies.
```

The PM will:
1. Analyze all related issues
2. Identify dependencies (#50 must come before #51, etc.)
3. Delegate in correct order
4. Wait for prerequisites before delegating dependent work
5. Coordinate any integration issues
6. Keep project board updated throughout

## Advanced Usage

### Sprint Planning + Execution

Combine planning and execution:

```
@github-project-manager Review the backlog, plan the next sprint with highest priority items, then start execution
```

The PM will:
1. Use `list_project_items` to review backlog
2. Select items based on priority and size
3. Assign to new sprint iteration
4. Immediately begin delegating work to executor
5. Track sprint progress

### Project Board Cleanup + Work

Ask for cleanup then action:

```
@github-project-manager Clean up the project board (update stale items, fix missing metadata), then execute high-priority items
```

The PM will:
1. Find items with missing status/priority/size
2. Update metadata based on issue content
3. Identify stale items and update or close them
4. Then identify high-priority work
5. Delegate to executor

### Parallel Work Delegation

Delegate multiple independent tasks:

```
@github-project-manager Issues #30, #31, and #32 are all independent. Delegate them in parallel.
```

The PM will:
1. Verify issues are truly independent (no shared files/dependencies)
2. Delegate all three to Sprint Executor with separate prompts
3. Update all three to "In Progress"
4. Track each independently

**Note**: The PM will delegate sequentially to the same executor agent, but the work can proceed in parallel if multiple executor instances can run.

## Project Board Management

### Understanding PM's Project Board Capabilities

The PM agent has full control over the GitHub Project board via MCP tools:

- **add_project_item**: Add issues/PRs to projects
- **edit_project_item**: Update status, priority, size, iteration
- **list_project_items**: Query items with filters
- **create_project_item**: Create draft issues in the project
- **view_project**: Get project structure and fields
- **create_issue**: Create new issues
- **edit_issue**: Update issue metadata

### Common Project Board Operations

#### Add Item to Project

```
@github-project-manager Add issue #78 to the project board with Medium priority
```

#### Update Item Status

```
@github-project-manager Move issue #45 to "In Progress" status
```

#### Bulk Status Update

```
@github-project-manager All issues tagged with "needs-review" should be moved to "In Review" status
```

#### Set Priorities

```
@github-project-manager Review all sprint items and set priorities based on urgency and dependencies
```

#### Create and Add Issue

```
@github-project-manager Create a new issue for "Add pause button to slot machine" and add it to the backlog
```

## Best Practices

### Clear Issue Requirements

Before asking PM to delegate work, ensure issues have:
- Clear description of what needs to be built
- Acceptance criteria
- Relevant context or design references
- Size estimate (if possible)

The PM will check readiness before delegating.

### Label Your Issues

Use labels to help PM prioritize:
- `bug` - Bug fixes (often higher priority)
- `feature` - New features
- `enhancement` - Improvements to existing features
- `technical-debt` - Code quality improvements
- `documentation` - Documentation work
- `current-sprint` - Part of active sprint

### Provide Feedback

If executor agents produce suboptimal results:
1. Comment on the PR with specific feedback
2. Ask PM to track the pattern for future delegation
3. Update agent instructions if needed

### Monitor Progress

Check in with PM periodically:

```
@github-project-manager What's the status of the current sprint? Any blockers?
```

The PM will provide a summary and identify issues.

## Troubleshooting

### Work Not Being Delegated

If PM is not delegating work:
- Check that issues have clear requirements
- Verify issues are in "Todo" status
- Ensure no blockers are preventing work
- Check that issues are assigned to the current sprint

Ask explicitly:
```
@github-project-manager Why isn't issue #45 being delegated? What's blocking it?
```

### Executor Not Creating PRs

If Sprint Executor isn't creating PRs:
- The issue requirements may be unclear
- There may be technical blockers (missing dependencies, unclear specifications)
- The executor may need clarification

Check the issue for comments from the executor agent.

### Project Board Out of Sync

If board status doesn't match reality:
```
@github-project-manager Sync the project board with actual PR/issue status
```

The PM will review all items and update statuses based on current state.

## Extending the System

### Creating New Executor Agents

To add specialized executors:

1. Create a new `.agent.md` file (e.g., `frontend-specialist.agent.md`)
2. Define the agent's expertise and workflow
3. Update the PM agent's delegation section to reference the new agent
4. Test by asking PM to delegate appropriate work to it

Example:
```chatagent
---
name: Frontend Specialist
description: Specialized in UI/UX implementation and styling
---

You are an expert in frontend development, focusing on HTML, CSS, JavaScript, and UI/UX implementation.

When invoked by the PM agent, you receive UI/UX tasks and should:
1. Review design specifications
2. Implement responsive, accessible HTML/CSS
3. Add interactive JavaScript behaviors
4. Ensure cross-browser compatibility
5. Write UI tests
6. Create PR with screenshots/demos
```

Then in PM agent instructions, add:
```
- Frontend Specialist: UI/UX implementation, styling, responsive design
```

### Custom Delegation Rules

You can ask the PM to follow specific delegation patterns:

```
@github-project-manager For all issues labeled "frontend", delegate to Frontend Specialist. For "backend" issues, delegate to Sprint Executor.
```

The PM will remember this context for the current conversation and follow the rule.

## Examples from Real Usage

### Example 1: Complete Sprint Automation

```
User: @github-project-manager We're starting Sprint 5. Add the top 5 priority backlog items to the sprint, then execute them.

PM Response:
✓ Reviewed backlog with list_project_items
✓ Selected 5 highest priority items (#45, #48, #51, #52, #55)
✓ Assigned to Sprint 5 iteration using edit_project_item
✓ Verified all have clear requirements and size estimates
✓ Delegating Issue #45 to Sprint Executor: "Implement auto-spin toggle"
✓ Status updated to "In Progress"
✓ Delegating Issue #48: "Add sound effects for reel stops"
✓ Monitoring progress...

Sprint 5 is now active with 5 items in progress!
```

### Example 2: Urgent Hotfix

```
User: @github-project-manager Production is broken! Issue #89 is critical - users can't spin the reels.

PM Response:
✓ Reviewed issue #89: "Slot machine spin button not responding"
✓ Added to project with High priority
✓ Marked as current sprint
✓ Delegating IMMEDIATELY to Sprint Executor with urgency flag
✓ Status: "In Progress"
✓ Added comment to issue tracking urgent escalation

Sprint Executor has received the urgent fix request and is working on it now.
```

### Example 3: Coordinated Feature Rollout

```
User: @github-project-manager We need the particle system feature (#60-#64). Issue #60 is the foundation, then #61-64 can go in parallel.

PM Response:
✓ Analyzed issues #60-#64
✓ Confirmed #60 is prerequisite for others
✓ Delegating #60 to Sprint Executor: "Create particle system base module"
✓ Status updated to "In Progress"
✓ Will wait for #60 completion before delegating #61-64
✓ Dependencies documented on project board

Foundation work (#60) is underway. I'll delegate the dependent work once it's completed and merged.
```

## Getting Help

If you're stuck or need clarification on agent orchestration:

```
@github-project-manager How do I use you to automate sprint execution? What are my options?
```

The PM will explain its capabilities and provide guidance tailored to your question.

---

**Remember**: The PM agent is autonomous but works best with clear instructions and well-defined issues. Treat it as a project coordinator who needs good requirements to delegate effectively!
