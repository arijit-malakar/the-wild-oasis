import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { CabinType } from "./cabinTypes";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

interface CreateCabinFormProps {
  cabinToEdit?: CabinType;
  onCloseModal?: () => void;
}

const CreateCabinForm: React.FC<CreateCabinFormProps> = ({
  cabinToEdit = { _id: "" },
  onCloseModal,
}) => {
  const { _id: editId, ...editValues } = cabinToEdit;
  const isFormEditable = Boolean(editId);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<CabinType>({
    defaultValues: isFormEditable ? editValues : {},
  });

  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const isMutating = isCreating || isEditing;

  const onSubmit: SubmitHandler<CabinType> = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isFormEditable) {
      editCabin(
        { id: editId as string, newCabin: { ...data, image } },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else
      createCabin(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isMutating}
          {...register("name", { required: "Cabin name is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isMutating}
          {...register("maxCapacity", {
            required: "Max capacity is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isMutating}
          {...register("regularPrice", {
            required: "Cabin price is required",
            min: {
              value: 1,
              message: "Price should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isMutating}
          defaultValue={0}
          {...register("discount", {
            required: "Discount is required",
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          defaultValue=""
          disabled={isMutating}
          {...register("description", {
            required: "Description for cabin is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isFormEditable ? false : "Cabin image is required",
          })}
        />
      </FormRow>

      <FormRow>
        <>
          <Button variation="secondary" type="reset" onClick={onCloseModal}>
            Cancel
          </Button>
          <Button disabled={isMutating}>
            {isFormEditable ? "Edit cabin" : "Create new cabin"}
          </Button>
        </>
      </FormRow>
    </Form>
  );
};

export default CreateCabinForm;
