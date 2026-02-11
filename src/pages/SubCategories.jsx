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
} from "../Services/adminService";

const SubCategories = () => {
  // --- States ---
  const [show, setShow] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // --- Form States (Based on your API Parameters) ---
  const [subCategoryName, setSubCategoryName] = useState(""); // Input field
  const [categoryId, setCategoryId] = useState("");
  const [note, setNote] = useState("");
  const [editId, setEditId] = useState(null);

  // --- Pagination States ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // --- Fetch Data ---
  const fetchData = async () => {
    setLoading(true);
    try {
      const [catRes, subCatRes] = await Promise.all([
        getAllCategories(),
        getAllSubCategories(),
      ]);

      if (catRes && catRes.status) {
        setCategories(catRes.categories || []);
      }

      if (subCatRes && subCatRes.status) {
        // Backend JSON ke mutabik data array mein response aa raha hai
        setSubCategories(subCatRes.data || []);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- Handlers ---
  const handleSave = async () => {
    if (!subCategoryName.trim() || (!editId && !categoryId)) {
      toast.warning("Category and SubCategory Name are required");
      return;
    }

    try {
      let res;
      if (editId) {
        // UPDATE: Aapne bataya parameters: categoryName, note
        // Yahan 'categoryName' ka matlab subcategory ka naya naam hai
        const payload = {
          categoryName: subCategoryName,
          note: note,
        };
        res = await updateSubCategory(editId, payload);
      } else {
        // CREATE: Aapne bataya parameters: category (ID), subCategoryName
        const payload = {
          category: categoryId,
          subCategoryName: subCategoryName,
        };
        res = await createSubCategory(payload);
      }

      if (res && res.status) {
        toast.success(
          editId ? "Updated Successfully!" : "Created Successfully!",
        );
        handleClose();
        fetchData();
      }
    } catch (error) {
      toast.error("Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        const res = await deleteSubCategory(id);
        if (res && res.status) {
          toast.success("Deleted Successfully!");
          fetchData();
        }
      } catch (error) {
        toast.error("Delete failed");
      }
    }
  };

  const handleEdit = (sub) => {
    setEditId(sub._id);
    // Backend se subCategoryName aa raha hai
    setSubCategoryName(sub.subCategoryName || "");
    // Backend se category._id aa raha hai
    setCategoryId(sub.category?._id || "");
    setNote(sub.note || "");
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setEditId(null);
    setSubCategoryName("");
    setCategoryId("");
    setNote("");
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = subCategories.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Sub-Category List</h2>
        <Button variant="dark" onClick={() => setShow(true)}>
          + Create Sub-Category
        </Button>
      </div>

      <div className="bg-white p-3 rounded shadow-sm border">
        <Table responsive hover className="mb-0 align-middle">
          <thead className="table-light">
            <tr>
              <th style={{ width: "80px" }}>S.No</th>
              <th>Main Category</th>
              <th>Sub-Category Name</th>
              <th>Created Date</th>
              <th style={{ width: "150px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-5">
                  <Spinner animation="border" size="sm" />
                </td>
              </tr>
            ) : currentItems.length > 0 ? (
              currentItems.map((sub, index) => (
                <tr key={sub._id}>
                  <td>
                    {String(indexOfFirstItem + index + 1).padStart(2, "0")}
                  </td>
                  <td className="text-primary fw-semibold">
                    {sub.category?.categoryName || "N/A"}
                  </td>
                  <td className="fw-bold">{sub.subCategoryName}</td>
                  <td>{new Date(sub.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Button
                      variant="link"
                      size="sm"
                      className="fw-bold me-2 text-decoration-none"
                      onClick={() => handleEdit(sub)}>
                      Edit
                    </Button>
                    <Button
                      variant="link"
                      size="sm"
                      className="text-danger fw-bold text-decoration-none"
                      onClick={() => handleDelete(sub._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        {!loading && subCategories.length > 0 && (
          <CustomPagination
            current={currentPage}
            totalItems={subCategories.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      {/* Modal */}
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        centered
        backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">
            {editId ? "Update" : "Create"} Sub-Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="row">
              <div className="col-md-6 mb-3">
                <Form.Label className="fw-bold small">Main Category</Form.Label>
                <Form.Select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  disabled={!!editId} // Edit ke waqt category change disable
                >
                  <option value="">-- Select Category --</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.categoryName}
                    </option>
                  ))}
                </Form.Select>
              </div>
              <div className="col-md-6 mb-3">
                <Form.Label className="fw-bold small">
                  Sub-Category Name
                </Form.Label>
                <Form.Control
                  type="text"
                  value={subCategoryName}
                  onChange={(e) => setSubCategoryName(e.target.value)}
                  placeholder="Enter name"
                />
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
          <Button variant="dark" onClick={handleSave}>
            {editId ? "Update" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SubCategories;
