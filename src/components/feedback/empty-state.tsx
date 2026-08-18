import { Empty } from "antd";

interface EmptyStateProps {
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  description = "موردی برای نمایش وجود ندارد",
  action,
}: EmptyStateProps) {
  return <Empty description={description}>{action}</Empty>;
}
