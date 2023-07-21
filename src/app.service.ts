import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Markup, Telegraf } from 'telegraf';
import { MyBotName } from './app.constants';

@Injectable()
export class AppService {
  constructor(@InjectBot(MyBotName) private readonly bot: Telegraf<Context>) {}

  async onStart(ctx: Context) {
    console.log(ctx.from);
    await ctx.reply(
      "Assalomu alaykum. Hush kelibsiz, botdan birinchi martda foydalanayotganingiz uchun ro'yhatdan o'tishingiz lozim",
      {
        parse_mode: 'HTML',
        ...Markup.keyboard([["👤 Ro'yhatdan o'tish"]])
          .oneTime()
          .resize(),
      },
    );
  }
}
