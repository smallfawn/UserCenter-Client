export default  HttpRequest;
import axios from "axios"
function HttpRequest(options) {
    return new Promise((resolve, reject) => {
        const { url, method, headers, data } = options;
        // 如果没有传递data参数，则将data设置为null
        const requestData = data || null;
        axios.request({
            url: url,
            method: method,
            headers: headers,
            data: requestData
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}