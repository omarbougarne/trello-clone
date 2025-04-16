export class CreateProjectDto {
    name: string;
    description?: string;
    status?: string;
    technicalResources?: Record<string, any>;
    humanResources?: Record<string, any>;
}