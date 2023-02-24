/*
    This project is authored by Ankit Agrawal
    email: aggrawalankitsra@gmail.com
    insta: _ankit_aggrawal

*/

const qrcode = require('qrcode-terminal');
const fs = require('fs')

const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');

// Keeping this program logged in
const client = new Client({
    authStrategy: new LocalAuth()
});

// if not logged in then generate QR code to login
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

// after loggin in
client.on('ready', () => {
    console.log('Client is ready!');
});

// if a message is received
client.on('message', message => {
    console.log(message.body);
});

// replying to a message
client.on('message', message => {
    if (message.body === '!ping') {
        message.reply('pong');
    }
});

// sending messages to multiple people
client.on('ready', () => {
    console.log('Client is ready!');
    let numbers = [9631093100, 9709373140];
    let text = `Hello Multiple People`;
    numbers.forEach((number) => {
        client.sendMessage(`91${number}@c.us`, text);
    })
});

// sending attatchments
client.on('ready', () => {
    console.log('Sending media');
    const media = MessageMedia.fromFilePath('./image.png')
    client.sendMessage(`919709373140@c.us`, media, { caption: "Hi there!!" });
});

// saving attatchments to computer
client.on('message', async msg => {
    if (msg.hasMedia) {
        const mediafile = await msg.downloadMedia();
        fs.writeFile(
            "./upload/" + "image" + '.png',
            mediafile.data,
            "base64",
            function (err) {
                if (err) {
                    console.log(err);
                }
            }
        );
    }
});


client.initialize();
