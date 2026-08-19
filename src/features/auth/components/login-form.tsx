"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, App, Button, Card } from "antd";
import { Controller, useForm } from "react-hook-form";

import {
  Form,
  FormItem,
  Input,
  Link,
  Paragraph,
  PasswordInput,
  Title,
} from "@/components/ui/antd";

import { login } from "../api";
import { loginSchema, type LoginFormValues } from "../schemas";

export function LoginForm() {
  const { message } = App.useApp();
  const {
    control,
    handleSubmit,
    clearErrors,
    resetField,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    clearErrors("root");

    try {
      const user = await login(values);
      resetField("password");
      message.success(`خوش آمدید، ${user.username}`);
    } catch (error) {
      setError("root", {
        type: "server",
        message: error instanceof Error ? error.message : "ورود انجام نشد. لطفاً دوباره تلاش کنید.",
      });
    }
  };

  return (
    <Card variant="borderless" style={{ boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)" }}>
      <Title level={3} style={{ marginTop: 0, marginBottom: 8 }}>
        ورود به سامانه
      </Title>
      <Paragraph type="secondary" style={{ marginBottom: 24 }}>
      لطفا اطلاعات سرپرست را وارد کنید.
      </Paragraph>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Form component="div" layout="vertical" requiredMark={false}>
          {errors.root?.message ? (
            <Alert
              type="error"
              showIcon
              message={errors.root.message}
              style={{ marginBottom: 16 }}
            />
          ) : null}

          <FormItem
            label="نام کاربری"
            validateStatus={errors.username ? "error" : undefined}
            help={errors.username?.message}
          >
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  size="large"
                  prefix={<UserOutlined />}
                  placeholder="نام کاربری"
                  autoComplete="username"
                />
              )}
            />
          </FormItem>

          <FormItem
            label="رمز عبور"
            validateStatus={errors.password ? "error" : undefined}
            help={errors.password?.message}
          >
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <PasswordInput
                  {...field}
                  size="large"
                  prefix={<LockOutlined />}
                  placeholder="رمز عبور"
                  autoComplete="current-password"
                />
              )}
            />
          </FormItem>

          <FormItem style={{ marginBottom: 12 }}>
            <Button type="primary" htmlType="submit" size="large" block loading={isSubmitting}>
              ورود
            </Button>
          </FormItem>

          <Link href="#" style={{ fontSize: 13 }}>
            فراموشی رمز عبور
          </Link>
        </Form>
      </form>
    </Card>
  );
}
