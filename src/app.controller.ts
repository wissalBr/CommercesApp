import { Controller, Get, Param, Put , Body} from '@nestjs/common';
import { AppService } from './app.service';
import { Commerce } from './Commerce';

@Controller('/commerces')
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get('/data')
  getData()  {
    return this.appService.getData();
  }

  @Get()
  getCommerces(){
    return this.appService.getAllCommerces();
  }

  @Get('/:id')
  async getCommerce(@Param('id') id : string) {
   // return this.appService.getCommerce(id) ;
    return this.appService.getCommerceDetail(id);

  }

  @Put('/:id')
  putFavori(@Param('id') id : string,@Body() fav : boolean ) : Promise<Commerce> {
    return this.appService.putFavori(id,fav);
    //return fav;
  }



}
