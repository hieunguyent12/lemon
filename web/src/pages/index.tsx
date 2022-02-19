import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@mantine/core";

export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <Button onClick={() => signOut()}>Sign out</Button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <Button onClick={() => signIn()}>Sign in</Button>
    </>
  );
}
// import type { NextPage } from "next";
// import { gql, useQuery } from "@apollo/client";

// import ClientOnly from "../components/ClientOnly";

// const TEST_QUERY = gql`
//   query Test {
//     users {
//       name
//     }
//   }
// `;

// function Test() {
//   const { data, loading, error } = useQuery(TEST_QUERY);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     console.error(error);
//     return null;
//   }

//   // console.log(data);
//   return <p>Done</p>;
// }

// const Home: NextPage = () => {
//   return (
//     <div>
//       <p>HOME</p>
//       <ClientOnly>
//         <Test />
//       </ClientOnly>
//     </div>
//   );
// };

// export default Home;
