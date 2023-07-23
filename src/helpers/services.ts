import { Context, Markup } from 'telegraf';
import { servicesList } from '../constants/servicesList';

export async function services(ctx: Context) {
  try {
    let serviceButtons = [];
    for (let i = 1; i < servicesList.length; i += 2) {
      serviceButtons.push([servicesList[i - 1][0], servicesList[i][0]]);
    }
    await ctx.reply('Biz taklif qilayotgan xizmat turlari', {
      parse_mode: 'HTML',
      ...Markup.keyboard([...serviceButtons, ['⬅️ Ortga', '🏠 Bosh menu']]),
    });
  } catch (error) {
    console.log(error);
  }
}
