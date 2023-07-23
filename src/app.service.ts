import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Markup, Telegraf } from 'telegraf';
import { MyBotName } from './app.constants';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { boshMenu } from './helpers/boshMenu';
import { services } from './helpers/services';
import { servicesList } from './constants/servicesList';

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

    if (user && user.status) {
      return await boshMenu(ctx);
    } else {
      await ctx.reply(
        "<b>Assalomu alaykum 👋</b>\nIltimos ro'yhatdan o'tishingiz lozim ⬇️",
        {
          parse_mode: 'HTML',
          ...Markup.keyboard([["👤 Ro'yxatdan o'tish"]])
            .oneTime()
            .resize(),
        },
      );
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
    await ctx.reply(
      `
O'zimiz yani iPro group xaqida qisqacha to'xtalsak:
iPro bu universal guruh hisoblanadi va xozirgi kunda bizda quyidagi yo'nalishlarda xizmatlar yo'lga qo'yilgan, bular:
      <b><i>- SMM
      - SMD
      - Moushen
      - Logo, Brending 
      - Ui&Ux
      - Front End
      - Back end</i></b>
Va bu yo'nalishda o'qigan va o'qiyotgan o'quvchilarga (istedodli) talab mavjud!
<b>Bizning hamkorlar (Brend(lar))</b>:
      <b><i>- Quadro edu
      - Life line
      - baxtlioila_doroline
      - Life Line invest
      - China House
      - TPP
      - Awiner O'g'it
      - Sultan travel</i></b>
Va ko'plab hamkorlar mavjud!
<b>©️ iPro group</b>`,
      { parse_mode: 'HTML' },
    );
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

  async goBack(ctx: Context) {
    try {
      const user = await this.userRepository.findOne({
        where: { user_id: `${ctx.from.id}` },
      });
      if (user.last_state == 'service') {
        await user.update({ last_state: 'menu' });
        return await boshMenu(ctx);
      }
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
            await user.update({
              real_name: ctx.message.text,
              last_state: 'phone',
            });
            await ctx.reply(
              `Yaxshi ${ctx.message.text}\nEndi telefon raqamingizni kiriting.`,
            );
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
                `Telefon raqamni to'g'ri kiriting.\nMisol : <pre>880001122</pre>`,
              );
            }
          } else if (user.last_state == 'service') {
            for (let i in servicesList) {
              if (servicesList[i][0] == ctx.message.text) {
                await ctx.reply(
                  `<b>${servicesList[i][0]}</b>\n${servicesList[i][1]}`,
                  { parse_mode: 'HTML' },
                );
                return;
              }
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
