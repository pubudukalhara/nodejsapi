import mongoose, { Schema } from 'mongoose';

const DataModel = new Schema({
  image: {
    type: String,
    // required: true
  },
  userId: {
    type: String,
    required: true,
    ref: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  text1: {
    type: String,
    required: true
  },
  text2: {
    type: String,
    required: true
  },
  text3: {
    type: String,
    required: true
  },
  text4: {
    type: String,
    required: true
  },
  text5: {
    type: String,
    required: true
  },
  text6: {
    type: String,
    required: true
  },
  text7: {
    type: String,
    required: true
  },
  text8: {
    type: String,
    required: true
  },
  text9: {
    type: String,
    required: true
  },
  text10: {
    type: String,
    required: true
  },
  pageNumber: {
    type: String,
    required: true
  },
  mainText: {
    type: String,
  }
});

export default mongoose.model('Data', DataModel);
