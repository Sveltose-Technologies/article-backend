import API from "./api";

export const IMG_URL = "https://lawnode.rxchartsquare.com/";

export const getFullImageUrl = (path) => {
  if (!path || typeof path !== "string") {
    return "https://placehold.co/50x40?text=NA";
  }

  // If already full URL
  if (path.startsWith("http")) {
    return path;
  }

  // Clean path
  let cleanPath = path.replace(/\\/g, "/");

  // Remove leading slash
  if (cleanPath.startsWith("/")) {
    cleanPath = cleanPath.substring(1);
  }

  // Ensure uploads/ prefix
  if (!cleanPath.startsWith("uploads/")) {
    cleanPath = `uploads/${cleanPath}`;
  }

  return `${IMG_URL}${cleanPath}`;
};

// REMOVE /api prefix - backend doesn't have it
export const getAllArticles = async () => {
  try {
    console.log("🔍 Fetching articles from: /article/get-all");
    const response = await API.get("/article/get-all");
    console.log("✅ Articles fetched successfully");
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching articles:", error);
    throw error;
  }
};

export const createArticle = async (formData) => {
  try {
    console.log("📝 Creating article at: /article/create");
    const response = await API.post("/article/create", formData);
    return response.data;
  } catch (error) {
    console.error("❌ Error creating article:", error);
    throw error;
  }
};

export const updateArticle = async (id, formData) => {
  try {
    console.log("🔄 Updating article at: /article/update/" + id);
    console.log("FormData contents:");

    // Log what's in formData
    for (let [key, value] of formData.entries()) {
      if (key === "featureImage" && value instanceof File) {
        console.log(
          `${key}: File - ${value.name} (${value.type}, ${value.size} bytes)`,
        );
      } else {
        console.log(`${key}: ${value}`);
      }
    }

    const response = await API.put(`/article/update/${id}`, formData);
    console.log("✅ Update response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error updating article:", error);

    // Log more details
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
      console.error("Response data:", error.response.data);
    }

    throw error;
  }
};

export const deleteArticle = async (id) => {
  try {
    console.log("🗑️ Deleting article at: /article/delete/" + id);
    const response = await API.delete(`/article/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error deleting article:", error);
    throw error;
  }
};

// Optional: Get single article by ID
export const getArticleById = async (id) => {
  try {
    const response = await API.get(`/article/get-by-id/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error;
  }
};

export const adminLogin = async (credentials) => {
  try {
    console.log("📤 Login request:", credentials.email);

    const config = {
      headers: { "Content-Type": "application/json" },
      timeout: 20000,
    };
    console.log("Request payload:", credentials);

    const response = await API.post("/admin/login", credentials, config);

    console.log("✅ Response received:", response.status);
    console.log("Response data:", response.data);
    console.log("Response headers:", response.headers);

    // Save token and user data if login successful
    if (response.data?.status === true) {
      const token = response.data.admin?.token;
      const user = response.data.admin;

      if (token) {
        localStorage.setItem("adminToken", token);
        localStorage.setItem("adminUser", JSON.stringify(user));
        console.log("💾 Data saved to localStorage");
      }

      return response.data;
    }

    return response.data;
  } catch (error) {
    // Detailed error logging to capture server 500 body
    console.error("❌ Login failed");
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    if (error.config)
      console.error(
        "Request attempted:",
        error.config.url,
        error.config.method,
        error.config.data,
      );
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
      console.error("Response data:", error.response.data);
    } else if (error.request) {
      console.error(
        "No response received. Possible network/CORS/server-down issue.",
      );
    }
    // Re-throw so caller can display friendly message
    throw error;
  }
};

export const adminLogout = async () => {
  try {
    await API.post("/admin/logout");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
  } catch (error) {
    // Clear local storage even if logout fails
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await API.post("/admin/forgot-password", { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 2. Verify OTP
export const verifyOtp = async (email, otp) => {
  try {
    const response = await API.post("/admin/verify-otp", { email, otp });
    console.log("otp verfiy", response);

    return response.data;
  } catch (error) {
    throw error;
  }
};
// 3. Reset Password (PUT Method)
export const resetPassword = async (data) => {
  try {
    const response = await API.put("/admin/reset-password", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Services/adminService.js mein
export const getAdminProfile = async (id) => {
  try {
    const response = await API.get("/admin/get-all"); // get all admins
    const admin = response.data.admins.find((a) => a._id === id);
    if (!admin) throw new Error("Admin not found");
    return { status: true, data: admin };
  } catch (error) {
    throw error;
  }
};

// adminService.js

export const updateAdminProfile = async (id, data) => {
  try {
    const response = await API.put(`/admin/update/${id}`, data);
    console.log("update profile", response);

    if (response.data.status) {
      localStorage.setItem("adminUser", JSON.stringify(response.data.admin));
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};
// ==========================
// 2. CATEGORY METHODS
// ==========================

export const getAllCategories = async () => {
  try {
    console.log("📡 Flow: Fetching Categories...");
    const response = await API.get("/category/get-all");
    console.log("✅ Flow: Categories List Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Flow: Get Categories Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const createCategory = async (data) => {
  try {
    console.log("🚀 Flow: Creating Category Payload:", data);
    const response = await API.post("/category/create", data);
    console.log("✅ Flow: Create Category Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Flow: Create Category Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const updateCategory = async (id, data) => {
  try {
    console.log(`🔄 Flow: Updating Category ID: ${id}`, data);
    const response = await API.put(`/category/update/${id}`, data);
    console.log("✅ Flow: Update Category Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Flow: Update Category Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    console.log(`🗑️ Flow: Trying Delete with ID: ${id}`);
    const response = await API.delete(`/category/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("❌ Flow: Delete Error:", error.response?.data);
    throw error;
  }
};

// ==========================
// 3. SUBCATEGORY METHODS
// ==========================

export const getAllSubCategories = async () => {
  try {
    console.log("📡 Flow: Fetching SubCategories...");
    const response = await API.get("/subcategory/get-all");
    console.log("✅ Flow: SubCategories List Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Flow: Get SubCategories Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const createSubCategory = async (data) => {
  try {
    // Parameters expected: category (ID), subCategoryName
    console.log("🚀 Flow: Creating SubCategory Payload:", data);
    const response = await API.post("/subcategory/create", data);
    console.log("✅ Flow: Create SubCategory Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Flow: Create SubCategory Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const updateSubCategory = async (id, data) => {
  try {
    // Parameters expected: categoryName (sub-name), note, status
    console.log(`🔄 Flow: Updating SubCategory ID: ${id}`, data);
    const response = await API.put(`/subcategory/update/${id}`, data);
    console.log("✅ Flow: Update SubCategory Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Flow: Update SubCategory Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const deleteSubCategory = async (id) => {
  try {
    console.log(`🗑️ Flow: Trying Delete SubCategory with ID: ${id}`);
    const response = await API.delete(`/subcategory/delete/${id}`);
    console.log("✅ Flow: Delete SubCategory Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Flow: Delete SubCategory Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
// // ==========================
// // ARTICLE METHODS
// // ==========================

// export const createArticle = async (formData) => {
//   const response = await API.post("/article/create", formData);
//   return response.data;
// };

// export const getAllArticles = async () => {
//   const response = await API.get("/article/get-all");
//   console.log("article",response.data)
//   return response.data;
// };

// export const getArticleById = async (id) => {
//   const response = await API.get(`/article/get-by-id/${id}`);
//   return response.data;
// };

// export const updateArticle = async (id, formData) => {
//   // Parameters: title, content, category, featureImage, videoLink, status, featured
//   const response = await API.put(`/article/update/${id}`, formData);
//   return response.data;
// };

// export const deleteArticle = async (id) => {
//   const response = await API.delete(`/article/delete/${id}`);
//   return response.data;
// };
// ==========================
// 4. USER METHODS
// ==========================

// Get all users
export const getAllUsers = async () => {
  const response = await API.get("/user/get-all");
  return response.data;
};

// Update user (FormData handle karega profilePic)
export const updateUser = async (id, formData) => {
  console.log(`🔄 Flow: Updating User ID: ${id}`);
  const response = await API.put(`/user/update/${id}`, formData);
  return response.data;
};

// Delete user
export const deleteUser = async (id) => {
  console.log(`🗑️ Flow: Deleting User ID: ${id}`);
  const response = await API.delete(`/user/delete/${id}`);
  return response.data;
};

// --- MEDIA TYPE APIs ---
export const getAllMediaTypes = () => API.get("/media-type/get-all");
export const createMediaType = (data) => API.post("/media-type/create", data);
export const getMediaTypeById = (id) => API.get(`/media-type/get-by-id/${id}`);
export const updateMediaType = (id, data) =>
  API.put(`/media-type/update/${id}`, data);
export const deleteMediaType = (id) => API.delete(`/media-type/delete/${id}`);

// --- MEDIA APIs ---
export const getAllMedia = () => API.get("/media/get-all");
export const createMedia = (formData) =>
  API.post("/media/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const getMediaById = (id) => API.get(`/media/get-by-id/${id}`);
export const updateMedia = (id, formData) =>
  API.put(`/media/update/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deleteMedia = (id) => API.delete(`/media/delete/${id}`);
// ==========================
// COMMENT METHODS
// ==========================

// 1. Get All Comments
export const getAllComments = async () => {
  try {
    console.log("📡 Flow: 1. Fetching All Comments...");
    const response = await API.get("/comment/get-all");
    console.log("✅ Flow: 2. All Comments Received:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Flow: Get All Comments Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

// 2. Create Comment
export const createComment = async (data) => {
  try {
    console.log("🚀 Flow: Creating Comment...", data);
    const response = await API.post("/comment/create", data);
    return response.data;
  } catch (error) {
    console.error("❌ Flow: Create Error:", error.response?.data);
    throw error;
  }
};

// 3. Update Comment
export const updateComment = async (id, data) => {
  try {
    console.log(`🔄 Flow: Updating Comment ID: ${id}`, data);
    const response = await API.put(`/comment/update/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("❌ Flow: Update Error:", error.response?.data);
    throw error;
  }
};

// 4. Delete Comment
export const deleteComment = async (id) => {
  try {
    console.log(`🗑️ Flow: Deleting Comment ID: ${id}`);
    const response = await API.delete(`/comment/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("❌ Flow: Delete Error:", error.response?.data);
    throw error;
  }
};


// ========== ABOUT US APIs ==========
export const getAllAboutUs = async () => {
  try {
    console.log("📋 Fetching About Us data");
    const response = await API.get("/aboutus/get-all");
    console.log("✅ About Us fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching About Us:", error);
    throw error;
  }
};

export const getAboutUsById = async (id) => {
  try {
    const response = await API.get(`/aboutus/get-by-id/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching About Us by ID:", error);
    throw error;
  }
};

export const createAboutUs = async (formData) => {
  try {
    console.log("📝 Creating About Us");
    const response = await API.post("/aboutus/create", formData);
    console.log("✅ About Us created:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error creating About Us:", error);
    throw error;
  }
};

export const updateAboutUs = async (id, formData) => {
  try {
    console.log(`🔄 Updating About Us ID: ${id}`);
    const response = await API.put(`/aboutus/update/${id}`, formData);
    console.log("✅ About Us updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error updating About Us:", error);
    throw error;
  }
};

export const deleteAboutUs = async (id) => {
  try {
    console.log(`🗑️ Deleting About Us ID: ${id}`);
    const response = await API.delete(`/aboutus/delete/${id}`);
    console.log("✅ About Us deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error deleting About Us:", error);
    throw error;
  }
};

// ========== CONTACT US APIs ==========
export const getAllContactUs = async () => {
  try {
    console.log("📋 Fetching Contact Us data");
    const response = await API.get("/contactus/get-all");
    console.log("✅ Contact Us fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching Contact Us:", error);
    throw error;
  }
};

export const getContactUsById = async (id) => {
  try {
    const response = await API.get(`/contactus/get-by-id/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Contact Us by ID:", error);
    throw error;
  }
};

export const createContactUs = async (data) => {
  try {
    console.log("📝 Creating Contact Us");
    const response = await API.post("/contactus/create", data);
    console.log("✅ Contact Us created:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error creating Contact Us:", error);
    throw error;
  }
};

export const updateContactUs = async (id, data) => {
  try {
    console.log(`🔄 Updating Contact Us ID: ${id}`);
    const response = await API.put(`/contactus/update/${id}`, data);
    console.log("✅ Contact Us updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error updating Contact Us:", error);
    throw error;
  }
};

export const deleteContactUs = async (id) => {
  try {
    console.log(`🗑️ Deleting Contact Us ID: ${id}`);
    const response = await API.delete(`/contactus/delete/${id}`);
    console.log("✅ Contact Us deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error deleting Contact Us:", error);
    throw error;
  }
};



// ========== NEW: Get all APIs in one place ==========
export const getAllSettingsData = async () => {
  try {
    const [aboutRes, contactRes] = await Promise.all([
      getAllAboutUs(),
      getAllContactUs(),
    ]);

    return {
      about: aboutRes,
      contact: contactRes,
    };
  } catch (error) {
    console.error("Error fetching settings data:", error);
    throw error;
  }
};