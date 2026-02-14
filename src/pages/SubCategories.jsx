// // import React, { useState, useEffect } from "react";
// // import { Table, Button, Modal, Form, Spinner } from "react-bootstrap";
// // import { toast } from "react-toastify";
// // import TextEditor from "../components/common/TextEditor";
// // import CustomPagination from "../components/common/CustomPagination";
// // import {
// //   getAllCategories,
// //   getAllSubCategories,
// //   createSubCategory,
// //   updateSubCategory,
// //   deleteSubCategory,
// // } from "../Services/adminService";
// // import { getFullImageUrl } from "../Services/adminService";

// // const SubCategories = () => {
// //   // --- States ---
// //   const [show, setShow] = useState(false);
// //   const [subCategories, setSubCategories] = useState([]);
// //   const [categories, setCategories] = useState([]);
// //   const [loading, setLoading] = useState(false);

// //   // --- Form States ---
// //   const [subCategoryName, setSubCategoryName] = useState("");
// //   const [categoryId, setCategoryId] = useState("");
// //   const [note, setNote] = useState("");
// //   const [icon, setIcon] = useState(null);
// //   const [iconPreview, setIconPreview] = useState("");
// //   const [editId, setEditId] = useState(null);

// //   // --- Pagination States ---
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const itemsPerPage = 10;

// //   // --- Local placeholder image ---
// //   const getPlaceholderImage = () => {
// //     // SVG placeholder - no external dependency
// //     return (
// //       "data:image/svg+xml;base64," +
// //       btoa(`
// //       <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
// //         <rect width="60" height="60" fill="#f8f9fa"/>
// //         <rect x="10" y="10" width="40" height="40" fill="#e9ecef" stroke="#adb5bd" stroke-width="1"/>
// //         <text x="30" y="35" text-anchor="middle" fill="#6c757d" font-family="Arial" font-size="10">No Icon</text>
// //       </svg>
// //     `)
// //     );
// //   };

// //   // --- Fetch Data ---
// //   const fetchData = async () => {
// //     setLoading(true);
// //     try {
// //       const [catRes, subCatRes] = await Promise.all([
// //         getAllCategories(),
// //         getAllSubCategories(),
// //       ]);

// //       if (catRes && catRes.status) {
// //         setCategories(catRes.categories || []);
// //       }

// //       if (subCatRes && subCatRes.status) {
// //         console.log("SubCategories response:", subCatRes); // Debug
// //         setSubCategories(subCatRes.data || []);
// //       }
// //     } catch (error) {
// //       console.error("Error:", error);
// //       toast.error("Failed to load data");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   // --- Handle Icon Upload ---
// //   const handleIconChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       const validTypes = [
// //         "image/jpeg",
// //         "image/jpg",
// //         "image/png",
// //         "image/gif",
// //         "image/webp",
// //       ];
// //       if (!validTypes.includes(file.type)) {
// //         toast.error("Please upload a valid image file (JPEG, PNG, GIF, WebP)");
// //         return;
// //       }

// //       const maxSize = 5 * 1024 * 1024; // 5MB
// //       if (file.size > maxSize) {
// //         toast.error("Image size should be less than 5MB");
// //         return;
// //       }

// //       setIcon(file);
// //       const reader = new FileReader();
// //       reader.onloadend = () => {
// //         setIconPreview(reader.result);
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   // --- Remove Icon ---
// //   const handleRemoveIcon = () => {
// //     setIcon(null);
// //     setIconPreview("");
// //   };

// //   // --- Handlers ---
// //   const handleSave = async () => {
// //     if (!subCategoryName.trim() || (!editId && !categoryId)) {
// //       toast.warning("Category and SubCategory Name are required");
// //       return;
// //     }

// //     try {
// //       const formData = new FormData();
// //       formData.append("subCategoryName", subCategoryName.trim());

// //       if (note) {
// //         formData.append("note", note);
// //       }

// //       if (icon) {
// //         formData.append("icon", icon);
// //       }

// //       let res;
// //       if (editId) {
// //         formData.append("category", categoryId);
// //         res = await updateSubCategory(editId, formData);
// //       } else {
// //         formData.append("category", categoryId);
// //         res = await createSubCategory(formData);
// //       }

// //       if (res && res.status) {
// //         toast.success(
// //           editId ? "Updated Successfully!" : "Created Successfully!",
// //         );
// //         handleClose();
// //         fetchData();
// //       } else {
// //         toast.error(res?.message || "Operation failed");
// //       }
// //     } catch (error) {
// //       console.error("Error saving subcategory:", error);
// //       toast.error(error.message || "Operation failed");
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     if (window.confirm("Are you sure?")) {
// //       try {
// //         const res = await deleteSubCategory(id);
// //         if (res && res.status) {
// //           toast.success("Deleted Successfully!");
// //           fetchData();
// //         }
// //       } catch (error) {
// //         toast.error("Delete failed");
// //       }
// //     }
// //   };

// //   const handleEdit = (sub) => {
// //     setEditId(sub._id);
// //     setSubCategoryName(sub.subCategoryName || "");
// //     setCategoryId(sub.category?._id || "");
// //     setNote(sub.note || "");

// //     if (sub.icon) {
// //       const fullUrl = getFullImageUrl(sub.icon);
// //       console.log("Editing subcategory icon:", sub.icon, "Full URL:", fullUrl); // Debug
// //       setIconPreview(fullUrl);
// //     } else {
// //       setIconPreview("");
// //     }

// //     setShow(true);
// //   };

// //   const handleClose = () => {
// //     setShow(false);
// //     setEditId(null);
// //     setSubCategoryName("");
// //     setCategoryId("");
// //     setNote("");
// //     setIcon(null);
// //     setIconPreview("");
// //   };

// //   // Pagination Logic
// //   const indexOfLastItem = currentPage * itemsPerPage;
// //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// //   const currentItems = subCategories.slice(indexOfFirstItem, indexOfLastItem);

// //   return (
// //     <div className="container-fluid py-4">
// //       <div className="d-flex justify-content-between align-items-center mb-4">
// //         <h2 className="fw-bold">Sub-Category List</h2>
// //         <Button variant="dark" onClick={() => setShow(true)}>
// //           + Create Sub-Category
// //         </Button>
// //       </div>

// //       <div className="bg-white p-3 rounded shadow-sm border">
// //         <Table responsive hover className="mb-0 align-middle">
// //           <thead className="table-light">
// //             <tr>
// //               <th style={{ width: "80px" }}>S.No</th>
// //               <th style={{ width: "100px" }}>Icon</th>
// //               <th>Main Category</th>
// //               <th>Sub-Category Name</th>
// //               <th>Created Date</th>
// //               <th style={{ width: "150px" }}>Action</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {loading ? (
// //               <tr>
// //                 <td colSpan="6" className="text-center py-5">
// //                   <Spinner animation="border" size="sm" />
// //                 </td>
// //               </tr>
// //             ) : currentItems.length > 0 ? (
// //               currentItems.map((sub, index) => {
// //                 const iconUrl = sub.icon
// //                   ? getFullImageUrl(sub.icon)
// //                   : getPlaceholderImage();
// //                 console.log(`Row ${index}:`, sub.icon, "=>", iconUrl); // Debug

// //                 return (
// //                   <tr key={sub._id}>
// //                     <td>
// //                       {String(indexOfFirstItem + index + 1).padStart(2, "0")}
// //                     </td>
// //                     <td>
// //                       <div
// //                         style={{
// //                           width: "60px",
// //                           height: "60px",
// //                           overflow: "hidden",
// //                           borderRadius: "6px",
// //                           backgroundColor: "#f8f9fa",
// //                           border: "1px solid #dee2e6",
// //                         }}>
// //                         <img
// //                           src={iconUrl}
// //                           alt={sub.subCategoryName}
// //                           style={{
// //                             width: "100%",
// //                             height: "100%",
// //                             objectFit: "cover",
// //                           }}
// //                           onError={(e) => {
// //                             e.target.onerror = null;
// //                             e.target.src = getPlaceholderImage();
// //                           }}
// //                         />
// //                       </div>
// //                     </td>
// //                     <td className="text-primary fw-semibold">
// //                       {sub.category?.categoryName || "N/A"}
// //                     </td>
// //                     <td className="fw-bold">{sub.subCategoryName}</td>
// //                     <td>{new Date(sub.createdAt).toLocaleDateString()}</td>
// //                     <td>
// //                       <div className="d-flex gap-2">
// //                         <Button
// //                           variant="outline-primary"
// //                           size="sm"
// //                           onClick={() => handleEdit(sub)}>
// //                           Edit
// //                         </Button>
// //                         <Button
// //                           variant="outline-danger"
// //                           size="sm"
// //                           onClick={() => handleDelete(sub._id)}>
// //                           Delete
// //                         </Button>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 );
// //               })
// //             ) : (
// //               <tr>
// //                 <td colSpan="6" className="text-center py-4">
// //                   No Data Found
// //                 </td>
// //               </tr>
// //             )}
// //           </tbody>
// //         </Table>

// //         {!loading && subCategories.length > 0 && (
// //           <CustomPagination
// //             current={currentPage}
// //             totalItems={subCategories.length}
// //             itemsPerPage={itemsPerPage}
// //             onPageChange={setCurrentPage}
// //           />
// //         )}
// //       </div>

// //       {/* Modal */}
// //       <Modal
// //         show={show}
// //         onHide={handleClose}
// //         size="lg"
// //         centered
// //         backdrop="static">
// //         <Modal.Header closeButton className="border-bottom-0 pb-0">
// //           <Modal.Title className="h4 fw-bold">
// //             {editId ? "Update Sub-Category" : "Create New Sub-Category"}
// //           </Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body className="pt-0">
// //           <Form>
// //             <div className="row mb-3">
// //               <div className="col-md-6">
// //                 <Form.Group>
// //                   <Form.Label className="fw-bold">
// //                     Main Category <span className="text-danger">*</span>
// //                   </Form.Label>
// //                   <Form.Select
// //                     value={categoryId}
// //                     onChange={(e) => setCategoryId(e.target.value)}
// //                     disabled={!!editId}
// //                     className="py-2">
// //                     <option value="">-- Select Category --</option>
// //                     {categories.map((cat) => (
// //                       <option key={cat._id} value={cat._id}>
// //                         {cat.categoryName}
// //                       </option>
// //                     ))}
// //                   </Form.Select>
// //                 </Form.Group>
// //               </div>
// //               <div className="col-md-6">
// //                 <Form.Group>
// //                   <Form.Label className="fw-bold">
// //                     Sub-Category Name <span className="text-danger">*</span>
// //                   </Form.Label>
// //                   <Form.Control
// //                     type="text"
// //                     value={subCategoryName}
// //                     onChange={(e) => setSubCategoryName(e.target.value)}
// //                     placeholder="Enter name"
// //                     className="py-2"
// //                   />
// //                 </Form.Group>
// //               </div>
// //             </div>

// //             {/* --- Icon Upload Section --- */}
// //             <Form.Group className="mb-3">
// //               <Form.Label className="fw-bold">Sub-Category Icon</Form.Label>
// //               <div className="d-flex align-items-start gap-3">
// //                 <div className="flex-grow-1">
// //                   <Form.Control
// //                     type="file"
// //                     accept="image/*"
// //                     onChange={handleIconChange}
// //                     className="mb-2"
// //                   />
// //                   <Form.Text className="text-muted">
// //                     Recommended: Square image, max 5MB, PNG/JPG/WebP
// //                   </Form.Text>
// //                 </div>
// //                 {iconPreview && (
// //                   <div className="position-relative">
// //                     <div
// //                       style={{
// //                         width: "80px",
// //                         height: "80px",
// //                         overflow: "hidden",
// //                         borderRadius: "8px",
// //                         border: "2px solid #dee2e6",
// //                       }}>
// //                       <img
// //                         src={iconPreview}
// //                         alt="Preview"
// //                         style={{
// //                           width: "100%",
// //                           height: "100%",
// //                           objectFit: "cover",
// //                         }}
// //                       />
// //                     </div>
// //                     <Button
// //                       variant="danger"
// //                       size="sm"
// //                       className="position-absolute top-0 end-0 mt-1 me-1"
// //                       onClick={handleRemoveIcon}
// //                       style={{ padding: "2px 6px", fontSize: "12px" }}>
// //                       ×
// //                     </Button>
// //                   </div>
// //                 )}
// //               </div>
// //             </Form.Group>

// //             <Form.Group className="mb-3">
// //               <Form.Label className="fw-bold">
// //                 Note (Description){" "}
// //                 <span className="text-muted">(Optional)</span>
// //               </Form.Label>
// //               <TextEditor value={note} onChange={setNote} />
// //             </Form.Group>
// //           </Form>
// //         </Modal.Body>
// //         <Modal.Footer className="border-top-0 pt-0">
// //           <Button variant="outline-secondary" onClick={handleClose}>
// //             Cancel
// //           </Button>
// //           <Button variant="dark" onClick={handleSave} className="px-4">
// //             {editId ? "Update" : "Create Sub-Category"}
// //           </Button>
// //         </Modal.Footer>
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default SubCategories;

// import React, { useState, useEffect } from "react";
// import { Table, Button, Modal, Form, Spinner } from "react-bootstrap";
// import { toast } from "react-toastify";
// import TextEditor from "../components/common/TextEditor";
// import CustomPagination from "../components/common/CustomPagination";
// import {
//   getAllCategories,
//   getAllSubCategories,
//   createSubCategory,
//   updateSubCategory,
//   deleteSubCategory
// } from "../Services/adminService";
// import { getFullImageUrl } from "../Services/adminService";

// const SubCategories = () => {
//   // --- States ---
//   const [show, setShow] = useState(false);
//   const [subCategories, setSubCategories] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [imageErrors, setImageErrors] = useState({});

//   // --- Form States ---
//   const [subCategoryName, setSubCategoryName] = useState("");
//   const [categoryId, setCategoryId] = useState("");
//   const [note, setNote] = useState("");
//   const [iconFile, setIconFile] = useState(null);
//   const [iconPreview, setIconPreview] = useState("");
//   const [editId, setEditId] = useState(null);

//   // --- Pagination States ---
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   // --- Simple placeholder SVG ---
//   const placeholderSVG = `
//     <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
//       <rect width="60" height="60" fill="#f8f9fa"/>
//       <rect x="10" y="10" width="40" height="40" fill="#e9ecef" stroke="#adb5bd" stroke-width="1"/>
//       <text x="30" y="35" text-anchor="middle" fill="#6c757d" font-family="Arial" font-size="10">No Icon</text>
//     </svg>
//   `;

//   const placeholderImage = `data:image/svg+xml;base64,${btoa(placeholderSVG)}`;

//   // --- Get image URL with fallback ---
//   const getImageUrl = (iconPath, id) => {
//     if (!iconPath || iconPath === 'undefined' || iconPath === 'null') {
//       return placeholderImage;
//     }

//     if (imageErrors[id]) {
//       return placeholderImage;
//     }

//     return getFullImageUrl(iconPath);
//   };

//   // --- Handle image error ---
//   const handleImageError = (id) => {
//     setImageErrors(prev => ({
//       ...prev,
//       [id]: true
//     }));
//   };

//   // --- Fetch Data ---
// const fetchData = async () => {
//   setLoading(true);
//   try {
//     const [catRes, subCatRes] = await Promise.all([
//       getAllCategories(),
//       getAllSubCategories(),
//     ]);

//     if (catRes && catRes.status) {
//       setCategories(catRes.categories || []);
//     }

//     if (subCatRes && subCatRes.status) {
//       // ✅ यह एक line add करो - reverse() se new data neeche ayega
//       const sortedSubCategories = (subCatRes.data || []).reverse();
//       setSubCategories(sortedSubCategories);
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     toast.error("Failed to load data");
//   } finally {
//     setLoading(false);
//   }
// };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // --- Handle Icon Upload ---
//   const handleIconChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
//       if (!validTypes.includes(file.type)) {
//         toast.error("Please upload a valid image file (JPEG, PNG, GIF, WebP)");
//         return;
//       }

//       const maxSize = 5 * 1024 * 1024; // 5MB
//       if (file.size > maxSize) {
//         toast.error("Image size should be less than 5MB");
//         return;
//       }

//       setIconFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setIconPreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // --- Remove Icon ---
//   const handleRemoveIcon = () => {
//     setIconFile(null);
//     setIconPreview("");
//   };

//   // --- Handlers ---
// const handleSave = async () => {
//   if (!subCategoryName.trim() || !categoryId) {
//     toast.warning("Category and SubCategory Name are required");
//     return;
//   }

//   try {
//     const formData = new FormData();
//     formData.append("subCategoryName", subCategoryName.trim());
//     formData.append("category", categoryId); // ✅ Category ID bhejna zaroori hai

//     if (note) {
//       formData.append("note", note);
//     }

//     if (iconFile) {
//       formData.append("icon", iconFile);
//     }

//     let res;
//     if (editId) {
//       console.log(
//         `Updating subcategory ${editId} with category: ${categoryId}`,
//       );
//       res = await updateSubCategory(editId, formData);
//     } else {
//       res = await createSubCategory(formData);
//     }

//     if (res && res.status) {
//       toast.success(editId ? "Updated Successfully!" : "Created Successfully!");
//       handleClose();
//       fetchData();
//     }
//   } catch (error) {
//     console.error("Error saving subcategory:", error);
//     toast.error(error.message || "Operation failed");
//   }
// };
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure?")) {
//       try {
//         const res = await deleteSubCategory(id);
//         if (res && res.status) {
//           toast.success("Deleted Successfully!");
//           setImageErrors(prev => {
//             const newErrors = { ...prev };
//             delete newErrors[id];
//             return newErrors;
//           });
//           fetchData();
//         }
//       } catch (error) {
//         toast.error("Delete failed");
//       }
//     }
//   };

// const handleEdit = (sub) => {
//   console.log("Editing subcategory with existing data:", sub);

//   // 1. ID set karo
//   setEditId(sub._id);

//   // 2. Name set karo
//   setSubCategoryName(sub.subCategoryName || "");

//   // 3. Category ID set karo
//   setCategoryId(sub.category?._id || sub.category || "");

//   // 4. 🔴 FIX: NOTE/DESCRIPTION SET KARO - Yeh missing tha!
//   setNote(sub.note || ""); // 👈 YEH LINE ADD KARO

//   // 5. Icon preview set karo
//   if (sub.icon) {
//     setIconPreview(getFullImageUrl(sub.icon));
//   } else {
//     setIconPreview("");
//   }

//   // 6. File null karo (naya upload ke liye)
//   setIconFile(null);

//   // 7. Modal show karo
//   setShow(true);
// };

//   const handleClose = () => {
//     setShow(false);
//     setEditId(null);
//     setSubCategoryName("");
//     setCategoryId("");
//     setNote("");
//     setIconFile(null);
//     setIconPreview("");
//   };

//   // Pagination Logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = subCategories.slice(indexOfFirstItem, indexOfLastItem);

//   return (
//     <div className="container-fluid py-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2 className="fw-bold">Sub-Category List</h2>
//         <Button variant="dark" onClick={() => setShow(true)}>
//           + Create Sub-Category
//         </Button>
//       </div>

//       <div className="bg-white p-3 rounded shadow-sm border">
//         <Table responsive hover className="mb-0 align-middle">
//           <thead className="table-light">
//             <tr>
//               <th style={{ width: "80px" }}>S.No</th>
//               <th style={{ width: "100px" }}>Icon</th>
//               <th>Main Category</th>
//               <th>Sub-Category Name</th>
//               <th>Created Date</th>
//               <th style={{ width: "150px" }}>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan="6" className="text-center py-5">
//                   <Spinner animation="border" size="sm" />
//                 </td>
//               </tr>
//             ) : currentItems.length > 0 ? (
//               currentItems.map((sub, index) => {
//                 const hasIcon = !!sub.icon;
//                 const iconUrl = getImageUrl(sub.icon, sub._id);
//                 const isPlaceholder = iconUrl === placeholderImage;

//                 return (
//                   <tr key={sub._id}>
//                     <td>
//                       {String(indexOfFirstItem + index + 1).padStart(2, "0")}
//                     </td>
//                     <td>
//                       <div
//                         style={{
//                           width: "60px",
//                           height: "60px",
//                           overflow: "hidden",
//                           borderRadius: "6px",
//                           backgroundColor: isPlaceholder
//                             ? "#f8f9fa"
//                             : "transparent",
//                           border: "1px solid #dee2e6",
//                         }}>
//                         <img
//                           src={iconUrl}
//                           alt={sub.subCategoryName}
//                           style={{
//                             width: "100%",
//                             height: "100%",
//                             objectFit: isPlaceholder ? "contain" : "cover",
//                           }}
//                           onError={() => handleImageError(sub._id)}
//                           loading="lazy"
//                         />
//                       </div>
//                     </td>
//                     <td className="text-primary fw-semibold">
//                       {sub.category?.categoryName || "N/A"}
//                     </td>
//                     <td className="fw-bold">{sub.subCategoryName}</td>
//                     <td>{new Date(sub.createdAt).toLocaleDateString()}</td>
//                     <td>
//                       <div className="d-flex gap-2">
//                         <Button
//                           variant="outline-primary"
//                           size="sm"
//                           onClick={() => handleEdit(sub)}>
//                           Edit
//                         </Button>
//                         <Button
//                           variant="outline-danger"
//                           size="sm"
//                           onClick={() => handleDelete(sub._id)}>
//                           Delete
//                         </Button>
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })
//             ) : (
//               <tr>
//                 <td colSpan="6" className="text-center py-4">
//                   No Data Found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </Table>

//         {!loading && subCategories.length > 0 && (
//           <CustomPagination
//             current={currentPage}
//             totalItems={subCategories.length}
//             itemsPerPage={itemsPerPage}
//             onPageChange={setCurrentPage}
//           />
//         )}
//       </div>

//       {/* Modal */}
//       {/* Modal */}
//       <Modal
//         show={show}
//         onHide={handleClose}
//         size="lg"
//         centered
//         backdrop="static">
//         <Modal.Header closeButton className="border-bottom-0 pb-0">
//           <Modal.Title className="h4 fw-bold">
//             {editId ? "Update Sub-Category" : "Create New Sub-Category"}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="pt-0">
//           <Form>
//             {/* Category & Name Fields */}
//             <div className="row mb-3">
//               <div className="col-md-6">
//                 <Form.Group>
//                   <Form.Label className="fw-bold">
//                     Main Category <span className="text-danger">*</span>
//                   </Form.Label>
//                   <Form.Select
//                     value={categoryId}
//                     onChange={(e) => setCategoryId(e.target.value)}
//                     className="py-2">
//                     <option value="">-- Select Category --</option>
//                     {categories.map((cat) => (
//                       <option key={cat._id} value={cat._id}>
//                         {cat.categoryName}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Form.Group>
//               </div>
//               <div className="col-md-6">
//                 <Form.Group>
//                   <Form.Label className="fw-bold">
//                     Sub-Category Name <span className="text-danger">*</span>
//                   </Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={subCategoryName}
//                     onChange={(e) => setSubCategoryName(e.target.value)}
//                     placeholder="Enter name"
//                     className="py-2"
//                   />
//                 </Form.Group>
//               </div>
//             </div>

//             {/* Icon Upload Section */}
//             <Form.Group className="mb-3">
//               <Form.Label className="fw-bold">
//                 Sub-Category Icon{" "}
//                 {editId && (
//                   <span className="text-muted">
//                     (Optional - Leave empty to keep current)
//                   </span>
//                 )}
//               </Form.Label>
//               <div className="d-flex align-items-start gap-3">
//                 <div className="flex-grow-1">
//                   <Form.Control
//                     type="file"
//                     accept="image/*"
//                     onChange={handleIconChange}
//                     className="mb-2"
//                   />
//                   <Form.Text className="text-muted">
//                     Recommended: Square image, max 5MB, PNG/JPG/WebP
//                   </Form.Text>
//                 </div>
//                 {(iconPreview || editId) && (
//                   <div className="position-relative">
//                     <div
//                       style={{
//                         width: "80px",
//                         height: "80px",
//                         overflow: "hidden",
//                         borderRadius: "8px",
//                         border: "2px solid #dee2e6",
//                       }}>
//                       <img
//                         src={iconPreview || placeholderImage}
//                         alt="Preview"
//                         style={{
//                           width: "100%",
//                           height: "100%",
//                           objectFit: iconPreview ? "cover" : "contain",
//                         }}
//                       />
//                     </div>
//                     {iconPreview && (
//                       <Button
//                         variant="danger"
//                         size="sm"
//                         className="position-absolute top-0 end-0 mt-1 me-1"
//                         onClick={handleRemoveIcon}
//                         style={{ padding: "2px 6px", fontSize: "12px" }}>
//                         ×
//                       </Button>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </Form.Group>

//             {/* 🔴 FIXED: Note/Description Field - AB CONTENT DIKHEGA */}
//             <Form.Group className="mb-3">
//               <Form.Label className="fw-bold">
//                 Note (Description){" "}
//                 <span className="text-muted">(Optional)</span>
//               </Form.Label>
//               <TextEditor
//                 value={note || ""} // ✅ YEH IMPORTANT - null na jaye
//                 onChange={setNote}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer className="border-top-0 pt-0">
//           <Button variant="outline-secondary" onClick={handleClose}>
//             Cancel
//           </Button>
//           <Button variant="dark" onClick={handleSave} className="px-4">
//             {editId ? "Update" : "Create Sub-Category"}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default SubCategories;

// import React, { useState, useEffect } from "react";
// import { Table, Button, Modal, Form, Spinner } from "react-bootstrap";
// import { toast } from "react-toastify";
// import TextEditor from "../components/common/TextEditor";
// import CustomPagination from "../components/common/CustomPagination";
// import {
//   getAllCategories,
//   getAllSubCategories,
//   createSubCategory,
//   updateSubCategory,
//   deleteSubCategory,

//   getSubCategoryById,
// } from "../Services/adminService";
// import { getFullImageUrl } from "../Services/adminService";

// const SubCategories = () => {
//   // --- States ---
//   const [show, setShow] = useState(false);
//   const [subCategories, setSubCategories] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [imageErrors, setImageErrors] = useState({});

//   // --- Form States ---
//   const [subCategoryName, setSubCategoryName] = useState("");
//   const [categoryId, setCategoryId] = useState("");
//   const [note, setNote] = useState("");
//   const [iconFile, setIconFile] = useState(null);
//   const [iconPreview, setIconPreview] = useState("");
//   const [editId, setEditId] = useState(null);

//   // --- 🆕 TextEditor Key State - Force re-render ke liye ---
//   const [editorKey, setEditorKey] = useState(Date.now());

//   // --- Pagination States ---
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   // --- Simple placeholder SVG ---
//   const placeholderSVG = `
//     <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
//       <rect width="60" height="60" fill="#f8f9fa"/>
//       <rect x="10" y="10" width="40" height="40" fill="#e9ecef" stroke="#adb5bd" stroke-width="1"/>
//       <text x="30" y="35" text-anchor="middle" fill="#6c757d" font-family="Arial" font-size="10">No Icon</text>
//     </svg>
//   `;

//   const placeholderImage = `data:image/svg+xml;base64,${btoa(placeholderSVG)}`;

//   // --- Get image URL with fallback ---
//   const getImageUrl = (iconPath, id) => {
//     if (!iconPath || iconPath === "undefined" || iconPath === "null") {
//       return placeholderImage;
//     }

//     if (imageErrors[id]) {
//       return placeholderImage;
//     }

//     return getFullImageUrl(iconPath);
//   };

//   // --- Handle image error ---
//   const handleImageError = (id) => {
//     setImageErrors((prev) => ({
//       ...prev,
//       [id]: true,
//     }));
//   };

//   // --- Fetch Data ---
//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const [catRes, subCatRes] = await Promise.all([
//         getAllCategories(),
//         getAllSubCategories(),
//       ]);

//       if (catRes && catRes.status) {
//         setCategories(catRes.categories || []);
//       }

//       if (subCatRes && subCatRes.status) {
//         const sortedSubCategories = (subCatRes.data || []).reverse();
//         setSubCategories(sortedSubCategories);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       toast.error("Failed to load data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // --- Handle Icon Upload ---
//   const handleIconChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const validTypes = [
//         "image/jpeg",
//         "image/jpg",
//         "image/png",
//         "image/gif",
//         "image/webp",
//       ];
//       if (!validTypes.includes(file.type)) {
//         toast.error("Please upload a valid image file (JPEG, PNG, GIF, WebP)");
//         return;
//       }

//       const maxSize = 5 * 1024 * 1024;
//       if (file.size > maxSize) {
//         toast.error("Image size should be less than 5MB");
//         return;
//       }

//       setIconFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setIconPreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // --- Remove Icon ---
//   const handleRemoveIcon = () => {
//     setIconFile(null);
//     setIconPreview("");
//   };

//   // --- Handlers ---
//   const handleSave = async () => {
//     if (!subCategoryName.trim() || !categoryId) {
//       toast.warning("Category and SubCategory Name are required");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("subCategoryName", subCategoryName.trim());
//       formData.append("category", categoryId);

//       if (note) {
//         formData.append("note", note);
//       }

//       if (iconFile) {
//         formData.append("icon", iconFile);
//       }

//       let res;
//       if (editId) {
//         console.log(
//           `Updating subcategory ${editId} with category: ${categoryId}`,
//         );
//         res = await updateSubCategory(editId, formData);
//       } else {
//         res = await createSubCategory(formData);
//       }

//       if (res && res.status) {
//         toast.success(
//           editId ? "Updated Successfully!" : "Created Successfully!",
//         );
//         handleClose();
//         fetchData();
//       }
//     } catch (error) {
//       console.error("Error saving subcategory:", error);
//       toast.error(error.message || "Operation failed");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure?")) {
//       try {
//         const res = await deleteSubCategory(id);
//         if (res && res.status) {
//           toast.success("Deleted Successfully!");
//           setImageErrors((prev) => {
//             const newErrors = { ...prev };
//             delete newErrors[id];
//             return newErrors;
//           });
//           fetchData();
//         }
//       } catch (error) {
//         toast.error("Delete failed");
//       }
//     }
//   };

//   // --- 🔴 FIXED: handleEdit with editor key update ---
// const handleEdit = async (sub) => {
//   try {
//     setLoading(true);

//     const res = await getSubCategoryById(sub._id);

//     if (res && res.status) {
//       const fullData = res.data;

//       setEditId(fullData._id);
//       setSubCategoryName(fullData.subCategoryName || "");
//       setCategoryId(fullData.category?._id || fullData.category || "");
//       setNote(fullData.note || "");

//       if (fullData.icon) {
//         setIconPreview(getFullImageUrl(fullData.icon));
//       } else {
//         setIconPreview("");
//       }

//       setIconFile(null);
//       setShow(true);
//     }
//   } catch (error) {
//     toast.error("Failed to load subcategory details");
//   } finally {
//     setLoading(false);
//   }
// };

//   // --- 🔴 FIXED: handleClose with editor key reset ---
// const handleClose = () => {
//   setShow(false);
//   setEditId(null);
//   setSubCategoryName("");
//   setCategoryId("");
//   setNote("");
//   setIconFile(null);
//   setIconPreview("");
// };

//   // Pagination Logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = subCategories.slice(indexOfFirstItem, indexOfLastItem);

//   return (
//     <div className="container-fluid py-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2 className="fw-bold">Sub-Category List</h2>
//         <Button
//           variant="dark"
//           onClick={() => {
//             setEditorKey(Date.now()); // ✅ Create mode ke liye bhi key reset
//             setShow(true);
//           }}>
//           + Create Sub-Category
//         </Button>
//       </div>

//       <div className="bg-white p-3 rounded shadow-sm border">
//         <Table responsive hover className="mb-0 align-middle">
//           <thead className="table-light">
//             <tr>
//               <th style={{ width: "80px" }}>S.No</th>
//               <th style={{ width: "100px" }}>Icon</th>
//               <th>Main Category</th>
//               <th>Sub-Category Name</th>
//               <th>Created Date</th>
//               <th style={{ width: "150px" }}>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan="6" className="text-center py-5">
//                   <Spinner animation="border" size="sm" />
//                 </td>
//               </tr>
//             ) : currentItems.length > 0 ? (
//               currentItems.map((sub, index) => {
//                 const hasIcon = !!sub.icon;
//                 const iconUrl = getImageUrl(sub.icon, sub._id);
//                 const isPlaceholder = iconUrl === placeholderImage;

//                 return (
//                   <tr key={sub._id}>
//                     <td>
//                       {String(indexOfFirstItem + index + 1).padStart(2, "0")}
//                     </td>
//                     <td>
//                       <div
//                         style={{
//                           width: "60px",
//                           height: "60px",
//                           overflow: "hidden",
//                           borderRadius: "6px",
//                           backgroundColor: isPlaceholder
//                             ? "#f8f9fa"
//                             : "transparent",
//                           border: "1px solid #dee2e6",
//                         }}>
//                         <img
//                           src={iconUrl}
//                           alt={sub.subCategoryName}
//                           style={{
//                             width: "100%",
//                             height: "100%",
//                             objectFit: isPlaceholder ? "contain" : "cover",
//                           }}
//                           onError={() => handleImageError(sub._id)}
//                           loading="lazy"
//                         />
//                       </div>
//                     </td>
//                     <td className="text-primary fw-semibold">
//                       {sub.category?.categoryName || "N/A"}
//                     </td>
//                     <td className="fw-bold">{sub.subCategoryName}</td>
//                     <td>{new Date(sub.createdAt).toLocaleDateString()}</td>
//                     <td>
//                       <div className="d-flex gap-2">
//                         <Button
//                           variant="outline-primary"
//                           size="sm"
//                           onClick={() => handleEdit(sub)}>
//                           Edit
//                         </Button>
//                         <Button
//                           variant="outline-danger"
//                           size="sm"
//                           onClick={() => handleDelete(sub._id)}>
//                           Delete
//                         </Button>
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })
//             ) : (
//               <tr>
//                 <td colSpan="6" className="text-center py-4">
//                   No Data Found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </Table>

//         {!loading && subCategories.length > 0 && (
//           <CustomPagination
//             current={currentPage}
//             totalItems={subCategories.length}
//             itemsPerPage={itemsPerPage}
//             onPageChange={setCurrentPage}
//           />
//         )}
//       </div>

//       {/* Modal - 🔴 FIXED: TextEditor with dynamic key */}
//       <Modal
//         show={show}
//         onHide={handleClose}
//         size="lg"
//         centered
//         backdrop="static">
//         <Modal.Header closeButton className="border-bottom-0 pb-0">
//           <Modal.Title className="h4 fw-bold">
//             {editId ? "Update Sub-Category" : "Create New Sub-Category"}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="pt-0">
//           <Form>
//             <div className="row mb-3">
//               <div className="col-md-6">
//                 <Form.Group>
//                   <Form.Label className="fw-bold">
//                     Main Category <span className="text-danger">*</span>
//                   </Form.Label>
//                   <Form.Select
//                     value={categoryId}
//                     onChange={(e) => setCategoryId(e.target.value)}
//                     className="py-2">
//                     <option value="">-- Select Category --</option>
//                     {categories.map((cat) => (
//                       <option key={cat._id} value={cat._id}>
//                         {cat.categoryName}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Form.Group>
//               </div>
//               <div className="col-md-6">
//                 <Form.Group>
//                   <Form.Label className="fw-bold">
//                     Sub-Category Name <span className="text-danger">*</span>
//                   </Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={subCategoryName}
//                     onChange={(e) => setSubCategoryName(e.target.value)}
//                     placeholder="Enter name"
//                     className="py-2"
//                   />
//                 </Form.Group>
//               </div>
//             </div>

//             {/* Icon Upload Section */}
//             <Form.Group className="mb-3">
//               <Form.Label className="fw-bold">
//                 Sub-Category Icon{" "}
//                 {editId && (
//                   <span className="text-muted">
//                     (Optional - Leave empty to keep current)
//                   </span>
//                 )}
//               </Form.Label>
//               <div className="d-flex align-items-start gap-3">
//                 <div className="flex-grow-1">
//                   <Form.Control
//                     type="file"
//                     accept="image/*"
//                     onChange={handleIconChange}
//                     className="mb-2"
//                   />
//                   <Form.Text className="text-muted">
//                     Recommended: Square image, max 5MB, PNG/JPG/WebP
//                   </Form.Text>
//                 </div>
//                 {(iconPreview || editId) && (
//                   <div className="position-relative">
//                     <div
//                       style={{
//                         width: "80px",
//                         height: "80px",
//                         overflow: "hidden",
//                         borderRadius: "8px",
//                         border: "2px solid #dee2e6",
//                       }}>
//                       <img
//                         src={iconPreview || placeholderImage}
//                         alt="Preview"
//                         style={{
//                           width: "100%",
//                           height: "100%",
//                           objectFit: iconPreview ? "cover" : "contain",
//                         }}
//                       />
//                     </div>
//                     {iconPreview && (
//                       <Button
//                         variant="danger"
//                         size="sm"
//                         className="position-absolute top-0 end-0 mt-1 me-1"
//                         onClick={handleRemoveIcon}
//                         style={{ padding: "2px 6px", fontSize: "12px" }}>
//                         ×
//                       </Button>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label className="fw-bold">
//                 Note (Description){" "}
//                 <span className="text-muted">(Optional)</span>
//               </Form.Label>
//               {console.log(
//                 "🟢 Rendering TextEditor with key:",
//                 editorKey,
//                 "note:",
//                 note,
//               )}
//               <TextEditor value={note} onChange={setNote} />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer className="border-top-0 pt-0">
//           <Button variant="outline-secondary" onClick={handleClose}>
//             Cancel
//           </Button>
//           <Button variant="dark" onClick={handleSave} className="px-4">
//             {editId ? "Update" : "Create Sub-Category"}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default SubCategories;

import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import TextEditor from "../components/common/TextEditor";
import CustomPagination from "../components/common/CustomPagination";
import {
  getAllCategories,
  getAllSubCategories,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getSubCategoryById,
  getFullImageUrl,
} from "../Services/adminService";

const SubCategories = () => {
  const [show, setShow] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // States
  const [subCategoryName, setSubCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [note, setNote] = useState("");
  const [iconFile, setIconFile] = useState(null);
  const [iconPreview, setIconPreview] = useState("");
  const [editId, setEditId] = useState(null);
  const [editorKey, setEditorKey] = useState(Date.now());
  const [refreshKey, setRefreshKey] = useState(Date.now()); // 🆕 Image refresh ke liye

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchData = async () => {
    setLoading(true);
    try {
      const [catRes, subCatRes] = await Promise.all([
        getAllCategories(),
        getAllSubCategories(),
      ]);
      if (catRes?.status) setCategories(catRes.categories || []);
      if (subCatRes?.status) setSubCategories((subCatRes.data || []).reverse());
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIconFile(file);
      setIconPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!subCategoryName.trim() || !categoryId) {
      toast.warning("Category and Name are required");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("subCategoryName", subCategoryName.trim());
      formData.append("category", categoryId);
      formData.append("note", note || "");

      if (iconFile) {
        formData.append("icon", iconFile); // Key matches backend expectation
      }

      const res = editId
        ? await updateSubCategory(editId, formData)
        : await createSubCategory(formData);

      if (res?.status) {
        toast.success("Successfully Saved!");
        setRefreshKey(Date.now()); // 🆕 Update success hote hi key badal do
        handleClose();
        fetchData();
      }
    } catch (error) {
      toast.error("Save failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (sub) => {
    setLoading(true);
    try {
      const res = await getSubCategoryById(sub._id);
      if (res?.status) {
        const fullData = res.data;
        setEditId(fullData._id);
        setSubCategoryName(fullData.subCategoryName || "");
        setCategoryId(fullData.category?._id || fullData.category || "");
        setNote(fullData.note || "");
        setIconPreview(fullData.icon ? getFullImageUrl(fullData.icon) : "");
        setEditorKey(Date.now());
        setShow(true);
      }
    } catch (error) {
      toast.error("Failed to load details");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShow(false);
    setEditId(null);
    setSubCategoryName("");
    setCategoryId("");
    setNote("");
    setIconFile(null);
    setIconPreview("");
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = subCategories.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Sub-Category List</h2>
        <Button
          variant="dark"
          onClick={() => {
            setEditorKey(Date.now());
            setShow(true);
          }}>
          + Create Sub-Category
        </Button>
      </div>

      <div className="bg-white p-3 rounded shadow-sm border">
        <Table responsive hover className="align-middle">
          <thead className="table-light">
            <tr>
              <th>S.No</th>
              <th>Icon</th>
              <th>Main Category</th>
              <th>Sub-Category Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading && subCategories.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-5">
                  <Spinner size="sm" />
                </td>
              </tr>
            ) : (
              currentItems.map((sub, index) => (
                <tr key={sub._id}>
                  <td>
                    {String(indexOfFirstItem + index + 1).padStart(2, "0")}
                  </td>
                  <td>
                    <img
                      // 🆕 refreshKey URL ke piche lagaya hai cache bust karne ke liye
                      src={
                        sub.icon
                          ? `${getFullImageUrl(sub.icon)}?t=${refreshKey}`
                          : "https://placehold.co/50x50?text=No+Icon"
                      }
                      width="50"
                      height="50"
                      className="rounded border"
                      style={{ objectFit: "cover" }}
                    />
                  </td>
                  <td className="text-primary">
                    {sub.category?.categoryName || "N/A"}
                  </td>
                  <td className="fw-bold">{sub.subCategoryName}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(sub)}>
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={async () => {
                        if (window.confirm("Delete?")) {
                          await deleteSubCategory(sub._id);
                          fetchData();
                        }
                      }}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
        <CustomPagination
          current={currentPage}
          totalItems={subCategories.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        centered
        backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{editId ? "Update" : "Create"} Sub-Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="row mb-3">
              <div className="col-md-6">
                <Form.Label className="fw-bold">Main Category</Form.Label>
                <Form.Select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}>
                  <option value="">-- Select Category --</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.categoryName}
                    </option>
                  ))}
                </Form.Select>
              </div>
              <div className="col-md-6">
                <Form.Label className="fw-bold">Sub-Category Name</Form.Label>
                <Form.Control
                  type="text"
                  value={subCategoryName}
                  onChange={(e) => setSubCategoryName(e.target.value)}
                />
              </div>
            </div>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Icon</Form.Label>
              <div className="d-flex gap-3">
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleIconChange}
                />
                {iconPreview && (
                  <img
                    src={iconPreview}
                    width="60"
                    height="60"
                    className="rounded border"
                  />
                )}
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Note</Form.Label>
              <TextEditor key={editorKey} value={note} onChange={setNote} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="dark" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SubCategories;