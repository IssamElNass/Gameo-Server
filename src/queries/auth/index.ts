import { PayloadDTO } from "../../model/auth.model";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";

export const getByAccessTokenQuery = (userDetails: PayloadDTO): any => {
  return {
    where: {
      id: userDetails.userId,
    },
    select: {
      id: true,
      username: true,
      email: true,
      bio: true,
      profile_picture: true,
      role: true,
      verified: true,
    },
  };
};

export const updateTokenQuery = (
  userId: string,
  refresh_token: string
): any => {
  let expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + 7);
  return {
    where: {
      userId: userId,
    },
    data: {
      token: bcrypt.hashSync(refresh_token, 14),
      expires_at: expireDate,
    },
  };
};

export const createTokenQuery = (user: User, refresh_token: string): any => {
  let expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + 7);
  return {
    data: {
      token: bcrypt.hashSync(refresh_token, 14),
      userId: user.id,
      expires_at: expireDate,
    },
  };
};
