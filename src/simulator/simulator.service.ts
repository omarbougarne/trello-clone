import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Simulation, SimulationDocument } from './schemas/simulation.schema';
import { CreateSimulationDto } from './dto/create-simulation.dto';
import { TasksService } from '../tasks/tasks.service';

@Injectable()
export class SimulatorService {
    constructor(
        @InjectModel(Simulation.name) private simulationModel: Model<SimulationDocument>,
        private readonly tasksService: TasksService,
    ) { }

    async create(createSimulationDto: CreateSimulationDto): Promise<Simulation> {

        const tasks = await this.tasksService.findByProject(createSimulationDto.projectId);


        const totalCost = tasks.reduce((sum, task) => sum + (task.estimatedCost || 0), 0);
        const totalHours = tasks.reduce((sum, task) => sum + (task.estimatedHours || 0), 0);


        const now = new Date();

        const totalWorkDays = totalHours / 8;
        const estimatedCompletionDate = new Date(now);
        estimatedCompletionDate.setDate(now.getDate() + Math.ceil(totalWorkDays));


        const simulation = new this.simulationModel({
            ...createSimulationDto,
            totalCost,
            totalHours,
            estimatedCompletionDate,
        });

        return simulation.save();
    }

    async findByProject(projectId: string): Promise<Simulation[]> {
        return this.simulationModel.find({ projectId }).exec();
    }

    async findOne(id: string): Promise<Simulation> {
        const simulation = await this.simulationModel.findById(id).exec();
        if (!simulation) {
            throw new NotFoundException(`Simulation with ID ${id} not found`);
        }
        return simulation;
    }

    async remove(id: string): Promise<Simulation> {
        const deletedSimulation = await this.simulationModel.findByIdAndDelete(id).exec();
        if (!deletedSimulation) {
            throw new NotFoundException(`Simulation with ID ${id} not found`);
        }
        return deletedSimulation;
    }
}