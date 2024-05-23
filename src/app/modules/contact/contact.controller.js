const {
  createContactService,
  getContactService,
  getContactServiceById,
  deleteContactServiceById,
} = require("../services/contact.services");

// Create new contact
const createContact = catchAsync(async (req, res) => {
  const { ...contactData } = req.body;
  const result = await BannerService.createContact(contactData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contact created successfully",
    data: result,
  });
});
exports.createContact = async (req, res, next) => {
  try {
    const contact = await createContactService(req.body);
    res.status(200).json({
      status: "success",
      message: "Successfully created the contact",
      data: contact,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Couldn't create the contact",
      error: error.message,
    });
  }
};
// Get the contact
exports.getContact = async (req, res, next) => {
  try {
    const contact = await getContactService();
    if (!contact) {
      res.status(400).json({
        status: "failed",
        message: "Couldn't get the contact",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Successfully got the contact",
      data: contact,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Couldn't get the contact",
      error: error.message,
    });
  }
};
// Get the contact BY Id
exports.getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await getContactServiceById(id);
    if (!contact) {
      res.status(400).json({
        status: "failed",
        message: "Couldn't get the contact",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Successfully got the contact",
      data: contact,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Couldn't get the contact",
      error: error.message,
    });
  }
};
// Delete the contact BY Id
exports.deleteContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await deleteContactServiceById(id);
    if (!contact.deletedCount) {
      res.status(400).json({
        status: "failed",
        message: "Couldn't delete the contact",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Successfully deleted the contact",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Couldn't delete the contact",
      error: error.message,
    });
  }
};

export const ContactUsController = {
  createContact,
};
