# Repository Security Configuration Guide

This document outlines the security settings that should be configured in your GitHub repository settings.

## Branch Protection Rules

### For `main` branch:

**Navigate to: Repository Settings → Branches → Add Rule**

#### Basic Protection Rules:
- ✅ **Restrict pushes that create files larger than 100MB**
- ✅ **Restrict force pushes** 
- ✅ **Restrict deletions**

#### Pull Request Requirements:
- ✅ **Require a pull request before merging**
- ✅ **Require approvals: 1** (for team repos, 0 for solo projects)
- ✅ **Dismiss stale PR approvals when new commits are pushed**
- ✅ **Require review from code owners** (if you have CODEOWNERS file)

#### Status Check Requirements:
- ✅ **Require status checks to pass before merging**
- ✅ **Require branches to be up to date before merging**
- ✅ **Required status checks:**
  - `Test & Lint (18)`
  - `Test & Lint (20)`  
  - `Security Audit`

#### Additional Restrictions:
- ✅ **Require signed commits** (recommended)
- ✅ **Require linear history** (optional - keeps git history clean)
- ✅ **Include administrators** (applies rules to repo admins too)

## Repository Settings

### Security & Analysis
**Navigate to: Repository Settings → Security & analysis**

- ✅ **Private vulnerability reporting**: Enabled
- ✅ **Dependency graph**: Enabled  
- ✅ **Dependabot alerts**: Enabled
- ✅ **Dependabot security updates**: Enabled
- ✅ **Dependabot version updates**: Enabled (optional)
- ✅ **Code scanning**: Enabled with CodeQL
- ✅ **Secret scanning**: Enabled
- ✅ **Secret scanning push protection**: Enabled

### General Settings
**Navigate to: Repository Settings → General**

#### Features:
- ❌ **Wikis**: Disabled (unless needed)
- ❌ **Issues**: Enabled (for bug reports)
- ❌ **Discussions**: Optional
- ❌ **Projects**: Optional

#### Pull Requests:
- ✅ **Allow merge commits**: Enabled
- ✅ **Allow squash merging**: Enabled (recommended)
- ✅ **Allow rebase merging**: Enabled
- ✅ **Always suggest updating pull request branches**: Enabled
- ✅ **Automatically delete head branches**: Enabled

#### Pushes:
- ❌ **Limit pushes that create files larger than 100MB**: Enabled

## Action Settings

### Actions Permissions
**Navigate to: Repository Settings → Actions → General**

- ✅ **Actions permissions**: Allow all actions and reusable workflows
- ✅ **Fork pull request workflows**: Require approval for all outside collaborators
- ✅ **Workflow permissions**: Read repository contents and metadata
- ✅ **Allow GitHub Actions to create and approve pull requests**: Disabled

### Environment Protection Rules
**Navigate to: Repository Settings → Environments**

Create `production` environment with:
- ✅ **Required reviewers**: Add yourself
- ✅ **Wait timer**: 5 minutes (optional)
- ✅ **Deployment branches**: Only main branch

## CODEOWNERS File (Optional but Recommended)

Create `.github/CODEOWNERS`:
```
# Global code owners
* @gonchristopher

# Specific areas
/.github/ @gonchristopher
/src/security/ @gonchristopher
package.json @gonchristopher
```

## Commit Signing Setup (Optional but Recommended)

1. **Generate GPG key**:
```bash
gpg --full-generate-key
gpg --list-secret-keys --keyid-format LONG
gpg --armor --export YOUR_KEY_ID
```

2. **Add to GitHub**: Settings → SSH and GPG keys → New GPG key

3. **Configure Git**:
```bash
git config --global user.signingkey YOUR_KEY_ID
git config --global commit.gpgsign true
```

## Automated Security Updates

### Dependabot Configuration
Create `.github/dependabot.yml`:
```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5
    reviewers:
      - "gonchristopher"
    assignees:
      - "gonchristopher"
    commit-message:
      prefix: "chore"
      prefix-development: "chore"
      include: "scope"
```

## Security Scanning Configuration

### CodeQL Analysis
Create `.github/workflows/codeql.yml`:
```yaml
name: "CodeQL"

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 2 * * 1'  # Weekly on Mondays

jobs:
  analyze:
    name: Analyze
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        language: [ 'javascript' ]
        
    steps:
    - name: Checkout repository
      uses: actions/checkout@v4
      
    - name: Initialize CodeQL
      uses: github/codeql-action/init@v2
      with:
        languages: ${{ matrix.language }}
        
    - name: Autobuild
      uses: github/codeql-action/autobuild@v2
      
    - name: Perform CodeQL Analysis
      uses: github/codeql-action/analyze@v2
```

## Quick Setup Checklist

After creating the CI workflow and configuration files:

1. ☐ **Push CI workflow to main branch**
2. ☐ **Go to Repository Settings → Branches**
3. ☐ **Add branch protection rule for `main`**
4. ☐ **Enable required status checks: CI jobs**
5. ☐ **Enable Security & Analysis features**
6. ☐ **Set up Dependabot (optional)**
7. ☐ **Configure GPG signing (optional)**
8. ☐ **Test with a pull request**

## Testing Your Setup

1. Create a new branch: `git checkout -b test-protection`
2. Make a small change and push
3. Create a pull request
4. Verify CI runs and status checks appear
5. Try to merge before CI completes (should be blocked)
6. Wait for CI to pass, then merge

This setup ensures code quality and prevents accidental force pushes or broken code from reaching your main branch.