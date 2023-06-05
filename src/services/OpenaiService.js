import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

function getCompletions(
    model = "text-davinci-003",
    prompt = "Tạo trang web mô tả một sản phẩm bao gồm tiêu đề, nội dung, lợi ích, kích cỡ sản phẩm và SEO. Tiêu đề nên mô tả tính năng chính của sản phẩm, nội dung rõ ràng và dễ hiểu, cung cấp đầy đủ kích thước sản phẩm và tối ưu hóa SEO. Sử dụng đoạn mã HTML hợp lệ để đảm bảo tính tương thích và định dạng liên kết thích hợp. Bên cạnh đó hãy kiểm tra những thông tin mà người dùng nhập vào nếu có:. Tên sản phẩm: Aó thun nam cổ trơn. Đối tượng khách hàng hướng đến: giới trẻ.",
    maxToken = 1500,
    temperature = 0.7,
    topP = 0.9,
    stream = true,
    stop = ""
) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = openai.createCompletion(
                {
                    model: model,
                    prompt: prompt,
                    max_tokens: maxToken,
                    temperature: temperature,
                    top_p: topP,
                    stop: stop,
                    stream: stream,
                },
                {
                    responseType: "stream",
                    headers: {
                        Authorization: "Bearer " + process.env.OPENAI_API_KEY,
                    },
                }
            );

            response.then((resp) => {
                resp.data.on("data", (data) => {
                    const lines = data
                        .toString()
                        .split("\n")
                        .filter((line) => line.trim() !== "");
                    for (const line of lines) {
                        const message = line.replace(/^data: /, "");
                        if (message === "[DONE]") {
                            resolve("[DONE]");
                            break;
                        }
                        const parsed = JSON.parse(message);

                        resolve(parsed.choices[0].text);
                    }
                });
            });
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    getCompletions,
};
