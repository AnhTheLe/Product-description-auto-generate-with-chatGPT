import express from "express";
import PromptController from "../controllers/PromptController";

let router = express.Router();

const InitAPI = (app) => {
    router.post("/api/prompts/test", PromptController.TestController);

    return app.use("/", router);
};

module.exports = InitAPI;
