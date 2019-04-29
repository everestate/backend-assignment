import { IsNumber, IsString, ValidateNested } from 'class-validator';

class UserInProjectDto {
  @IsNumber()
  public id: number;
}

class CreateProjectDto {

  @IsString()
  public name: string;

  @ValidateNested()
  public users: UserInProjectDto[];
}

export default CreateProjectDto;
