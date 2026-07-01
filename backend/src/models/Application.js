import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.ObjectId,
      ref: 'Event',
      required: true
    },
    volunteer: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected', 'Waitlisted', 'Cancelled'],
      default: 'Pending'
    },
    notes: {
      type: String,
      maxlength: [500, 'Notes cannot exceed 500 characters']
    }
  },
  {
    timestamps: true
  }
);

// Prevent duplicate applications
applicationSchema.index({ event: 1, volunteer: 1 }, { unique: true });

export const Application = mongoose.model('Application', applicationSchema);
