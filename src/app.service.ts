import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Markup, Telegraf } from 'telegraf';
import { MyBotName } from './app.constants';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { boshMenu } from './helpers/boshMenu';
import { services } from './helpers/services';
import { servicesList } from './constants/servicesList';
import { aboutUs } from './constants/aboutUs';
import { hamkorlar } from './constants/hamkorlar';
import { firstSalom } from './helpers/firstSalom';
import { paymentsType } from './helpers/payment';
import { paymentsList } from './constants/payments';
import { settings } from './helpers/settings';

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
    await await firstSalom(ctx);
    if (user && user.status) {
      return await boshMenu(ctx);
    } else {
      await ctx.reply("Iltimos ro'yxatdan o'tishingiz lozim ⬇️", {
        parse_mode: 'HTML',
        ...Markup.keyboard([["👤 Ro'yxatdan o'tish"]])
          .oneTime()
          .resize(),
      });
    }
  }

  async registration(ctx: Context) {
    const user = await this.userRepository.findOne({
      where: { user_id: `${ctx.from.id}` },
    });
    console.log(user);
    if (user) {
      console.log(ctx.from);
    } else {
      await this.userRepository.create({
        user_id: `${ctx.from.id}`,
        first_name: `${ctx.from.first_name}`,
        last_name: `${ctx.from.last_name}`,
        username: `${ctx.from.username}`,
        last_state: 'name',
      });

      await ctx.reply("To'liq ismingizni kiriting", {
        parse_mode: 'HTML',
        ...Markup.keyboard([]).oneTime().resize(),
      });
    }
  }

  async aboutUs(ctx: Context) {
    await ctx.reply(aboutUs, { parse_mode: 'HTML' });
  }

  async serviceType(ctx: Context) {
    const user = await this.userRepository.findOne({
      where: { user_id: `${ctx.from.id}` },
    });
    if (user) {
      await user.update({ last_state: 'service' });

      return await services(ctx);
    }
  }

  async serviceItem(ctx: Context) {
    console.log(ctx);
  }

  async contact(ctx: Context) {
    await ctx.reply(
      `<b>☎️ Aloqa uchun telefon raqamlar </b>\n\n<b>▪️ <a href="tel:+998935533352">+998935533352</a></b>\n<b>▪️ <a href="tel:+998905463326">+998905463326</a></b>`,
      { parse_mode: 'HTML' },
    );
  }

  async partner(ctx: Context) {
    await ctx.reply(hamkorlar, { parse_mode: 'HTML' });
  }

  async payment(ctx: Context) {
    try {
      const user = await this.userRepository.findOne({
        where: { user_id: `${ctx.from.id}` },
      });
      if (user) {
        await user.update({ last_state: 'payment' });
        return await paymentsType(ctx);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async settings(ctx: Context) {
    try {
      const user = await this.userRepository.findOne({
        where: { user_id: `${ctx.from.id}` },
      });
      if (user) {
        await user.update({ last_state: 'settings' });
        await settings(ctx, user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async changeName(ctx: Context) {
    try {
      const user = await this.userRepository.findOne({
        where: { user_id: `${ctx.from.id}` },
      });

      if (user) {
        await user.update({ last_state: 'change_name' });
        await ctx.reply(`Ismingizni kiriting`, {
          parse_mode: 'HTML',
          ...Markup.keyboard([['❌ Bekor qilish']])
            .oneTime()
            .resize(),
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async changePhone(ctx: Context) {
    try {
      const user = await this.userRepository.findOne({
        where: { user_id: `${ctx.from.id}` },
      });

      if (user) {
        await user.update({ last_state: 'change_phone' });
        await ctx.reply(`Telefon raqamingizni kiriting`, {
          parse_mode: 'HTML',
          ...Markup.keyboard([['❌ Bekor qilish']])
            .oneTime()
            .resize(),
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async cancel(ctx: Context) {
    try {
      const user = await this.userRepository.findOne({
        where: { user_id: `${ctx.from.id}` },
      });
      if (user) {
        await user.update({ last_state: 'settings' });
        await settings(ctx, user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async price(ctx: Context) {
    try {
      const user = await this.userRepository.findOne({
        where: { user_id: `${ctx.from.id}` },
      });
      if (user) {
        await ctx.reply(`Prays soon`, {});
      }
    } catch (error) {
      console.log(error);
    }
  }

  async basket(ctx: Context) {
    try {
      const user = await this.userRepository.findOne({
        where: { user_id: `${ctx.from.id}` },
      });
      if (user) {
        await ctx.reply(`🗑 Savatcha bo'sh 🤷‍♂️`, {});
      }
    } catch (error) {
      console.log(error);
    }
  }

  async goBack(ctx: Context) {
    try {
      const user = await this.userRepository.findOne({
        where: { user_id: `${ctx.from.id}` },
      });
      if (user.last_state == 'service') {
        await user.update({ last_state: 'menu' });
        return await boshMenu(ctx);
      } else if (user.last_state == 'payment') {
        await user.update({ last_state: 'menu' });
        return await boshMenu(ctx);
      } else if (user.last_state == 'settings') {
        await user.update({ last_state: 'menu' });
        return await boshMenu(ctx);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async mainMenu(ctx: Context) {
    try {
      const user = await this.userRepository.findOne({
        where: { user_id: `${ctx.from.id}` },
      });
      await user.update({ last_state: 'menu' });
      return await boshMenu(ctx);
    } catch (error) {
      console.log(error);
    }
  }

  async onMessage(ctx: Context) {
    try {
      const user = await this.userRepository.findOne({
        where: { user_id: `${ctx.from.id}` },
      });
      if ('text' in ctx.message) {
        if (user) {
          if (user.last_state == 'name') {
            if (/^[a-zA-Z]+$/.test(ctx.message.text)) {
              await user.update({
                real_name: ctx.message.text,
                last_state: 'phone',
              });
              await ctx.reply(
                `${ctx.message.text} telefon raqamingizni kiriting.`,
              );
            } else {
              await ctx.reply(`To'g'ri ism kiriting ⚠️`, {
                parse_mode: 'HTML',
              });
            }
          } else if (user.last_state == 'phone') {
            const phone = ctx.message.text;
            if (/[012345789][0-9]{8}$/.test(phone)) {
              await user.update({
                phone_number: ctx.message.text,
                last_state: 'menu',
                status: true,
              });
              await ctx.reply(
                `Muvaffaqiyatli ro'yxatdan o'tdingiz. 🎉\nEndi bot imkoniyatlaridan foydalanishingiz mumkin.`,
              );
              return await boshMenu(ctx);
            } else {
              await ctx.reply(
                `Telefon raqamni to'g'ri kiriting.\nMisol : <i>880001122</i>`,
              );
            }
          } else if (user.last_state == 'service') {
            for (let i in servicesList) {
              if (servicesList[i][0] == ctx.message.text) {
                await ctx.reply(
                  `<b>${servicesList[i][0]}</b>\n\n<b><i>${servicesList[i][1]}</i></b>`,
                  { parse_mode: 'HTML' },
                );
                return;
              }
            }
          } else if (user.last_state == 'payment') {
            for (let i in paymentsList) {
              if (paymentsList[i][0] == ctx.message.text) {
                await ctx.reply(
                  `<b>🔘 ${paymentsList[i][0]}</b>\n\n<b>${paymentsList[i][1]}</b>`,
                  { parse_mode: 'HTML' },
                );
                return;
              }
            }
          } else if (user.last_state == 'change_name') {
            if (/^[a-zA-Z]+$/.test(ctx.message.text)) {
              await user.update({
                real_name: ctx.message.text,
                last_state: 'settings',
              });
              await ctx.reply(
                `${user.real_name} ismingiz muvaffaqiyatli o'zgartirildi 🎉`,
                { parse_mode: 'HTML' },
              );
              this.settings(ctx);
            } else {
              await ctx.reply(`To'g'ri ism kiriting ⚠️`, {
                parse_mode: 'HTML',
              });
            }
          } else if (user.last_state == 'change_phone') {
            if (/[012345789][0-9]{8}$/.test(ctx.message.text)) {
              await user.update({
                real_name: ctx.message.text,
                last_state: 'settings',
              });
              await ctx.reply(
                `${user.real_name} ismingiz muvaffaqiyatli o'zgartirildi 🎉`,
                { parse_mode: 'HTML' },
              );
              this.settings(ctx);
            } else {
              await ctx.reply(`To'g'ri telefon raqam kiriting ⚠️`, {
                parse_mode: 'HTML',
              });
            }
          } else {
            await await firstSalom(ctx);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
