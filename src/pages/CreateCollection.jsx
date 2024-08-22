import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { createCollectionSchema } from "../utils/formValidator";
import { Button } from "flowbite-react";

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
  console.log(customStringFields);
  console.log("Errors???", errors);
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
      <h1>create collection</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div>
          <label className="block mb-2 text-sm font-medium">Name</label>
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
          <label className="block mb-2 text-sm font-medium">Description</label>
          <input
            type="text"
            {...register("description")}
            className="w-full rounded-md px-2 py-1 dark:bg-slate-800"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Category</label>
          <input
            type="text"
            {...register("category")}
            className="w-full rounded-md px-2 py-1 dark:bg-slate-800"
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>
        <p>Add Custom field for items</p>

        {/* Buttons to Add Custom Fields */}
        <div className="flex space-x-2">
          <Button
            
            onClick={() => handleAddCustomField("string")}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add String
          </Button>
          <Button
            
            onClick={() => handleAddCustomField("int")}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Add Integer
          </Button>
          <Button
            
            onClick={() => handleAddCustomField("multi")}
            className="px-4 py-2 bg-purple-500 text-white rounded"
          >
            Add Multiline
          </Button>
        </div>

        {/* Custom String Fields */}
        {customStringFields.map(
          (state, index) =>
            state && (
              <div
                key={`custom_string${index + 1}`}
                className="flex items-center space-x-2"
              >
                <div className="flex-1">
                  <label className="block mb-2 text-sm font-medium">
                    Custom String {index + 1}
                  </label>
                  <input
                    type="text"
                    {...register(`custom_string${index + 1}_name`)}
                    className="w-full rounded-md px-2 py-1 dark:bg-slate-800"
                  />
                  {errors[`custom_string${index + 1}_name`] && (
                    <p className="text-red-500 text-sm">
                      {errors[`custom_string${index + 1}_name`].message}
                    </p>
                  )}
                </div>
                <Button
                  
                  onClick={() => handleCancelCustomField("string", index)}
                  className="my-auto px-4 py-2 bg-red-500 text-white rounded"
                >
                  Cancel
                </Button>
              </div>
            )
        )}
        {/* Custom Integer Fields */}
        {customIntFields.map(
          (state, index) =>
            state && (
              <div
                key={`custom_int${index + 1}`}
                className="flex items-center space-x-2"
              >
                <div className="flex-1">
                  <label className="block mb-2 text-sm font-medium">
                    Custom Integer {index + 1}
                  </label>
                  <input
                    type="text"
                    {...register(`custom_int${index + 1}_name`)}
                    className="w-full rounded-md px-2 py-1 dark:bg-slate-800"
                  />
                  {errors[`custom_int${index + 1}_name`] && (
                    <p className="text-red-500 text-sm">
                      {errors[`custom_int${index + 1}_name`].message}
                    </p>
                  )}
                </div>
                <Button
                  type="Button"
                  onClick={() => handleCancelCustomField("int", index)}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Cancel
                </Button>
              </div>
            )
        )}

        {/* Custom Multiline Fields */}
        {customMultiFields.map(
          (state, index) =>
            state && (
              <div
                key={`custom_multi${index + 1}`}
                className="flex items-center space-x-2"
              >
                <div className="flex-1">
                  <label className="block mb-2 text-sm font-medium">
                    Custom Multiline {index + 1}
                  </label>
                  <input
                    type="text"
                    {...register(`custom_multi${index + 1}_name`)}
                    className="w-full rounded-md px-2 py-1 dark:bg-slate-800"
                  />
                  {errors[`custom_multi${index + 1}_name`] && (
                    <p className="text-red-500 text-sm">
                      {errors[`custom_multi${index + 1}_name`].message}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleCancelCustomField("multi", index)}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Cancel
                </button>
              </div>
            )
        )}

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateCollection;
