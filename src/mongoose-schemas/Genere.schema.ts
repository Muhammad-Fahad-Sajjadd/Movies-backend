import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Genere extends Document {
  @Prop()
  id: Number;

  @Prop()
  name: string;
}

export const GenereSchema = SchemaFactory.createForClass(Genere);
