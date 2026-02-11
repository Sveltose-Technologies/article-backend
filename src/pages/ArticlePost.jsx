// // import React, { useState, useEffect } from "react";
// // import {
// //   Table,
// //   Button,
// //   Modal,
// //   Form,
// //   Row,
// //   Col,
// //   Badge,
// //   Spinner,
// // } from "react-bootstrap";
// // import { toast } from "react-toastify";
// // import TextEditor from "../components/common/TextEditor";
// // import CustomPagination from "../components/common/CustomPagination";
// // import {
// //   getAllArticles,
// //   createArticle,
// //   updateArticle,
// //   deleteArticle,
// //   getAllCategories,
// // } from "../Services/adminService";

// // const ArticlePost = () => {
// //   const [showModal, setShowModal] = useState(false);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [loading, setLoading] = useState(false);
// //   const [articles, setArticles] = useState([]);
// //   const [categories, setCategories] = useState([]);

// //   // --- Form States ---
// //   const [editId, setEditId] = useState(null);
// //   const [title, setTitle] = useState("");
// //   const [content, setContent] = useState("");
// //   const [categoryId, setCategoryId] = useState("");
// //   const [videoLink, setVideoLink] = useState("");
// //   const [featureImage, setFeatureImage] = useState(null);
// //   const [status, setStatus] = useState("active");

// //   // --- Helper: Clean HTML and Entities ---
// //   const getPlainEnglish = (html) => {
// //     if (!html) return "";
// //     const doc = new DOMParser().parseFromString(html, "text/html");
// //     const text = doc.body.textContent || "";
// //     return text.replace(/\s+/g, " ").trim();
// //   };

// //   const fetchData = async () => {
// //     setLoading(true);
// //     try {
// //       const [artRes, catRes] = await Promise.all([
// //         getAllArticles(),
// //         getAllCategories(),
// //       ]);
// //       if (artRes?.status) {
// //         setArticles(artRes.articles || []);
// //       }
// //       if (catRes?.status) setCategories(catRes.categories || []);
// //     } catch (error) {
// //       toast.error("Failed to fetch data");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   const handleClose = () => {
// //     setShowModal(false);
// //     setEditId(null);
// //     setTitle("");
// //     setContent("");
// //     setCategoryId("");
// //     setVideoLink("");
// //     setFeatureImage(null);
// //     setStatus("active");
// //   };

// //   const handleEdit = (item) => {
// //     setEditId(item._id);
// //     setTitle(item.title || "");
// //     setContent(item.content || "");
// //     setCategoryId(item.category?._id || item.category || "");
// //     setVideoLink(item.videoLink || "");
// //     setStatus(item.status ? item.status.toLowerCase() : "active");
// //     setShowModal(true);
// //   };

// //   const handleDelete = async (id) => {
// //     if (window.confirm("Are you sure?")) {
// //       try {
// //         const res = await deleteArticle(id);
// //         if (res?.status) {
// //           toast.success("Deleted successfully");
// //           fetchData();
// //         }
// //       } catch (error) {
// //         toast.error("Delete failed");
// //       }
// //     }
// //   };

// //   const handleSubmit = async () => {
// //     if (!title || !content || !categoryId) {
// //       return toast.warning("Title, Content and Category are required");
// //     }

// //     const formData = new FormData();
// //     formData.append("title", title);
// //     formData.append("content", content);
// //     formData.append("category", categoryId);
// //     formData.append("videoLink", videoLink);
// //     formData.append("status", status);

// //     if (featureImage) formData.append("featureImage", featureImage);

// //     try {
// //       setLoading(true);
// //       const res = await (editId
// //         ? updateArticle(editId, formData)
// //         : createArticle(formData));

// //       if (res?.status) {
// //         toast.success(
// //           editId ? "Updated Successfully!" : "Published Successfully!",
// //         );
// //         handleClose();
// //         fetchData();
// //       } else {
// //         toast.error(res?.message || "Operation failed");
// //       }
// //     } catch (error) {
// //       toast.error("Error saving article");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const itemsPerPage = 10;
// //   const indexOfLastItem = currentPage * itemsPerPage;
// //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// //   const currentItems = articles.slice(indexOfFirstItem, indexOfLastItem);

// //   return (
// //     <div className="container-fluid py-4">
// //       <div className="d-flex justify-content-between align-items-center mb-4">
// //         <h2 className="fw-bold">Article Post</h2>
// //         <Button variant="dark" onClick={() => setShowModal(true)}>
// //           + Create Article
// //         </Button>
// //       </div>

// //       <div className="bg-white p-3 rounded shadow-sm border">
// //         <Table responsive hover className="mb-0 align-middle">
// //           <thead className="table-light">
// //             <tr>
// //               <th style={{ width: "60px" }}>S.No</th>
// //               <th style={{ width: "200px" }}>Title</th>
// //               <th style={{ width: "350px" }}>Content Preview</th>
// //               <th style={{ width: "150px" }}>Category</th>
// //               <th style={{ width: "100px" }}>Status</th>
// //               <th style={{ width: "150px" }}>Action</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {loading && articles.length === 0 ? (
// //               <tr>
// //                 <td colSpan="6" className="text-center py-5">
// //                   <Spinner animation="border" size="sm" />
// //                 </td>
// //               </tr>
// //             ) : (
// //               currentItems.map((item, index) => {
// //                 const currentStatus = item.status || "active";

// //                 return (
// //                   <tr key={item._id}>
// //                     <td>
// //                       {String(indexOfFirstItem + index + 1).padStart(2, "0")}
// //                     </td>
// //                     <td className="fw-bold">
// //                       <div
// //                         className="text-truncate"
// //                         style={{ maxWidth: "200px" }}>
// //                         {item.title}
// //                       </div>
// //                     </td>
// //                     <td>
// //                       <div
// //                         className="text-muted small"
// //                         style={{
// //                           maxWidth: "350px",
// //                           overflow: "hidden",
// //                           textOverflow: "ellipsis",
// //                           display: "-webkit-box",
// //                           WebkitLineClamp: "2",
// //                           WebkitBoxOrient: "vertical",
// //                         }}>
// //                         {getPlainEnglish(item.content)}
// //                       </div>
// //                     </td>
// //                     <td>
// //                       <Badge bg="light" className="text-dark border">
// //                         {item.category?.categoryName || "Uncategorized"}
// //                       </Badge>
// //                     </td>
// //                     <td>
// //                       <Badge
// //                         bg={currentStatus === "active" ? "success" : "danger"}>
// //                         {currentStatus === "active" ? "Active" : "Deactive"}
// //                       </Badge>
// //                     </td>
// //                     <td>
// //                       <Button
// //                         variant="link"
// //                         size="sm"
// //                         className="me-2 fw-bold text-decoration-none"
// //                         onClick={() => handleEdit(item)}>
// //                         Edit
// //                       </Button>
// //                       <Button
// //                         variant="link"
// //                         size="sm"
// //                         className="text-danger fw-bold text-decoration-none"
// //                         onClick={() => handleDelete(item._id)}>
// //                         Delete
// //                       </Button>
// //                     </td>
// //                   </tr>
// //                 );
// //               })
// //             )}
// //           </tbody>
// //         </Table>

// //         <CustomPagination
// //           current={currentPage}
// //           totalItems={articles.length}
// //           itemsPerPage={itemsPerPage}
// //           onPageChange={setCurrentPage}
// //         />
// //       </div>

// //       {/* Modal */}
// //       <Modal
// //         show={showModal}
// //         onHide={handleClose}
// //         size="xl"
// //         centered
// //         backdrop="static">
// //         <Modal.Header closeButton>
// //           <Modal.Title className="fw-bold">
// //             {editId ? "Update" : "Create"} Article
// //           </Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body>
// //           <Form>
// //             <Row>
// //               <Col lg={8}>
// //                 <Form.Group className="mb-3">
// //                   <Form.Label className="fw-bold">Article Title</Form.Label>
// //                   <Form.Control
// //                     type="text"
// //                     value={title}
// //                     onChange={(e) => setTitle(e.target.value)}
// //                     placeholder="Enter title..."
// //                   />
// //                 </Form.Group>
// //                 <Form.Group className="mb-3">
// //                   <Form.Label className="fw-bold">Content</Form.Label>
// //                   <TextEditor value={content} onChange={setContent} />
// //                 </Form.Group>
// //               </Col>
// //               <Col lg={4}>
// //                 <Form.Group className="mb-3">
// //                   <Form.Label className="fw-bold">Category</Form.Label>
// //                   <Form.Select
// //                     value={categoryId}
// //                     onChange={(e) => setCategoryId(e.target.value)}>
// //                     <option value="">Select Category</option>
// //                     {categories.map((cat) => (
// //                       <option key={cat._id} value={cat._id}>
// //                         {cat.categoryName}
// //                       </option>
// //                     ))}
// //                   </Form.Select>
// //                 </Form.Group>

// //                 <Form.Group className="mb-3">
// //                   <Form.Label className="fw-bold">
// //                     Publication Status
// //                   </Form.Label>
// //                   <Form.Select
// //                     value={status}
// //                     onChange={(e) => setStatus(e.target.value)}>
// //                     <option value="active">Active</option>
// //                     <option value="deactive">Deactive</option>
// //                   </Form.Select>
// //                 </Form.Group>

// //                 <Form.Group className="mb-3">
// //                   <Form.Label className="fw-bold">Feature Image</Form.Label>
// //                   <Form.Control
// //                     type="file"
// //                     onChange={(e) => setFeatureImage(e.target.files[0])}
// //                   />
// //                 </Form.Group>

// //                 <Form.Group className="mb-3">
// //                   <Form.Label className="fw-bold">
// //                     Video Link (Optional)
// //                   </Form.Label>
// //                   <Form.Control
// //                     type="text"
// //                     value={videoLink}
// //                     onChange={(e) => setVideoLink(e.target.value)}
// //                     placeholder="https://..."
// //                   />
// //                 </Form.Group>
// //               </Col>
// //             </Row>
// //           </Form>
// //         </Modal.Body>
// //         <Modal.Footer>
// //           <Button variant="secondary" onClick={handleClose}>
// //             Cancel
// //           </Button>
// //           <Button variant="dark" onClick={handleSubmit} disabled={loading}>
// //             {loading ? "Saving..." : editId ? "Update Article" : "Save Article"}
// //           </Button>
// //         </Modal.Footer>
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default ArticlePost;

// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   Button,
//   Modal,
//   Form,
//   Row,
//   Col,
//   Badge,
//   Spinner,
// } from "react-bootstrap";
// import { toast } from "react-toastify";
// import TextEditor from "../components/common/TextEditor";
// import CustomPagination from "../components/common/CustomPagination";
// import {
//   getAllArticles,
//   createArticle,
//   updateArticle,
//   deleteArticle,
//   getArticleById,
//   getAllCategories,
//   IMG_URL,
// } from "../Services/adminService";

// const ArticlePost = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [articles, setArticles] = useState([]);
//   const [categories, setCategories] = useState([]);

//   // --- API Parameters State ---
//   const [editId, setEditId] = useState(null);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [categoryId, setCategoryId] = useState("");
//   const [videoLink, setVideoLink] = useState("");
//   const [featureImage, setFeatureImage] = useState(null);
//   const [status, setStatus] = useState("active");
//   const [featured, setFeatured] = useState(false);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const [artRes, catRes] = await Promise.all([
//         getAllArticles(),
//         getAllCategories(),
//       ]);
//       if (artRes?.status) setArticles([...artRes.articles]);
//       if (catRes?.status) setCategories(catRes.categories || []);
//     } catch (error) {
//       toast.error("Failed to fetch data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleClose = () => {
//     setShowModal(false);
//     setEditId(null);
//     setTitle("");
//     setContent("");
//     setCategoryId("");
//     setVideoLink("");
//     setFeatureImage(null);
//     setStatus("active");
//     setFeatured(false);
//   };

//   const handleEdit = (item) => {
//     setEditId(item._id);
//     setTitle(item.title || "");
//     setContent(item.content || "");
//     setCategoryId(item.category?._id || item.category || "");
//     setVideoLink(item.videoLink || "");
//     setStatus(item.status || "active");
//     setFeatured(item.featured || false);
//     setShowModal(true);
//   };

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("content", content);
//     formData.append("category", categoryId); // use state, not article.category
//     formData.append("videoLink", videoLink || "");
//     formData.append("status", String(status));
//     formData.append("featured", featured ? "true" : "false");

//     if (featureImage instanceof File) {
//       formData.append("featureImage", featureImage);
//     }

//     if (editId) {
//       // Update existing article
//       const res = await updateArticle(editId, formData);
//       toast.success("Article updated successfully ✅");
//     } else {
//       // Create new article
//       const res = await createArticle(formData);
//       toast.success("Article created successfully ✅");
//     }

//     handleClose(); // Close modal and reset form
//     fetchData(); // Refresh articles
//   } catch (err) {
//     console.error("Submit error:", err);
//     toast.error("Operation failed ❌");
//   } finally {
//     setLoading(false);
//   }
// };

//   const handleDelete = async (id) => {
//     if (window.confirm("Delete this article?")) {
//       try {
//         const res = await deleteArticle(id);
//         if (res?.status) {
//           toast.success("Deleted");
//           fetchData();
//         }
//       } catch (error) {
//         toast.error("Delete failed");
//       }
//     }
//   };

//   const itemsPerPage = 10;
//   const currentItems = articles.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage,
//   );

//   return (
//     <div className="container-fluid py-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2 className="fw-bold">Articles</h2>
//         <Button variant="dark" onClick={() => setShowModal(true)}>
//           + Create Article
//         </Button>
//       </div>

//       <div className="bg-white p-3 rounded shadow-sm border">
//         <Table responsive hover className="mb-0 align-middle">
//           <thead className="table-light">
//             <tr>
//               <th>S.No</th>
//               <th>Image</th>
//               <th>Title</th>
//               <th>Category</th>
//               <th>Status</th>
//               <th>Featured</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading && articles.length === 0 ? (
//               <tr>
//                 <td colSpan="7" className="text-center py-5">
//                   <Spinner animation="border" size="sm" />
//                 </td>
//               </tr>
//             ) : (
//               currentItems.map((item, index) => (
//                 <tr key={item._id}>
//                   <td>
//                     {String(
//                       (currentPage - 1) * itemsPerPage + index + 1,
//                     ).padStart(2, "0")}
//                   </td>
//                   <td>
//                     <img
//                       src={`${IMG_URL}${item.featureImage?.replace(/\\/g, "/")}`}
//                       alt="article"
//                       width="55"
//                       height="40"
//                       className="rounded border shadow-sm"
//                       style={{ objectFit: "cover" }}
//                       onError={(e) =>
//                         (e.target.src =
//                           "https://placehold.jp/24/333333/ffffff/55x40.png?text=NA")
//                       }
//                     />
//                   </td>
//                   <td className="fw-bold">{item.title}</td>
//                   <td>
//                     <Badge bg="light" className="text-dark border">
//                       {item.category?.categoryName || "N/A"}
//                     </Badge>
//                   </td>
//                   <td>
//                     <Badge bg={item.status === "active" ? "success" : "danger"}>
//                       {item.status}
//                     </Badge>
//                   </td>
//                   <td>
//                     {item.featured ? (
//                       <Badge bg="warning" className="text-dark">
//                         Yes
//                       </Badge>
//                     ) : (
//                       <span className="text-muted small">No</span>
//                     )}
//                   </td>
//                   <td>
//                     <Button
//                       variant="link"
//                       size="sm"
//                       className="me-2 fw-bold text-decoration-none"
//                       onClick={() => handleEdit(item)}>
//                       Edit
//                     </Button>
//                     <Button
//                       variant="link"
//                       size="sm"
//                       className="text-danger fw-bold text-decoration-none"
//                       onClick={() => handleDelete(item._id)}>
//                       Delete
//                     </Button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </Table>
//         <CustomPagination
//           current={currentPage}
//           totalItems={articles.length}
//           itemsPerPage={itemsPerPage}
//           onPageChange={setCurrentPage}
//         />
//       </div>

//       {/* Article Modal */}
//       <Modal
//         show={showModal}
//         onHide={handleClose}
//         size="xl"
//         centered
//         backdrop="static">
//         <Modal.Header closeButton>
//           <Modal.Title>{editId ? "Edit" : "Create"} Article</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Row>
//               <Col lg={8}>
//                 <Form.Group className="mb-3">
//                   <Form.Label className="fw-bold">Title</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label className="fw-bold">Content</Form.Label>
//                   <TextEditor value={content} onChange={setContent} />
//                 </Form.Group>
//               </Col>
//               <Col lg={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label className="fw-bold">Category</Form.Label>
//                   <Form.Select
//                     value={categoryId}
//                     onChange={(e) => setCategoryId(e.target.value)}>
//                     <option value="">Select Category</option>
//                     {categories.map((cat) => (
//                       <option key={cat._id} value={cat._id}>
//                         {cat.categoryName}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label className="fw-bold">Status</Form.Label>
//                   <Form.Select
//                     value={status}
//                     onChange={(e) => setStatus(e.target.value)}>
//                     <option value="active">Active</option>
//                     <option value="deactive">Deactive</option>
//                   </Form.Select>
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Check
//                     type="switch"
//                     label="Featured Article"
//                     checked={featured}
//                     onChange={(e) => setFeatured(e.target.checked)}
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label className="fw-bold">Feature Image</Form.Label>
//                   <Form.Control
//                     type="file"
//                     onChange={(e) => setFeatureImage(e.target.files[0])}
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label className="fw-bold">Video Link</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={videoLink}
//                     onChange={(e) => setVideoLink(e.target.value)}
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Cancel
//           </Button>
//           <Button variant="dark" onClick={handleSubmit} disabled={loading}>
//             {loading ? "Saving..." : "Save Article"}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default ArticlePost;



import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Row, Col, Badge, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import TextEditor from "../components/common/TextEditor";
import CustomPagination from "../components/common/CustomPagination";
import {
  getAllArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  getAllCategories,
  IMG_URL,
} from "../Services/adminService";

const ArticlePost = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);

  // --- Form States ---
  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [featureImage, setFeatureImage] = useState(null);
  const [status, setStatus] = useState("active");
  const [featured, setFeatured] = useState(false);

  const getCleanImageUrl = (path) => {
    if (!path) return "https://placehold.co/55x40?text=NA";
    let cleanPath = path.replace(/\\/g, "/");
    if (cleanPath.startsWith("public/")) cleanPath = cleanPath.replace("public/", "");
    const finalPath = cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;
    return `${IMG_URL}${finalPath}`.replace(/([^:]\/)\/+/g, "$1");
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [artRes, catRes] = await Promise.all([getAllArticles(), getAllCategories()]);
      if (artRes?.status) setArticles(artRes.articles || []);
      if (catRes?.status) setCategories(catRes.categories || []);
    } catch (error) {
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleClose = () => {
    setShowModal(false);
    setEditId(null);
    setTitle("");
    setContent("");
    setCategoryId("");
    setVideoLink("");
    setFeatureImage(null);
    setStatus("active");
    setFeatured(false);
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setTitle(item.title || "");
    setContent(item.content || "");
    setCategoryId(item.category?._id || item.category || "");
    setVideoLink(item.videoLink || "");
    setStatus(item.status || "active");
    setFeatured(item.featured === true || item.featured === "true");
    setFeatureImage(null); // Reset file input
    setShowModal(true);
  };

const handleSubmit = async (e) => {
  if (e) e.preventDefault();
  if (loading) return;

  if (!title || !categoryId || !content) {
    return toast.warning("Please fill all required fields");
  }

  try {
    setLoading(true);
    const formData = new FormData();

    // Debug: Log all form values
    console.log("📝 Form Values:");
    console.log("Title:", title);
    console.log("Category ID:", categoryId);
    console.log("Status:", status);
    console.log("Featured:", featured);
    console.log("Video Link:", videoLink);
    console.log("Feature Image:", featureImage);

    // Append fields
    formData.append("title", title.trim());
    formData.append("content", content);
    formData.append("category", categoryId);
    formData.append("videoLink", videoLink || "");
    formData.append("status", status);
    formData.append("featured", featured.toString());

    // Handle featureImage carefully
    if (featureImage instanceof File) {
      if (featureImage.size > 0) {
        formData.append("featureImage", featureImage);
        console.log(
          `📤 Appending file: ${featureImage.name} (${featureImage.size} bytes)`,
        );
      } else {
        console.log("⚠️ Empty file, not appending");
      }
    } else if (editId && !featureImage) {
      // For updates without new image, you might need to send null or empty
      // formData.append("featureImage", ""); // Try this if server accepts empty
    }

    // Log FormData contents
    console.log("📦 FormData Contents:");
    for (let [key, value] of formData.entries()) {
      if (key === "featureImage" && value instanceof File) {
        console.log(`${key}: File - ${value.name} (${value.size} bytes)`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }

    // Try a simple test first (without image)
    if (featureImage instanceof File && featureImage.size > 5 * 1024 * 1024) {
      toast.warning("Image is too large (max 5MB)");
      setLoading(false);
      return;
    }

    console.log(`🔄 ${editId ? "Updating" : "Creating"} article...`);
    const res = editId
      ? await updateArticle(editId, formData)
      : await createArticle(formData);

    if (res?.status) {
      toast.success(
        editId ? "Updated successfully ✅" : "Created successfully ✅",
      );
      handleClose();
      fetchData();
    } else {
      toast.error(res?.message || "Operation failed ❌");
    }
  } catch (err) {
    console.error("❌ Submit Error Details:", {
      message: err.message,
      response: err.response?.data,
      status: err.response?.status,
      headers: err.response?.headers,
    });

    let errorMsg = "Operation failed";

    if (err.response?.data?.message) {
      errorMsg = err.response.data.message;
    } else if (err.response?.status === 500) {
      errorMsg = "Server error (500). Please try again or contact support.";
    }

    toast.error(`${errorMsg} ❌`);
  } finally {
    setLoading(false);
  }
};

  const handleDelete = async (id) => {
    if (window.confirm("Delete this article?")) {
      try {
        const res = await deleteArticle(id);
        if (res?.status) {
          toast.success("Deleted successfully");
          fetchData();
        }
      } catch (error) {
        toast.error("Delete failed");
      }
    }
  };

  const itemsPerPage = 10;
  const currentItems = articles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark">Article Management</h2>
        <Button variant="dark" className="px-4 shadow-sm" onClick={() => setShowModal(true)}>
          + Create Article
        </Button>
      </div>

      <div className="bg-white p-3 rounded shadow-sm border">
        <Table responsive hover className="mb-0 align-middle">
          <thead className="table-light">
            <tr>
              <th width="60">S.No</th>
              <th width="80">Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Featured</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading && articles.length === 0 ? (
              <tr><td colSpan="7" className="text-center py-5"><Spinner animation="border" variant="dark" /></td></tr>
            ) : articles.length === 0 ? (
              <tr><td colSpan="7" className="text-center py-4">No Articles Found</td></tr>
            ) : (
              currentItems.map((item, index) => (
                <tr key={item._id}>
                  <td className="text-muted">{String((currentPage - 1) * itemsPerPage + index + 1).padStart(2, "0")}</td>
                  <td>
                    <img
                      src={getCleanImageUrl(item.featureImage)}
                      alt="article"
                      width="55" height="40"
                      className="rounded border" style={{ objectFit: "cover" }}
                      onError={(e) => (e.target.src = "https://placehold.co/55x40?text=NA")}
                    />
                  </td>
                  <td className="fw-bold">{item.title}</td>
                  <td><Badge bg="light" className="text-dark border fw-normal">{item.category?.categoryName || "Uncategorized"}</Badge></td>
                  <td><Badge bg={item.status === "active" ? "success" : "danger"} className="text-capitalize">{item.status}</Badge></td>
                  <td>{item.featured ? <Badge bg="warning" className="text-dark">Featured</Badge> : <span className="text-muted small">No</span>}</td>
                  <td className="text-center">
                    <Button variant="outline-primary" size="sm" className="me-2 border-0 fw-bold" onClick={() => handleEdit(item)}>Edit</Button>
                    <Button variant="outline-danger" size="sm" className="border-0 fw-bold" onClick={() => handleDelete(item._id)}>Delete</Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
        <CustomPagination current={currentPage} totalItems={articles.length} itemsPerPage={itemsPerPage} onPageChange={setCurrentPage} />
      </div>

      <Modal show={showModal} onHide={handleClose} size="xl" centered backdrop="static">
        <Modal.Header closeButton className="bg-light">
          <Modal.Title className="fw-bold">{editId ? "Update" : "Create New"} Article</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form onSubmit={(e) => e.preventDefault()}>
            <Row>
              <Col lg={8}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Article Title</Form.Label>
                  <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Content Body</Form.Label>
                  <TextEditor value={content} onChange={setContent} />
                </Form.Group>
              </Col>
              <Col lg={4} className="border-start">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Category</Form.Label>
                  <Form.Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                    <option value="">Select Category</option>
                    {categories.map((cat) => (<option key={cat._id} value={cat._id}>{cat.categoryName}</option>))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Publishing Status</Form.Label>
                  <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="active">Active</option>
                    <option value="deactive">Deactive</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-4 bg-light p-2 rounded border">
                  <Form.Check type="switch" id="featured-switch" label="Mark as Featured" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Feature Image</Form.Label>
                  <Form.Control type="file" accept="image/*" onChange={(e) => setFeatureImage(e.target.files[0])} />
                  {editId && !featureImage && <div className="mt-2 small text-muted">Leave empty to keep current image</div>}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Video Link</Form.Label>
                  <Form.Control type="url" value={videoLink} onChange={(e) => setVideoLink(e.target.value)} />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-light">
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="dark" className="px-4" onClick={handleSubmit} disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : editId ? "Update Article" : "Save Article"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ArticlePost;