import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUpdatePassword } from "./useUpdatePassword";
import { PasswordUpdateType } from "./userTypes";

const UpdatePasswordForm = () => {
  const { register, handleSubmit, formState, getValues, reset } =
    useForm<PasswordUpdateType>();
  const { errors } = formState;

  const { isUpdatingPassword, updatePassword } = useUpdatePassword();

  const onSubmit: SubmitHandler<PasswordUpdateType> = (data) => {
    updatePassword(data, { onSuccess: () => reset() });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Current Password"
        error={errors?.passwordCurrent?.message}
      >
        <Input
          type="password"
          id="passwordCurrent"
          autoComplete="current-password"
          disabled={isUpdatingPassword}
          {...register("passwordCurrent", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        label="New password (min 8 chars)"
        error={errors?.passwordNew?.message}
      >
        <Input
          type="password"
          id="passwordNew"
          autoComplete="new-password"
          disabled={isUpdatingPassword}
          {...register("passwordNew", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm new password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdatingPassword}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().passwordNew === value || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow>
        <>
          <Button onClick={() => reset()} type="reset" variation="secondary">
            Cancel
          </Button>
          <Button disabled={isUpdatingPassword}>Update password</Button>
        </>
      </FormRow>
    </Form>
  );
};

export default UpdatePasswordForm;
