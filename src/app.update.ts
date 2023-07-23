import {
  Action,
  Command,
  Ctx,
  Hears,
  On,
  Start,
  Update,
} from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { AppService } from './app.service';

@Update()
export class AppUpdate {
  constructor(private readonly appService: AppService) {}

  @Start()
  async onStart(@Ctx() ctx: Context) {
    return this.appService.onStart(ctx);
  }

  @Hears("👤 Ro'yxatdan o'tish")
  async registrtion(@Ctx() ctx: Context) {
    return this.appService.registration(ctx);
  }

  @Hears('👨‍🔧 Xizmat turini tanlash')
  async serviceType(@Ctx() ctx: Context) {
    return this.appService.serviceType(ctx);
  }

  @Hears('📙 Biz xaqimizda')
  async aboutUs(@Ctx() ctx: Context) {
    return this.appService.aboutUs(ctx);
  }

  @Hears('⬅️ Ortga')
  async goBack(@Ctx() ctx: Context) {
    return this.appService.goBack(ctx);
  }

  @On('message')
  async onMessage(@Ctx() ctx: Context) {
    return this.appService.onMessage(ctx);
  }
}
