# release-readiness

Check CI, tests, Docker, k8s manifests, secrets, observability and rollback before release.

## Steps
1. Identify goal, owner, affected services and acceptance criteria.
2. Inspect existing implementation and constraints.
3. Produce task decomposition by subagent.
4. Implement or recommend minimal change set.
5. Add tests and verification commands.
6. Document risks and follow-ups.

## Output format
- Context
- Plan
- Changes
- Verification
- Risks
