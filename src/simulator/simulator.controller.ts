import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SimulatorService } from './simulator.service';
import { CreateSimulationDto } from './dto/create-simulation.dto';

@Controller('simulations')
export class SimulatorController {
    constructor(private readonly simulatorService: SimulatorService) { }

    @Post()
    create(@Body() createSimulationDto: CreateSimulationDto) {
        return this.simulatorService.create(createSimulationDto);
    }

    @Get('project/:projectId')
    findByProject(@Param('projectId') projectId: string) {
        return this.simulatorService.findByProject(projectId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.simulatorService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.simulatorService.remove(id);
    }
}
