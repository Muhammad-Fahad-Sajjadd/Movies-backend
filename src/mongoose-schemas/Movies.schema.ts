import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Movies extends Document {
  @Prop()
  adult: Boolean;

  @Prop()
  backdrop_path: string;

  @Prop()
  title: string;

  @Prop()
  overview: String;

  @Prop()
  genre_ids: number[];

  @Prop()
  vote_average: number;

  @Prop({ default: [] })
  ratings: number[];
}

export const MovieSchema = SchemaFactory.createForClass(Movies);
