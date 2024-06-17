import { useState } from "react";

const CreateProductForm = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
  });
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.imageUrl) newErrors.imageUrl = "Image is required";
    return newErrors;
  };

  const createProducts = async (url, data) => {
    try {
      const response = await fetch(`${url}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.log(error);
      return { message: "An error occurred while creating the product." };
    }
  };

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === "image") {
      handleImageChange(files[0], e);
    } else {
      setFormData({ ...formData, [id]: value });
      if (value) setErrors((prevErrors) => ({ ...prevErrors, [id]: null }));
    }
  };

  const handleImageChange = (imageFile, e) => {
    if (
      imageFile &&
      (imageFile.type === "image/png" || imageFile.type === "image/jpeg") &&
      imageFile.size <= 5000000
    ) {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onloadend = () => {
        setFormData((prevData) => ({ ...prevData, imageUrl: reader.result }));
        setErrors((prevErrors) => ({ ...prevErrors, imageUrl: null }));
      };
    } else {
      e.target.value = null;
      setFormData((prevData) => ({ ...prevData, imageUrl: "" }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        imageUrl: "Invalid file type or size",
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    const response = await createProducts(baseUrl, formData);
    setMessage(response.message);
    setIsLoading(false);

    if (!response.message.includes("error")) {
      setFormData({ name: "", description: "", imageUrl: "" });
      e.target.reset();
      setErrors({});
    }
  };

  return (
    <div>
      <h1 className="mb-12 text-center text-3xl font-bold uppercase text-primary">
        Add a Product
      </h1>
      {message && (
        <p className={`mt-3 text-xs font-bold ${message.includes("error") ? "text-red-500" : "text-green-500"}`}>
          {message}
        </p>
      )}
      <form onSubmit={handleFormSubmit} className="m-x-auto w-full">
        <div className="flex flex-col gap-8 sm:flex-row lg:gap-16">
          <div className="lg:w-1/2">
            <div className="form-control w-full">
              <label className="label" htmlFor="name">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                id="name"
                className="input input-bordered w-full"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label" htmlFor="description">
                <span className="label-text">Description</span>
              </label>
              <textarea
                id="description"
                className="textarea textarea-bordered w-full resize-none"
                placeholder="Enter description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
              ></textarea>
              {errors.description && (
                <p className="mt-1 text-xs text-red-500">{errors.description}</p>
              )}
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="form-control w-full">
              <label className="label" htmlFor="image">
                <span className="label-text">Upload an Image:</span>
              </label>
              <input
                type="file"
                id="image"
                className="file-input w-full max-w-xs"
                onChange={handleChange}
                accept="image/png, image/jpg, image/jpeg, image/gif"
              />
              {errors.imageUrl && (
                <p className="mt-1 text-xs text-red-500">{errors.imageUrl}</p>
              )}
            </div>
            {formData.imageUrl && (
              <img
                src={formData.imageUrl}
                alt="Uploaded Preview"
                className="mt-3 w-full max-w-xs"
              />
            )}
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-3" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreateProductForm;
