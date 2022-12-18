const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
 
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {    headless: false,
            executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
            // Ubah sendiri sesuaikan dengan letak posisi file chrome kalian 
    }
 
});
 
client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED', qr);
});
 
client.on('ready', () => {
    console.log('Client is ready!');
});
 
const prefix = "!";
 
client.on('message', async msg => {
 
    if (msg.body[0] == prefix){
        
        var [cmd, ...args] = msg.body.slice(1).split(" ");
        args = args.join(" ");
 
        if (cmd == "say"){
            client.sendMessage(msg.from, args);
        }
        
        if (cmd === "s") {
            const attachmentData = await msg.downloadMedia();
            client.sendMessage(msg.from, attachmentData, {sendMediaAsSticker: true});
        }
 
        if (cmd === "s2") {
            const attachmentData = await msg.downloadMedia();
            client.sendMessage(msg.from, attachmentData, {sendVideoAsGif: true});
        }
 
        if (cmd == "gambar"){
            const media = MessageMedia.fromFilePath('./anime/anime-cry.gif');
            client.sendMessage(msg.from, media);
        }
 
        if (cmd == "video"){
            const media = MessageMedia.fromFilePath('./anime/anime-cry.mp4');
            client.sendMessage(msg.from, media, {sendVideoAsGif: true});
        }
 
        if (cmd == "link"){
            const media = await MessageMedia.fromUrl('https://via.placeholder.com/350x150.png');
            client.sendMessage(msg.from, media, {sendMediaAsSticker: true});
        }
 
        if (cmd == "link2"){
            const media = await MessageMedia.fromUrl(args);
            client.sendMessage(msg.from, media, {sendMediaAsSticker: true});
        }
 
    }
        
});
 
client.initialize();