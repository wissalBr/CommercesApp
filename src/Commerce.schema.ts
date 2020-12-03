import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'commerces' })
export class CommerceDocument extends Document {
  @Prop()
  id_Carto : string;
  @Prop()
  Adresse: string;
  @Prop()
  CP: number;
  @Prop()
  categorie_activite : string;
  @Prop()
  Favori : boolean;
}

export const CommerceSchema = SchemaFactory.createForClass(CommerceDocument);
