module.exports = {
  multipleMongooseToObject: (mongooseArrays) => {
    return mongooseArrays.map((array) => array.toObject());
  },
  mongooseToObject: (mongoose) => {
    return mongoose.toObject();
  },
};
