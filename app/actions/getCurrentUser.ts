import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/app/libs/prismadb';

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
    // next.js v13.2에서는 server Page에서 client Page로 Props을 넘기면
    // warning이 떳다. 근데 지금 이 버전은 13.4.9로 서버에서 클라이언트로 prop을 넘겨줘도
    // warning이 떨어지지 않는다. 그래서 아래 로직이 필요치 않다.
    // 오히려 아래로직을 추가하면 에러가 발생한다.

    // return {
    //   ...currentUser,
    //   createdAt: currentUser.createdAt.toISOString(),
    //   updatedAt: currentUser.updatedAt.toISOString(),
    //   emailVerified: currentUser.emailVerified?.toISOString() || null,
    // };
    // app/types/index.ts에서 safeUser라는 타입을 추가해줬다.
    // UserMenu.tsx와 NavBar.tsx에서 User라는 type 대신에
    // safeUser라는 props로 교체했다.
  } catch (error: any) {
    return null;
  }
}
