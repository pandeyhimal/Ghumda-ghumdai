import React, { useState, FormEvent } from "react";
import { useContent } from "@/contexts/ContentContext"; // ContentContext hook
import { useAuth } from "@/contexts/AuthContext"; // to get logged-in user
import { toast, useToast } from "@/hooks/use-toast";

const AddContentForm: React.FC = () => {
  const { addContent } = useContent();
  const { user } = useAuth();
    const { toast } = useToast();


  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fullDescription: "",
    category: "places",
    province: "",
    district: "",
    municipality: "",
    ward: "",
    rating: 0,
    reviewCount: 0,
    tips: [""],
    bestTime: "",
    price: "",
    difficulty: "",
  });

  const [images, setImages] = useState<File[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTipChange = (index: number, value: string) => {
    const updated = [...formData.tips];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, tips: updated }));
  };

  const addTipField = () => {
    setFormData((prev) => ({ ...prev, tips: [...prev.tips, ""] }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!user) {
    //   toast("You must be logged in to add content");
      toast({
        title: "You must be logged in to add content",
        description: "Please log in and try again.",
        variant: "destructive",
      });
      return;
    }

    try {
      const contentData = {
        ...formData,
        images, // we’ll send images as File[] and let backend handle upload
        author: user.id, // auto-attach logged-in user
      };

      await addContent(contentData);
    //   toast.success("Content added successfully ✅");
      toast({
        title: "Content added successfully!",
        description: "Your content has been submitted.",
      });

      // reset form
      setFormData({
        title: "",
        description: "",
        fullDescription: "",
        category: "places",
        province: "",
        district: "",
        municipality: "",
        ward: "",
        rating: 0,
        reviewCount: 0,
        tips: [""],
        bestTime: "",
        price: "",
        difficulty: "",
      });
      setImages([]);
    } catch (err) {
    //   toast.error("Failed to add content ❌");
        toast({
            title: "Failed to add content",
            description: "Please try again later.",
            variant: "destructive",
        });
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-4">Add New Content</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Short Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={2}
            required
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Full Description */}
        <div>
          <label className="block text-sm font-medium">Full Description</label>
          <textarea
            name="fullDescription"
            value={formData.fullDescription}
            onChange={handleChange}
            rows={4}
            required
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="places">Places</option>
            <option value="food">Food</option>
            <option value="traditions">Traditions</option>
          </select>
        </div>

        {/* Location */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Province</label>
            <input
              type="text"
              name="province"
              value={formData.province}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">District</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Municipality</label>
            <input
              type="text"
              name="municipality"
              value={formData.municipality}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Ward</label>
            <input
              type="text"
              name="ward"
              value={formData.ward}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>
        </div>

        {/* Tips */}
        <div>
          <label className="block text-sm font-medium">Tips</label>
          {formData.tips.map((tip, index) => (
            <input
              key={index}
              type="text"
              value={tip}
              onChange={(e) => handleTipChange(index, e.target.value)}
              className="w-full border rounded-lg p-2 mb-2"
            />
          ))}
          <button
            type="button"
            onClick={addTipField}
            className="text-blue-600 text-sm"
          >
            + Add another tip
          </button>
        </div>

        {/* Extra Fields */}
        <div>
          <label className="block text-sm font-medium">Best Time</label>
          <input
            type="text"
            name="bestTime"
            value={formData.bestTime}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Difficulty</label>
          <input
            type="text"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium">Upload Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full"
          />
          {images.length > 0 && (
            <p className="text-sm text-gray-600 mt-1">
              {images.length} file(s) selected
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddContentForm;
