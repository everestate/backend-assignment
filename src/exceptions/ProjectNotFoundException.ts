import HttpException from './HttpException';

class ProjectNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Post with id ${id} not found`);
  }
}

export default ProjectNotFoundException;
