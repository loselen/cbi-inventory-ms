"use client";

import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { useDashboard } from "./dashboard.hook";
import { Spinner } from "@/components/ui/spinner";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Dashboard() {
  const { logout, isLoggingOut, logoutError } = useDashboard();

  return (
    <Container>
      <h1>Hello this is dashboard</h1>
      <Button
        onClick={() => {
          logout();
        }}
        disabled={isLoggingOut}
      >
        {isLoggingOut ? <Spinner /> : "Logout"}
      </Button>
      {logoutError && (
        <Card className="text-destructive">
          <CardHeader>
            <CardTitle>Logout Error</CardTitle>
            <CardDescription>{logoutError.message}</CardDescription>
          </CardHeader>
        </Card>
      )}
    </Container>
  );
}
