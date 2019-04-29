import * as typeorm from 'typeorm';
import { Project, ProjectStatus } from '../../src/project/project.entity';

(typeorm as any).getRepository = jest.fn();

describe('The Project Entity', () => {
  describe('when creating a new project', () => {
    it('default status should be "todo"', async () => {
      const project = {
        name: 'Best Project',
        status: ProjectStatus.TODO,
      };

      const createdProject = {
        ...project,
        id: 1,
      };

      (typeorm as any).getRepository.mockReturnValue({
        save: () => Promise.resolve(createdProject),
      });

      const projectEntityRepo = typeorm.getRepository(Project);
      projectEntityRepo.save = jest
        .fn()
        .mockReturnValue(Promise.resolve(createdProject));

      const returnedProject: Project = await projectEntityRepo.save(project);
      expect(returnedProject.id).toBe(createdProject.id);
    });
  });

  describe('when changing project status', () => {
    it('should change project status', async () => {
      const project = {
        id: 1,
        name: 'Best Project',
        status: ProjectStatus.TODO,
      };

      const updatedProject = {
        ...project,
        status: ProjectStatus.INPROGRESS,
      };

      (typeorm as any).getRepository.mockReturnValue({
        save: () => Promise.resolve(updatedProject),
      });

      const projectEntityRepo = typeorm.getRepository(Project);
      projectEntityRepo.save = jest
        .fn()
        .mockReturnValue(Promise.resolve(updatedProject));

      const returnedProject = await projectEntityRepo.save(project);
      expect(returnedProject.status).toBe(updatedProject.status);
    });
  });
});
