import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { HiArrowDownTray } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Swal from "sweetalert2";

const FeedbackListPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch("http://localhost:8000/feedbacks");
      if (!res.ok) throw new Error("Failed to fetch feedbacks");
      const data = await res.json();
      setFeedbacks(data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      Swal.fire("Error", "Failed to load feedback data.", "error");
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const filteredFeedbacks = useMemo(() => {
    return feedbacks.filter(
      (f) =>
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.message.toLowerCase().includes(search.toLowerCase())
    );
  }, [feedbacks, search]);

  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["#", "Name", "Message", "Avatar"];
    const tableRows = [];

    filteredFeedbacks.forEach((item, index) => {
      tableRows.push([index + 1, item.name, item.message, item.avatar ? "Yes" : "No"]);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      theme: "grid",
      styles: { fontSize: 8 },
      headStyles: { fillColor: [253, 230, 138] },
    });

    doc.text("Feedback List", 14, 15);
    doc.save("feedbacks.pdf");
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:8000/feedbacks/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete feedback");
        Swal.fire("Deleted!", "Feedback has been deleted.", "success");
        fetchFeedbacks();
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", err.message || "Failed to delete feedback.", "error");
      }
    }
  };

  return (
    <section className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-2xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-1">Feedback List</h1>
        <p className="text-gray-500 mb-6 text-sm sm:text-base">Welcome back, Admin</p>

        {/* Header */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 items-start sm:items-center mb-6 w-full">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 w-full sm:w-1/2">
            <FiSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search feedback..."
              className="w-full bg-transparent outline-none text-sm sm:text-base"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <button
              onClick={exportPDF}
              className="flex-1 sm:flex-none px-3 sm:px-5 py-2 flex items-center justify-center gap-2 border rounded-lg text-gray-700 hover:bg-gray-100 whitespace-nowrap"
            >
              <HiArrowDownTray className="text-lg" /> Export PDF
            </button>

            <button
              onClick={() => navigate("/admin/feedbacks/add-feedback")}
              className="flex-1 sm:flex-none px-3 sm:px-5 py-2 flex items-center justify-center gap-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 whitespace-nowrap"
            >
              <GoPlus /> Add Feedback
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-200 rounded-xl">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-orange-100 text-gray-700 uppercase text-xs sm:text-sm font-semibold">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Avatar</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFeedbacks.length > 0 ? (
                filteredFeedbacks.map((f, index) => (
                  <tr
                    key={f.id}
                    className="border-t border-gray-200 hover:bg-orange-50 transition"
                  >
                    <td className="px-4 py-3 text-gray-600">{index + 1}</td>

                    {/* Avatar */}
                    <td className="px-4 py-3">
                      {f.image ? (
                        <div className="flex items-center">
                          <img
                            src={f.image}
                            alt={f.name}
                            className="w-12 h-12 rounded-full object-cover border border-gray-300 shadow-sm"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                          N/A
                        </div>
                      )}
                    </td>

                    <td className="px-4 py-3 font-medium text-gray-800">{f.name}</td>
                    <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{f.message}</td>

                    <td className="px-4 py-3 flex gap-2 flex-wrap">
                      <button
                        onClick={() => handleDelete(f.id)}
                        className="text-red-500 hover:text-red-700 whitespace-nowrap"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500 italic">
                    No feedback found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default FeedbackListPage;
