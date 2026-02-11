// import React, { useState, useEffect } from "react";
// import { Table, Badge, Button, Modal, Form } from "react-bootstrap";
// import { toast } from "react-toastify";
// import TextEditor from "../components/common/TextEditor";
// import CustomPagination from "../components/common/CustomPagination";
// import { APP_MESSAGES } from "../constants/Messages";
// import {
//   getAllCategories,
//   createCategory,
//   updateCategory,
//   deleteCategory,
// } from "../Services/adminService";

// const Categories = () => {
//   // --- States ---
//   const [show, setShow] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [categoryName, setCategoryName] = useState("");
//   const [note, setNote] = useState("");
//   const [editId, setEditId] = useState(null);

//   // --- Pagination States ---
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   // --- Helper Function (HTML Cleanup & Word Limit) ---
//   const getShortNote = (htmlContent) => {
//     if (!htmlContent) return "N/A";
//     let plainText = htmlContent.replace(/<[^>]*>/g, "");
//     plainText = plainText.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&");
//     const words = plainText.trim().split(/\s+/);
//     if (words.length > 5) {
//       return words.slice(0, 5).join(" ") + "...";
//     }
//     return plainText;
//   };

//   // --- Fetch Categories ---
//   const fetchCategories = async () => {
//     setLoading(true);
//     try {
//       const res = await getAllCategories();
//       if (res && res.status === true) {
//         setCategories(res.categories || []);
//       }
//     } catch (error) {
//       toast.error("Failed to load categories");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   // --- Pagination Logic ---
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);

//   // --- Handlers ---
//   const handleSave = async () => {
//     if (!categoryName.trim()) {
//       toast.warning("Category Name is required");
//       return;
//     }
//     try {
//       const payload = { categoryName, note };
//       const res = await (editId
//         ? updateCategory(editId, payload)
//         : createCategory(payload));

//       if (res && res.status === true) {
//         toast.success(
//           editId ? "Updated Successfully!" : "Created Successfully!",
//         );
//         handleClose();
//         fetchCategories();
//       }
//     } catch (error) {
//       toast.error("Operation failed");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this category?")) {
//       try {
//         const res = await deleteCategory(id);
//         if (res && res.status === true) {
//           toast.success("Deleted Successfully!");
//           fetchCategories();
//         }
//       } catch (error) {
//         toast.error("Delete failed");
//       }
//     }
//   };

//   const handleEdit = (cat) => {
//     setEditId(cat._id);
//     setCategoryName(cat.categoryName);
//     setNote(cat.note || "");
//     setShow(true);
//   };

//   const handleClose = () => {
//     setShow(false);
//     setEditId(null);
//     setCategoryName("");
//     setNote("");
//   };

//   return (
//     <div className="container-fluid py-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2>Category List</h2>
//         <Button variant="dark" onClick={() => setShow(true)}>
//           + Create Category
//         </Button>
//       </div>

//       <div className="bg-white p-3 rounded shadow-sm border">
//         <Table responsive hover className="mb-0 align-middle">
//           <thead>
//             <tr>
//               <th style={{ width: "80px" }}>S.No</th>
//               <th style={{ width: "200px" }}>Category Name</th>
//               <th style={{ width: "300px" }}>Note</th>
//               <th style={{ width: "150px" }}>Date</th>
//               <th style={{ width: "100px" }}>Status</th>
//               <th style={{ width: "150px" }}>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan="6" className="text-center py-4">
//                   Loading Categories...
//                 </td>
//               </tr>
//             ) : currentItems.length > 0 ? (
//               currentItems.map((cat, index) => (
//                 <tr key={cat._id || index}>
//                   {/* S.No logic for pagination */}
//                   <td>
//                     {String(indexOfFirstItem + index + 1).padStart(2, "0")}
//                   </td>
//                   <td className="fw-bold">{cat.categoryName}</td>
//                   <td style={{ maxWidth: "300px", overflow: "hidden" }}>
//                     <span
//                       title={cat.note
//                         ?.replace(/<[^>]*>/g, "")
//                         .replace(/&nbsp;/g, " ")}>
//                       {getShortNote(cat.note)}
//                     </span>
//                   </td>
//                   <td>{new Date(cat.createdAt).toLocaleDateString()}</td>
//                   <td>
//                     <Badge
//                       bg={cat.status === "active" ? "success" : "secondary"}>
//                       {cat.status || "active"}
//                     </Badge>
//                   </td>
//                   <td>
//                     <Button
//                       variant="link"
//                       size="sm"
//                       className="text-decoration-none fw-bold me-2"
//                       onClick={() => handleEdit(cat)}>
//                       Edit
//                     </Button>
//                     <Button
//                       variant="link"
//                       size="sm"
//                       className="text-danger text-decoration-none fw-bold"
//                       onClick={() => handleDelete(cat._id)}>
//                       Delete
//                     </Button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="text-center py-4">
//                   No Categories Found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </Table>

//         {/* --- Pagination Component --- */}
//         {categories.length > 0 && (
//           <CustomPagination
//             current={currentPage}
//             totalItems={categories.length}
//             itemsPerPage={itemsPerPage}
//             onPageChange={(page) => setCurrentPage(page)}
//           />
//         )}
//       </div>

//       {/* Create / Edit Modal */}
//       <Modal
//         show={show}
//         onHide={handleClose}
//         size="lg"
//         centered
//         backdrop="static">
//         <Modal.Header closeButton>
//           <Modal.Title className="h5 fw-bold">
//             {editId ? "Update" : "Create"} Category
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label className="fw-bold small">Category Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="e.g. Technology"
//                 value={categoryName}
//                 onChange={(e) => setCategoryName(e.target.value)}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label className="fw-bold small">
//                 Note (Description)
//               </Form.Label>
//               <TextEditor value={note} onChange={setNote} />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Cancel
//           </Button>
//           <Button variant="dark" className="px-4" onClick={handleSave}>
//             {editId ? "Update Category" : "Save Category"}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default Categories;

import React, { useState, useEffect } from "react";
import { Table, Badge, Button, Modal, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import TextEditor from "../components/common/TextEditor";
import CustomPagination from "../components/common/CustomPagination";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../Services/adminService";

const Categories = () => {
  // --- States ---
  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // --- Form States ---
  const [categoryName, setCategoryName] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("active"); // Default "active"
  const [editId, setEditId] = useState(null);

  // --- Pagination States ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // --- HTML Cleanup for Table View ---
  const getShortNote = (htmlContent) => {
    if (!htmlContent) return "N/A";
    let plainText = htmlContent.replace(/<[^>]*>/g, "");
    plainText = plainText.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&");
    const words = plainText.trim().split(/\s+/);
    if (words.length > 5) {
      return words.slice(0, 5).join(" ") + "...";
    }
    return plainText;
  };

  // --- Fetch Categories ---
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await getAllCategories();
      // Console log se check karein ki status kya aa raha hai
      console.log("Categories API Response:", res);
      if (res && res.status === true) {
        setCategories(res.categories || []);
      }
    } catch (error) {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // --- Pagination Logic ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);

  // --- Handlers ---
  const handleSave = async () => {
    if (!categoryName.trim()) {
      toast.warning("Category Name is required");
      return;
    }
    try {
      // Status ko payload mein bhejna zaroori hai
      const payload = {
        categoryName: categoryName.trim(),
        note: note,
        status: status,
      };

      const res = await (editId
        ? updateCategory(editId, payload)
        : createCategory(payload));

      if (res && res.status === true) {
        toast.success(
          editId ? "Updated Successfully!" : "Created Successfully!",
        );
        handleClose();
        fetchCategories(); // List refresh karein
      } else {
        toast.error(res.message || "Operation failed");
      }
    } catch (error) {
      console.error("Error saving category:", error);
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const res = await deleteCategory(id);
        if (res && res.status === true) {
          toast.success("Deleted Successfully!");
          fetchCategories();
        }
      } catch (error) {
        toast.error("Delete failed");
      }
    }
  };

  const handleEdit = (cat) => {
    setEditId(cat._id);
    setCategoryName(cat.categoryName);
    setNote(cat.note || "");
    setStatus(cat.status || "active"); // Purana status set karein
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setEditId(null);
    setCategoryName("");
    setNote("");
    setStatus("active");
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Category List</h2>
        <Button variant="dark" onClick={() => setShow(true)}>
          + Create Category
        </Button>
      </div>

      <div className="bg-white p-3 rounded shadow-sm border">
        <Table responsive hover className="mb-0 align-middle">
          <thead className="table-light">
            <tr>
              <th style={{ width: "80px" }}>S.No</th>
              <th style={{ width: "200px" }}>Category Name</th>
              <th style={{ width: "300px" }}>Note</th>
              <th style={{ width: "150px" }}>Date</th>
              <th style={{ width: "120px" }}>Status</th>
              <th style={{ width: "150px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-5">
                  <Spinner animation="border" size="sm" className="me-2" />
                  Loading Categories...
                </td>
              </tr>
            ) : currentItems.length > 0 ? (
              currentItems.map((cat, index) => (
                <tr key={cat._id || index}>
                  <td>
                    {String(indexOfFirstItem + index + 1).padStart(2, "0")}
                  </td>
                  <td className="fw-bold">{cat.categoryName}</td>
                  <td style={{ maxWidth: "300px", overflow: "hidden" }}>
                    <span title={cat.note?.replace(/<[^>]*>/g, "")}>
                      {getShortNote(cat.note)}
                    </span>
                  </td>
                  <td>{new Date(cat.createdAt).toLocaleDateString()}</td>
                  <td>
                    {/* Status Badge - Dynamic Colors */}
                    <Badge bg={cat.status === "active" ? "success" : "danger"}>
                      {cat.status === "active" ? "Active" : "Deactive"}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      variant="link"
                      size="sm"
                      className="text-decoration-none fw-bold me-2"
                      onClick={() => handleEdit(cat)}>
                      Edit
                    </Button>
                    <Button
                      variant="link"
                      size="sm"
                      className="text-danger text-decoration-none fw-bold"
                      onClick={() => handleDelete(cat._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-muted">
                  No Categories Found
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* --- Pagination --- */}
        {!loading && categories.length > 0 && (
          <CustomPagination
            current={currentPage}
            totalItems={categories.length}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>

      {/* --- Create / Edit Modal --- */}
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        centered
        backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title className="h5 fw-bold">
            {editId ? "Update" : "Create"} Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="row">
              <div className="col-md-8">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold small">
                    Category Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g. Technology"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="col-md-4">
                {/* --- Status Dropdown --- */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold small">Status</Form.Label>
                  <Form.Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}>
                    <option value="active">Active</option>
                    <option value="deactive">Deactive</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold small">
                Note (Description)
              </Form.Label>
              <TextEditor value={note} onChange={setNote} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="dark" className="px-4" onClick={handleSave}>
            {editId ? "Update Category" : "Save Category"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Categories;