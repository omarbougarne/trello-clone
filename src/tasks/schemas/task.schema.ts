import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop({ default: 'todo' })
    status: string;

    @Prop({ default: 'medium' })
    priority: string;

    @Prop()
    dueDate: Date;

    @Prop({ type: Number })
    estimatedHours: number;

    @Prop({ type: Number })
    estimatedCost: number;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Project', required: true })
    projectId: MongooseSchema.Types.ObjectId;

    @Prop({ type: [String], default: [] })
    assignedTo: string[];

    @Prop({ type: Object })
    technicalRequirements: Record<string, any>;
}

export const TaskSchema = SchemaFactory.createForClass(Task);