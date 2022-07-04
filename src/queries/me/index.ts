import { PayloadDTO } from "../../model/auth.model";

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
