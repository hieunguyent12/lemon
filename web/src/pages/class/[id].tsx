import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import {
  Header,
  Loader,
  MediaQuery,
  Text,
  ActionIcon,
  Box,
} from "@mantine/core";
import { GearIcon } from "@modulz/radix-icons";

import { PageComponent } from "../../types";
import { Class, Query, QueryClassArgs } from "../../graphql/generated";
import { Session } from "next-auth";
import { Maybe } from "graphql/jsutils/Maybe";
import { useEffect } from "react";

import { useAppContext } from "../../context/AppContext";

type Props = {
  session: Session;
};

const GET_CLASS = gql`
  query getClass($id: String!) {
    class(id: $id) {
      id
      name
      subject
      assignments {
        id
        assignmentID
        name
        teacherID
        classID
      }
    }
  }
`;

const ClassComp: PageComponent<Props> = ({ session }) => {
  const router = useRouter();
  const { data, error, loading } = useQuery<Query, QueryClassArgs>(GET_CLASS, {
    variables: {
      id: router.query.id as string,
    },
  });
  const { dispatch } = useAppContext();
  const role = session.role;

  useEffect(() => {
    if (!data?.class && !loading) {
      router.replace("/home");
    }
    if (data && data.class && data.class.id && data.class.name) {
      dispatch({
        type: "SET_SELECTED_CLASS",
        payload: {
          id: data.class.id,
          name: data.class.name,
        },
      });
    }
  }, [data?.class?.id, data?.class?.name, loading]);

  const renderHeaderContent = (_class: Class) => {
    if (role === "student") {
      return (
        <>
          <Text
            size="lg"
            style={{
              flex: 1,
            }}
          >
            {_class.name}
          </Text>
        </>
      );
    }

    if (role === "teacher") {
      return (
        <>
          <Text
            size="lg"
            style={{
              flex: 1,
            }}
          >
            {_class.name}
          </Text>
          <ActionIcon variant="hover">
            <GearIcon />
          </ActionIcon>
        </>
      );
    }

    return null;
  };

  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return <p>Error while loading class...</p>;
  }

  if (!data || !data.class) return null;

  const _class = data.class;

  return (
    <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
      <Header
        height={55}
        padding="md"
        style={{
          position: "sticky",
        }}
        zIndex={1}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
          }}
        >
          {renderHeaderContent(_class)}
        </div>
      </Header>
    </MediaQuery>
  );
  // }
};

ClassComp.auth = true;

export default ClassComp;
