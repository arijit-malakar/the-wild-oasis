import { useState } from "react";

import { useLogin } from "./useLogin";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";

const LoginForm = () => {
  const [email, setEmail] = useState("arijit@example.com");
  const [password, setPassword] = useState("pass4567");

  const { login, isPending } = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow $type="vertical" label="Email address">
        <Input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
        />
      </FormRow>
      <FormRow $type="vertical" label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isPending}
        />
      </FormRow>
      <FormRow $type="vertical">
        <Button $size="large" disabled={isPending}>
          {!isPending ? "Log in" : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
};

export default LoginForm;
