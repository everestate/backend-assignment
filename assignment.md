# Assignment
## 1. Add Project Status
As a user I should be able to set the status of each project to be only these values:
```
- ToDo
- InProgres
- Done
```

## 2. Add tasks
As a user I should be able to add one or more tasks per project. A task shoud have these fields:
```
- task: string
- completed: boolean
```

## 3. Change relationship of project-user
Currently a project belongs only to one user. Based on the business side requirements we should be able to have one project to be assigned to one or more users.