import React, { useRef, useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useOutsideAlerter(ref: any, cb: () => void) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        cb();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, cb]);
}

/**
 * Component that alerts if you click outside of it
 */
export function OutsideAlerter(props: any) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props.callback);

  return (
    <div ref={wrapperRef} className={`flex w-min`} style={props.style}>
      {props.children}
    </div>
  );
}
