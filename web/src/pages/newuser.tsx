import {
  Button,
  Container,
  Text,
  SegmentedControl,
  TextInput,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNotifications } from "@mantine/notifications";

import { MutationUpdateUserArgs, User } from "../graphql/generated";

import { PageComponent } from "../types";
import { Session } from "next-auth";

type Props = {
  session: Session;
};

const NEW_USER = gql`
  mutation updateUser($userId: String!, $name: String, $role: String) {
    updateUser(userId: $userId, name: $name, role: $role) {
      name
    }
  }
`;

export type ExtendPageComponent<T> = {
  newUserPage: boolean;
} & PageComponent<T>;

const NewUser: ExtendPageComponent<Props> = ({ session }) => {
  const [updateUser, { error, loading, data }] =
    useMutation<User, MutationUpdateUserArgs>(NEW_USER);

  const [role, setRole] = useState("teacher");
  const form = useForm({
    initialValues: {
      name: "",
    },

    validationRules: {
      name: (value) => /^[a-zA-Z\s]+$/.test(value),
    },
  });
  const notifications = useNotifications();

  const onSubmit = (values: { name: string }) => {
    if (!session.userId) {
      return;
    }

    updateUser({
      variables: {
        name: values.name,
        role,
        userId: session.userId,
      },
    }).catch(() => {});
  };

  useEffect(() => {
    if (error) {
      notifications.showNotification({
        title: "Something went wrong 🤕",
        message: "Please try again.",
        color: "red",
        autoClose: false,
      });
    }

    // if we get data back, that means the request is successful
    if (data) {
      notifications.showNotification({
        title: "Success! 🎉",
        message: "Redirecting you to your home page...",
        color: "green",
        autoClose: false,
      });

      setTimeout(() => {
        // use this instead of next/router to make sure that our session is updated properly
        document.location.href = "/home";
      }, 1000);
    }
  }, [error, data]);

  return (
    <Container>
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <Group direction="column" spacing={0} my="lg">
          <Text size="lg" weight={500}>
            Welcome 👋
          </Text>
          <Text size="md">Before we start, tell us a little about you.</Text>
        </Group>

        <TextInput
          label="What is your name?"
          required
          id="name-input"
          placeholder="Your name"
          {...form.getInputProps("name")}
          // onChange={(e) => setName(e.target.value)}
          mb="md"
        />

        <Group direction="column" spacing={2}>
          <Text size="sm">What is your role?</Text>
          <SegmentedControl
            value={role}
            onChange={setRole}
            data={[
              { label: "Teacher", value: "teacher" },
              { label: "Student", value: "student" },
            ]}
          />
        </Group>
        <Button type="submit" mt="md" loading={loading}>
          Continue
        </Button>
      </form>
    </Container>
  );
};

NewUser.auth = true;
NewUser.newUserPage = true;

export default NewUser;
