const qrcode = require("qrcode-terminal");
const fs = require("fs");
const { storeOrder } = require("./storeSQL");
const pdfGen = require("./mail");

const {
  Client,
  LocalAuth,
  MessageMedia,
  Location,
  Buttons,
} = require("whatsapp-web.js");

const spawner = require("child_process").spawn;

const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: ".wwebjs_cache",
  }),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.clear();
  console.log("Client is ready!");
});

client.on("message", async (message) => {
  //   console.log(message.body);

  // Send basic message
  if (message.body === "!ping") {
    await message.reply("pong");
  }

  // Send Media
  //   if (message.body === "!media") {
  //     const media = MessageMedia.fromFilePath("media/wound.png");
  //     await client.sendMessage(message.from, media);
  //   }

  // Downloading images sent by user
  //   if (message.hasMedia) {
  //     const media = await message.downloadMedia({
  //       path: "media",
  //     });
  //     const base64 = media.data.replace("/^data:image/(png|jpg);base64,/", "");
  //     const buffer = Buffer.from(base64, "base64");
  //     fs.writeFileSync(`uploads/${message.from}.png`, buffer, (err) => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log("File saved");
  //       }
  //     });
  //   }

  // Send Location
  if (message.body === "!location") {
    await message.reply(new Location(19.1014, 72.8274, "Ettarra Coffee House"));
  }

  // Send pdf
  if (message.body === "!pdf") {
    const pdf = MessageMedia.fromFilePath("invoices/resume.pdf");
    await client.sendMessage(message.from, pdf, { caption: "Your resume" });
  }

  if (message.body.startsWith("!order")) {
    const from = message.from.split("@")[0];
    const order = from + " " + message.body.split(" ").slice(1).join(" ");
    await message.reply(`Order received from: ${order}`);
    const json_data = spawner("python", ["llm.py", order]);
    json_data.stdout.on("data", async (data) => {
      temp = data.toString();
      storeOrder(temp);
      const processItems = () => {
        temp = JSON.parse(temp);
        temp.items.forEach((item) => {
          item.unit_cost = 270;
          delete item.type;
        });
      };
      processItems();
      // console.log(temp);
      temp = JSON.stringify(temp);
      const pdfPath = pdfGen(temp).then((pdfPath) => {
        const pdf = MessageMedia.fromFilePath(pdfPath);
        client.sendMessage(message.from, pdf, "Your invoice is ready!");
      });
      // const pdf = MessageMedia.fromFilePath(pdfPath);
      // await client.sendMessage(message.from, pdf, "Your invoice is ready!");
    });
  }
});

client.initialize();
