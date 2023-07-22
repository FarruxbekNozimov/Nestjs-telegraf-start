import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Markup, Telegraf } from 'telegraf';
import { MyBotName } from './app.constants';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { boshMenu } from './helpers/boshMenu';

@Injectable()
export class AppService {
  constructor(
    @InjectBot(MyBotName) private readonly bot: Telegraf<Context>,
    @InjectModel(User) private userRepository: typeof User,
  ) {}

  async onStart(ctx: Context) {
    const user = await this.userRepository.findOne({
      where: { user_id: `${ctx.from.id}` },
    });

    if (user) {
      return await boshMenu(ctx);
    } else {
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

  async registration(ctx: Context) {
    const master = await this.userRepository.findOne({
      where: { user_id: `${ctx.from.id}` },
    });
    if (master) {
      //
    } else {
      await this.userRepository.create({
        user_id: `${ctx.from.id}`,
        last_state: 'name',
      });

      await ctx.reply("O'zingizning sohangizni tanlang", {
        ...Markup.inlineKeyboard([
          [Markup.button.callback('❌ Bekor qilish', 'delmyinfo')],
        ]),
      });
    }
  }
}
