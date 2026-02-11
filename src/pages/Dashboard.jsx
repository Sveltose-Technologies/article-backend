// // import React from "react";
// // import { Row, Col, Card } from "react-bootstrap";

// // const Dashboard = () => {
// //   const stats = [
// //     { title: "Total User", count: "150", icon: "👤" },
// //     { title: "Total Post", count: "45", icon: "📝" },
// //     { title: "Total Category", count: "12", icon: "📁" },
// //     { title: "Total Comments", count: "320", icon: "💬" },
// //   ];

// //   return (
// //     <div className="container-fluid py-4">
// //       <h2 className="mb-4">Dashboard Overview</h2>
// //       <Row>
// //         {stats.map((item, i) => (
// //           <Col md={3} key={i} className="mb-4">
// //             <Card
// //               className="border-0 shadow-sm p-3 text-center"
// //               style={{ borderLeft: "5px solid var(--accent)" }}>
// //               <div className="text-muted small fw-bold text-uppercase">
// //                 {item.title}
// //               </div>
// //               <div className="h2 fw-bold mb-0 mt-2">{item.count}</div>
// //             </Card>
// //           </Col>
// //         ))}
// //       </Row>
// //     </div>
// //   );
// // };

// // export default Dashboard;

// import React from "react";
// import { Row, Col, Card, Container } from "react-bootstrap";

// const Dashboard = () => {
//   const stats = [
//     {
//       title: "Total User",
//       count: "150",
//       icon: "bi bi-people",
//       colorClass: "text-primary",
//       bgClass: "bg-primary",
//     },
//     {
//       title: "Total Post",
//       count: "45",
//       icon: "bi bi-file-earmark-text",
//       colorClass: "text-warning",
//       bgClass: "bg-warning",
//     },
//     {
//       title: "Total Category",
//       count: "12",
//       icon: "bi bi-grid",
//       colorClass: "text-success",
//       bgClass: "bg-success",
//     },
//     {
//       title: "Total Comments",
//       count: "320",
//       icon: "bi bi-chat-dots",
//       colorClass: "text-danger",
//       bgClass: "bg-danger",
//     },
//   ];

//   return (
//     <Container fluid className="py-4">
//       {/* Header Section */}
//       <div className="mb-4">
//         <h2 className="fw-bold m-0">Dashboard Overview</h2>
//         <p className="text-muted small">
//           Welcome back, Admin! Here's what's happening today.
//         </p>
//       </div>

//       {/* Stats Cards */}
//       <Row>
//         {stats.map((item, i) => (
//           <Col xl={3} md={6} key={i} className="mb-4">
//             <Card className="border-0 shadow-sm rounded-3">
//               <Card.Body className="p-4">
//                 <div className="d-flex align-items-center justify-content-between">
//                   <div>
//                     <p className="text-muted small fw-bold text-uppercase mb-1">
//                       {item.title}
//                     </p>
//                     <h3 className="fw-bold m-0">{item.count}</h3>
//                   </div>
//                   {/* Icon with light background using Bootstrap utility classes */}

//                 </div>
//                 {/* Optional small detail text */}
//                 <div className="mt-3 small">
//                   <span className="text-success fw-bold">
//                     <i className="bi bi-arrow-up-short"></i> 12%
//                   </span>
//                   <span className="text-muted ms-1">Since last month</span>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//     </Container>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import { Row, Col, Card, Container, Spinner } from "react-bootstrap";
import {
  getAllUsers,
  getAllArticles,
  getAllCategories,
  getAllComments,
} from "../Services/adminService";
const Dashboard = () => {
  // State for dynamic counts
  const [statsData, setStatsData] = useState({
    users: 0,
    articles: 0,
    categories: 0,
    comments: 0,
  });
  const [loading, setLoading] = useState(true);

  // Fetch all counts on component mount
  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        // Saari APIs ko ek saath call kar rahe hain performance ke liye
        const [usersRes, articlesRes, categoriesRes, commentsRes] =
          await Promise.all([
            getAllUsers(),
            getAllArticles(),
            getAllCategories(),
            getAllComments(),
          ]);

        // Backend response structure ke mutabiq length nikalna
        setStatsData({
          users: usersRes.users?.length || usersRes.data?.length || 0,
          articles:
            articlesRes.articles?.length || articlesRes.data?.length || 0,
          categories:
            categoriesRes.categories?.length || categoriesRes.data?.length || 0,
          comments:
            commentsRes.comments?.length || commentsRes.data?.length || 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const stats = [
    {
      title: "Total User",
      count: statsData.users,
      icon: "bi bi-people",
      colorClass: "text-primary",
      bgClass: "bg-primary",
    },
    {
      title: "Total Post",
      count: statsData.articles,
      icon: "bi bi-file-earmark-text",
      colorClass: "text-warning",
      bgClass: "bg-warning",
    },
    {
      title: "Total Category",
      count: statsData.categories,
      icon: "bi bi-grid",
      colorClass: "text-success",
      bgClass: "bg-success",
    },
    {
      title: "Total Comments",
      count: statsData.comments,
      icon: "bi bi-chat-dots",
      colorClass: "text-danger",
      bgClass: "bg-danger",
    },
  ];

  return (
    <Container fluid className="py-4">
      {/* Header Section */}
      <div className="mb-4">
        <h2 className="fw-bold m-0">Dashboard Overview</h2>
        <p className="text-muted small">
          Welcome back, Admin! Here's what's happening today.
        </p>
      </div>

      {/* Stats Cards */}
      <Row>
        {stats.map((item, i) => (
          <Col xl={3} md={6} key={i} className="mb-4">
            <Card className="border-0 shadow-sm rounded-3">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <p className="text-muted small fw-bold text-uppercase mb-1">
                      {item.title}
                    </p>
                    <h3 className="fw-bold m-0">
                      {loading ? (
                        <Spinner
                          animation="border"
                          size="sm"
                          variant="secondary"
                        />
                      ) : (
                        item.count
                      )}
                    </h3>
                  </div>
                  {/* Icon section (as per your original code) */}
                  {/* <div
                    className={`p-3 rounded-circle bg-opacity-10 ${item.bgClass.replace("bg-", "text-")}`}
                    style={{ backgroundColor: "rgba(0,0,0,0.05)" }}>
                    <i className={`${item.icon} h4 mb-0`}></i>
                  </div> */}
                </div>
                {/* Optional small detail text */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Dashboard;
