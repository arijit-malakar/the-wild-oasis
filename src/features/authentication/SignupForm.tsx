import type { UserType } from "./authType";
import { useForm, type SubmitHandler } from "react-hook-form";

import { useSignup } from "./useSignup";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

interface SignupFormInput extends UserType {
  passwordConfirm: string;
}

const SignupForm = () => {
  const { signup, isPending } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } =
    useForm<SignupFormInput>();
  const { errors } = formState;

  const onSubmit: SubmitHandler<SignupFormInput> = ({
    fullName,
    email,
    password,
  }) => {
    signup(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isPending}
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isPending}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please enter a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isPending}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs to be at least 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isPending}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords needs to match",
          })}
        />
      </FormRow>

      <FormRow>
        <>
          <Button
            $variation="secondary"
            type="reset"
            onClick={() => reset()}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button disabled={isPending}>Create new user</Button>
        </>
      </FormRow>
    </Form>
  );
};

export default SignupForm;
