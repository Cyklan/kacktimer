import Link from "next/link";
import { FC, HTMLProps } from "react";
import { ArrowLeft } from "tabler-icons-react";

interface BackButtonProps extends HTMLProps<HTMLAnchorElement> {
  to: string;
}

const BackButton: FC<BackButtonProps> = ({ to, ...props }) => {
  return <Link href={to}>
    <a {...props} className={"fixed top-10 left-10"}>
      <ArrowLeft />
    </a>
  </Link>;
};

export default BackButton;