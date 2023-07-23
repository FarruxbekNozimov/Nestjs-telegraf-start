import { Context, Markup } from 'telegraf';
import { paymentsList } from '../constants/payments';

export async function paymentsType(ctx: Context) {
  try {
    let paymentsButtons = [];
    for (let i = 1; i < paymentsList.length; i += 2) {
      paymentsButtons.push([paymentsList[i - 1][0], paymentsList[i][0]]);
    }
    await ctx.reply(`<b><i>💳 To'lov qilish turini talang</i></b>`, {
      parse_mode: 'HTML',
      ...Markup.keyboard([...paymentsButtons, ['⬅️ Ortga', '🏠 Bosh menu']]),
    });
  } catch (error) {
    console.log(error);
  }
}
