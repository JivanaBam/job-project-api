import express from "express";
import { isAdmin, isUser } from "../../middleware/authentication.middleware.js";
import validateReqBody from "../../middleware/userValidation.middleware.js";
import { viewerValidationSchema } from "./viewer.validation.js";
import Viewer from "./viewer.model.js";
import { validateIdFromReqParams } from "../../middleware/validate.id.middleware.js";

const router = express.Router();

// add user
router.post(
  "/add/user",
  isAdmin,
  validateReqBody(viewerValidationSchema),
  async (req, res) => {
    // extract new movie from req.body
    const newViewer = req.body;

    // extract loggedInUserId
    const loggedInUserId = req.loggedInUserId;

    newViewer.adminId = loggedInUserId;

    // create user
    await Viewer.create(newViewer);

    // send res
    return res.status(200).send({ message: "User is added successfully." });
  }
);

// get user details by id
router.post(
  "/user/details/:id",
  isUser,
  validateIdFromReqParams,
  async (req, res) => {
    // extract userId from req.params.id
    const userId = req.params.id;

    // find viewer
    const user = await Viewer.findOne({ _id: userId }).lean();

    // if not viewer, throw error
    if (!user) {
      return res.status(404).send({ message: "User doesnot exist." });
    }

    //send res
    return res.status(200).send({ message: "success", userDetails: user });
  }
);

// edit
router.put(
  "/edit/user/:id",
  isAdmin,
  validateIdFromReqParams,
  validateReqBody(viewerValidationSchema),
  async (req, res) => {
    // extract user id from req.params
    const userId = req.params.id;

    // find user
    const user = await Viewer.findOne({ _id: userId });

    // if not user, throw error
    if (!user) {
      return res.status(404).send({ message: "User doesnot exist." });
    }

    // check user ownership
    // to be user owner:  user adminId must be equal to logged in user id
    const adminId = user.adminId;

    const loggedInUserId = req.loggedInUserId;

    const isUserOwner = adminId.equals(loggedInUserId);

    // if not movie owner, throw error
    if (!isUserOwner) {
      return res.status(403).send({ message: "You are not the owner." });
    }

    // get new values from req.body
    const newValues = req.body;

    // edit product
    await Viewer.updateOne(
      { _id: userId },
      {
        $set: {
          ...newValues,
        },
      }
    );

    // send res
    return res.status(200).send({ message: "User is updated successfully." });
  }
);

// delete movie
router.delete(
  "/delete/movie/:id",
  isAdmin,
  validateIdFromReqParams,
  async (req, res) => {
    // extract user id from req.params
    const userId = req.params.id;

    // find user
    const user = await Viewer.findOne({ _id: userId });

    // if not user, throw error
    if (!user) {
      return res.status(404).send({ message: "User doesnot exist." });
    }

    // check user ownership
    // to be user owner:  user adminId must be equal to logged in user id
    const adminId = user.adminId;

    const loggedInUserId = req.loggedInUserId;

    const isUserOwner = adminId.equals(loggedInUserId);

    // if not user owner, throw error
    if (!isUserOwner) {
      return res
        .status(403)
        .send({ message: "You are not the owner of this user." });
    }

    // delete user
    await Viewer.deleteOne({ _id: userId });

    // send res
    return res.status(200).send({ message: "User is deleted successfully." });
  }
);

export default router;
