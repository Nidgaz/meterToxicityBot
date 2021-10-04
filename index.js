// const { Telegraf } = require('telegraf')
// //const fs = require('fs')
require('dotenv').config()
const { Telegraf, Markup } = require('telegraf')
const { v4: uuidv4 } = require('uuid');

const token = process.env.BOT_TOKEN
if (token === undefined) {
  throw new Error('BOT_TOKEN must be provided!')
}

const bot = new Telegraf(token)

bot.use(Telegraf.log())

const meterToxic = () => {
  return `I'm ${Math.ceil(Math.random()*100)}% toxic`;
}

bot.command('meter', async (ctx) =>  {
  ctx.reply(meterToxic())}
)

bot.on('inline_query', async (ctx) => {
    const recipes = [{
        type: 'article',
        id: uuidv4(),
        thumb_url: 'https://st3.depositphotos.com/15896958/36464/v/450/depositphotos_364643248-stock-illustration-yellow-danger-coronavirus-biohazard-warning.jpg',
        title: '/meter',
        description: 'Measure my toxicity',
        input_message_content: {
          message_text: meterToxic()
        }
      }]
    return await ctx.answerInlineQuery(recipes, {
      cache_time:  0
    })
  })

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))