import { useState } from "react";

import Button from "../../ui/Button";
import { FileInput, FileInputLabel } from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";
import toast from "react-hot-toast";
import SpinnerMini from "../../ui/SpinnerMini";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const { updateUser, isUpdating } = useUpdateUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);
  const [imageName, setImageName] = useState("عکسی انتخاب نشده");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (avatar === null) {
      if (currentFullName === fullName)
        return toast.error("لطفا یک نام جدید وارد کنید!");
    }
    if (!fullName) return toast.error("لطفا کادر نام را خالی نگذارید!");
    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  };

  const handleCancel = () => {
    setFullName(currentFullName);
    setAvatar(null);
    setImageName("عکسی انتخاب نشده");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="آدرس ایمیل">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="نام و نام خانوادگی">
        <Input
          type="text"
          value={fullName}
          disabled={isUpdating}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </FormRow>
      <FormRow wantLabel={false} label="عکس آواتار">
        <FileInput
          id="avatar"
          accept="image/*"
          disabled={isUpdating}
          onChange={(e) => {
            setAvatar(e.target.files[0]);
            setImageName(e.target.files[0].name);
            // imageField.onChange(e);
            // handleChange(e);
          }}
          // disabled={isWorking}
          // {...imageField}
        />
        <div>
          <FileInputLabel htmlFor="avatar" disabled={isUpdating}>
            انتخاب عکس
          </FileInputLabel>
          <span>{imageName}</span>
        </div>
      </FormRow>
      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          onClick={handleCancel}
          disabled={isUpdating}
        >
          لغو
        </Button>
        <Button disabled={isUpdating}>
          {isUpdating ? <SpinnerMini /> : "بروزرسانی حساب"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
