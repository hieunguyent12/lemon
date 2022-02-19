import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
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
