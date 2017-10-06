const builder = require('botbuilder');
const restify = require('restify');

//Setup bot
const connector = new builder.ChatConnector()
const bot = new builder.UniversalBot(connector)

//Setup Restify
const server = restify.createServer()
server.listen(3978, () =>
    console.log('restify listening on port 3978')
)
server.post('/api/messages', connector.listen())

bot.dialog('/', [
    (session, args, next) => {
        builder.Prompts.text(session, 'Hello user, what is your name?')
    },
    (session, args, next) => {
        const name = args.response

        session.send(`Hello, ${name}!`)
    }
])