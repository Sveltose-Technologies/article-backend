// // // import React, { useState } from "react";
// // // import { Card, Form, Button, Tabs, Tab } from "react-bootstrap";
// // // import TextEditor from "../components/common/TextEditor";

// // // const Settings = () => {
// // //   const [about, setAbout] = useState("");
// // //   const [terms, setTerms] = useState("");
// // //   const [privacy, setPrivacy] = useState("");

// // //   return (
// // //     <Card className="border-0 shadow-sm p-4">
// // //       <h2 className="mb-4">General Settings</h2>
// // //       <Tabs
// // //         defaultActiveKey="about"
// // //         className="mb-4 border-bottom-0 custom-tabs">
// // //         <Tab eventKey="about" title="About Us">
// // //           <div className="py-3">
// // //             <label className="fw-bold mb-2">Edit About Us Content</label>
// // //             <TextEditor value={about} onChange={setAbout} />
// // //           </div>
// // //         </Tab>
// // //         <Tab eventKey="terms" title="Terms & Condition">
// // //           <div className="py-3">
// // //             <label className="fw-bold mb-2">
// // //               Edit Terms & Condition Content
// // //             </label>
// // //             <TextEditor value={terms} onChange={setTerms} />
// // //           </div>
// // //         </Tab>
// // //         <Tab eventKey="privacy" title="Privacy Policy">
// // //           <div className="py-3">
// // //             <label className="fw-bold mb-2">Edit Privacy Policy Content</label>
// // //             <TextEditor value={privacy} onChange={setPrivacy} />
// // //           </div>
// // //         </Tab>
// // //         <Tab eventKey="contact" title="Contact Info">
// // //           <div className="py-3" style={{ maxWidth: "500px" }}>
// // //             <Form.Group className="mb-3">
// // //               <Form.Label>Contact Email</Form.Label>
// // //               <Form.Control type="email" placeholder="admin@articleflow.com" />
// // //             </Form.Group>
// // //             <Form.Group className="mb-3">
// // //               <Form.Label>Phone Number</Form.Label>
// // //               <Form.Control type="text" placeholder="+91..." />
// // //             </Form.Group>
// // //             <Form.Group className="mb-3">
// // //               <Form.Label>Office Address</Form.Label>
// // //               <Form.Control as="textarea" rows={3} />
// // //             </Form.Group>
// // //           </div>
// // //         </Tab>
// // //       </Tabs>
// // //       <div className="mt-4">
// // //         <Button variant="dark" className="px-5">
// // //           Save Changes
// // //         </Button>
// // //       </div>
// // //     </Card>
// // //   );
// // // };

// // // export default Settings;

// // import React, { useState, useEffect } from "react";
// // import {
// //   Card,
// //   Table,
// //   Button,
// //   Modal,
// //   Form,
// //   Tabs,
// //   Tab,
// //   Spinner,
// // } from "react-bootstrap";
// // import { toast } from "react-toastify";
// // import TextEditor from "../components/common/TextEditor";
// // // Import your service methods
// // import {
// //   getAllAboutUs,
// //   updateAboutUs,
// //   createAboutUs,
// //   deleteAboutUs,
// //   IMG_URL,
// // } from "../Services/adminService";

// // const Settings = () => {
// //   const [activeTab, setActiveTab] = useState("about");
// //   const [showModal, setShowModal] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [editId, setEditId] = useState(null);

// //   // --- Data Lists ---
// //   const [aboutList, setAboutList] = useState([]);
// //   const [termsList, setTermsList] = useState([]);
// //   const [privacyList, setPrivacyList] = useState([]);
// //   const [contactList, setContactList] = useState([]);

// //   // --- Form States ---
// //   const [textData, setTextData] = useState("");
// //   const [imageFile, setImageFile] = useState(null);
// //   const [contactData, setContactData] = useState({
// //     email: "",
// //     phone: "",
// //     address: "",
// //   });

// //   // Fetch data based on active tab
// //   const fetchData = async () => {
// //     setLoading(true);
// //     try {
// //       if (activeTab === "about") {
// //         const res = await getAllAboutUs();
// //         if (res.status) setAboutList(res.about || []);
// //       }
// //       // Add fetch calls for terms, privacy, contact here when APIs are ready
// //     } catch (error) {
// //       console.error("Fetch error:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchData();
// //   }, [activeTab]);

// //   const handleOpenModal = (item = null) => {
// //     if (item) {
// //       setEditId(item._id);
// //       if (activeTab === "contact") {
// //         setContactData({
// //           email: item.email,
// //           phone: item.phone,
// //           address: item.address,
// //         });
// //       } else {
// //         setTextData(item.text);
// //       }
// //     } else {
// //       setEditId(null);
// //       setTextData("");
// //       setImageFile(null);
// //       setContactData({ email: "", phone: "", address: "" });
// //     }
// //     setShowModal(true);
// //   };

// //   const handleCloseModal = () => {
// //     setShowModal(false);
// //     setEditId(null);
// //   };

// //   const renderTable = (list, type) => (
// //     <div className="bg-white p-3 rounded border mt-3">
// //       <div className="d-flex justify-content-between align-items-center mb-3">
// //         <h5 className="fw-bold mb-0 text-capitalize">{type} List</h5>
// //         <Button variant="dark" size="sm" onClick={() => handleOpenModal()}>
// //           + Add {type}
// //         </Button>
// //       </div>
// //       <Table responsive hover className="align-middle">
// //         <thead className="table-light">
// //           <tr style={{ fontSize: "0.85rem" }}>
// //             <th>S.No</th>
// //             {activeTab === "about" && <th>Image</th>}
// //             {activeTab === "contact" ? (
// //               <>
// //                 <th>Email</th>
// //                 <th>Phone</th>
// //                 <th>Address</th>
// //               </>
// //             ) : (
// //               <th>Description</th>
// //             )}
// //             <th>Date</th>
// //             <th className="text-center">Action</th>
// //           </tr>
// //         </thead>
// //         <tbody style={{ fontSize: "0.9rem" }}>
// //           {loading ? (
// //             <tr>
// //               <td colSpan="6" className="text-center py-4">
// //                 <Spinner animation="border" size="sm" />
// //               </td>
// //             </tr>
// //           ) : list.length > 0 ? (
// //             list.map((item, index) => (
// //               <tr key={item._id}>
// //                 <td>{String(index + 1).padStart(2, "0")}</td>

// //                 {/* --- FIXED IMAGE CELL --- */}
// //                 {activeTab === "about" && (
// //                   <td>
// //                     <img
// //                       src={
// //                         item.image
// //                           ? `${IMG_URL}${item.image.replace(/\\/g, "/")}`
// //                           : "https://placehold.jp/50x40.png?text=No+Img"
// //                       }
// //                       alt="about"
// //                       width="60"
// //                       height="45"
// //                       className="rounded border shadow-sm"
// //                       style={{ objectFit: "cover" }}
// //                       onError={(e) => {
// //                         e.target.src =
// //                           "https://placehold.jp/50x40.png?text=Error";
// //                       }}
// //                     />
// //                   </td>
// //                 )}

// //                 {activeTab === "contact" ? (
// //                   <>
// //                     <td>{item.email}</td>
// //                     <td>{item.phone}</td>
// //                     <td>{item.address}</td>
// //                   </>
// //                 ) : (
// //                   <td>
// //                     <div
// //                       className="text-truncate"
// //                       style={{ maxWidth: "350px" }}
// //                       dangerouslySetInnerHTML={{ __html: item.text }}
// //                     />
// //                   </td>
// //                 )}
// //                 <td>{new Date(item.createdAt).toLocaleDateString()}</td>
// //                 <td className="text-center">
// //                   <Button
// //                     variant="link"
// //                     size="sm"
// //                     className="text-decoration-none fw-bold me-2"
// //                     onClick={() => handleOpenModal(item)}>
// //                     Edit
// //                   </Button>
// //                   <Button
// //                     variant="link"
// //                     size="sm"
// //                     className="text-decoration-none fw-bold text-danger">
// //                     Delete
// //                   </Button>
// //                 </td>
// //               </tr>
// //             ))
// //           ) : (
// //             <tr>
// //               <td colSpan="6" className="text-center py-4 text-muted">
// //                 No entries found.
// //               </td>
// //             </tr>
// //           )}
// //         </tbody>
// //       </Table>
// //     </div>
// //   );

// //   return (
// //     <Card className="border-0 shadow-sm p-4">
// //       <h2 className="fw-bold mb-4">General Settings</h2>

// //       <Tabs
// //         activeKey={activeTab}
// //         onSelect={(k) => setActiveTab(k)}
// //         className="custom-tabs border-bottom-0">
// //         <Tab eventKey="about" title="About Us">
// //           {renderTable(aboutList, "about us")}
// //         </Tab>
// //         <Tab eventKey="terms" title="Terms & Condition">
// //           {renderTable(termsList, "terms")}
// //         </Tab>
// //         <Tab eventKey="privacy" title="Privacy Policy">
// //           {renderTable(privacyList, "privacy")}
// //         </Tab>
// //         <Tab eventKey="contact" title="Contact Info">
// //           {renderTable(contactList, "contact")}
// //         </Tab>
// //       </Tabs>

// //       {/* Dynamic Modal */}
// //       <Modal
// //         show={showModal}
// //         onHide={handleCloseModal}
// //         size={activeTab === "contact" ? "md" : "lg"}
// //         centered
// //         backdrop="static">
// //         <Modal.Header closeButton>
// //           <Modal.Title className="fw-bold">
// //             {editId ? "Edit" : "Add"} {activeTab.replace("-", " ")}
// //           </Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body>
// //           <Form>
// //             {activeTab === "about" && (
// //               <Form.Group className="mb-3">
// //                 <Form.Label className="fw-bold small">Upload Image</Form.Label>
// //                 <Form.Control
// //                   type="file"
// //                   onChange={(e) => setImageFile(e.target.files[0])}
// //                   accept="image/*"
// //                 />
// //               </Form.Group>
// //             )}

// //             {activeTab === "contact" ? (
// //               <>
// //                 <Form.Group className="mb-3">
// //                   <Form.Label className="fw-bold small">
// //                     Email Address
// //                   </Form.Label>
// //                   <Form.Control
// //                     type="email"
// //                     value={contactData.email}
// //                     onChange={(e) =>
// //                       setContactData({ ...contactData, email: e.target.value })
// //                     }
// //                   />
// //                 </Form.Group>
// //                 <Form.Group className="mb-3">
// //                   <Form.Label className="fw-bold small">
// //                     Phone Number
// //                   </Form.Label>
// //                   <Form.Control
// //                     type="text"
// //                     value={contactData.phone}
// //                     onChange={(e) =>
// //                       setContactData({ ...contactData, phone: e.target.value })
// //                     }
// //                   />
// //                 </Form.Group>
// //                 <Form.Group className="mb-3">
// //                   <Form.Label className="fw-bold small">
// //                     Office Address
// //                   </Form.Label>
// //                   <Form.Control
// //                     as="textarea"
// //                     rows={3}
// //                     value={contactData.address}
// //                     onChange={(e) =>
// //                       setContactData({
// //                         ...contactData,
// //                         address: e.target.value,
// //                       })
// //                     }
// //                   />
// //                 </Form.Group>
// //               </>
// //             ) : (
// //               <Form.Group className="mb-3">
// //                 <Form.Label className="fw-bold small">
// //                   Content Description
// //                 </Form.Label>
// //                 <TextEditor value={textData} onChange={setTextData} />
// //               </Form.Group>
// //             )}
// //           </Form>
// //         </Modal.Body>
// //         <Modal.Footer>
// //           <Button variant="secondary" onClick={handleCloseModal}>
// //             Cancel
// //           </Button>
// //           <Button variant="dark" onClick={handleCloseModal}>
// //             Save Changes
// //           </Button>
// //         </Modal.Footer>
// //       </Modal>
// //     </Card>
// //   );
// // };

// // export default Settings;

// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   Table,
//   Button,
//   Modal,
//   Form,
//   Tabs,
//   Tab,
//   Spinner,
// } from "react-bootstrap";
// import { toast } from "react-toastify";
// import TextEditor from "../components/common/TextEditor";
// import {
//   getAllAboutUs,
//   updateAboutUs,
//   createAboutUs,
//   deleteAboutUs,
//   IMG_URL,
// } from "../Services/adminService";

// const Settings = () => {
//   const [activeTab, setActiveTab] = useState("about");
//   const [showModal, setShowModal] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [btnLoading, setBtnLoading] = useState(false);
//   const [editId, setEditId] = useState(null);

//   // --- Data Lists ---
//   const [aboutList, setAboutList] = useState([]);
//   const [termsList, setTermsList] = useState([]);
//   const [privacyList, setPrivacyList] = useState([]);
//   const [contactList, setContactList] = useState([]);

//   // --- Form States ---
//   const [textData, setTextData] = useState("");
//   const [imageFile, setImageFile] = useState(null);
//   const [contactData, setContactData] = useState({
//     email: "",
//     phone: "",
//     address: "",
//   });
//   // Function to remove HTML tags and show clean text in table
//   const stripHtml = (html) => {
//     const doc = new DOMParser().parseFromString(html, "text/html");
//     return doc.body.textContent || "";
//   };
//   // 1. FETCH DATA
//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       if (activeTab === "about") {
//         const res = await getAllAboutUs();
//         if (res.status) setAboutList(res.about || []);
//       }
//       // Add fetch logic for other tabs here as needed
//     } catch (error) {
//       toast.error("Failed to fetch data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [activeTab]);

//   // 2. OPEN/CLOSE MODAL
//   const handleOpenModal = (item = null) => {
//     if (item) {
//       setEditId(item._id);
//       if (activeTab === "contact") {
//         setContactData({
//           email: item.email,
//           phone: item.phone,
//           address: item.address,
//         });
//       } else {
//         setTextData(item.text);
//       }
//     } else {
//       setEditId(null);
//       setTextData("");
//       setImageFile(null);
//       setContactData({ email: "", phone: "", address: "" });
//     }
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setEditId(null);
//   };

//   // 3. CREATE & UPDATE LOGIC
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setBtnLoading(true);

//     try {
//       if (activeTab === "about") {
//         const formData = new FormData();
//         formData.append("text", textData);
//         if (imageFile) formData.append("image", imageFile);

//         const res = editId
//           ? await updateAboutUs(editId, formData)
//           : await createAboutUs(formData);

//         if (res.status) {
//           toast.success(
//             editId ? "Updated Successfully" : "Created Successfully",
//           );
//           handleCloseModal();
//           fetchData();
//         }
//       } else {
//         toast.info("Save logic for this tab is under development");
//         handleCloseModal();
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Operation failed");
//     } finally {
//       setBtnLoading(false);
//     }
//   };

//   // 4. DELETE LOGIC
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this?")) {
//       try {
//         const res = await deleteAboutUs(id);
//         if (res.status) {
//           toast.success("Deleted successfully");
//           fetchData();
//         }
//       } catch (error) {
//         toast.error("Delete failed");
//       }
//     }
//   };

//   const formatDescription = (html, limit) => {

//     const plainText = html.replace(/<[^>]*>/g, "");

//     const words = plainText.split(/\s+/).filter((word) => word.length > 0);

//     if (words.length <= limit) return plainText;

//     return words.slice(0, limit).join(" ") + "...";
//   };
//   const renderTable = (list, type) => (
//     <div className="bg-white p-3 rounded border mt-3">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h5 className="fw-bold mb-0 text-capitalize">{type} List</h5>
//         <Button variant="dark" size="sm" onClick={() => handleOpenModal()}>
//           + Create New
//         </Button>
//       </div>
//       <Table responsive hover className="align-middle">
//         <thead className="table-light">
//           <tr style={{ fontSize: "0.85rem" }}>
//             <th>S.No</th>
//             {activeTab === "about" && <th>Image</th>}
//             {activeTab === "contact" ? (
//               <>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Address</th>
//               </>
//             ) : (
//               <th>Description</th>
//             )}
//             <th>Date</th>
//             <th className="text-center">Action</th>
//           </tr>
//         </thead>
//         <tbody style={{ fontSize: "0.9rem" }}>
//           {loading ? (
//             <tr>
//               <td colSpan="6" className="text-center py-5">
//                 <Spinner animation="border" size="sm" />
//               </td>
//             </tr>
//           ) : list.length > 0 ? (
//             list.map((item, index) => (
//               <tr key={item._id}>
//                 <td>{String(index + 1).padStart(2, "0")}</td>
//                 {activeTab === "about" && (
//                   <td>
//                     <img
//                       src={
//                         item.image
//                           ? `${IMG_URL}${item.image.replace(/\\/g, "/")}`
//                           : "https://placehold.jp/50x40.png?text=NA"
//                       }
//                       alt="about"
//                       width="60"
//                       height="40"
//                       className="rounded border shadow-sm"
//                       onError={(e) => {
//                         e.target.src =
//                           "https://placehold.jp/50x40.png?text=Error";
//                       }}
//                     />
//                   </td>
//                 )}
//                 {activeTab === "contact" ? (
//                   <>
//                     <td>{item.email}</td>
//                     <td>{item.phone}</td>
//                     <td>{item.address}</td>
//                   </>
//                 ) : (
//                   <td>
//                     <div
//                       className="text-truncate"
//                       style={{ maxWidth: "450px", whiteSpace: "pre-wrap" }}
//                       title={stripHtml(item.text)}
//                     >
//                       {stripHtml(item.text)}
//                     </div>
//                   </td>
//                 )}
//                 <td>{new Date(item.createdAt).toLocaleDateString()}</td>
//                 <td className="text-center">
//                   <Button
//                     variant="link"
//                     size="sm"
//                     className="fw-bold me-2"
//                     onClick={() => handleOpenModal(item)}>
//                     Edit
//                   </Button>
//                   <Button
//                     variant="link"
//                     size="sm"
//                     className="text-danger fw-bold"
//                     onClick={() => handleDelete(item._id)}>
//                     Delete
//                   </Button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6" className="text-center py-4 text-muted">
//                 No data found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </Table>
//     </div>
//   );

//   return (
//     <Card className="border-0 shadow-sm p-4">
//       <h2 className="fw-bold mb-4">General Settings</h2>
//       <Tabs
//         activeKey={activeTab}
//         onSelect={(k) => setActiveTab(k)}
//         className="custom-tabs border-bottom-0">
//         <Tab eventKey="about" title="About Us">
//           {renderTable(aboutList, "about us")}
//         </Tab>
//         <Tab eventKey="terms" title="Terms & Condition">
//           {renderTable(termsList, "terms")}
//         </Tab>
//         <Tab eventKey="privacy" title="Privacy Policy">
//           {renderTable(privacyList, "privacy")}
//         </Tab>
//         <Tab eventKey="contact" title="Contact Info">
//           {renderTable(contactList, "contact")}
//         </Tab>
//       </Tabs>

//       {/* Dynamic Modal */}
//       <Modal
//         show={showModal}
//         onHide={handleCloseModal}
//         size={activeTab === "contact" ? "md" : "lg"}
//         centered
//         backdrop="static">
//         <Modal.Header closeButton>
//           <Modal.Title className="fw-bold">
//             {editId ? "Update" : "Create"} {activeTab}
//           </Modal.Title>
//         </Modal.Header>
//         <Form onSubmit={handleSubmit}>
//           <Modal.Body>
//             {activeTab === "about" && (
//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold small">Upload Image</Form.Label>
//                 <Form.Control
//                   type="file"
//                   onChange={(e) => setImageFile(e.target.files[0])}
//                   accept="image/*"
//                 />
//               </Form.Group>
//             )}
//             {activeTab === "contact" ? (
//               <>{/* Contact fields */}</>
//             ) : (
//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold small">
//                   Content Description
//                 </Form.Label>
//                 <TextEditor value={textData} onChange={setTextData} />
//               </Form.Group>
//             )}
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleCloseModal}>
//               Cancel
//             </Button>
//             <Button variant="dark" type="submit" disabled={btnLoading}>
//               {btnLoading ? "Processing..." : "Save Changes"}
//             </Button>
//           </Modal.Footer>
//         </Form>
//       </Modal>
//     </Card>
//   );
// };;

// export default Settings;

// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   Table,
//   Button,
//   Modal,
//   Form,
//   Tabs,
//   Tab,
//   Spinner,
// } from "react-bootstrap";
// import { toast } from "react-toastify";
// import TextEditor from "../components/common/TextEditor";
// import CustomPagination from "../components/common/CustomPagination";
// import {
//   getAllAboutUs,
//   updateAboutUs,
//   createAboutUs,
//   deleteAboutUs,
//   IMG_URL,
// } from "../Services/adminService";

// const Settings = () => {
//   const [activeTab, setActiveTab] = useState("about");
//   const [showModal, setShowModal] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [btnLoading, setBtnLoading] = useState(false);
//   const [editId, setEditId] = useState(null);

//   // --- Pagination State ---
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   // --- Data Lists ---
//   const [aboutList, setAboutList] = useState([]);
//   const [termsList, setTermsList] = useState([]);
//   const [privacyList, setPrivacyList] = useState([]);
//   const [contactList, setContactList] = useState([]);

//   // --- Form States ---
//   const [textData, setTextData] = useState("");
//   const [imageFile, setImageFile] = useState(null);
//   const [contactData, setContactData] = useState({
//     email: "",
//     phone: "",
//     address: "",
//   });

//   // Helper: Strip HTML tags and entities like &nbsp;
//   const stripHtml = (html) => {
//     if (!html) return "";
//     const cleanText = html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ");
//     return cleanText;
//   };

//   // Helper: Limit text to exactly 5 words
//   const formatDescription = (html, limit) => {
//     const plainText = stripHtml(html);
//     const words = plainText.split(/\s+/).filter((word) => word.length > 0);
//     if (words.length <= limit) return plainText;
//     return words.slice(0, limit).join(" ") + "...";
//   };

//   // 1. FETCH DATA
//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       if (activeTab === "about") {
//         const res = await getAllAboutUs();
//         if (res.status) setAboutList(res.about || []);
//       }
//       // Add fetch logic for other tabs (Terms, Privacy, Contact) here
//     } catch (error) {
//       toast.error("Failed to fetch data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     setCurrentPage(1); // Reset page on tab change
//     fetchData();
//   }, [activeTab]);

//   // 2. OPEN/CLOSE MODAL
//   const handleOpenModal = (item = null) => {
//     if (item) {
//       setEditId(item._id);
//       if (activeTab === "contact") {
//         setContactData({
//           email: item.email || "",
//           phone: item.phone || "",
//           address: item.address || "",
//         });
//       } else {
//         setTextData(item.text || "");
//       }
//     } else {
//       setEditId(null);
//       setTextData("");
//       setImageFile(null);
//       setContactData({ email: "", phone: "", address: "" });
//     }
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setEditId(null);
//   };

//   // 3. CREATE & UPDATE LOGIC
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setBtnLoading(true);

//     try {
//       if (activeTab === "about") {
//         const formData = new FormData();
//         formData.append("text", textData);
//         if (imageFile) formData.append("image", imageFile);

//         const res = editId
//           ? await updateAboutUs(editId, formData)
//           : await createAboutUs(formData);

//         if (res.status) {
//           toast.success(
//             editId ? "Updated Successfully" : "Created Successfully",
//           );
//           handleCloseModal();
//           fetchData();
//         }
//       } else {
//         toast.info("Save logic for this tab is under development");
//         handleCloseModal();
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Operation failed");
//     } finally {
//       setBtnLoading(false);
//     }
//   };

//   // 4. DELETE LOGIC
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this?")) {
//       try {
//         const res = await deleteAboutUs(id);
//         if (res.status) {
//           toast.success("Deleted successfully");
//           fetchData();
//         }
//       } catch (error) {
//         toast.error("Delete failed");
//       }
//     }
//   };

//   const renderTable = (list, type) => {
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);

//     return (
//       <div className="bg-white p-3 rounded border mt-3">
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <h5 className="fw-bold mb-0 text-capitalize">{type} List</h5>
//           <Button variant="dark" size="sm" onClick={() => handleOpenModal()}>
//             + Create New
//           </Button>
//         </div>
//         <Table responsive hover className="align-middle mb-0">
//           <thead className="table-light">
//             <tr style={{ fontSize: "0.85rem" }}>
//               <th>S.No</th>
//               {activeTab === "about" && <th>Image</th>}
//               {activeTab === "contact" ? (
//                 <>
//                   <th>Email</th>
//                   <th>Phone</th>
//                   <th>Address</th>
//                 </>
//               ) : (
//                 <th>Description</th>
//               )}
//               <th>Date</th>
//               <th className="text-center">Action</th>
//             </tr>
//           </thead>
//           <tbody style={{ fontSize: "0.9rem" }}>
//             {loading ? (
//               <tr>
//                 <td colSpan="6" className="text-center py-5">
//                   <Spinner animation="border" size="sm" />
//                 </td>
//               </tr>
//             ) : currentItems.length > 0 ? (
//               currentItems.map((item, index) => (
//                 <tr key={item._id} style={{ height: "70px" }}>
//                   <td>
//                     {String(indexOfFirstItem + index + 1).padStart(2, "0")}
//                   </td>
//                   {activeTab === "about" && (
//                     <td>
//                       <img
//                         src={
//                           item.image
//                             ? `${IMG_URL}${item.image.replace(/\\/g, "/")}`
//                             : "https://placehold.jp/50x40.png?text=NA"
//                         }
//                         alt="about"
//                         width="60"
//                         height="40"
//                         className="rounded border shadow-sm"
//                         style={{ objectFit: "cover" }}
//                         onError={(e) => {
//                           e.target.src =
//                             "https://placehold.jp/50x40.png?text=Error";
//                         }}
//                       />
//                     </td>
//                   )}
//                   {activeTab === "contact" ? (
//                     <>
//                       <td>{item.email}</td>
//                       <td>{item.phone}</td>
//                       <td>{item.address}</td>
//                     </>
//                   ) : (
//                     <td>
//                       <div
//                         style={{ maxWidth: "450px", color: "#555" }}
//                         title={stripHtml(item.text)}>
//                         {formatDescription(item.text, 5)}
//                       </div>
//                     </td>
//                   )}
//                   <td>{new Date(item.createdAt).toLocaleDateString()}</td>
//                   <td className="text-center">
//                     <Button
//                       variant="link"
//                       size="sm"
//                       className="fw-bold me-2 text-decoration-none"
//                       onClick={() => handleOpenModal(item)}>
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
//             ) : (
//               <tr>
//                 <td colSpan="6" className="text-center py-4 text-muted">
//                   No data found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </Table>

//         {list.length > itemsPerPage && (
//           <div className="mt-4">
//             <CustomPagination
//               current={currentPage}
//               totalItems={list.length}
//               itemsPerPage={itemsPerPage}
//               onPageChange={setCurrentPage}
//             />
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="container-fluid py-4">
//       <Card className="border-0 shadow-sm p-4">
//         <h2 className="fw-bold mb-4 text-dark">General Settings</h2>
//         <Tabs
//           activeKey={activeTab}
//           onSelect={(k) => setActiveTab(k)}
//           className="custom-tabs border-bottom-0">
//           <Tab eventKey="about" title="About Us">
//             {renderTable(aboutList, "about us")}
//           </Tab>
//           <Tab eventKey="terms" title="Terms & Condition">
//             {renderTable(termsList, "terms")}
//           </Tab>
//           <Tab eventKey="privacy" title="Privacy Policy">
//             {renderTable(privacyList, "privacy")}
//           </Tab>
//           <Tab eventKey="contact" title="Contact Info">
//             {renderTable(contactList, "contact")}
//           </Tab>
//         </Tabs>

//         {/* Dynamic Modal */}
//         <Modal
//           show={showModal}
//           onHide={handleCloseModal}
//           size={activeTab === "contact" ? "md" : "lg"}
//           centered
//           backdrop="static">
//           <Modal.Header closeButton className="border-0 pb-0">
//             <Modal.Title className="fw-bold">
//               {editId ? "Update" : "Create"} {activeTab.toUpperCase()}
//             </Modal.Title>
//           </Modal.Header>
//           <Form onSubmit={handleSubmit}>
//             <Modal.Body className="p-4">
//               {activeTab === "about" && (
//                 <Form.Group className="mb-4">
//                   <Form.Label className="fw-bold small">
//                     Featured Image
//                   </Form.Label>
//                   <Form.Control
//                     type="file"
//                     onChange={(e) => setImageFile(e.target.files[0])}
//                     accept="image/*"
//                   />
//                 </Form.Group>
//               )}

//               {activeTab === "contact" ? (
//                 <>
//                   <Form.Group className="mb-3">
//                     <Form.Label className="fw-bold small">Email</Form.Label>
//                     <Form.Control
//                       type="email"
//                       value={contactData.email}
//                       onChange={(e) =>
//                         setContactData({
//                           ...contactData,
//                           email: e.target.value,
//                         })
//                       }
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label className="fw-bold small">Phone</Form.Label>
//                     <Form.Control
//                       type="text"
//                       value={contactData.phone}
//                       onChange={(e) =>
//                         setContactData({
//                           ...contactData,
//                           phone: e.target.value,
//                         })
//                       }
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label className="fw-bold small">Address</Form.Label>
//                     <Form.Control
//                       as="textarea"
//                       rows={3}
//                       value={contactData.address}
//                       onChange={(e) =>
//                         setContactData({
//                           ...contactData,
//                           address: e.target.value,
//                         })
//                       }
//                     />
//                   </Form.Group>
//                 </>
//               ) : (
//                 <Form.Group className="mb-3">
//                   <Form.Label className="fw-bold small">
//                     Content Description
//                   </Form.Label>
//                   <TextEditor value={textData} onChange={setTextData} />
//                 </Form.Group>
//               )}
//             </Modal.Body>
//             <Modal.Footer className="border-0 pt-0">
//               <Button
//                 variant="light"
//                 className="fw-bold px-4"
//                 onClick={handleCloseModal}>
//                 Cancel
//               </Button>
//               <Button
//                 variant="dark"
//                 type="submit"
//                 className="fw-bold px-4"
//                 disabled={btnLoading}>
//                 {btnLoading ? "Processing..." : "Save Changes"}
//               </Button>
//             </Modal.Footer>
//           </Form>
//         </Modal>
//       </Card>
//     </div>
//   );
// };

// export default Settings;

import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  Tabs,
  Tab,
  Spinner,
  Alert,
} from "react-bootstrap";
import { toast } from "react-toastify";
import TextEditor from "../components/common/TextEditor";
import CustomPagination from "../components/common/CustomPagination";
import {
  getAllAboutUs,
  updateAboutUs,
  createAboutUs,
  deleteAboutUs,
  getAllContactUs,
  updateContactUs,
  deleteContactUs,
  getFullImageUrl,
} from "../Services/adminService";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // --- Data States ---
  const [aboutList, setAboutList] = useState([]);
  const [contactList, setContactList] = useState([]);

  // Terms & Privacy ke liye static data
  const [termsData, setTermsData] = useState({
    _id: "static-terms",
    text: "<h3>Terms & Conditions</h3><p>Our terms and conditions are currently being prepared. Please check back soon for updates.</p><p>In the meantime, you can contact us if you have any questions.</p>",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const [privacyData, setPrivacyData] = useState({
    _id: "static-privacy",
    text: "<h3>Privacy Policy</h3><p>Our privacy policy is under development. We are committed to protecting your data and will update this section shortly.</p><p>We value your privacy and will ensure transparent data practices.</p>",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  // --- Form States ---
  const [textData, setTextData] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Terms & Privacy ke liye form state
  const [staticTextData, setStaticTextData] = useState("");

  // Helper functions
  const stripHtml = (html) => {
    if (!html) return "";
    const cleanText = html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ");
    return cleanText;
  };

  const formatDescription = (html, limit) => {
    const plainText = stripHtml(html);
    const words = plainText.split(/\s+/).filter((word) => word.length > 0);
    if (words.length <= limit) return plainText;
    return words.slice(0, limit).join(" ") + "...";
  };

  // Fetch data for About Us and Contact Us
  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === "about") {
        const res = await getAllAboutUs();
        console.log("About Us Response:", res);

        // API returns sections array directly from the fix
        if (Array.isArray(res)) {
          setAboutList(res);
        } else if (res && res.sections && Array.isArray(res.sections)) {
          setAboutList(res.sections);
        } else if (res && res.data && res.data.sections) {
          setAboutList(res.data.sections);
        } else {
          setAboutList([]);
        }
      } else if (activeTab === "contact") {
        const res = await getAllContactUs();
        console.log("Contact Us Response:", res);

        if (Array.isArray(res)) {
          setContactList(res);
        } else if (res && res.data) {
          setContactList(res.data);
        } else {
          setContactList([]);
        }
      }
      // Terms & Privacy static rahenge, fetch nahi karenge
    } catch (error) {
      console.error("Fetch error:", error);
      if (activeTab === "about") {
        toast.error("Failed to fetch About Us data");
        setAboutList([]);
      } else if (activeTab === "contact") {
        toast.error("Failed to fetch Contact Us data");
        setContactList([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    if (activeTab === "about" || activeTab === "contact") {
      fetchData();
    }
  }, [activeTab]);

  // Modal handlers
  const handleOpenModal = (item = null) => {
    if (item) {
      setEditId(item._id);
      if (activeTab === "contact") {
        setContactData({
          name: item.name || "",
          email: item.email || "",
          subject: item.subject || "",
          message: item.message || "",
        });
      } else if (activeTab === "about") {
        setTextData(item.text || "");
      } else if (activeTab === "terms") {
        setStaticTextData(item.text || "");
      } else if (activeTab === "privacy") {
        setStaticTextData(item.text || "");
      }
    } else {
      setEditId(null);
      setTextData("");
      setImageFile(null);
      setStaticTextData("");
      setContactData({ name: "", email: "", subject: "", message: "" });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditId(null);
    setImageFile(null);
    setStaticTextData("");
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    try {
      if (activeTab === "about") {
        const formData = new FormData();
        formData.append("text", textData);
        if (imageFile) formData.append("image", imageFile);
        formData.append("mission", ""); // Add if needed

        let res;
        if (editId) {
          res = await updateAboutUs(editId, formData);
        } else {
          res = await createAboutUs(formData);
        }

        if (res && res.status !== false) {
          toast.success(
            editId ? "Updated Successfully" : "Created Successfully",
          );
          handleCloseModal();
          fetchData();
        } else {
          toast.error(res?.message || "Operation failed");
        }
      } else if (activeTab === "contact") {
        const contactFormData = {
          name: contactData.name,
          email: contactData.email,
          subject: contactData.subject,
          message: contactData.message,
        };

        if (editId) {
          const res = await updateContactUs(editId, contactFormData);
          if (res && res.status !== false) {
            toast.success("Contact Updated Successfully");
            handleCloseModal();
            fetchData();
          } else {
            toast.error(res?.message || "Operation failed");
          }
        }
      } else if (activeTab === "terms" || activeTab === "privacy") {
        // Static save - Just update local state
        if (activeTab === "terms") {
          setTermsData({
            ...termsData,
            text: staticTextData,
            updatedAt: new Date().toISOString(),
          });
        } else if (activeTab === "privacy") {
          setPrivacyData({
            ...privacyData,
            text: staticTextData,
            updatedAt: new Date().toISOString(),
          });
        }

        toast.success("Content saved locally");
        handleCloseModal();
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error(error.response?.data?.message || "Operation failed");
    } finally {
      setBtnLoading(false);
    }
  };

  // Delete handler
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      try {
        let res;
        if (activeTab === "about") {
          res = await deleteAboutUs(id);
        } else if (activeTab === "contact") {
          res = await deleteContactUs(id);
        }

        if (res) {
          toast.success("Deleted successfully");
          fetchData();
        }
      } catch (error) {
        toast.error("Delete failed");
      }
    }
  };

  // Render Static Content for Terms & Privacy
  const renderStaticContent = (data, type) => {
    return (
      <div className="bg-white p-4 rounded border mt-3">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold mb-0 text-capitalize">{type}</h5>
          <Button
            variant="dark"
            size="sm"
            onClick={() => handleOpenModal(data)}>
            Edit Content
          </Button>
        </div>

        <Alert variant="info" className="mb-4">
          <i className="fas fa-info-circle me-2"></i>
          This is a static content section. The backend APIs for {type} are
          under development.
        </Alert>

        <div className="border p-4 rounded bg-light">
          <div
            className="static-content"
            dangerouslySetInnerHTML={{ __html: data.text }}
            style={{ minHeight: "200px" }}
          />

          <div className="mt-4 pt-3 border-top small text-muted">
            <div className="d-flex justify-content-between">
              <span>
                <i className="far fa-calendar me-1"></i>
                Created: {new Date(data.createdAt).toLocaleDateString()}
              </span>
              <span>
                <i className="far fa-clock me-1"></i>
                Last Updated: {new Date(data.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Table for About Us and Contact Us
  const renderTable = (list, type) => {
    const safeList = Array.isArray(list) ? list : [];
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = safeList.slice(indexOfFirstItem, indexOfLastItem);

    return (
      <div className="bg-white p-3 rounded border mt-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold mb-0 text-capitalize">{type} List</h5>
          {activeTab === "about" && (
            <Button variant="dark" size="sm" onClick={() => handleOpenModal()}>
              + Create New
            </Button>
          )}
        </div>

        <Table responsive hover className="align-middle mb-0">
          <thead className="table-light">
            <tr style={{ fontSize: "0.85rem" }}>
              <th>S.No</th>
              {activeTab === "about" && <th>Image</th>}
              {activeTab === "contact" ? (
                <>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Message</th>
                </>
              ) : (
                <th>Description</th>
              )}
              <th>Date</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "0.9rem" }}>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-5">
                  <Spinner animation="border" size="sm" />
                </td>
              </tr>
            ) : currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <tr key={item._id} style={{ height: "70px" }}>
                  <td>
                    {String(indexOfFirstItem + index + 1).padStart(2, "0")}
                  </td>
                  {activeTab === "about" && (
                    <td>
                      <img
                        src={getFullImageUrl(item.image)}
                        alt="about"
                        width="60"
                        height="40"
                        className="rounded border shadow-sm"
                        style={{ objectFit: "cover" }}
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/50x40?text=NA";
                        }}
                      />
                    </td>
                  )}
                  {activeTab === "contact" ? (
                    <>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.subject}</td>
                      <td>
                        <div style={{ maxWidth: "250px" }} title={item.message}>
                          {item.message && item.message.length > 50
                            ? `${item.message.substring(0, 50)}...`
                            : item.message}
                        </div>
                      </td>
                    </>
                  ) : (
                    <td>
                      <div
                        style={{ maxWidth: "450px", color: "#555" }}
                        title={stripHtml(item.text)}>
                        {formatDescription(item.text, 5)}
                      </div>
                    </td>
                  )}
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className="text-center">
                    <Button
                      variant="link"
                      size="sm"
                      className="fw-bold me-2 text-decoration-none"
                      onClick={() => handleOpenModal(item)}>
                      Edit
                    </Button>
                    <Button
                      variant="link"
                      size="sm"
                      className="text-danger fw-bold text-decoration-none"
                      onClick={() => handleDelete(item._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-muted">
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        {safeList.length > itemsPerPage && (
          <div className="mt-4">
            <CustomPagination
              current={currentPage}
              totalItems={safeList.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container-fluid py-4">
      <Card className="border-0 shadow-sm p-4">
        <h2 className="fw-bold mb-4 text-dark">General Settings</h2>
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="custom-tabs border-bottom-0">
          <Tab eventKey="about" title="About Us">
            {renderTable(aboutList, "about us")}
          </Tab>
          <Tab eventKey="terms" title="Terms & Condition">
            {renderStaticContent(termsData, "Terms & Conditions")}
          </Tab>
          <Tab eventKey="privacy" title="Privacy Policy">
            {renderStaticContent(privacyData, "Privacy Policy")}
          </Tab>
          <Tab eventKey="contact" title="Contact Us">
            {renderTable(contactList, "contact us")}
          </Tab>
        </Tabs>

        {/* Modal for editing content */}
        <Modal
          show={showModal}
          onHide={handleCloseModal}
          size={activeTab === "contact" ? "md" : "lg"}
          centered
          backdrop="static">
          <Modal.Header closeButton className="border-0 pb-0">
            <Modal.Title className="fw-bold">
              {editId ? "Update" : activeTab === "about" ? "Create" : "Edit"}{" "}
              {activeTab.toUpperCase()}
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body className="p-4">
              {/* About Us Fields */}
              {activeTab === "about" && (
                <>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold small">
                      Featured Image {editId && "(Leave blank to keep current)"}
                    </Form.Label>
                    <Form.Control
                      type="file"
                      onChange={(e) => setImageFile(e.target.files[0])}
                      accept="image/*"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold small">
                      Content Description
                    </Form.Label>
                    <TextEditor value={textData} onChange={setTextData} />
                  </Form.Group>
                </>
              )}

              {/* Contact Us Fields */}
              {activeTab === "contact" && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold small">Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={contactData.name}
                      onChange={(e) =>
                        setContactData({ ...contactData, name: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold small">Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={contactData.email}
                      onChange={(e) =>
                        setContactData({
                          ...contactData,
                          email: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold small">Subject</Form.Label>
                    <Form.Control
                      type="text"
                      value={contactData.subject}
                      onChange={(e) =>
                        setContactData({
                          ...contactData,
                          subject: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold small">Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={contactData.message}
                      onChange={(e) =>
                        setContactData({
                          ...contactData,
                          message: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </>
              )}

              {/* Terms & Privacy Fields */}
              {(activeTab === "terms" || activeTab === "privacy") && (
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold small">Content</Form.Label>
                  <TextEditor
                    value={staticTextData}
                    onChange={setStaticTextData}
                  />
                  <div className="text-muted small mt-2">
                    <i className="fas fa-info-circle me-1"></i>
                    This content is saved locally. Backend API is under
                    development.
                  </div>
                </Form.Group>
              )}
            </Modal.Body>
            <Modal.Footer className="border-0 pt-0">
              <Button
                variant="light"
                className="fw-bold px-4"
                onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button
                variant="dark"
                type="submit"
                className="fw-bold px-4"
                disabled={btnLoading}>
                {btnLoading ? "Processing..." : "Save Changes"}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default Settings;