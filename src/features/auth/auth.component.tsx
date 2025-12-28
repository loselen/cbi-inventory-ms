import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Field,
  FieldError,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

import { loginFormSchema, LoginFormData } from "./auth.types";
import { useLogin } from "./auth.hook";

export function LoginForm() {
  const { submitLogin, isLoading, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    submitLogin(data);
  };

  return (
    <Container className="p-16 min-h-dvh items-center flex">
      <form onSubmit={handleSubmit(onSubmit)} className="flex-1">
        <FieldSet>
          <FieldLegend>Login</FieldLegend>

          <Field>
            <Input
              {...register("username")}
              type="text"
              placeholder="Username"
              autoComplete="off"
            />
            {errors.username && (
              <FieldError>{errors.username.message}</FieldError>
            )}
          </Field>

          <Field>
            <Input
              {...register("password")}
              type="password"
              placeholder="Password"
              autoComplete="off"
            />
            {errors.password && (
              <FieldError>{errors.password.message}</FieldError>
            )}
          </Field>

          <Field>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Spinner /> : "Submit"}
            </Button>
          </Field>

          {error && (
            <Card className="text-destructive">
              <CardHeader>
                <CardTitle>Login Error</CardTitle>
                <CardDescription>{error.message}</CardDescription>
              </CardHeader>
            </Card>
          )}
        </FieldSet>
      </form>
    </Container>
  );
}
