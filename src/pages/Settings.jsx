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
//   Alert,
// } from "react-bootstrap";
// import { toast } from "react-toastify";
// import TextEditor from "../components/common/TextEditor";
// import {
//   getAllAboutUs,
//   updateAboutUs,
//   createAboutUs,
//   deleteAboutUs,
//   getFullImageUrl,
//   getAllContactUs,
//   updateContactUs,
//   createContactUs,
//   deleteContactUs, // AdminService mein ye method honi chahiye
//   getAllTerms,
//   createTerms,
//   updateTerms,
//   deleteTerms,
//   getAllPrivacy,
//   createPrivacy,
//   updatePrivacy,
//   deletePrivacy,
// } from "../Services/adminService";

// const Settings = () => {
//   const [activeTab, setActiveTab] = useState("about");
//   const [loading, setLoading] = useState(false);
//   const [btnLoading, setBtnLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const [aboutList, setAboutList] = useState([]);
//   const [termsList, setTermsList] = useState([]);
//   const [privacyList, setPrivacyList] = useState([]);

//   // Contact State
//   const [contactContent, setContactContent] = useState({ _id: null, text: "" });

//   const [textData, setTextData] = useState("");
//   const [imageFile, setImageFile] = useState(null);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       if (activeTab === "about") {
//         const res = await getAllAboutUs();
//         setAboutList(res?.data?.sections || []);
//       } else if (activeTab === "terms") {
//         const res = await getAllTerms();
//         setTermsList(res?.data || []);
//       } else if (activeTab === "privacy") {
//         const res = await getAllPrivacy();
//         setPrivacyList(res?.data || []);
//       } else if (activeTab === "contact") {
//         const res = await getAllContactUs();
//         console.log("Contact GET API Response:", res.data);
//         const data = Array.isArray(res?.data) ? res.data[0] : res.data;

//         if (data && data._id) {
//           setContactContent({ _id: data._id, text: data.text || "" });
//         } else {
//           setContactContent({ _id: null, text: "" });
//         }
//       }
//     } catch (error) {
//       console.error("Fetch Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [activeTab]);

//   // ==========================================
//   // CONTACT US LOGIC (POST, PUT, DELETE)
//   // ==========================================

//   const handleContactSave = async () => {
//     if (!contactContent.text) return toast.warn("Please enter text");

//     setBtnLoading(true);
//     try {
//       if (contactContent._id) {
//         // PUT LOGIC (Update)
//         console.log(
//           "Action: PUT (Update), ID:",
//           contactContent._id,
//           "Data:",
//           contactContent.text,
//         );
//         await updateContactUs(contactContent._id, {
//           text: contactContent.text,
//         });
//         toast.success("Contact Updated Successfully");
//       } else {
//         // POST LOGIC (Create)
//         console.log("Action: POST (Create), Data:", contactContent.text);
//         await createContactUs({ text: contactContent.text });
//         toast.success("Contact Created Successfully");
//       }
//       fetchData();
//     } catch (error) {
//       toast.error("Operation failed");
//     } finally {
//       setBtnLoading(false);
//     }
//   };

//   const handleContactDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete contact data?"))
//       return;

//     setBtnLoading(true);
//     try {
//       console.log("Action: DELETE, ID:", contactContent._id);
//       await deleteContactUs(contactContent._id);
//       toast.success("Contact Deleted Successfully");
//       setContactContent({ _id: null, text: "" });
//       fetchData();
//     } catch (error) {
//       toast.error("Delete failed");
//     } finally {
//       setBtnLoading(false);
//     }
//   };

//   // ==========================================
//   // COMMON LOGIC (ABOUT, TERMS, PRIVACY)
//   // ==========================================

//   const handleOpenModal = (item = null) => {
//     if (item) {
//       setEditId(item._id);
//       setTextData(item.text || "");
//     } else {
//       setEditId(null);
//       setTextData("");
//       setImageFile(null);
//     }
//     setShowModal(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setBtnLoading(true);
//     try {
//       let res;
//       if (activeTab === "about") {
//         const formData = new FormData();
//         formData.append("text", textData);
//         if (imageFile) formData.append("image", imageFile);
//         res = editId
//           ? await updateAboutUs(editId, formData)
//           : await createAboutUs(formData);
//       } else if (activeTab === "terms") {
//         res = editId
//           ? await updateTerms(editId, { text: textData })
//           : await createTerms({ text: textData });
//       } else if (activeTab === "privacy") {
//         res = editId
//           ? await updatePrivacy(editId, { text: textData })
//           : await createPrivacy({ text: textData });
//       }
//       if (res) {
//         toast.success("Saved Successfully");
//         setShowModal(false);
//         fetchData();
//       }
//     } catch (error) {
//       toast.error("Error saving data");
//     } finally {
//       setBtnLoading(false);
//     }
//   };

//   const getPreviewText = (html) => {
//     if (!html) return "No content";
//     const doc = new DOMParser().parseFromString(html, "text/html");
//     const plainText = doc.body.textContent || "";
//     const words = plainText.trim().split(/\s+/);
//     return words.length <= 5 ? plainText : words.slice(0, 5).join(" ") + "...";
//   };

//   const renderTable = (list, type) => (
//     <div className="bg-white p-3 rounded border mt-3">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h5 className="fw-bold mb-0">{type} Management</h5>
//         <Button variant="dark" size="sm" onClick={() => handleOpenModal()}>
//           + Add New
//         </Button>
//       </div>
//       <Table responsive hover className="align-middle mb-0">
//         <thead className="table-light">
//           <tr>
//             <th style={{ width: "70px" }}>S.NO</th>
//             {activeTab === "about" && <th>IMAGE</th>}
//             <th>DESCRIPTION</th>
//             <th className="text-center" style={{ width: "180px" }}>
//               ACTION
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {loading ? (
//             <tr>
//               <td colSpan="5" className="text-center">
//                 <Spinner size="sm" />
//               </td>
//             </tr>
//           ) : (
//             list.map((item, index) => (
//               <tr key={item._id}>
//                 <td>{index + 1}</td>
//                 {activeTab === "about" && (
//                   <td>
//                     <img
//                       src={getFullImageUrl(item.image)}
//                       width="50"
//                       height="35"
//                       className="rounded border"
//                       alt="img"
//                     />
//                   </td>
//                 )}
//                 <td className="text-dark fw-medium">
//                   {getPreviewText(item.text)}
//                 </td>
//                 <td className="text-center">
//                   <Button
//                     variant="link"
//                     className="text-decoration-none fw-bold me-2"
//                     onClick={() => handleOpenModal(item)}>
//                     Edit
//                   </Button>
//                   <Button
//                     variant="link"
//                     className="text-danger text-decoration-none fw-bold"
//                     onClick={async () => {
//                       if (!window.confirm("Delete?")) return;
//                       if (activeTab === "about") await deleteAboutUs(item._id);
//                       else if (activeTab === "terms")
//                         await deleteTerms(item._id);
//                       else if (activeTab === "privacy")
//                         await deletePrivacy(item._id);
//                       fetchData();
//                     }}>
//                     Delete
//                   </Button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </Table>
//     </div>
//   );

//   return (
//     <div className="container-fluid py-4">
//       <Card className="border-0 shadow-sm p-4">
//         <h2 className="fw-bold mb-4">Settings</h2>
//         <Tabs
//           activeKey={activeTab}
//           onSelect={(k) => setActiveTab(k)}
//           className="custom-tabs">
//           <Tab eventKey="about" title="About Us">
//             {renderTable(aboutList, "About Us")}
//           </Tab>
//           <Tab eventKey="terms" title="Terms & Conditions">
//             {renderTable(termsList, "Terms")}
//           </Tab>
//           <Tab eventKey="privacy" title="Privacy Policy">
//             {renderTable(privacyList, "Privacy")}
//           </Tab>

//           <Tab eventKey="contact" title="Contact Us">
//             <div className="p-4 border rounded bg-white mt-3">
//               {/* Data Empty Check */}
//               {!contactContent._id && !loading && (
//                 <Alert variant="info" className="fw-bold">
//                   Data is empty. Please enter details to create contact
//                   information.
//                 </Alert>
//               )}

//               <TextEditor
//                 value={contactContent.text}
//                 onChange={(v) =>
//                   setContactContent({ ...contactContent, text: v })
//                 }
//               />

//               <div className="mt-3 d-flex gap-2">
//                 {/* Create or Update Button based on _id */}
//                 <Button
//                   variant={contactContent._id ? "success" : "dark"}
//                   onClick={handleContactSave}
//                   disabled={btnLoading}>
//                   {btnLoading
//                     ? "Processing..."
//                     : contactContent._id
//                       ? "Update Contact "
//                       : "Create Contact"}
//                 </Button>

//                 {/* Delete Button - Only shows if data exists */}
//                 {contactContent._id && (
//                   <Button
//                     variant="danger"
//                     onClick={handleContactDelete}
//                     disabled={btnLoading}>
//                     Delete Contact
//                   </Button>
//                 )}
//               </div>
//             </div>
//           </Tab>
//         </Tabs>
//       </Card>

//       <Modal
//         show={showModal}
//         onHide={() => setShowModal(false)}
//         size="lg"
//         centered>
//         <Modal.Header closeButton className="fw-bold">
//           Manage Content
//         </Modal.Header>
//         <Form onSubmit={handleSubmit}>
//           <Modal.Body>
//             {activeTab === "about" && (
//               <Form.Group className="mb-3">
//                 <Form.Label>Image</Form.Label>
//                 <Form.Control
//                   type="file"
//                   onChange={(e) => setImageFile(e.target.files[0])}
//                 />
//               </Form.Group>
//             )}
//             <Form.Group>
//               <Form.Label>Description (English)</Form.Label>
//               <TextEditor value={textData} onChange={setTextData} />
//             </Form.Group>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="light" onClick={() => setShowModal(false)}>
//               Cancel
//             </Button>
//             <Button variant="dark" type="submit" disabled={btnLoading}>
//               {btnLoading ? "Saving..." : "Save"}
//             </Button>
//           </Modal.Footer>
//         </Form>
//       </Modal>
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
import CustomPagination from "../components/common/CustomPagination"; // Your Pagination Component
import {
  getAllAboutUs,
  updateAboutUs,
  createAboutUs,
  deleteAboutUs,
  getFullImageUrl,
  getAllContactUs,
  updateContactUs,
  createContactUs,
  deleteContactUs,
  getAllTerms,
  createTerms,
  updateTerms,
  deleteTerms,
  getAllPrivacy,
  createPrivacy,
  updatePrivacy,
  deletePrivacy,
} from "../Services/adminService";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [aboutList, setAboutList] = useState([]);
  const [termsList, setTermsList] = useState([]);
  const [privacyList, setPrivacyList] = useState([]);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Contact State
  const [contactContent, setContactContent] = useState({ _id: null, text: "" });

  const [textData, setTextData] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === "about") {
        const res = await getAllAboutUs();
        setAboutList(res?.data?.sections || []);
      } else if (activeTab === "terms") {
        const res = await getAllTerms();
        setTermsList(res?.data || []);
      } else if (activeTab === "privacy") {
        const res = await getAllPrivacy();
        setPrivacyList(res?.data || []);
      } else if (activeTab === "contact") {
        const res = await getAllContactUs();
        const data = Array.isArray(res?.data) ? res.data[0] : res.data;
        if (data && data._id) {
          setContactContent({ _id: data._id, text: data.text || "" });
        } else {
          setContactContent({ _id: null, text: "" });
        }
      }
      setCurrentPage(1);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleContactSave = async () => {
    if (!contactContent.text) return toast.warn("Please enter text");
    setBtnLoading(true);
    try {
      if (contactContent._id) {
        await updateContactUs(contactContent._id, {
          text: contactContent.text,
        });
        toast.success("Contact Updated Successfully");
      } else {
        await createContactUs({ text: contactContent.text });
        toast.success("Contact Created Successfully");
      }
      fetchData();
    } catch (error) {
      toast.error("Operation failed");
    } finally {
      setBtnLoading(false);
    }
  };

  const handleContactDelete = async () => {
    if (!window.confirm("Are you sure you want to delete contact data?"))
      return;
    setBtnLoading(true);
    try {
      await deleteContactUs(contactContent._id);
      toast.success("Contact Deleted Successfully");
      setContactContent({ _id: null, text: "" });
      fetchData();
    } catch (error) {
      toast.error("Delete failed");
    } finally {
      setBtnLoading(false);
    }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditId(item._id);
      setTextData(item.text || "");
    } else {
      setEditId(null);
      setTextData("");
      setImageFile(null);
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      let res;
      if (activeTab === "about") {
        const formData = new FormData();
        formData.append("text", textData);
        if (imageFile) formData.append("image", imageFile);
        res = editId
          ? await updateAboutUs(editId, formData)
          : await createAboutUs(formData);
      } else if (activeTab === "terms") {
        res = editId
          ? await updateTerms(editId, { text: textData })
          : await createTerms({ text: textData });
      } else if (activeTab === "privacy") {
        res = editId
          ? await updatePrivacy(editId, { text: textData })
          : await createPrivacy({ text: textData });
      }
      if (res) {
        toast.success("Saved Successfully");
        setShowModal(false);
        fetchData();
      }
    } catch (error) {
      toast.error("Error saving data");
    } finally {
      setBtnLoading(false);
    }
  };

  const getPreviewText = (html) => {
    if (!html) return "No content";
    const doc = new DOMParser().parseFromString(html, "text/html");
    const plainText = doc.body.textContent || "";
    const words = plainText.trim().split(/\s+/);
    return words.length <= 5 ? plainText : words.slice(0, 5).join(" ") + "...";
  };

  const renderTable = (list, type) => {
    // Slicing data for current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);

    return (
      <div className="bg-white p-3 rounded border mt-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold mb-0">{type} Management</h5>
          <Button variant="dark" size="sm" onClick={() => handleOpenModal()}>
            + Add New
          </Button>
        </div>
        <Table responsive hover className="align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th style={{ width: "70px" }}>S.NO</th>
              {activeTab === "about" && <th>IMAGE</th>}
              <th>DESCRIPTION</th>
              <th className="text-center" style={{ width: "180px" }}>
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-3">
                  <Spinner size="sm" />
                </td>
              </tr>
            ) : currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <tr key={item._id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  {activeTab === "about" && (
                    <td>
                      <img
                        src={getFullImageUrl(item.image)}
                        width="50"
                        height="35"
                        className="rounded border"
                        alt="img"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/50x35";
                        }}
                      />
                    </td>
                  )}
                  <td className="text-dark fw-medium">
                    {getPreviewText(item.text)}
                  </td>
                  <td className="text-center">
                    <Button
                      variant="link"
                      className="text-decoration-none fw-bold me-2"
                      onClick={() => handleOpenModal(item)}>
                      Edit
                    </Button>
                    <Button
                      variant="link"
                      className="text-danger text-decoration-none fw-bold"
                      onClick={async () => {
                        if (!window.confirm("Delete?")) return;
                        if (activeTab === "about")
                          await deleteAboutUs(item._id);
                        else if (activeTab === "terms")
                          await deleteTerms(item._id);
                        else if (activeTab === "privacy")
                          await deletePrivacy(item._id);
                        fetchData();
                      }}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-3 text-muted">
                  No Content Found
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* Updated Condition: Show pagination if even 1 row exists */}
        {!loading && list.length > 0 && (
          <div className="mt-4">
            <CustomPagination
              current={currentPage}
              totalItems={list.length}
              itemsPerPage={itemsPerPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container-fluid py-4">
      <Card className="border-0 shadow-sm p-4">
        <h2 className="fw-bold mb-4">Settings</h2>
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="custom-tabs">
          <Tab eventKey="about" title="About Us">
            {renderTable(aboutList, "About Us")}
          </Tab>
          <Tab eventKey="terms" title="Terms & Conditions">
            {renderTable(termsList, "Terms")}
          </Tab>
          <Tab eventKey="privacy" title="Privacy Policy">
            {renderTable(privacyList, "Privacy")}
          </Tab>
          <Tab eventKey="contact" title="Contact Us">
            {/* Contact Us Code remains same */}
            <div className="p-4 border rounded bg-white mt-3">
              <TextEditor
                value={contactContent.text}
                onChange={(v) =>
                  setContactContent({ ...contactContent, text: v })
                }
              />
              <div className="mt-3 d-flex gap-2">
                <Button
                  variant={contactContent._id ? "success" : "dark"}
                  onClick={handleContactSave}
                  disabled={btnLoading}>
                  {btnLoading
                    ? "Processing..."
                    : contactContent._id
                      ? "Update Contact "
                      : "Create Contact"}
                </Button>
                {contactContent._id && (
                  <Button
                    variant="danger"
                    onClick={handleContactDelete}
                    disabled={btnLoading}>
                    Delete Contact{" "}
                  </Button>
                )}
              </div>
            </div>
          </Tab>
        </Tabs>
      </Card>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered>
        <Modal.Header closeButton className="fw-bold">
          Manage Content
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {activeTab === "about" && (
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
              </Form.Group>
            )}
            <Form.Group>
              <Form.Label className="fw-bold">Description</Form.Label>
              <TextEditor value={textData} onChange={setTextData} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="light" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="dark" type="submit" disabled={btnLoading}>
              {btnLoading ? "Saving..." : "Save"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Settings;