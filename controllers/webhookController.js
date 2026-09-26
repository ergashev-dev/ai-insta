const Keyword = require("../models/keyword");
const matchKeyword = require("../utils/matchKeyword");
const Business = require("../models/business");

const {
  sendInstagramMessage,
} = require("../services/instagramService");

// Meta webhook verification
const verifyWebhook = (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (
    mode === "subscribe" &&
    token === process.env.VERIFY_TOKEN
  ) {
    console.log("Webhook tasdiqlandi ✅");

    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
};

// Instagram eventlarini qabul qilish
const handleWebhook = async (req, res) => {
  console.log("Instagram event:");
  console.log(JSON.stringify(req.body, null, 2));

  const entry = req.body.entry?.[0];
  const messaging = entry?.messaging?.[0];

  // Bot o'zi yuborgan xabarlarni qayta ishlamaymiz
  if (messaging?.message?.is_echo) {
    console.log("Echo xabar e'tiborsiz qoldirildi");
    return res.sendStatus(200);
  }

  if (messaging?.message?.text) {
    const senderId = messaging.sender?.id;
    const text = messaging.message.text;
    const recipientId = messaging.recipient?.id;

    console.log("Foydalanuvchi ID:", senderId);
    console.log("Foydalanuvchi yozdi:", text);

    try {
      // Xabar qaysi Instagram Business'ga kelganini topamiz
const business = await Business.findOne({
  instagramAccountId: recipientId,
  enabled: true,
});

if (!business) {
  console.log(
    "Business topilmadi. Instagram ID:",
    recipientId
  );

  return res.sendStatus(200);
}

// Faqat shu Business'ning keywordlarini olamiz
const keywords = await Keyword.find({
  business: business._id,
  enabled: true,
});

      const keyword = matchKeyword(text, keywords);

      if (keyword) {
        console.log(
          "Keyword topildi:",
          keyword.keyword
        );

        await sendInstagramMessage(
  senderId,
  keyword.response,
  business.accessToken
);
      } else {
        console.log("Keyword topilmadi");
      }
    } catch (error) {
      console.error(
        "Keyword tekshirish xatosi:",
        error.message
      );
    }
  }

  return res.sendStatus(200);
};

module.exports = {
  verifyWebhook,
  handleWebhook,
};