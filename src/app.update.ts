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

  @Action('changeuz')
  async changeUz(@Ctx() ctx: Context) {
    return this.appService.changeLang(ctx, 'uz');
  }
  @Action('changeru')
  async changeRu(@Ctx() ctx: Context) {
    return this.appService.changeLang(ctx, 'ru');
  }
  @Action('changeen')
  async changeEn(@Ctx() ctx: Context)   {
    return this.appService.changeLang(ctx, 'en');
  }

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

  @Hears('🏠 Bosh menu')
  async mainMenu(@Ctx() ctx: Context) {
    return this.appService.mainMenu(ctx);
  }

  @Hears('📞 Aloqa')
  async contact(@Ctx() ctx: Context) {
    return this.appService.contact(ctx);
  }

  @Hears('🤝 Hamkorlar')
  async partner(@Ctx() ctx: Context) {
    return this.appService.partner(ctx);
  }

  @Hears("💳 To'lov")
  async payment(@Ctx() ctx: Context) {
    return this.appService.payment(ctx);
  }

  @Hears('⚙️ Sozlamalar')
  async settings(@Ctx() ctx: Context) {
    return this.appService.settings(ctx);
  }

  @Hears("👤 Ism o'zgartirish")
  async changeName(@Ctx() ctx: Context) {
    return this.appService.changeName(ctx);
  }

  @Hears("📱 Telefon raqamni o'zgartirish")
  async changePhone(@Ctx() ctx: Context) {
    return this.appService.changePhone(ctx);
  }

  @Hears('❌ Bekor qilish')
  async cancel(@Ctx() ctx: Context) {
    return this.appService.cancel(ctx);
  }

  @Hears('✍️ Prays')
  async price(@Ctx() ctx: Context) {
    return this.appService.price(ctx);
  }

  @Hears('🗑 Savatcha')
  async basket(@Ctx() ctx: Context) {
    return this.appService.basket(ctx);
  }

  @On('message')
  async onMessage(@Ctx() ctx: Context) {
    return this.appService.onMessage(ctx);
  }
}
