export class CreateTaskDto {
    title: string;
    description?: string;
    status?: string;
    priority?: string;
    dueDate?: Date;
    estimatedHours?: number;
    estimatedCost?: number;
    projectId: string;
    assignedTo?: string[];
    technicalRequirements?: Record<string, any>;
}