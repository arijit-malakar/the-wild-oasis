import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";
import { UserType } from "./userTypes";

const UpdateUserDataForm = () => {
  const { user } = useUser();
  const { fullName: currentFullName, email } = user as UserType;

  const { isUpdatingUser, updateUser } = useUpdateUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState<File | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    updateUser({ fullName, photo: avatar });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdatingUser}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => e.target.files && setAvatar(e.target.files[0])}
          disabled={isUpdatingUser}
        />
      </FormRow>
      <FormRow>
        <>
          <Button type="reset" variation="secondary" disabled={isUpdatingUser}>
            Cancel
          </Button>
          <Button disabled={isUpdatingUser}>Update account</Button>
        </>
      </FormRow>
    </Form>
  );
};

export default UpdateUserDataForm;
