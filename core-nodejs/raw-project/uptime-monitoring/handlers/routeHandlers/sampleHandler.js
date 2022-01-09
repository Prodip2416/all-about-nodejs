/*
 * Title: Sample Handler
 * Description: Sample Handler
 * Author: Aushomapto
 * Date: 01/09/2022
 *
 */
// module scaffolding
const handler = {};

handler.sampleHandler = (requestProperties, callback) => {
    console.log(requestProperties);

    callback(200, {
        message: 'This is a sample url',
    });
};

module.exports = handler;
