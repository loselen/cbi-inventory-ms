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

import { loginSchema, LoginInput } from "./auth.types";
import { useAuth } from "./auth.hook";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

export function Auth() {
  const { login, isLoggingIn, loginError } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginInput) => {
    login(data);
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
            <Button type="submit" disabled={isLoggingIn}>
              {isLoggingIn ? <Spinner /> : "Submit"}
            </Button>
          </Field>

          {loginError && (
            <Card className="text-destructive">
              <CardHeader>
                <CardTitle>Login Error</CardTitle>
                <CardDescription>{loginError.message}</CardDescription>
              </CardHeader>
            </Card>
          )}
        </FieldSet>
      </form>
    </Container>
  );
}
