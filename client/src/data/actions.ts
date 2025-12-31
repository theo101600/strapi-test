"use server";
import { z } from "zod";
import { subscribeService } from "./services";

const subscribeSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

type SubscribeState = {
  zodErrors?: Record<string, string[]>;
  strapiErrors?: unknown;
  errorMessage?: string;
};

export async function subscribeAction(
  prevState: SubscribeState,
  formData: FormData
) {
  const validatedFields = subscribeSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
    };
  }

  const responseData = await subscribeService(validatedFields.data.email);

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      errorMessage: "Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      errorMessage: "Failed to subscribe",
    };
  }

  return {
    ...prevState,
    strapiErrors: null,
    zodErrors: null,
    errorMessage: "Successfully subscribed!",
  };
}
