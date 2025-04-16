export class CreateSimulationDto {
    name: string;
    description?: string;
    projectId: string;
    resourceAllocation?: Record<string, any>;
    assumptions?: Record<string, any>;
    risks?: Record<string, any>;
}