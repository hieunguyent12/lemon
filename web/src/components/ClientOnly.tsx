// https://www.joshwcomeau.com/react/the-perils-of-rehydration/#two-pass-rendering
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

const ClientOnly: React.FC<Props> = ({ children, ...props }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div {...props}>{children}</div>;
};

export default ClientOnly;
