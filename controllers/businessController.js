const Business = require("../models/business");

// Yangi business qo'shish
const createBusiness = async (req, res) => {
  try {
    const {
      name,
      instagramAccountId,
      accessToken,
    } = req.body;

    if (!name || !instagramAccountId || !accessToken) {
      return res.status(400).json({
        message:
          "name, instagramAccountId va accessToken kiritilishi kerak",
      });
    }

    // Instagram akkaunt oldin qo'shilganmi?
    const existingBusiness = await Business.findOne({
      instagramAccountId,
    });

    if (existingBusiness) {
      return res.status(409).json({
        message: "Bu Instagram akkaunt allaqachon ulangan",
      });
    }

    const business = await Business.create({
      name,
      instagramAccountId,
      accessToken,
    });

    // Tokenni response'da qaytarmaymiz
    return res.status(201).json({
      message: "Business qo'shildi ✅",
      data: {
        _id: business._id,
        name: business.name,
        instagramAccountId: business.instagramAccountId,
        enabled: business.enabled,
        createdAt: business.createdAt,
      },
    });
  } catch (error) {
    console.error(
      "Business qo'shish xatosi:",
      error.message
    );

    return res.status(500).json({
      message: "Server xatosi",
    });
  }
};

module.exports = {
  createBusiness,
};