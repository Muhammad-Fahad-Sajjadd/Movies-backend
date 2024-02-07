import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  Dob: String;

  @Prop()
  age: number;

  @Prop()
  address: string;

  @Prop()
  genres: string[];

  @Prop()
  imagePath:string

  @Prop({ type: [{ movieId: String, rating: Number }] })
  ratedMovies: { movieId: string; rating: number }[];

  @Prop()
  jwtToken: String;
}

export const UserSchema = SchemaFactory.createForClass(User);
