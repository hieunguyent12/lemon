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

import { Class, Maybe } from "../../graphql/generated";
import { ModalType } from "../AppContainer";

type Props = {
  modalType: ModalType | "";
  editClass: (newName: string, newSubject: string) => void;
  editingClass: Class;
};

const EditItemForm: React.FC<Props> = ({
  modalType,
  editClass,
  editingClass,
}) => {
  const theme = useMantineTheme();
  const classForm = useForm({
    initialValues: {
      className: editingClass.name || "",
      subject: editingClass.subject || "",
    },
  });

  const assignmentForm = useForm({
    initialValues: {
      assignmentName: "",
    },
  });

  const renderForm = () => {
    if (modalType === "class" && editClass) {
      return (
        <form
          onSubmit={classForm.onSubmit((values) =>
            editClass(values.className, values.subject)
          )}
        >
          {/* <LoadingOverlay visible={createClassResult.loading} /> */}
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
              Edit
            </Button>
          </Group>
        </form>
      );
    }
    if (modalType === "assignment") {
      return (
        <form
        // onSubmit={assignmentForm.onSubmit((values) =>
        //   createAssignment(values.assignmentName)
        // )}
        >
          {/* <LoadingOverlay visible={createClassResult.loading} /> */}
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
              Edit
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

export default EditItemForm;
