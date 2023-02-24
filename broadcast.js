const type = "media"; //text OR media
const mediaName = "./image.png";
let text = `Hello There ! \n\nI am pleased to announce that I just sent this message *from my console* \n\nThanks !`;
const delay = 3000;

let numbers = [ "9631093100" ];



const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const media = MessageMedia.fromFilePath(mediaName);

const client = new Client({
	authStrategy: new LocalAuth()
  });

client.on('qr', qr => {
        console.log('Inside QR generation!!');
        qrcode.generate(qr, {small: true});
    });

client.on('ready', () => {
        console.log('Client is ready!');
        if (type==='text'){
            for (let i=0; i<numbers.length; i++){
                if (i%200000==0 && i!=0){
                    sendMessage(numbers[i]); 
                }
                console.log("Sending: ", i.toString());
            }
        } else {
            for (let i=0; i<numbers.length; i++){
                setTimeout(sendMedia, delay*(i+1), numbers[i]);
                // sendMedia(numbers[i]); 
            }
        }
        console.log("*****Message Sent******");
  });


function sendMessage(number2){
	const numberx = `91${number2}@c.us`;
    console.log('sending message to: ', numberx);
	client.sendMessage(numberx, text);
}

function sendMedia(number2){
	const numbery = `91${number2}@c.us`;
    console.log('sending message to: ', numbery);
	client.sendMessage(numbery, media, {caption: text});
}


client.initialize();