const multer = require('multer')
const path = require('path')

module.exports = {
    storage : new multer.diskStorage({
        destination : path.resolve("public"),
        filename : function(req, file, callback) {
            callback(null, file.originalname)
        }
    })
}