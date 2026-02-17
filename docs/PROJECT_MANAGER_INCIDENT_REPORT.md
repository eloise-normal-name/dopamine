# Project Manager Incident Report

**Date**: 2026-02-17  
**Issue**: Closed issues incorrectly moved from "Done" to "Backlog" status  
**Severity**: Medium - Caused confusion about project completion status  

## What Happened

When adding issues #23-30 to GitHub Project #2, the Project Manager agent made a critical error:

1. ❌ Added all 8 issues to the project without checking if they already existed
2. ❌ Set all issues to "Backlog" status without checking their GitHub state
3. ❌ **Overwrote 5 completed issues from "Done" to "Backlog"**

### Issues Affected

| Issue | Title | GitHub State | Incorrect Status | Correct Status |
|-------|-------|--------------|------------------|----------------|
| #23 | Credit Cap with Overflow | CLOSED | Backlog | Done |
| #24 | Audio Mixing Strategy | CLOSED | Backlog | Done |
| #25 | Mobile Interaction Pattern | CLOSED | Backlog | Done |
| #26 | Unit Test Infrastructure | CLOSED | Backlog | Done |
| #28 | PATTERN_RULES.md | CLOSED | Backlog | Done |

Issues #27, #29, #30 were OPEN and correctly set to "Ready" or "Backlog".

## Root Cause

The Project Manager agent documentation had **insufficient guidance** on:
1. Checking if items already exist in the project before adding
2. Verifying GitHub issue state (OPEN/CLOSED) before setting project status
3. The critical rule: **CLOSED issues must have "Done" status**

The workflow assumed all issues being added were new and not started, which was incorrect.

## Immediate Fix

✅ **All affected issues have been corrected:**
- Issues #23, #24, #25, #26, #28 restored to "Done" status
- Project board now accurately reflects completion state

## Preventive Measures

### 1. Updated Agent Instructions (`.github/agents/github-project-manager.agent.md`)

**Added Critical Rules:**
```markdown
### Critical Rule: Issue State → Project Status Mapping

ALWAYS respect this mapping when setting status:
- GitHub Issue State CLOSED → Project Status "Done"
- GitHub Issue State OPEN → Project Status depends on work progress

NEVER set a CLOSED issue to "Backlog", "Ready", or "In progress"
```

**Updated "Adding Items to Project" Workflow:**
1. **First, check if the item already exists** in the project
2. **Verify the item exists** and check its state (OPEN/CLOSED)
3. **Check the issue/PR state** before setting status
4. Use `add_project_item` (skip if already exists)
5. Set appropriate status - **NEVER overwrite existing status without checking**

### 2. Updated User Documentation (`docs/ADD_ISSUES_TO_PROJECT.md`)

**Added Warning Section:**
- ⚠️ Common mistakes to avoid
- ✅ Checklist for proper issue addition
- Step-by-step guidance including state verification

**New Step: "Check Issue State First"**
```
View each issue on GitHub to see if it's OPEN or CLOSED
- CLOSED issues should be marked as "Done" in the project
- OPEN issues can be "Backlog", "Ready", or "In progress"
```

## Lessons Learned

1. **Always check existing state** before modifying project items
2. **GitHub issue state is the source of truth** for completion status
3. **Documentation must be explicit** about critical workflows
4. **Agent instructions need concrete examples** of what NOT to do
5. **Status changes should be intentional**, not automatic defaults

## Verification

Current project status (verified 2026-02-17):

```bash
# Issues 23-30 project status
✅ #23 (CLOSED) → Done
✅ #24 (CLOSED) → Done
✅ #25 (CLOSED) → Done
✅ #26 (CLOSED) → Done
✅ #27 (OPEN)   → Ready
✅ #28 (CLOSED) → Done
✅ #29 (OPEN)   → Ready
✅ #30 (OPEN)   → Backlog
```

All statuses now correctly reflect GitHub issue state.

## Future Recommendations

1. **Add automated checks** in workflows to prevent this
2. **Consider a "status validation" tool** that audits the project board
3. **Add alerts** when CLOSED issues are set to non-Done status
4. **Document this incident** as a learning example in training materials

---

**Status**: ✅ RESOLVED  
**Follow-up**: Monitor project board for similar issues over next sprint
