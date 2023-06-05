import express from "express";
import PromptController from "../controllers/PromptController";

let router = express.Router();

const InitAPI = (app) => {
    router.post("/api/prompts/test", PromptController.TestController);
    router.get("/test", (req, res) => {
        return res.status(200).json({"message": "test successfully"});
    });

    return app.use("/", router);
};

module.exports = InitAPI;
