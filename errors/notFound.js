const notFound = (req,res,next) => {
    return res.status(404).json({success: false, message: "URL NOT FOUND"});
}

module.exports = notFound;