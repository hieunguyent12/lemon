import { MutationResult } from "@apollo/client";
import {
  Paper,
  useMantineTheme,
  TextInput,
  Button,
  Group,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { useState } from "react";

import { Class } from "../../graphql/generated";
import { ModalType } from "../AppContainer";

type Props = {
  modalType: ModalType | "";
  createClass: (name: string, subject: string) => void;
  createAssignment: (name: string) => void;
  createClassResult: MutationResult<Class>;
};

const NewItemModalForm: React.FC<Props> = ({
  modalType,
  createClass,
  createAssignment,
  createClassResult,
}) => {
  const theme = useMantineTheme();
  const classForm = useForm({
    initialValues: {
      className: "",
      subject: "",
    },
  });

  const assignmentForm = useForm({
    initialValues: {
      assignmentName: "",
    },
  });

  const renderForm = () => {
    if (modalType === "class" && createClass) {
      return (
        <form
          onSubmit={classForm.onSubmit((values) =>
            createClass(values.className, values.subject)
          )}
        >
          <LoadingOverlay visible={createClassResult.loading} />
          <TextInput
            required
            label="Class name"
            {...classForm.getInputProps("className")}
          />
          <TextInput
            label="Subject"
            {...classForm.getInputProps("subject")}
            mt="sm"
          />
          <Group position="right" mt="xl">
            <Button
              variant="gradient"
              gradient={{ from: "grape", to: "pink", deg: 35 }}
              type="submit"
            >
              Create
            </Button>
          </Group>
        </form>
      );
    }
    if (modalType === "assignment") {
      return (
        <form
          onSubmit={assignmentForm.onSubmit((values) =>
            createAssignment(values.assignmentName)
          )}
        >
          <LoadingOverlay visible={createClassResult.loading} />
          <TextInput
            required
            label="Assignment name"
            {...assignmentForm.getInputProps("assignmentName")}
          />
          <Group position="right" mt="xl">
            <Button
              variant="gradient"
              gradient={{ from: "grape", to: "pink", deg: 35 }}
              type="submit"
            >
              Create
            </Button>
          </Group>
        </form>
      );
    }
    return null;
  };

  return (
    <Paper
      style={{
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      }}
    >
      {renderForm()}
    </Paper>
  );
};

export default NewItemModalForm;
