// index.js
require('dotenv').config();
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

console.log('Echo-bot starting...');

// Команда /start
bot.start((ctx) => {
  const firstName = ctx.from.first_name || 'друг';
  ctx.reply(
    `Привет, ${firstName}! 👋\n\n` +
    `Я эхо-бот. Напиши мне что-нибудь, и я повторю это.\n\n` +
    `Команды:\n` +
    `/start — это сообщение\n` +
    `/help — справка`
  );
});

// Команда /help
bot.help((ctx) => {
  ctx.reply(
    '🤖 **Эхо-бот**\n\n' +
    'Просто отправь мне любое сообщение — я верну его обратно.\n\n' +
    'Работает с текстом, стикерами, фото, видео, голосовыми.\n\n' +
    'Используй /start для начала.'
  );
});

// Эхо: текстовые сообщения
bot.on('text', async (ctx) => {
  const text = ctx.message.text;

  // Игнорируем команды
  if (text.startsWith('/')) return;

  await ctx.reply(`🔊 Эхо: ${text}`);
});

// Эхо: стикеры
bot.on('sticker', async (ctx) => {
  await ctx.reply('🔊 Эхо: стикер получен!');
  await ctx.replyWithSticker(ctx.message.sticker.file_id);
});

// Эхо: фото
bot.on('photo', async (ctx) => {
  await ctx.reply('🔊 Эхо: фото получено!');
  const photo = ctx.message.photo[ctx.message.photo.length - 1];
  await ctx.replyWithPhoto(photo.file_id);
});

// Эхо: голосовые
bot.on('voice', async (ctx) => {
  await ctx.reply('🔊 Эхо: голосовое получено!');
  await ctx.replyWithVoice(ctx.message.voice.file_id);
});

// Эхо: видео
bot.on('video', async (ctx) => {
  await ctx.reply('🔊 Эхо: видео получено!');
  await ctx.replyWithVideo(ctx.message.video.file_id);
});

// Эхо: документы
bot.on('document', async (ctx) => {
  await ctx.reply('🔊 Эхо: документ получен!');
  await ctx.replyWithDocument(ctx.message.document.file_id);
});

// Обработка ошибок
bot.catch((err, ctx) => {
  console.error('Ошибка бота:', err);
});

// Запуск
bot.launch()
  .then(() => console.log('✅ Echo-bot запущен!'))
  .catch((err) => {
    console.error('❌ Ошибка запуска:', err);
    process.exit(1);
  });

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
