import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    ngo: {
      type: mongoose.Schema.ObjectId,
      ref: 'NGO',
      required: true
    },
    title: {
      type: String,
      required: [true, 'Please add an event title'],
      trim: true,
      maxlength: [100, 'Title can not be more than 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [1000, 'Description can not be more than 1000 characters']
    },
    category: {
      type: String,
      required: [true, 'Please add a category']
    },
    requiredSkills: {
      type: [String],
      default: []
    },
    location: {
      type: String,
      required: [true, 'Please add a location']
    },
    startDate: {
      type: Date,
      required: [true, 'Please add a start date']
    },
    endDate: {
      type: Date,
      required: [true, 'Please add an end date']
    },
    maxVolunteers: {
      type: Number,
      required: [true, 'Please add maximum number of volunteers']
    },
    currentVolunteers: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['Draft', 'Published', 'Ongoing', 'Completed', 'Cancelled'],
      default: 'Draft'
    },
    images: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

export const Event = mongoose.model('Event', eventSchema);
