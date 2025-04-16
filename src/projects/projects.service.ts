import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from './schemas/project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectModel(Project.name) private projectModel: Model<ProjectDocument>
    ) { }

    async create(createProjectDto: CreateProjectDto): Promise<Project> {
        const newProject = new this.projectModel(createProjectDto);
        return newProject.save();
    }

    async findAll(): Promise<Project[]> {
        return this.projectModel.find().exec();
    }

    async findOne(id: string): Promise<Project> {
        const project = await this.projectModel.findById(id).exec();
        if (!project) {
            throw new NotFoundException(`Project with ID ${id} not found`);
        }
        return project;
    }

    async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
        const updatedProject = await this.projectModel
            .findByIdAndUpdate(id, updateProjectDto, { new: true })
            .exec();

        if (!updatedProject) {
            throw new NotFoundException(`Project with ID ${id} not found`);
        }
        return updatedProject;
    }

    async remove(id: string): Promise<Project> {
        const deletedProject = await this.projectModel.findByIdAndDelete(id).exec();
        if (!deletedProject) {
            throw new NotFoundException(`Project with ID ${id} not found`);
        }
        return deletedProject;
    }
}
