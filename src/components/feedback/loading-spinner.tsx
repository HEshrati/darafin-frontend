import { Spin } from "antd";

interface LoadingSpinnerProps {
  tip?: string;
  fullPage?: boolean;
}

export function LoadingSpinner({ tip = "در حال بارگذاری...", fullPage = false }: LoadingSpinnerProps) {
  const spinner = <Spin size="large" tip={tip} />;

  if (!fullPage) {
    return spinner;
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
      }}
    >
      {spinner}
    </div>
  );
}
