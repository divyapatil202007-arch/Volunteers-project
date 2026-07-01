import mongoose from 'mongoose';

const ngoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    organizationName: {
      type: String,
      required: [true, 'Please add the organization name'],
      trim: true,
      maxlength: [100, 'Name can not be more than 100 characters']
    },
    registrationNumber: {
      type: String,
      required: [true, 'Please add the registration number'],
      unique: true
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [1000, 'Description can not be more than 1000 characters']
    },
    website: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.+~#?&//=]*)/,
        'Please use a valid URL with HTTP or HTTPS'
      ]
    },
    phone: {
      type: String,
      maxlength: [20, 'Phone number can not be longer than 20 characters']
    },
    address: {
      type: String,
      required: [true, 'Please add an address']
    },
    isVerified: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export const NGO = mongoose.model('NGO', ngoSchema);
