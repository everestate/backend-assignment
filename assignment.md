# Assignment
## 1. Add Project Status field
As a user I should be able to set the status of each project to be only these values:
```
- ToDo
- InProgres
- Done
```

## 2. Add Search project endpoint
As a API consumer I should be able to search for projects based on name. It should be possible to use `*` for the search. Example: `firs*` should return all projects that start with `first` in their name.

## 3. Add Task CRUD endpoints
As a user I should be able to add, view, edit, delete my tasks. A task should belong to a project. A task should be visible to everyone but only me as the owner of should be able to mark it as `completed`.
A task shoud have these fields:
```
- task: string
- completed: boolean (default: false)
```

## 4. Change relationship of project-user
Currently a project belongs only to one user. Based on the business side requirements we should be able to have one project to be assigned to one or more users.

## 5. Add Filter tasks endpoint
As a user I would like to filter all my task based on `completed` state.