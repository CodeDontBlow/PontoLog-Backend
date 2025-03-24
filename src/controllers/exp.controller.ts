import asyncHandler from "express-async-handler";
import ExpRepo from "../database/repository/ExpRepo";
import { SuccessResponse } from "../core/ApiResponse";

const getDataByLetter = (column: string, message: string) =>
  asyncHandler(async (req, res) => {
    const letter = req.params.letter;
    const data = await ExpRepo.getDataByLetter(column, letter);
    new SuccessResponse(message, data).send(res);
  });

const getTotalByWeight = (message: string) => {
  asyncHandler(async (req, res) => {
    const data = ExpRepo.getTotalByWeight();
    new SuccessResponse(message, data).send(res);
  });
};

const ExpController = { getDataByLetter };
export default ExpController;
