import { NextApiRequest, NextApiResponse } from "next";
import { createUser, getAllUsers } from "../../prisma/user";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET": {
        const users = await getAllUsers();
        return res.json(users);
      }
      case "POST": {
        const { email, name, password } = req.body;
        const user = await createUser(email, name, password);
        return res.json(user);
      }
    }
  } catch (err: any) {
    return res.status(500).json({ ...err, message: err.message });
  }
}
