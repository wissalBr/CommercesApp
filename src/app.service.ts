import { Injectable } from '@nestjs/common';
import { Commerce } from './Commerce';
import { InjectModel } from '@nestjs/mongoose';
import { CommerceDocument } from './Commerce.schema';
import { Model } from 'mongoose';
import fetch from 'cross-fetch';
import { CommerceDetail } from './CommerceDetail';

@Injectable()
export class AppService {
  private commercesDetails :Array<CommerceDetail> = [] ;
  private url = 'https://opendata.paris.fr/api/records/1.0/search/?dataset=commerces-semaest&q=&rows=311' as const ;

  constructor(
    @InjectModel(CommerceDocument.name)
    private readonly CommerceRepository: Model<CommerceDocument>,
  ) {}

  addCommerce (commerce: Commerce): Promise<Commerce> {
    return this.CommerceRepository.create(commerce);
  }

  getCommerce(id:string): Promise<Commerce | undefined> {
    return this.CommerceRepository.findOne({id_Carto:id}).exec() ;
  }

  getCommerceDetail(id:string): CommerceDetail {
    let i=0;
    while ((i<this.commercesDetails.length) && (this.commercesDetails[i].id_Carto !== id)) {
      i++;
    }
    return this.commercesDetails[i];
  }

  getAllCommerces() {
    return this.CommerceRepository.find().exec();
  }

  getTotalNumberOfCommerces() {
    return this.CommerceRepository.countDocuments().exec();
  }


  async getData() {
    const response = await fetch(this.url);
    const data = await response.json();

    for (let i=0; i<data.nhits; i++){
      const c: Commerce = {
          id_Carto:data.records[i].fields.id_carto,
          Adresse:data.records[i].fields.adresse,
          CP:data.records[i].fields.cp,
          categorie_activite:data.records[i].fields.categorie_activite,
          Favori:false
          };
      const cDetail: CommerceDetail = {
        id_Carto:data.records[i].fields.id_carto,
        Operation:data.records[i].fields.operation,
        activite_precise_du_locataire:data.records[i].fields.activite_precise_du_locataire,
        enseigne:data.records[i].fields.enseigne,
      }
      this.commercesDetails.push(cDetail);
      await this.addCommerce(c);
    }
    return ('Données récupérées avec succes ! ');


  }
  async putFavori(id : string, fav : boolean) : Promise <Commerce> {
    const filter = {id_Carto:id};
    await this.CommerceRepository.findOneAndUpdate(filter, fav, {new: true});
    return this.getCommerce(id);
  }

}
