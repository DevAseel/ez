import { useRouter } from "next/router";
import Main from "~/layouts/Main";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

export default function UserProfile() {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { data: userData } = api.users.getUser.useQuery(
    { userId: id },
    {
      enabled: id !== undefined && sessionData !== undefined,
    }
  );

  return (
    <Main>
      <h1>User Profile {id}</h1>
      <p>This is the user profile with ID {id}.</p>
    </Main>
  );
}
