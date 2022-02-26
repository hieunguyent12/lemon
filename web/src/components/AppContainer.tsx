import {
  AppShell,
  Navbar,
  Header,
  Text,
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
import { useForm } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Session } from "next-auth";
import { PlusIcon } from "@modulz/radix-icons";

import NavbarItem from "./NavbarItem";
import { Query, Class, MutationCreateClassArgs } from "../graphql/generated";
import ClassList from "./class/ClassList";
import ActionMenu from "./ActionMenu";
import NewItemModalForm from "./NewItemModalForm";
import { useAppContext } from "../context/AppContext";

type Props = {
  children: React.ReactNode;
  session: Session;
};

export type ModalType = "class" | "assignment";

const GET_CLASSES = gql`
  query Classes {
    classes {
      id
      name
    }
  }
`;

const CREATE_CLASS = gql`
  mutation createClass($name: String!, $subject: String) {
    createClass(name: $name, subject: $subject) {
      id
      name
    }
  }
`;

const useMenuStyles = createStyles((theme) => ({
  root: {
    flex: 1,
  },
  // track: {
  //   width: "100%",
  // },
}));

const AppContainer: React.FC<Props> = ({ children, session }) => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [opened, setOpened] = useState(false);
  const [modalType, setModalType] = useState<ModalType | "">("");
  const theme = useMantineTheme();
  const { classes: menuClasses } = useMenuStyles();
  const { state: appContextState } = useAppContext();

  const role = session.role;

  const { data, error, loading } = useQuery<Query>(GET_CLASSES);
  const [createClass, createClassResult] = useMutation<
    Class,
    MutationCreateClassArgs
  >(CREATE_CLASS, {
    // update apollo cache after we send a create class mutation
    update(cache, { data }) {
      const newClass: Class = (data as any).createClass;

      cache.modify({
        fields: {
          classes(existingClasses = []) {
            const newClassRef = cache.writeFragment({
              data: newClass,
              fragment: gql`
                fragment NewClass on Class {
                  id
                  name
                }
              `,
            });
            return [...existingClasses, newClassRef];
          },
        },
      });
    },
  });

  const onOpenModal = (type: ModalType) => {
    setModalType(type);
    setModalOpened(true);
  };

  const onCreateClass = (name: string, subject: string) => {
    createClass({
      variables: {
        name,
        subject,
      },
    }).catch(() => {});
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
    if (role === "student") {
      return (
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
      );
    }
    if (role === "teacher") {
      return (
        <Group>
          <SegmentedControl
            size="sm"
            data={[
              { label: "Classes", value: "class" },
              { label: "Assignments", value: "assignment" },
            ]}
            // fullWidth
            // classNames={menuClasses}
            style={{
              flexGrow: 1,
            }}
          />
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
                  el.style.zIndex = "0";
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
                  classes={data?.classes}
                  role={session.role}
                  hideBurgerMenu={hideBurgerMenu}
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
        title="Create a class"
      >
        <NewItemModalForm
          modalType={modalType}
          createClass={onCreateClass}
          createAssignment={onCreateAssigment}
          createClassResult={createClassResult}
        />
      </Modal>
    </>
  );
};

export default AppContainer;
