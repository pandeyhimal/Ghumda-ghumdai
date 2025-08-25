import React, { useMemo, useState, FormEvent, useRef } from "react";
import { useContent } from "@/contexts/ContentContext";
import { useToast } from "@/hooks/use-toast";
import { getAllProvinces, getDistrictNamesByProvince, getLocalLevelsByDistrict } from "@/data/nepalAdministrativeDivision";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mountain } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";


const AddContentForm: React.FC = () => {
  const { addContent, currentUser, isLoggedIn } = useContent();
  const { toast } = useToast();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fullDescription: "",
    category: "places",
    province: "",
    district: "",
    municipality: "",
    ward: "",
    image: "",
    rating: 0,
    reviewCount: 0,
    tips: [""],
    bestTime: "",
    price: "",
    difficulty: "",
  });

  const [imageUrls, setImageUrls] = useState<string>("");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const provinces = useMemo(() => getAllProvinces(), []);
  const districts = useMemo(
    () => (formData.province ? getDistrictNamesByProvince(formData.province) : []),
    [formData.province]
  );
  const localLevels = useMemo(
    () => (formData.province && formData.district ? getLocalLevelsByDistrict(formData.province, formData.district) : []),
    [formData.province, formData.district]
  );

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

  const handleProvinceChange = (value: string) => {
    setFormData((prev) => ({ ...prev, province: value, district: "", municipality: "" }));
  };

  const handleDistrictChange = (value: string) => {
    setFormData((prev) => ({ ...prev, district: value, municipality: "" }));
  };

  const handleMunicipalityChange = (value: string) => {
    setFormData((prev) => ({ ...prev, municipality: value }));
  };

  const onFilesSelected = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const token = localStorage.getItem("ghumda-token");
    if (!token) {
      toast({ title: "Login required", description: "Please login to upload images.", variant: "destructive" });
      return;
    }
    try {
      setIsUploading(true);
      const form = new FormData();
      Array.from(files).forEach((file) => form.append("images", file));
      const res = await fetch("http://localhost:5000/api/content/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Upload failed");
      const urls = (data.urls || []) as string[];
      setUploadedImages((prev) => [...prev, ...urls]);
      if (!formData.image && urls[0]) {
        setFormData((prev) => ({ ...prev, image: urls[0] }));
      }
      toast({ title: "Uploaded", description: `${urls.length} image(s) uploaded` });
    } catch (error) {
      toast({ title: "Upload failed", description: "Please try again.", variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onFilesSelected(e.dataTransfer.files);
  };

  const onBrowse = () => inputRef.current?.click();

  const addTag = () => {
    const clean = tagInput.trim();
    if (!clean) return;
    if (tags.includes(clean)) return;
    setTags((prev) => [...prev, clean]);
    setTagInput("");
  };

  const removeTag = (t: string) => {
    setTags((prev) => prev.filter((x) => x !== t));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn || !currentUser) {
      toast({
        title: "You must be logged in to add content",
        description: "Please log in and try again.",
        variant: "destructive",
      });
      return;
    }

    try {
      const wardNum = Number(formData.ward);
      if (formData.ward && (Number.isNaN(wardNum) || wardNum < 1 || wardNum > 12)) {
        toast({ title: "Invalid ward", description: "Ward must be between 1 and 12.", variant: "destructive" });
        return;
      }
      if (formData.price && Number.isNaN(Number(formData.price))) {
        toast({ title: "Invalid price", description: "Price must be numeric.", variant: "destructive" });
        return;
      }

      const contentData = {
        ...formData,
        image: formData.image || uploadedImages[0] || "",
        images: uploadedImages.slice(1),
        tags,
        author: currentUser._id,
      };

      await addContent(contentData);
      toast({ title: "Content added successfully!", description: "Your content has been submitted." });

      setFormData({
        title: "",
        description: "",
        fullDescription: "",
        category: "places",
        province: "",
        district: "",
        municipality: "",
        ward: "",
        image: "",
        rating: 0,
        reviewCount: 0,
        tips: [""],
        bestTime: "",
        price: "",
        difficulty: "",
      });
      setImageUrls("");
      setUploadedImages([]);
      setTags([]);
    } catch (err) {
      const e = err as { type?: string; errors?: Array<{ field: string; message: string }>; message?: string };
      if (e?.type === "validation" && Array.isArray(e.errors)) {
        const fieldToError: Record<string, string> = {};
        e.errors.forEach((ve) => {
          if (ve?.field && ve?.message && !fieldToError[ve.field]) fieldToError[ve.field] = ve.message;
        });
        setErrors(fieldToError);
        toast({ title: "Please fix the highlighted fields", description: "Some inputs are invalid.", variant: "destructive" });
        return;
      }
      toast({ title: "Failed to add content", description: e?.message || "Please try again later.", variant: "destructive" });
    }
  };

  return (
    <div className="mx-auto ">
   
      <div className="max-w-5xl mx-auto mb-6 px-4 mt-10 ">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Add Content</h1>
        <p className="text-muted-foreground">Share new places, food, and traditions with the community.</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto mb-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Title</label>
              <Input name="title" value={formData.title} onChange={(e) => { setErrors((p) => ({ ...p, title: "" })); handleChange(e); }} required className={errors.title ? "border-red-500 focus-visible:ring-red-500" : undefined} />
              {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Short Description</label>
              <Textarea name="description" value={formData.description} onChange={(e) => { setErrors((p) => ({ ...p, description: "" })); handleChange(e); }} rows={2} required className={errors.description ? "border-red-500 focus-visible:ring-red-500" : undefined} />
              {errors.description && <p className="text-xs text-red-600 mt-1">{errors.description}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Full Description</label>
              <Textarea name="fullDescription" value={formData.fullDescription} onChange={(e) => { setErrors((p) => ({ ...p, fullDescription: "" })); handleChange(e); }} rows={4} required className={errors.fullDescription ? "border-red-500 focus-visible:ring-red-500" : undefined} />
              {errors.fullDescription && <p className="text-xs text-red-600 mt-1">{errors.fullDescription}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Category</label>
              <Select value={formData.category} onValueChange={(v) => { setErrors((p) => ({ ...p, category: "" })); setFormData((p) => ({ ...p, category: v })); }} required>
                <SelectTrigger className={errors.category ? "border-red-500 focus-visible:ring-red-500" : undefined}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="places">Places</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="traditions">Traditions</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && <p className="text-xs text-red-600 mt-1">{errors.category}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Province</label>
                <Select value={formData.province} onValueChange={(v) => { setErrors((p) => ({ ...p, province: "" })); handleProvinceChange(v); }}required>
                  <SelectTrigger className={errors.province ? "border-red-500 focus-visible:ring-red-500" : undefined}>
                    <SelectValue placeholder="Select province" />
                  </SelectTrigger>
                  <SelectContent>
                    {provinces.map((p) => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.province && <p className="text-xs text-red-600 mt-1">{errors.province}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium">District</label>
                <Select value={formData.district} onValueChange={(v) => { setErrors((p) => ({ ...p, district: "" })); handleDistrictChange(v); }}required>
                  <SelectTrigger className={errors.district ? "border-red-500 focus-visible:ring-red-500" : undefined}>
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((d) => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.district && <p className="text-xs text-red-600 mt-1">{errors.district}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Municipality</label>
                <Select value={formData.municipality} onValueChange={(v) => { setErrors((p) => ({ ...p, municipality: "" })); handleMunicipalityChange(v); }}required>
                  <SelectTrigger className={errors.municipality ? "border-red-500 focus-visible:ring-red-500" : undefined}>
                    <SelectValue placeholder="Select municipality/local level" />
                  </SelectTrigger>
                  <SelectContent>
                    {localLevels.map((l) => (
                      <SelectItem key={l.name} value={l.name}>{l.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.municipality && <p className="text-xs text-red-600 mt-1">{errors.municipality}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium">Ward</label>
                <Input
                  name="ward"
                  value={formData.ward}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, "");
                    setFormData((prev) => ({ ...prev, ward: val }));
                    setErrors((p) => ({ ...p, ward: "" }));
                  }}
                  placeholder="1 - 12"
                  required
                  className={errors.ward ? "border-red-500 focus-visible:ring-red-500" : undefined}
                />
                {errors.ward && <p className="text-xs text-red-600 mt-1">{errors.ward}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Tips</label>
              {formData.tips.map((tip, index) => (
                <Input key={index} value={tip} onChange={(e) => handleTipChange(index, e.target.value)} required className="mb-2" />
              ))}
              <Button type="button" variant="link" onClick={addTipField} className="p-0">
                + Add another tip
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium">Tags</label>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="e.g. trekking, street-food, heritage"
                  required
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                />
                <Button type="button" variant="secondary" onClick={addTag}>Add</Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((t) => (
                    <span key={t} className="inline-flex items-center gap-1 bg-muted text-foreground px-2 py-1 rounded-full text-xs">
                      {t}
                      <button type="button" className="ml-1 text-muted-foreground hover:text-foreground" onClick={() => removeTag(t)}>×</button>
                    </span>
                  ))}
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-1">Add descriptive tags to improve search and filtering.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium">Best Time</label>
                <Input name="bestTime" value={formData.bestTime} onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-sm font-medium">Price</label>
                <Input
                  name="price"
                  value={formData.price}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, "");
                    setFormData((prev) => ({ ...prev, price: val }));
                    setErrors((p) => ({ ...p, price: "" }));
                  }}
                  className={errors.price ? "border-red-500 focus-visible:ring-red-500" : undefined}
                />
              {errors.price && <p className="text-xs text-red-600 mt-1">{errors.price}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium">Difficulty</label>
                <Input name="difficulty" value={formData.difficulty} onChange={handleChange} required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Primary Image URL (optional)</label>
              <Input name="image" value={formData.image} onChange={handleChange} placeholder="https://..." required />
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Images</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center ${isUploading ? "opacity-70" : ""}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={onDrop}
            >
              <p className="mb-2">Drag & drop images here</p>
              <p className="text-sm text-muted-foreground mb-4">or</p>
              <input ref={inputRef} type="file" accept="image/png, image/jpeg, image/jpg" multiple className="hidden" onChange={(e) => onFilesSelected(e.target.files)} />
              <Button type="button" variant="outline" onClick={onBrowse} disabled={isUploading}>
                {isUploading ? "Uploading..." : "Browse files"}
              </Button>
            </div>

            {uploadedImages.length > 0 && (
              <div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {uploadedImages.map((url, idx) => (
                    <div key={url} className="relative group">
                      <img src={url} alt="upload" className="w-full h-24 object-cover rounded" />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100"
                        onClick={() => setUploadedImages((prev) => prev.filter((u) => u !== url))}
                      >
                        Remove
                      </button>
                      {idx === 0 && (
                        <span className="absolute bottom-1 left-1 bg-primary text-white text-[10px] px-1.5 py-0.5 rounded">Cover</span>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">First image will be used as the cover.</p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isUploading}>Publish Content</Button>
          </CardContent>
        </Card>
      </form>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-primary-foreground rounded-full flex items-center justify-center">
              {/* <span className="text-primary font-bold text-sm">G</span> */}
                        <Mountain className="h-8 w-8 text-primary" />
            </div>

            <h3 className="text-xl font-bold">Ghumda <span className="text-secondary">Ghumdai</span> </h3>
          </div>
          <p className="text-primary-foreground/80 mb-4">
            {t('footer.description')}
          </p>
          <p className="text-primary-foreground/60 text-sm">© 2024 Ghumda <span className="text-secondary">Ghumdai</span>. Made By <span className="font-semibold">Team Sanothimi</span>  for Nepal tourism.
            {/* {t('footer.copyright')} */}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AddContentForm;
