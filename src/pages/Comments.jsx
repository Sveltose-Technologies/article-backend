// // import React, { useState, useEffect } from "react";
// // import { Table, Button, Modal, Form, Spinner, Card } from "react-bootstrap";
// // import { toast } from "react-toastify";
// // import CustomPagination from "../components/common/CustomPagination";
// // import {
// //   getAllComments,
// //   updateComment,
// //   deleteComment,
// // } from "../Services/adminService";

// // const Comments = () => {
// //   const [commentsList, setCommentsList] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [btnLoading, setBtnLoading] = useState(false);
// //   const [showModal, setShowModal] = useState(false);

// //   // Pagination State
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const itemsPerPage = 10;

// //   // Form State
// //   const [formData, setFormData] = useState({
// //     id: "",
// //     userId: "",
// //     articleId: "",
// //     comment: "",
// //   });

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   const fetchData = async () => {
// //     setLoading(true);
// //     try {
// //       const res = await getAllComments();
// //       if (res.status) {
// //         setCommentsList(res.comments || []);
// //       }
// //     } catch (error) {
// //       toast.error("Failed to load comments");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleEditSubmit = async (e) => {
// //     e.preventDefault();
// //     setBtnLoading(true);
// //     try {
// //       const payload = {
// //         userId: formData.userId,
// //         articleId: formData.articleId || null,
// //         comment: formData.comment,
// //       };
// //       const res = await updateComment(formData.id, payload);
// //       if (res.status) {
// //         toast.success("Comment updated successfully");
// //         setShowModal(false);
// //         fetchData();
// //       }
// //     } catch (error) {
// //       toast.error(error.response?.data?.message || "Update failed");
// //     } finally {
// //       setBtnLoading(false);
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     if (window.confirm("Are you sure you want to delete this comment?")) {
// //       try {
// //         const res = await deleteComment(id);
// //         if (res.status) {
// //           toast.success("Comment deleted");
// //           fetchData();
// //         }
// //       } catch (error) {
// //         toast.error("Delete failed");
// //       }
// //     }
// //   };

// //   const indexOfLastItem = currentPage * itemsPerPage;
// //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// //   const currentItems = commentsList.slice(indexOfFirstItem, indexOfLastItem);

// //   return (
// //     <div className="container-fluid py-4">
// //       <div className="mb-4">
// //         <h2 className="fw-bold text-dark">Comments Management</h2>
// //         <p className="text-muted small">Manage user feedback and discussions</p>
// //       </div>

// //       <Card className="shadow-sm border-0 overflow-hidden">
// //         <Card.Body className="p-0">
// //           <Table responsive hover className="mb-0 align-middle">
// //             <thead className="bg-light border-bottom">
// //               <tr
// //                 style={{
// //                   fontSize: "0.85rem",
// //                   textTransform: "uppercase",
// //                   letterSpacing: "0.5px",
// //                 }}>
// //                 <th className="ps-4 py-3">S.No</th>
// //                 <th>User Name</th>
// //                 <th>Email ID</th>
// //                 <th>Phone No</th>
// //                 <th>Country</th>
// //                 <th>Date</th>
// //                 <th style={{ width: "300px" }}>Comment Description</th>
// //                 <th className="text-center pe-4">Action</th>
// //               </tr>
// //             </thead>
// //             <tbody style={{ fontSize: "0.9rem" }}>
// //               {loading ? (
// //                 <tr>
// //                   <td colSpan="8" className="text-center py-5">
// //                     <Spinner animation="border" size="sm" variant="dark" />
// //                     <span className="ms-2">Loading comments...</span>
// //                   </td>
// //                 </tr>
// //               ) : currentItems.length > 0 ? (
// //                 currentItems.map((item, index) => (
// //                   <tr key={item._id}>
// //                     <td className="ps-4">
// //                       {String(indexOfFirstItem + index + 1).padStart(2, "0")}
// //                     </td>
// //                     <td>
// //                       <span className="fw-bold text-dark">
// //                         {item.userId?.fullName || "Guest User"}
// //                       </span>
// //                     </td>
// //                     <td className="text-muted">
// //                       {item.userId?.email || "N/A"}
// //                     </td>
// //                     <td>{item.userId?.phone || "N/A"}</td>
// //                     <td>{item.userId?.country || "N/A"}</td>
// //                     <td>
// //                       {new Date(item.createdAt).toLocaleDateString("en-GB")}
// //                     </td>
// //                     <td>
// //                       <div
// //                         className="text-muted"
// //                         style={{
// //                           fontSize: "0.85rem",
// //                           display: "-webkit-box",
// //                           WebkitLineClamp: "2",
// //                           WebkitBoxOrient: "vertical",
// //                           overflow: "hidden",
// //                         }}>
// //                         {item.comment}
// //                       </div>
// //                     </td>
// //                     <td className="text-center pe-4">
// //                       <div className="d-flex justify-content-center gap-1">
// //                         <Button
// //                           variant="outline-dark"
// //                           size="sm"
// //                           className="border-0"
// //                           onClick={() => {
// //                             setFormData({
// //                               id: item._id,
// //                               userId: item.userId?._id || "",
// //                               articleId: item.articleId?._id || "",
// //                               comment: item.comment,
// //                             });
// //                             setShowModal(true);
// //                           }}>
// //                           Edit
// //                         </Button>
// //                         <Button
// //                           variant="outline-danger"
// //                           size="sm"
// //                           className="border-0"
// //                           onClick={() => handleDelete(item._id)}>
// //                           Delete
// //                         </Button>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ))
// //               ) : (
// //                 <tr>
// //                   <td colSpan="8" className="text-center py-5 text-muted">
// //                     No comments found in the database.
// //                   </td>
// //                 </tr>
// //               )}
// //             </tbody>
// //           </Table>
// //         </Card.Body>
// //       </Card>

// //       <div className="mt-4 d-flex justify-content-center">
// //         <CustomPagination
// //           current={currentPage}
// //           totalItems={commentsList.length}
// //           itemsPerPage={itemsPerPage}
// //           onPageChange={setCurrentPage}
// //         />
// //       </div>

// //       {/* Edit Modal */}
// //       <Modal
// //         show={showModal}
// //         onHide={() => setShowModal(false)}
// //         centered
// //         backdrop="static">
// //         <Modal.Header closeButton className="border-0 pb-0">
// //           <Modal.Title className="fw-bold">Update Comment</Modal.Title>
// //         </Modal.Header>
// //         <Form onSubmit={handleEditSubmit}>
// //           <Modal.Body className="p-4">
// //             <Form.Group className="mb-3">
// //               <Form.Label className="fw-bold small text-muted">
// //                 User MongoDB ID
// //               </Form.Label>
// //               <Form.Control
// //                 type="text"
// //                 value={formData.userId}
// //                 disabled
// //                 style={{
// //                   backgroundColor: "#f1f3f5",
// //                   color: "#6c757d",
// //                   border: "1px dashed #ced4da",
// //                 }}
// //               />
// //             </Form.Group>

// //             <Form.Group className="mb-3">
// //               <Form.Label className="fw-bold small text-muted">
// //                 Article MongoDB ID (Optional)
// //               </Form.Label>
// //               <Form.Control
// //                 type="text"
// //                 placeholder="Enter Article ID"
// //                 value={formData.articleId}
// //                 onChange={(e) =>
// //                   setFormData({ ...formData, articleId: e.target.value })
// //                 }
// //               />
// //             </Form.Group>

// //             <Form.Group className="mb-3">
// //               <Form.Label className="fw-bold small text-muted">
// //                 Comment Description
// //               </Form.Label>
// //               <Form.Control
// //                 as="textarea"
// //                 rows={5}
// //                 value={formData.comment}
// //                 onChange={(e) =>
// //                   setFormData({ ...formData, comment: e.target.value })
// //                 }
// //                 required
// //                 placeholder="Write the updated comment content..."
// //               />
// //             </Form.Group>
// //           </Modal.Body>
// //           <Modal.Footer className="border-0 pt-0">
// //             <Button
// //               variant="light"
// //               className="fw-bold px-4"
// //               onClick={() => setShowModal(false)}>
// //               Cancel
// //             </Button>
// //             <Button
// //               variant="dark"
// //               type="submit"
// //               className="fw-bold px-4"
// //               disabled={btnLoading}>
// //               {btnLoading ? "Updating..." : "Save Changes"}
// //             </Button>
// //           </Modal.Footer>
// //         </Form>
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default Comments;

// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   Button,
//   Modal,
//   Form,
//   Spinner,
//   Badge,
//   Row,
//   Col,
// } from "react-bootstrap";
// import { toast } from "react-toastify";
// import CustomPagination from "../components/common/CustomPagination";
// import {
//   getAllComments,
//   updateComment,
//   deleteComment,
// } from "../Services/adminService";

// const Comments = () => {
//   const [commentsList, setCommentsList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [btnLoading, setBtnLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);

//   // Pagination State
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   // Form State
//   const [formData, setFormData] = useState({
//     id: "",
//     userId: "",
//     articleId: "",
//     comment: "",
//   });

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const res = await getAllComments();
//       if (res.status) {
//         setCommentsList(res.comments || []);
//       }
//     } catch (error) {
//       toast.error("Failed to load comments");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper: Truncate Comment to 5 Words
//   const formatComment = (text) => {
//     if (!text) return "No content";
//     const words = text.trim().split(/\s+/);
//     if (words.length <= 5) return text;
//     return words.slice(0, 5).join(" ") + "...";
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     setBtnLoading(true);
//     try {
//       const payload = {
//         userId: formData.userId,
//         articleId: formData.articleId || null,
//         comment: formData.comment,
//       };
//       const res = await updateComment(formData.id, payload);
//       if (res.status) {
//         toast.success("Comment updated successfully");
//         setShowModal(false);
//         fetchData();
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Update failed");
//     } finally {
//       setBtnLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this comment?")) {
//       try {
//         const res = await deleteComment(id);
//         if (res.status) {
//           toast.success("Comment deleted");
//           fetchData();
//         }
//       } catch (error) {
//         toast.error("Delete failed");
//       }
//     }
//   };

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = commentsList.slice(indexOfFirstItem, indexOfLastItem);

//   return (
//     <div className="bg-white p-4 rounded shadow-sm border">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <div>
//           <h3 className="mb-0 fw-bold text-dark">User Comments</h3>
//           <p className="text-muted small mb-0">
//             Review and manage article discussions
//           </p>
//         </div>
//         <Badge bg="dark" className="px-3 py-2 fw-normal">
//           Total: {commentsList.length}
//         </Badge>
//       </div>

//       <Table responsive hover className="mb-0 align-middle border-top">
//         <thead className="bg-light">
//           <tr>
//             <th className="py-3">S.No</th>
//             <th className="py-3">User Info</th>
//             <th className="py-3">Country</th>
//             <th className="py-3">Date</th>
//             <th className="py-3" style={{ width: "30%" }}>
//               Comment
//             </th>
//             <th className="py-3 text-center">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {loading ? (
//             <tr>
//               <td colSpan="6" className="text-center py-5">
//                 <Spinner animation="border" size="sm" variant="dark" />
//                 <span className="ms-2">Loading...</span>
//               </td>
//             </tr>
//           ) : currentItems.length > 0 ? (
//             currentItems.map((item, index) => (
//               <tr key={item._id}>
//                 <td>{String(indexOfFirstItem + index + 1).padStart(2, "0")}</td>
//                 <td>
//                   <div className="fw-bold text-dark">
//                     {item.userId?.fullName || "Guest User"}
//                   </div>
//                   <div
//                     className="small text-muted"
//                     style={{ fontSize: "11px" }}>
//                     {item.userId?.email || "N/A"}
//                   </div>
//                 </td>
//                 <td className="text-capitalize">
//                   {item.userId?.country || "N/A"}
//                 </td>
//                 <td>{new Date(item.createdAt).toLocaleDateString("en-GB")}</td>
//                 <td className="text-muted italic">
//                   "{formatComment(item.comment)}"
//                 </td>
//                 <td className="text-center">
//                   <Button
//                     variant="link"
//                     size="sm"
//                     className="text-decoration-none fw-bold me-2"
//                     onClick={() => {
//                       setFormData({
//                         id: item._id,
//                         userId: item.userId?._id || "",
//                         articleId: item.articleId?._id || "",
//                         comment: item.comment,
//                       });
//                       setShowModal(true);
//                     }}>
//                     Edit
//                   </Button>
//                   <Button
//                     variant="link"
//                     size="sm"
//                     className="text-danger text-decoration-none fw-bold"
//                     onClick={() => handleDelete(item._id)}>
//                     Delete
//                   </Button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6" className="text-center py-5 text-muted">
//                 No comments found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </Table>

//       <div className="mt-4">
//         <CustomPagination
//           current={currentPage}
//           totalItems={commentsList.length}
//           itemsPerPage={itemsPerPage}
//           onPageChange={setCurrentPage}
//         />
//       </div>

//       {/* Edit Modal (Clean & Minimal) */}
//       <Modal
//         show={showModal}
//         onHide={() => setShowModal(false)}
//         centered
//         backdrop="static">
//         <Modal.Header closeButton className="border-0">
//           <Modal.Title className="h5 fw-bold">
//             Update Comment Content
//           </Modal.Title>
//         </Modal.Header>
//         <Form onSubmit={handleEditSubmit}>
//           <Modal.Body className="px-4 pb-4">
//             <Row>
//               <Col md={12} className="mb-3">
//                 <Form.Label className="fw-bold small text-muted">
//                   User ID (System Only)
//                 </Form.Label>
//                 <Form.Control
//                   type="text"
//                   value={formData.userId}
//                   disabled
//                   className="bg-light border-0 small"
//                 />
//               </Col>
//               <Col md={12} className="mb-3">
//                 <Form.Label className="fw-bold small">
//                   Comment Description
//                 </Form.Label>
//                 <Form.Control
//                   as="textarea"
//                   rows={6}
//                   value={formData.comment}
//                   onChange={(e) =>
//                     setFormData({ ...formData, comment: e.target.value })
//                   }
//                   required
//                   className="border-secondary-subtle"
//                   placeholder="Update the comment text here..."
//                 />
//               </Col>
//             </Row>
//           </Modal.Body>
//           <Modal.Footer className="border-0">
//             <Button
//               variant="light"
//               className="fw-bold"
//               onClick={() => setShowModal(false)}>
//               Cancel
//             </Button>
//             <Button
//               variant="dark"
//               type="submit"
//               className="px-4 fw-bold"
//               disabled={btnLoading}>
//               {btnLoading ? "Saving..." : "Save Changes"}
//             </Button>
//           </Modal.Footer>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default Comments;

import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Spinner,
  Badge,
  Row,
  Col,
} from "react-bootstrap";
import { toast } from "react-toastify";
import CustomPagination from "../components/common/CustomPagination";
import {
  getAllComments,
  updateComment,
  deleteComment,
} from "../Services/adminService";

const Comments = () => {
  const [commentsList, setCommentsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Form State
  const [formData, setFormData] = useState({
    id: "",
    userId: "",
    articleId: "",
    comment: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAllComments();
      if (res.status) {
        setCommentsList(res.comments || []);
      }
    } catch (error) {
      toast.error("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  // Helper: Truncate Comment to 5 Words
  const formatComment = (text) => {
    if (!text) return "No content";
    const words = text.trim().split(/\s+/);
    if (words.length <= 5) return text;
    return words.slice(0, 5).join(" ") + "...";
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      const payload = {
        userId: formData.userId,
        articleId: formData.articleId || null,
        comment: formData.comment,
      };
      const res = await updateComment(formData.id, payload);
      if (res.status) {
        toast.success("Comment updated successfully");
        setShowModal(false);
        fetchData();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setBtnLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        const res = await deleteComment(id);
        if (res.status) {
          toast.success("Comment deleted");
          fetchData();
        }
      } catch (error) {
        toast.error("Delete failed");
      }
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = commentsList.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="bg-white p-4 rounded shadow-sm border">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="mb-0 fw-bold text-dark">User Comments</h3>
          <p className="text-muted small mb-0">
            Monitor and moderate all user discussions
          </p>
        </div>
        <Badge bg="dark" className="px-3 py-2 fw-normal">
          Total Records: {commentsList.length}
        </Badge>
      </div>

      {/* Table Section */}
      <Table responsive hover className="mb-0 align-middle border-top">
        <thead className="bg-light">
          <tr>
            <th className="py-3">S.No</th>
            <th className="py-3">User Name</th>
            <th className="py-3">Email ID</th>
            <th className="py-3">Country</th>
            <th className="py-3">Date</th>
            <th className="py-3" style={{ width: "25%" }}>
              Comment
            </th>
            <th className="py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="7" className="text-center py-5">
                <Spinner animation="border" size="sm" variant="dark" />
                <span className="ms-2">Loading comments...</span>
              </td>
            </tr>
          ) : currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <tr key={item._id}>
                <td>{String(indexOfFirstItem + index + 1).padStart(2, "0")}</td>
                <td className="fw-bold text-dark">
                  {item.userId?.fullName || "Guest User"}
                </td>
                <td>{item.userId?.email || "N/A"}</td>
                <td className="text-capitalize">
                  {item.userId?.country || "N/A"}
                </td>
                <td>{new Date(item.createdAt).toLocaleDateString("en-GB")}</td>
                <td className="text-muted small italic">
                  {formatComment(item.comment)}
                </td>
                <td className="text-center">
                  <Button
                    variant="link"
                    size="sm"
                    className="text-decoration-none fw-bold me-2"
                    onClick={() => {
                      setFormData({
                        id: item._id,
                        userId: item.userId?._id || "",
                        articleId: item.articleId?._id || "",
                        comment: item.comment,
                      });
                      setShowModal(true);
                    }}>
                    Edit
                  </Button>
                  <Button
                    variant="link"
                    size="sm"
                    className="text-danger text-decoration-none fw-bold"
                    onClick={() => handleDelete(item._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-5 text-muted">
                No comments found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Pagination */}
      <div className="mt-4">
        <CustomPagination
          current={currentPage}
          totalItems={commentsList.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Update Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        backdrop="static">
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="h5 fw-bold">Update Comment</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEditSubmit}>
          <Modal.Body className="px-4 pb-4">
            <Row>
              <Col md={12} className="mb-3">
                <Form.Label className="fw-bold small text-muted">
                  Reference User ID
                </Form.Label>
                <Form.Control
                  type="text"
                  value={formData.userId}
                  disabled
                  className="bg-light border-0 small text-muted"
                />
              </Col>
              <Col md={12} className="mb-3">
                <Form.Label className="fw-bold small">
                  Comment Description
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  value={formData.comment}
                  onChange={(e) =>
                    setFormData({ ...formData, comment: e.target.value })
                  }
                  required
                  placeholder="Type the updated comment content here..."
                  className="border-secondary-subtle"
                />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="border-0">
            <Button
              variant="light"
              className="fw-bold"
              onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button
              variant="dark"
              type="submit"
              className="px-4 fw-bold"
              disabled={btnLoading}>
              {btnLoading ? "Saving..." : "Save Changes"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Comments;