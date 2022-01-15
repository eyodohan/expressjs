const accessControl = (req, res, next) => {
  const access = true;
  if (!access) {
    res.status(401).json({
      success: false,
      message: "You are not authorized",
    });
  }
  next();
};

const defaultMiddleware = (req, res, next) => {
  console.log("default middleware");
  next();
};

module.exports = {
  accessControl,
  defaultMiddleware,
};
