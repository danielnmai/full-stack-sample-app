import { z } from "zod";

const Invoice = z.object({
  id: z.number(),
  vendorName: z.string(),
  amount: z.number(),
  dueDate: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  description: z.string(),
  userId: z.number(),
  paid: z.boolean(),
});

export type Invoice = z.infer<typeof Invoice>;
