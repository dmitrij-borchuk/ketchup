workflow "New workflow" {
  on = "push"
  resolves = ["GitHub Action for npm"]
}

action "Filters for GitHub Actions" {
  uses = "actions/bin/filter@b2bea07"
  args = "branch master"
}

action "GitHub Action for npm" {
  uses = "actions/npm@e7aaefe"
  needs = ["Filters for GitHub Actions"]
  args = "build"
}
