const sampleHandler = (requestProperty, callback)=>{
    console.log("sample: ",requestProperty);

    callback(200, {
        message: 'This is a sample url!'
    });
};

module.exports = sampleHandler;