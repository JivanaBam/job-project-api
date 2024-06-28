import User from "../src/user/user.model.js";
import jwt from "jsonwebtoken";

export const isAdmin = async (req, res, next) => {
  //    extract authorization from req.headers
  const authorization = req?.headers?.authorization;

  // extract token from authorization
  const splittedValues = authorization?.split(" ");

  const token = splittedValues?.length === 2 ? splittedValues[1] : undefined;

  // if not token ,throw error
  if (!token) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  let payload;

  try {
    payload = jwt.verify(token, "asd1432j2eef67dssd87s");
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  //find user by email from payload
  const user = await User.findOne({ email: payload.email });

  // if not user
  if (!user) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  //user role must be admin
  if (user.role !== "admin") {
    return res.status(401).send({ message: "Unauthorized." });
  }

  // add loggedInUserId to req
  req.loggedInUserId = user._id;

  // call next function
  next();
};

export const isViewer = async (req, res, next) => {
  //    extract authorization from req.headers
  const authorization = req?.headers?.authorization;

  // extract token from authorization
  const splittedValues = authorization?.split(" ");

  const token = splittedValues?.length === 2 ? splittedValues[1] : undefined;

  // if not token ,throw error
  if (!token) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  let payload;

  try {
    payload = jwt.verify(token, "asd1432j2eef67dssd87s");
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  //find user by email from payload
  const user = await User.findOne({ email: payload.email });

  // if not user
  if (!user) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  //user role must be viewer
  if (user.role !== "viewer") {
    return res.status(401).send({ message: "Unauthorized." });
  }

  // add loggedInUserId to req
  req.loggedInUserId = user._id;

  // call next function
  next();
};

export const isUser = async (req, res, next) => {
  //    extract authorization from req.headers
  const authorization = req?.headers?.authorization;

  // extract token from authorization
  const splittedValues = authorization?.split(" ");

  const token = splittedValues?.length === 2 ? splittedValues[1] : undefined;

  // if not token ,throw error
  if (!token) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  let payload;

  try {
    payload = jwt.verify(token, "asd1432j2eef67dssd87s");
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  //find user by email from payload
  const user = await User.findOne({ email: payload.email });

  // if not user
  if (!user) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  // add loggedInUserId to req
  req.loggedInUserId = user._id;

  // call next function
  next();
};
