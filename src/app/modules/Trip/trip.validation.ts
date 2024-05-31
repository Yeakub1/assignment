import { z } from "zod";

const TripSchema = z.object({
  destination: z.string({
    required_error: "Destination is required",
    invalid_type_error: "Destination must be a string",
  }),
  startDate: z.string({
    required_error: "Start date is required",
    invalid_type_error: "Start date must be a string",
  }),
  endDate: z.string({
    required_error: "End date is required",
    invalid_type_error: "End date must be a string",
  }),
  travelType: z.string({
    required_error: "Travel type is required",
    invalid_type_error: "Travel type must be a string",
  }),
  location: z.string({
    required_error: "Location is required",
    invalid_type_error: "Location must be a string",
  }),
  itinerary: z.string({
    required_error: "Itinerary is required",
    invalid_type_error: "Itinerary must be a string",
  }),
  description: z.string({
    required_error: "Description is required",
    invalid_type_error: "Description must be a string",
  }),
  photos: z
    .array(
      z.string({
        required_error: "Each photo must be a string",
        invalid_type_error: "Each photo must be a string",
      })
    )
    .nonempty({
      message: "Photos array cannot be empty",
    }),
});
export const TripValidation = {
  TripSchema,
};