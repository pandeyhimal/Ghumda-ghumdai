// import React, { useMemo, useState, FormEvent, useRef } from "react";
// import { useContent } from "@/contexts/ContentContext";
// import { useToast } from "@/hooks/use-toast";
// import { getAllProvinces, getDistrictNamesByProvince, getLocalLevelsByDistrict } from "@/data/nepalAdministrativeDivision";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Mountain } from "lucide-react";
// import { useLanguage } from "@/contexts/LanguageContext";
// import LocationPicker from "@/components/LocationPicker";
// import { ContentFormData, Location } from "@/types";
// import { API_BASE } from "@/lib/utils";


// const AddContentForm: React.FC = () => {
//   const { addContent, currentUser, isLoggedIn } = useContent();
//   const { toast } = useToast();
//   const { t } = useLanguage();

//   const [formData, setFormData] = useState<ContentFormData>({
//     title: "",
//     description: "",
//     fullDescription: "",
//     category: "places",
//     province: "",
//     district: "",
//     municipality: "",
//     ward: "",
//     image: "",
//     rating: 0,
//     reviewCount: 0,
//     tips: [""],
//     location: null,
//     bestTime: "",
//     price: "",
//     difficulty: "",
//   });

//   const [imageUrls, setImageUrls] = useState<string>("");
//   const [uploadedImages, setUploadedImages] = useState<string[]>([]);
//   const [isUploading, setIsUploading] = useState<boolean>(false);
//   const inputRef = useRef<HTMLInputElement | null>(null);
//   const [tags, setTags] = useState<string[]>([]);
//   const [tagInput, setTagInput] = useState<string>("");
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   const provinces = useMemo(() => getAllProvinces(), []);
//   const districts = useMemo(
//     () => (formData.province ? getDistrictNamesByProvince(formData.province) : []),
//     [formData.province]
//   );
//   const localLevels = useMemo(
//     () => (formData.province && formData.district ? getLocalLevelsByDistrict(formData.province, formData.district) : []),
//     [formData.province, formData.district]
//   );

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleTipChange = (index: number, value: string) => {
//     const updated = [...formData.tips];
//     updated[index] = value;
//     setFormData((prev) => ({ ...prev, tips: updated }));
//   };

//   const addTipField = () => {
//     setFormData((prev) => ({ ...prev, tips: [...prev.tips, ""] }));
//   };

//   const handleProvinceChange = (value: string) => {
//     setFormData((prev) => ({ ...prev, province: value, district: "", municipality: "" }));
//   };

//   const handleDistrictChange = (value: string) => {
//     setFormData((prev) => ({ ...prev, district: value, municipality: "" }));
//   };

//   const handleMunicipalityChange = (value: string) => {
//     setFormData((prev) => ({ ...prev, municipality: value }));
//   };

//   const handleLocationChange = (location: Location | null) => {
//     setFormData((prev) => ({ ...prev, location }));
//   };

//   const onFilesSelected = async (files: FileList | null) => {
//     if (!files || files.length === 0) return;
//     const token = localStorage.getItem("ghumda-token");
//     if (!token) {
//       toast({ title: "Login required", description: "Please login to upload images.", variant: "destructive" });
//       return;
//     }
//     try {
//       setIsUploading(true);
//       const form = new FormData();
//       Array.from(files).forEach((file) => form.append("images", file));
//       const res = await fetch(`${API_BASE}/api/content/upload`, {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//         body: form,
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data?.message || "Upload failed");
//       const urls = (data.urls || []) as string[];
//       setUploadedImages((prev) => [...prev, ...urls]);
//       if (!formData.image && urls[0]) {
//         setFormData((prev) => ({ ...prev, image: urls[0] }));
//       }
//       toast({ title: "Uploaded", description: `${urls.length} image(s) uploaded` });
//     } catch (error) {
//       toast({ title: "Upload failed", description: "Please try again.", variant: "destructive" });
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     onFilesSelected(e.dataTransfer.files);
//   };

//   const onBrowse = () => inputRef.current?.click();

//   const addTag = () => {
//     const clean = tagInput.trim();
//     if (!clean) return;
//     if (tags.includes(clean)) return;
//     setTags((prev) => [...prev, clean]);
//     setTagInput("");
//   };

//   const removeTag = (t: string) => {
//     setTags((prev) => prev.filter((x) => x !== t));
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     if (!isLoggedIn || !currentUser) {
//       toast({
//         title: "You must be logged in to add content",
//         description: "Please log in and try again.",
//         variant: "destructive",
//       });
//       return;
//     }

//     try {
//       // Validate location data if provided
//       if (formData.location) {
//         if (typeof formData.location.lat !== 'number' || typeof formData.location.lng !== 'number') {
//           toast({ 
//             title: "Invalid location coordinates", 
//             description: "Please select a valid location using the map or location picker.", 
//             variant: "destructive" 
//           });
//           return;
//         }
//         if (!formData.location.address || formData.location.address.trim() === '') {
//           toast({ 
//             title: "Location address required", 
//             description: "Please provide a valid address for the selected location.", 
//             variant: "destructive" 
//           });
//           return;
//         }
//       }

//       const wardNum = Number(formData.ward);
//       if (formData.ward && (Number.isNaN(wardNum) || wardNum < 1 || wardNum > 12)) {
//         toast({ title: "Invalid ward", description: "Ward must be between 1 and 12.", variant: "destructive" });
//         return;
//       }
//       if (formData.price && Number.isNaN(Number(formData.price))) {
//         toast({ title: "Invalid price", description: "Price must be numeric.", variant: "destructive" });
//         return;
//       }

//       const contentData = {
//         ...formData,
//         image: formData.image || uploadedImages[0] || "",
//         images: uploadedImages.slice(1),
//         tags,
//         author: currentUser._id,
//       };

//       console.log("Submitting content data:", contentData);
//       console.log("Location data being sent:", contentData.location);

//       await addContent(contentData);
//       toast({ title: "Content added successfully!", description: "Your content has been submitted." });

//       setFormData({
//         title: "",
//         description: "",
//         fullDescription: "",
//         category: "places",
//         province: "",
//         district: "",
//         municipality: "",
//         ward: "",
//         image: "",
//         rating: 0,
//         reviewCount: 0,
//         tips: [""],
//         location: null,
//         bestTime: "",
//         price: "",
//         difficulty: "",
//       });
//       setImageUrls("");
//       setUploadedImages([]);
//       setTags([]);
//     } catch (err) {
//       const e = err as { type?: string; errors?: Array<{ field: string; message: string }>; message?: string };
//       if (e?.type === "validation" && Array.isArray(e.errors)) {
//         const fieldToError: Record<string, string> = {};
//         e.errors.forEach((ve) => {
//           if (ve?.field && ve?.message && !fieldToError[ve.field]) fieldToError[ve.field] = ve.message;
//         });
//         setErrors(fieldToError);
//         toast({ title: "Please fix the highlighted fields", description: "Some inputs are invalid.", variant: "destructive" });
//         return;
//       }
//       toast({ title: "Failed to add content", description: e?.message || "Please try again later.", variant: "destructive" });
//     }
//   };

//   return (
//     <div className="mx-auto ">
   
//       <div className="max-w-5xl mx-auto mb-6 px-4 mt-10 ">
//         <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Add Content</h1>
//         <p className="text-muted-foreground">Share new places, food, and traditions with the community.</p>
//       </div>

//       <form onSubmit={handleSubmit} className="max-w-5xl mx-auto mb-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <Card className="lg:col-span-2">
//           <CardHeader>
//             <CardTitle>Details</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium">Title</label>
//               <Input name="title" value={formData.title} onChange={(e) => { setErrors((p) => ({ ...p, title: "" })); handleChange(e); }} required placeholder="Enter an engaging title..." className={errors.title ? "border-red-500 focus-visible:ring-red-500" : undefined} />
//               {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Short Description</label>
//               <Textarea name="description" value={formData.description} onChange={(e) => { setErrors((p) => ({ ...p, description: "" })); handleChange(e); }} rows={2} required placeholder="Write a brief, compelling description..." className={errors.description ? "border-red-500 focus-visible:ring-red-500" : undefined} />
//               {errors.description && <p className="text-xs text-red-600 mt-1">{errors.description}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Full Description</label>
//               <Textarea name="fullDescription" value={formData.fullDescription} onChange={(e) => { setErrors((p) => ({ ...p, fullDescription: "" })); handleChange(e); }} rows={4} required placeholder="Provide detailed information about this place, food, or tradition..." className={errors.fullDescription ? "border-red-500 focus-visible:ring-red-500" : undefined} />
//               {errors.fullDescription && <p className="text-xs text-red-600 mt-1">{errors.fullDescription}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Category</label>
//               <Select value={formData.category} onValueChange={(v) => { setErrors((p) => ({ ...p, category: "" })); setFormData((p) => ({ ...p, category: v })); }} required>
//                 <SelectTrigger className={errors.category ? "border-red-500 focus-visible:ring-red-500" : undefined}>
//                   <SelectValue placeholder="Select category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="places">Places</SelectItem>
//                   <SelectItem value="food">Food</SelectItem>
//                   <SelectItem value="traditions">Traditions</SelectItem>
//                 </SelectContent>
//               </Select>
//               {errors.category && <p className="text-xs text-red-600 mt-1">{errors.category}</p>}
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium">Province</label>
//                 <Select value={formData.province} onValueChange={(v) => { setErrors((p) => ({ ...p, province: "" })); handleProvinceChange(v); }}required>
//                   <SelectTrigger className={errors.province ? "border-red-500 focus-visible:ring-red-500" : undefined}>
//                     <SelectValue placeholder="Select province" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {provinces.map((p) => (
//                       <SelectItem key={p} value={p}>{p}</SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 {errors.province && <p className="text-xs text-red-600 mt-1">{errors.province}</p>}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium">District</label>
//                 <Select value={formData.district} onValueChange={(v) => { setErrors((p) => ({ ...p, district: "" })); handleDistrictChange(v); }}required>
//                   <SelectTrigger className={errors.district ? "border-red-500 focus-visible:ring-red-500" : undefined}>
//                     <SelectValue placeholder="Select district" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {districts.map((d) => (
//                       <SelectItem key={d} value={d}>{d}</SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 {errors.district && <p className="text-xs text-red-600 mt-1">{errors.district}</p>}
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium">Municipality</label>
//                 <Select value={formData.municipality} onValueChange={(v) => { setErrors((p) => ({ ...p, municipality: "" })); handleMunicipalityChange(v); }}required>
//                   <SelectTrigger className={errors.municipality ? "border-red-500 focus-visible:ring-red-500" : undefined}>
//                     <SelectValue placeholder="Select municipality/local level" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {localLevels.map((l) => (
//                       <SelectItem key={l.name} value={l.name}>{l.name}</SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 {errors.municipality && <p className="text-xs text-red-600 mt-1">{errors.municipality}</p>}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium">Ward</label>
//                 <Input
//                   name="ward"
//                   value={formData.ward}
//                   onChange={(e) => {
//                     const val = e.target.value.replace(/[^0-9]/g, "");
//                     setFormData((prev) => ({ ...prev, ward: val }));
//                     setErrors((p) => ({ ...p, ward: "" }));
//                   }}
//                   placeholder="Enter ward number (1-12)"
//                   required
//                   className={errors.ward ? "border-red-500 focus-visible:ring-red-500" : undefined}
//                 />
//                 {errors.ward && <p className="text-xs text-red-600 mt-1">{errors.ward}</p>}
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Tips</label>
//               {formData.tips.map((tip, index) => (
//                 <Input key={index} value={tip} onChange={(e) => handleTipChange(index, e.target.value)} required className="mb-2" />
//               ))}
//               <Button type="button" variant="link" onClick={addTipField} className="p-0">
//                 + Add another tip
//               </Button>
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Location</label>
//               <LocationPicker
//                 value={formData.location}
//                 onChange={handleLocationChange}
//                 required={false}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Tags</label>
//               <div className="flex items-center gap-2">
//                 <Input
//                   placeholder="e.g. trekking, street-food, heritage"
//                   // required
//                   value={tagInput}
//                   onChange={(e) => setTagInput(e.target.value)}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter") {
//                       e.preventDefault();
//                       addTag();
//                     }
//                   }}
//                 />
//                 <Button type="button" variant="secondary" onClick={addTag}>Add</Button>
//               </div>
//               {tags.length > 0 && (
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {tags.map((t) => (
//                     <span key={t} className="inline-flex items-center gap-1 bg-muted text-foreground px-2 py-1 rounded-full text-xs">
//                       {t}
//                       <button type="button" className="ml-1 text-muted-foreground hover:text-foreground" onClick={() => removeTag(t)}>×</button>
//                     </span>
//                   ))}
//                 </div>
//               )}
//               <p className="text-xs text-muted-foreground mt-1">Add descriptive tags to improve search and filtering.</p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <label className="block text-sm font-medium">Best Time</label>
//                 <Input name="bestTime" value={formData.bestTime} onChange={handleChange} required placeholder="e.g. March to May" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium">Price</label>
//                 <Input
//                   name="price"
//                   value={formData.price}
//                   placeholder="Estimated price"
//                   // onChange={(e) => {
//                   //   const val = e.target.value.replace(/[^0-9]/g, "");
//                   //   setFormData((prev) => ({ ...prev, price: val }));
//                   //   setErrors((p) => ({ ...p, price: "" }));
//                   // }}
//                   onChange={handleChange} required
//                   className={errors.price ? "border-red-500 focus-visible:ring-red-500" : undefined}
//                 />
//               {errors.price && <p className="text-xs text-red-600 mt-1">{errors.price}</p>}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium">Difficulty</label>
//                 <Input name="difficulty" value={formData.difficulty} onChange={handleChange} required placeholder="e.g. Easy, Moderate, Hard" />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Primary Image URL (optional)</label>
//               <Input name="image" value={formData.image} onChange={handleChange} placeholder="https://..." required />
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="lg:col-span-1">
//           <CardHeader>
//             <CardTitle>Images</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div
//               className={`border-2 border-dashed rounded-lg p-6 text-center ${isUploading ? "opacity-70" : ""}`}
//               onDragOver={(e) => e.preventDefault()}
//               onDrop={onDrop}
//             >
//               <p className="mb-2">Drag & drop images here</p>
//               <p className="text-sm text-muted-foreground mb-4">or</p>
//               <input ref={inputRef} type="file" accept="image/png, image/jpeg, image/jpg" multiple className="hidden" onChange={(e) => onFilesSelected(e.target.files)} />
//               <Button type="button" variant="outline" onClick={onBrowse} disabled={isUploading}>
//                 {isUploading ? "Uploading..." : "Browse files"}
//               </Button>
//             </div>

//             {uploadedImages.length > 0 && (
//               <div>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                   {uploadedImages.map((url, idx) => (
//                     <div key={url} className="relative group">
//                       <img src={url} alt="upload" className="w-full h-24 object-cover rounded" />
//                       <button
//                         type="button"
//                         className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100"
//                         onClick={() => setUploadedImages((prev) => prev.filter((u) => u !== url))}
//                       >
//                         Remove
//                       </button>
//                       {idx === 0 && (
//                         <span className="absolute bottom-1 left-1 bg-primary text-white text-[10px] px-1.5 py-0.5 rounded">Cover</span>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//                 <p className="text-xs text-muted-foreground mt-2">First image will be used as the cover.</p>
//               </div>
//             )}

//             <Button type="submit" className="w-full" disabled={isUploading}>Publish Content</Button>
//           </CardContent>
//         </Card>
//       </form>

//       {/* Footer */}
//       <footer className="bg-primary text-primary-foreground py-12">
//         <div className="container mx-auto px-4 text-center">
//           <div className="flex items-center justify-center space-x-2 mb-4">
//             <div className="w-8 h-8 bg-primary-foreground rounded-full flex items-center justify-center">
//               {/* <span className="text-primary font-bold text-sm">G</span> */}
//                         <Mountain className="h-8 w-8 text-primary" />
//             </div>

//             <h3 className="text-xl font-bold">Ghumda <span className="text-secondary">Ghumdai</span> </h3>
//           </div>
//           <p className="text-primary-foreground/80 mb-4">
//             {t('footer.description')}
//           </p>
//           <p className="text-primary-foreground/60 text-sm">© 2024 Ghumda <span className="text-secondary">Ghumdai</span>. Made By <span className="font-semibold">Team Sanothimi</span>  for Nepal tourism.
//             {/* {t('footer.copyright')} */}
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default AddContentForm;














import React, { useMemo, useState, FormEvent, useRef } from "react";
import { useContent } from "@/contexts/ContentContext";
import { useToast } from "@/hooks/use-toast";
import { getAllProvinces, getDistrictNamesByProvince, getLocalLevelsByDistrict } from "@/data/nepalAdministrativeDivision";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Mountain, Upload, X, MapPin, ImageIcon, Plus, Trash2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LocationPicker from "@/components/LocationPicker";
import { ContentFormData, Location } from "@/types";

const AddContentForm: React.FC = () => {
  const { addContent, currentUser, isLoggedIn } = useContent();
  const { toast } = useToast();
  const { t } = useLanguage();

  const [formData, setFormData] = useState<ContentFormData>({
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
    location: null,
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

  const removeTipField = (index: number) => {
    const updated = formData.tips.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, tips: updated.length > 0 ? updated : [""] }));
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

  const handleLocationChange = (location: Location | null) => {
    setFormData((prev) => ({ ...prev, location }));
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
      // Validate location data if provided
      if (formData.location) {
        if (typeof formData.location.lat !== 'number' || typeof formData.location.lng !== 'number') {
          toast({ 
            title: "Invalid location coordinates", 
            description: "Please select a valid location using the map or location picker.", 
            variant: "destructive" 
          });
          return;
        }
        if (!formData.location.address || formData.location.address.trim() === '') {
          toast({ 
            title: "Location address required", 
            description: "Please provide a valid address for the selected location.", 
            variant: "destructive" 
          });
          return;
        }
      }

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

      console.log("Submitting content data:", contentData);
      console.log("Location data being sent:", contentData.location);

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
        location: null,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center">
                <Mountain className="h-7 w-7 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-blue-600 bg-clip-text text-transparent mb-2">
              Share Your Discovery
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Help fellow travelers discover amazing places, delicious food, and rich traditions across Nepal
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information Card */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
                <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <ImageIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                {/* Title and Category Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                    <Input 
                      name="title" 
                      value={formData.title} 
                      onChange={(e) => { 
                        setErrors((p) => ({ ...p, title: "" })); 
                        handleChange(e); 
                      }} 
                      required 
                      placeholder="Enter an engaging title..."
                      className={`h-11 ${errors.title ? "border-red-500 focus-visible:ring-red-500" : "border-gray-300"}`}
                    />
                    {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(v) => { 
                        setErrors((p) => ({ ...p, category: "" })); 
                        setFormData((p) => ({ ...p, category: v })); 
                      }} 
                      required
                    >
                      <SelectTrigger className={`h-11 ${errors.category ? "border-red-500" : "border-gray-300"}`}>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="places">🏔️ Places</SelectItem>
                        <SelectItem value="food">🍜 Food</SelectItem>
                        <SelectItem value="traditions">🎭 Traditions</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.category && <p className="text-xs text-red-600 mt-1">{errors.category}</p>}
                  </div>
                </div>

                {/* Descriptions */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Short Description *</label>
                    <Textarea 
                      name="description" 
                      value={formData.description} 
                      onChange={(e) => { 
                        setErrors((p) => ({ ...p, description: "" })); 
                        handleChange(e); 
                      }} 
                      rows={2} 
                      required 
                      placeholder="Write a brief, compelling description..."
                      className={`resize-none ${errors.description ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.description && <p className="text-xs text-red-600 mt-1">{errors.description}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Description *</label>
                    <Textarea 
                      name="fullDescription" 
                      value={formData.fullDescription} 
                      onChange={(e) => { 
                        setErrors((p) => ({ ...p, fullDescription: "" })); 
                        handleChange(e); 
                      }} 
                      rows={4} 
                      required 
                      placeholder="Provide detailed information about this place, food, or tradition..."
                      className={`resize-none ${errors.fullDescription ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.fullDescription && <p className="text-xs text-red-600 mt-1">{errors.fullDescription}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Information Card */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
                <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-green-600" />
                  </div>
                  Location Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                {/* Province and District */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Province *</label>
                    <Select 
                      value={formData.province} 
                      onValueChange={(v) => { 
                        setErrors((p) => ({ ...p, province: "" })); 
                        handleProvinceChange(v); 
                      }}
                      required
                    >
                      <SelectTrigger className={`h-11 ${errors.province ? "border-red-500" : "border-gray-300"}`}>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">District *</label>
                    <Select 
                      value={formData.district} 
                      onValueChange={(v) => { 
                        setErrors((p) => ({ ...p, district: "" })); 
                        handleDistrictChange(v); 
                      }}
                      required
                    >
                      <SelectTrigger className={`h-11 ${errors.district ? "border-red-500" : "border-gray-300"}`}>
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

                {/* Municipality and Ward */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Municipality *</label>
                    <Select 
                      value={formData.municipality} 
                      onValueChange={(v) => { 
                        setErrors((p) => ({ ...p, municipality: "" })); 
                        handleMunicipalityChange(v); 
                      }}
                      required
                    >
                      <SelectTrigger className={`h-11 ${errors.municipality ? "border-red-500" : "border-gray-300"}`}>
                        <SelectValue placeholder="Select municipality" />
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ward *</label>
                    <Input
                      name="ward"
                      value={formData.ward}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, "");
                        setFormData((prev) => ({ ...prev, ward: val }));
                        setErrors((p) => ({ ...p, ward: "" }));
                      }}
                      placeholder="Enter ward number (1-12)"
                      required
                      className={`h-11 ${errors.ward ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.ward && <p className="text-xs text-red-600 mt-1">{errors.ward}</p>}
                  </div>
                </div>

                {/* Map Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Map Location</label>
                  <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                    <LocationPicker
                      value={formData.location}
                      onChange={handleLocationChange}
                      required={false}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Click on the map to mark the exact location</p>
                </div>
              </CardContent>
            </Card>

            {/* Additional Details Card */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b">
                <CardTitle className="text-xl font-semibold text-gray-800">Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                {/* Tips Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Helpful Tips</label>
                  <div className="space-y-3">
                    {formData.tips.map((tip, index) => (
                      <div key={index} className="flex gap-2">
                        <Input 
                          value={tip} 
                          onChange={(e) => handleTipChange(index, e.target.value)} 
                          required 
                          placeholder={`Tip ${index + 1}...`}
                          className="h-11 border-gray-300"
                        />
                        {formData.tips.length > 1 && (
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="icon"
                            className="h-11 w-11 border-gray-300 hover:bg-red-50 hover:border-red-300"
                            onClick={() => removeTipField(index)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={addTipField} 
                      className="w-full h-11 border-dashed border-gray-300 hover:bg-blue-50"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Another Tip
                    </Button>
                  </div>
                </div>

                {/* Tags Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                  <div className="flex gap-2 mb-3">
                    <Input
                      placeholder="e.g. trekking, street-food, heritage"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                      className="h-11 border-gray-300"
                    />
                    <Button 
                      type="button" 
                      onClick={addTag}
                      className="h-11 px-6"
                    >
                      Add
                    </Button>
                  </div>
                  
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="secondary" 
                          className="px-3 py-1.5 bg-blue-100 text-blue-800 hover:bg-blue-200"
                        >
                          {tag}
                          <button 
                            type="button" 
                            className="ml-2 hover:text-blue-600" 
                            onClick={() => removeTag(tag)}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Best Time to Visit *</label>
                    <Input 
                      name="bestTime" 
                      value={formData.bestTime} 
                      onChange={handleChange} 
                      required 
                      placeholder="e.g. March to May"
                      className="h-11 border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price (NPR)</label>
                    <Input
                      name="price"
                      value={formData.price}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, "");
                        setFormData((prev) => ({ ...prev, price: val }));
                        setErrors((p) => ({ ...p, price: "" }));
                      }}
                      placeholder="e.g. 500"
                      className={`h-11 ${errors.price ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.price && <p className="text-xs text-red-600 mt-1">{errors.price}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level *</label>
                    <Input 
                      name="difficulty" 
                      value={formData.difficulty} 
                      onChange={handleChange} 
                      required 
                      placeholder="e.g. Easy, Moderate, Hard"
                      className="h-11 border-gray-300"
                    />
                  </div>
                </div>

                {/* Primary Image URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Primary Image URL (optional)</label>
                  <Input 
                    name="image" 
                    value={formData.image} 
                    onChange={handleChange} 
                    placeholder="https://example.com/image.jpg" 
                    className="h-11 border-gray-300"
                  />
                  <p className="text-xs text-gray-500 mt-1">Or upload images using the panel on the right</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Image Upload - Right Side */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm sticky top-6">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
                <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Upload className="h-5 w-5 text-purple-600" />
                  </div>
                  Images
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Upload Area */}
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                    isUploading 
                      ? "border-blue-300 bg-blue-50" 
                      : "border-gray-300 hover:border-blue-400 hover:bg-blue-50/50"
                  }`}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={onDrop}
                >
                  <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <ImageIcon className="h-6 w-6 text-gray-500" />
                  </div>
                  <p className="text-gray-600 font-medium mb-2">
                    {isUploading ? "Uploading..." : "Drag & drop images here"}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    PNG, JPG, JPEG up to 10MB
                  </p>
                  <input 
                    ref={inputRef} 
                    type="file" 
                    accept="image/png, image/jpeg, image/jpg" 
                    multiple 
                    className="hidden" 
                    onChange={(e) => onFilesSelected(e.target.files)} 
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={onBrowse} 
                    disabled={isUploading}
                    className="w-full h-11"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {isUploading ? "Uploading..." : "Browse Files"}
                  </Button>
                </div>

                {/* Uploaded Images Grid */}
                {uploadedImages.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-3">Uploaded Images ({uploadedImages.length})</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {uploadedImages.map((url, idx) => (
                        <div key={url} className="relative group">
                          <img 
                            src={url} 
                            alt={`Upload ${idx + 1}`} 
                            className="w-full h-24 object-cover rounded-lg border border-gray-200" 
                          />
                          <button
                            type="button"
                            className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                            onClick={() => setUploadedImages((prev) => prev.filter((u) => u !== url))}
                          >
                            <X className="h-3 w-3" />
                          </button>
                          {idx === 0 && (
                            <Badge className="absolute bottom-1 left-1 bg-green-600 hover:bg-green-600 text-white text-xs px-2 py-0.5">
                              Cover Photo
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-3 text-center">
                      First image will be used as the cover photo
                    </p>
                  </div>
                )}

                <Separator />

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg font-semibold bg-blue shadow-lg" 
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Upload className="h-5 w-5 mr-2" />
                      Publish Content
                    </>
                  )}
                </Button>

                {/* Progress Indicator */}
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Share your discovery with the community
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>

      {/* Footer */}
      {/* <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white py-16 mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <Mountain className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold">
                Ghumda <span className="text-yellow-400">Ghumdai</span>
              </h3>
            </div>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto text-lg">
              {t('footer.description') || 'Discover the beauty of Nepal through authentic local experiences and hidden gems.'}
            </p>
            <div className="border-t border-gray-700 pt-6">
              <p className="text-gray-400 text-sm">
                © 2024 Ghumda <span className="text-yellow-400">Ghumdai</span>. 
                Made with <span className="font-semibold text-white">Team Sanothimi</span> for Nepal tourism.
              </p>
            </div>
          </div>
        </div>
      </footer> */}

       <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 flex items-center justify-center">
              {/* <span className="text-primary font-bold text-sm">G</span> */}
                        <Mountain className="h-8 w-8 text-white" />
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