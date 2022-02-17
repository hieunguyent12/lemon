import { useEffect, useRef, useState } from "react";
import { usePopper } from "react-popper";
import { useOutsideClick } from "./useOutsideClick";

export type Alignment = "start" | "end";
export type BasePlacement = "top" | "right" | "bottom" | "left";
export type AlignedPlacement = `${BasePlacement}-${Alignment}`;
export type Placement = BasePlacement | AlignedPlacement;

type Options = {
  outsideClickCallback: () => void;
  menuPlacement?: Placement;
};

/**
 * Hook that handle drop down menu
 */
export function useDropdownMenu(options: Options) {
  const { outsideClickCallback, menuPlacement = "bottom" } = options;

  const [referenceElement, setReferenceElement] = useState<any>(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: menuPlacement,
    modifiers: [
      {
        name: "offset",
        enabled: true,
        options: {
          offset: [-12, 5],
        },
      },
    ],
  });
  const popperRef = useRef<any>();

  useOutsideClick(popperRef, outsideClickCallback);

  const setRefs = (ref: any) => {
    setReferenceElement(ref);
    popperRef.current = ref;
  };

  return {
    setRefs,
    setPopperElement,
    attributes,
    styles,
  };
}
