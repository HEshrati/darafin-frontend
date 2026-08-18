import { Alert } from "antd";

interface ErrorAlertProps {
  message?: string;
  description?: string;
}

export function ErrorAlert({
  message = "خطا",
  description = "عملیات با خطا مواجه شد. لطفاً دوباره تلاش کنید.",
}: ErrorAlertProps) {
  return <Alert type="error" showIcon message={message} description={description} />;
}
