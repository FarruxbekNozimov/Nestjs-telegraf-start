import { Context, Markup } from 'telegraf';

export async function boshMenu(ctx: Context) {
  try {
    await ctx.reply('Bosh sahifa', {
      parse_mode: 'HTML',
      ...Markup.keyboard([
        ['👨‍🔧 Xizmat turini tanlash', '📙 Biz xaqimizda', '📞 Aloqa'],
        ['Prays', '🗑 Savatcha', '🤝 Hamkorlar'],
        ["💳 To'lov"],
      ])
        .resize()
        .oneTime(),
    });
  } catch (error) {
    console.log(error);
  }
}
