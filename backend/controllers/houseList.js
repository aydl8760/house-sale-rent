import List from "../models/houseList.js";

export const createList = async (req, res, next) => {
  try {
    const createdCar = await List.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Created List Successfully",
      userCar: createdCar,
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};
