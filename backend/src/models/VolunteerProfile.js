import mongoose from 'mongoose';

const volunteerProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    bio: {
      type: String,
      maxlength: [500, 'Bio cannot be more than 500 characters']
    },
    skills: {
      type: [String],
      default: []
    },
    interests: {
      type: [String],
      default: []
    },
    availability: {
      type: [String], // e.g., ['Weekends', 'Evenings']
      default: []
    },
    languages: {
      type: [String],
      default: []
    },
    experience: {
      type: String,
      maxlength: [1000, 'Experience cannot exceed 1000 characters']
    },
    location: {
      type: String, // Can be converted to GeoJSON later for geospatial queries
      default: ''
    },
    volunteerHours: {
      type: Number,
      default: 0
    },
    achievements: {
      type: [String],
      default: []
    },
    badges: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

export const VolunteerProfile = mongoose.model('VolunteerProfile', volunteerProfileSchema);
