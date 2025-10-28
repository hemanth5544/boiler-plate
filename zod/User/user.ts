import z  from "zod";

export const ZUser = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).max(100),
  email: z.string().email(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const ZUserResponse = z.object({
  success: z.boolean(),
  data: ZUser,
});

export const ZUsersResponse = z.object({
  success: z.boolean(),
  data: z.array(ZUser),
});



