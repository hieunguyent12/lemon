import {
  AppShell,
  Navbar,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
  Divider,
  Button,
  createStyles,
  Modal,
  SegmentedControl,
  Group,
} from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { useState } from "react";
import { Session } from "next-auth";
import { PlusIcon } from "@modulz/radix-icons";
import { useRouter } from "next/router";

import NavbarItem from "./class/ClassListItem";
import { Class, Maybe } from "../graphql/generated";
import ClassList from "./class/ClassList";
import ActionMenu from "./menu/ActionMenu";
import NewItemModalForm from "./modal/NewItemModalForm";
import EditItemForm from "./modal/EditItemForm";
import { useAppContext } from "../context/AppContext";
import useGetClasses from "../hooks/class/useGetClasses";
import useCreateClass from "../hooks/class/useCreateClass";
import useEditClass from "../hooks/class/useEditClass";
import useDeleteClass from "../hooks/class/useDeleteClass";
import useJoinClass from "../hooks/class/useJoinClass";

type Props = {
  children: React.ReactNode;
  session: Session;
};

export type ModalType = "class" | "assignment" | "join";

function getModalTitle(type: ModalType | "") {
  if (type === "class") {
    return "Create a class";
  }

  if (type === "assignment") {
    return "Create an assignment";
  }

  if (type === "join") {
    return "Join a class";
  }

  return null;
}

const useMenuStyles = createStyles((theme) => ({
  root: {
    flex: 1,
  },
}));

const AppContainer: React.FC<Props> = ({ children, session }) => {
  // this state holds the data for the class that we are currently editing
  const [editingClass, setEditingClass] = useState<Maybe<Class>>(null);

  const [modalType, setModalType] = useState<ModalType | "">("");
  const [modalOpened, setModalOpened] = useState(false);
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const [opened, setOpened] = useState(false);

  const notifications = useNotifications();
  const theme = useMantineTheme();
  const { classes: menuClasses } = useMenuStyles();
  const { state: appContextState } = useAppContext();
  const router = useRouter();

  // Apollo graphql hooks
  const { classes, error, loading } = useGetClasses();
  const { createClass, createClassResult } = useCreateClass();
  const { editClass, editClassResult } = useEditClass();
  const { deleteClass, deleteClassResult } = useDeleteClass();
  const { joinClass, joinClassResult } = useJoinClass();

  const role = session.role;

  const onOpenModal = (type: ModalType) => {
    setModalType(type);
    setModalOpened(true);
  };

  const onOpenEditClassModal = (_class: Maybe<Class>) => {
    setEditingClass(_class);
    setEditModalOpened(true);
    setModalType("class");
  };

  const onCreateClass = (name: string, subject: string) => {
    if (role === "student") return;

    createClass({
      variables: {
        name,
        subject,
      },
    }).catch(() => {});
  };

  const onEditClass = (newName: string, newSubject: string) => {
    if (!editingClass || !newName || role === "student") return;

    // if nothing has changed, do not send a request to edit
    if (newName === editingClass.name && newSubject === editingClass.subject) {
      return;
    }

    editClass({
      variables: {
        id: editingClass.id,
        name: newName,
        subject: newSubject,
      },
    })
      .then((res) => {
        if (res.data) {
          setEditingClass(null);
          notifications.showNotification({
            title: "Success! 🎉",
            message: `Updated ${newName}`,
            color: "green",
          });
        }
      })
      .catch(() => {});
  };

  const onDeleteClass = (id: string | undefined) => {
    if (!id || role === "student") {
      return;
    }

    deleteClass({
      variables: {
        id,
      },
    })
      .then((res: any) => {
        if (res.data) {
          setEditingClass(null);
          notifications.showNotification({
            title: "Successfully deleted class!",
            message: null,
            color: "green",
          });

          // if we are currently in the class that just got deleted, redirect to the home page
          if (window.location.pathname === `/class/${res.data.deleteClass}`) {
            router.replace("/home");
          }
        }
      })
      .catch(() => {});
  };

  const onJoinClass = (code: string) => {
    if (!code || code.length !== 7) return;

    joinClass({
      variables: {
        code,
      },
    })
      .then((res) => {
        if (res.data) {
          notifications.showNotification({
            title: "Successfully joined class!",
            message: null,
            color: "green",
          });
        }
      })
      .catch(() => {});
  };

  const onCreateAssigment = (name: string) => {
    // createClass({
    //   variables: {
    //     name
    //     subject: "English",
    //   },
    // }).catch(() => {});
  };

  const hideBurgerMenu = () => setOpened(false);

  const renderActions = () => {
    const tabs = (
      <SegmentedControl
        size="sm"
        data={[
          { label: "Classes", value: "class" },
          { label: "Assignments", value: "assignment" },
        ]}
        style={{
          flexGrow: 1,
        }}
      />
    );
    if (role === "student") {
      return (
        <Group>
          {tabs}
          <ActionMenu
            control={
              <Button
                fullWidth
                leftIcon={<PlusIcon />}
                variant="gradient"
                gradient={{ from: "grape", to: "pink", deg: 35 }}
                onClick={() => setMenuOpened(!menuOpened)}
              >
                New
              </Button>
            }
            menuClasses={menuClasses}
            menuOpened={menuOpened}
            setMenuOpened={setMenuOpened}
            role={session.role}
            onOpenModal={onOpenModal}
          />
        </Group>
      );
    }
    if (role === "teacher") {
      return (
        <Group>
          {tabs}
          <ActionMenu
            control={
              <Button
                fullWidth
                leftIcon={<PlusIcon />}
                variant="gradient"
                gradient={{ from: "grape", to: "pink", deg: 35 }}
                onClick={() => setMenuOpened(!menuOpened)}
              >
                New
              </Button>
            }
            menuClasses={menuClasses}
            menuOpened={menuOpened}
            setMenuOpened={setMenuOpened}
            role={session.role}
            onOpenModal={onOpenModal}
          />
        </Group>
      );
    }

    return null;
  };

  return (
    <>
      <AppShell
        // navbarOffsetBreakpoint controls when navbar should no longer be offset with padding-left
        navbarOffsetBreakpoint="sm"
        // fixed prop on AppShell will be automatically added to Header and Navbar
        fixed
        navbar={
          <MediaQuery
            smallerThan="sm"
            styles={{
              boxSizing: "border-box",
              paddingTop: "80px",
              position: "fixed",
            }}
          >
            <Navbar
              padding="md"
              // Breakpoint at which navbar will be hidden if hidden prop is true
              hiddenBreakpoint="sm"
              // Hides navbar when viewport size is less than value specified in hiddenBreakpoint
              hidden={!opened}
              // when viewport size is less than theme.breakpoints.sm navbar width is 100%
              // viewport size > theme.breakpoints.sm – width is 300px
              // viewport size > theme.breakpoints.lg – width is 400px
              width={{ sm: 300, lg: 400 }}
              ref={(el) => {
                if (el) {
                  el.style.zIndex = "1";
                }
              }}
            >
              {loading && <p>Loading...</p>}
              {error && <p>Error...</p>}

              <Navbar.Section mb={10}>{renderActions()}</Navbar.Section>
              <Navbar.Section
                grow
                style={{
                  overflowY: "auto",
                }}
              >
                <ClassList
                  classes={classes}
                  role={session.role}
                  hideBurgerMenu={hideBurgerMenu}
                  onOpenEditModal={onOpenEditClassModal}
                  deleteClass={onDeleteClass}
                />
              </Navbar.Section>
              <Divider />
              <Navbar.Section>
                <NavbarItem>{session.user?.name}</NavbarItem>
              </Navbar.Section>
            </Navbar>
          </MediaQuery>
        }
        header={
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Header height={50} padding="md" fixed>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
                {appContextState && appContextState.selectedClass.name}
              </div>
            </Header>
          </MediaQuery>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
            padding: 0,
          },
        })}
      >
        <MediaQuery
          smallerThan="sm"
          styles={{
            marginTop: "70px",
          }}
        >
          <div
            style={{
              position: "relative",
            }}
          >
            {children}
          </div>
        </MediaQuery>
      </AppShell>

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title={getModalTitle(modalType)}
      >
        <NewItemModalForm
          modalType={modalType}
          createClass={onCreateClass}
          joinClass={onJoinClass}
          createAssignment={onCreateAssigment}
          createClassResult={createClassResult}
        />
      </Modal>

      {editingClass && role === "teacher" && (
        <Modal
          opened={editModalOpened}
          onClose={() => setEditModalOpened(false)}
          title="Edit class"
        >
          <EditItemForm
            editingClass={editingClass}
            editClass={onEditClass}
            modalType={modalType}
          />
        </Modal>
      )}
    </>
  );
};

export default AppContainer;
