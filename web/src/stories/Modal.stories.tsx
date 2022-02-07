import { useRef, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { useOutsideClick } from "../hooks/useOutsideClick";
import { Modal } from "../ui/Modal";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

export default {
  title: "Modal",
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => {
  const [isOpen, setIsOpen] = useState(true);
  const modalRef = useRef<any>();

  useOutsideClick(modalRef, () => setIsOpen(false));

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle modal</button>
      <Modal {...args} ref={modalRef} isOpen={isOpen}>
        <p className="mb-2">New class</p>
        <Input placeholder="enter class name" />
        <Input className="my-2" placeholder="enter class period" />
        <div className="flex justify-end mt-2">
          <Button
            variant="accent"
            size="small"
            className="mr-2"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" size="small">
            Create
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export const MyModal = Template.bind({});

// MyModal.args = {
//   isOpen: true,
// };
