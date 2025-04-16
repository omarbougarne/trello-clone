import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type SimulationDocument = Simulation & Document;

@Schema({ timestamps: true })
export class Simulation {
    @Prop({ required: true })
    name: string;

    @Prop()
    description: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Project', required: true })
    projectId: MongooseSchema.Types.ObjectId;

    @Prop({ type: Number, default: 0 })
    totalCost: number;

    @Prop({ type: Number, default: 0 })
    totalHours: number;

    @Prop({ type: Date })
    estimatedCompletionDate: Date;

    @Prop({ type: Object })
    resourceAllocation: Record<string, any>;

    @Prop({ type: Object })
    assumptions: Record<string, any>;

    @Prop({ type: Object })
    risks: Record<string, any>;
}

export const SimulationSchema = SchemaFactory.createForClass(Simulation);