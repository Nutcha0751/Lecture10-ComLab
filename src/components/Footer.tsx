import { FooterProps } from "@/libs/types";

export default function Footer(props: FooterProps) {
  return (
    <div className="mt-3">
      <p className="text-secondary text-center">
        Copyright © {props.year} {props.fullName} {props.studentId}
      </p>
    </div>
  );
}
