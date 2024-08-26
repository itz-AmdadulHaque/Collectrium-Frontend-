import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { createCollectionSchema } from "../utils/formValidator";
import { Button, FileInput, Label } from "flowbite-react";

const CreateCollection = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createCollectionSchema),
    defaultValues: {
      image: null,
      custom_string1_state: false,
      custom_string1_name: null,
      custom_string2_state: false,
      custom_string2_name: null,
      custom_string3_state: false,
      custom_string3_name: null,

      custom_int1_state: false,
      custom_int1_name: null,
      custom_int2_state: false,
      custom_int2_name: null,
      custom_int3_state: false,
      custom_int3_name: null,

      custom_multi1_state: false,
      custom_multi1_name: null,
      custom_multi2_state: false,
      custom_multi2_name: null,
      custom_multi3_state: false,
      custom_multi3_name: null,
    },
  });

  const onSubmit = (data) => console.log(data);

  const customStringFields = watch([
    "custom_string1_state",
    "custom_string2_state",
    "custom_string3_state",
  ]);
  const customIntFields = watch([
    "custom_int1_state",
    "custom_int2_state",
    "custom_int3_state",
  ]);
  const customMultiFields = watch([
    "custom_multi1_state",
    "custom_multi2_state",
    "custom_multi3_state",
  ]);

  const handleAddCustomField = (type) => {
    for (let i = 1; i <= 3; i++) {
      const stateField = `custom_${type}${i}_state`;
      if (!watch(stateField)) {
        setValue(stateField, true);
        break;
      }
    }
  };
  const handleCancelCustomField = (type, index) => {
    setValue(`custom_${type}${index + 1}_state`, false);
    setValue(`custom_${type}${index + 1}_name`, null);
  };
  return (
    <div className="container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="py-2 flex flex-col gap-2 sm:w-[80%] mx-auto"
      >
        <h1 className="text-center text-2xl font-semibold pb-2 border-slate-600 dark:border-white border-b-2">
          Create Collection
        </h1>
        <div className="grid sm:grid-flow-col gap-2 sm:gap-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              type="text"
              {...register("name")}
              className="w-full rounded-md px-2 py-1 dark:bg-slate-800"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Category</label>
            <input
              type="text"
              {...register("category")}
              className="w-full rounded-md px-2 py-1 dark:bg-slate-800"
            />
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>
        </div>
        <div>
          <div className="">
            <label className="text-sm font-semibold">Upload Image (Optional) </label>
          </div>
          <FileInput id="file-upload" {...register("image")} onChange={(e)=> setValue("image", e.target.files[0])} />
        </div>
        <div>
          <label className="text-sm font-medium">Description</label>
          <textarea
            type="text"
            rows="3"
            {...register("description")}
            className="w-full rounded-md px-2 py-1 dark:bg-slate-800"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <p className="font-semibold text-lg text-center">
          Add Custom fields for items (optional)
        </p>
        {/* Buttons to Add Custom Fields */}
        <div className="flex flex-wrap justify-center gap-2">
          <Button.Group>
            <Button color="dark" onClick={() => handleAddCustomField("string")}>
              Add Text
            </Button>
            <Button color="dark" onClick={() => handleAddCustomField("int")}>
              Add Integer
            </Button>
            <Button color="dark" onClick={() => handleAddCustomField("multi")}>
              Add Multiline
            </Button>
          </Button.Group>
        </div>

        {/* Custom String Fields */}
        {customStringFields.map(
          (state, index) =>
            state && (
              <div key={`custom_string${index + 1}`} className="flex flex-col">
                <label className="text-sm font-medium">Custom String</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    {...register(`custom_string${index + 1}_name`)}
                    className="flex-grow rounded-md px-2 py-1 dark:bg-slate-800"
                  />
                  <Button
                    color="failure"
                    className="my-auto"
                    onClick={() => handleCancelCustomField("string", index)}
                  >
                    Cancel
                  </Button>
                </div>
                {errors[`custom_string${index + 1}_name`] && (
                  <p className="text-red-500 text-sm">
                    {errors[`custom_string${index + 1}_name`].message}
                  </p>
                )}
              </div>
            )
        )}

        {/* Custom Integer Fields */}
        {customIntFields.map(
          (state, index) =>
            state && (
              <div key={`custom_int${index + 1}`} className="flex flex-col">
                <label className="text-sm font-medium">Custom Integer</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    {...register(`custom_int${index + 1}_name`)}
                    className="flex-grow rounded-md px-2 py-1 dark:bg-slate-800"
                  />
                  <Button
                    color="failure"
                    className="my-auto"
                    onClick={() => handleCancelCustomField("int", index)}
                  >
                    Cancel
                  </Button>
                </div>
                {errors[`custom_int${index + 1}_name`] && (
                  <p className="text-red-500 text-sm">
                    {errors[`custom_int${index + 1}_name`].message}
                  </p>
                )}
              </div>
            )
        )}

        {/* Custom Multiline Fields */}
        {customMultiFields.map(
          (state, index) =>
            state && (
              <div key={`custom_multi${index + 1}`} className="flex flex-col">
                <label className="text-sm font-medium">Custom Multiline</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    {...register(`custom_multi${index + 1}_name`)}
                    className="flex-grow rounded-md px-2 py-1 dark:bg-slate-800"
                  />
                  <Button
                    color="failure"
                    className="my-auto"
                    onClick={() => handleCancelCustomField("multi", index)}
                  >
                    Cancel
                  </Button>
                </div>
                {errors[`custom_multi${index + 1}_name`] && (
                  <p className="text-red-500 text-sm">
                    {errors[`custom_multi${index + 1}_name`].message}
                  </p>
                )}
              </div>
            )
        )}
        <Button type="submit" color="blue">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateCollection;
