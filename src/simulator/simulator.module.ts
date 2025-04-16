import { Module } from '@nestjs/common';
import { SimulatorService } from './simulator.service';
import { SimulatorController } from './simulator.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Simulation, SimulationSchema } from './schemas/simulation.schema';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Simulation.name, schema: SimulationSchema }]),
    TasksModule
  ],
  controllers: [SimulatorController],
  providers: [SimulatorService],
  exports: [SimulatorService],
})
export class SimulatorModule { }