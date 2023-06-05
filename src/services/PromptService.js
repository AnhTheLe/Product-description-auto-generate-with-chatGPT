import axiosClient from "./axiosClient";

const TestPrompt = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await axiosClient.post(
                "/completions",
                {
                    model: "text-davinci-003",
                    prompt: "Tell me what is the best thing to do in class",
                    max_tokens: 400,
                    temperature: 1,
                },
                {
                    headers: {
                        Authorization: "Bearer " + process.env.OPENAI_API_KEY,
                    },
                }
            );
            resolve(result.choices[0].text);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    TestPrompt,
};
