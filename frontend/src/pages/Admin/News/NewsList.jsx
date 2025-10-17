import React, { useEffect, useState, useMemo } from "react";
import { HiArrowDownTray } from "react-icons/hi2";
import { FiSearch, FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Swal from "sweetalert2";
import { GoPlus } from "react-icons/go";

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Fetch news data
  const fetchNews = async () => {
    try {
      const res = await fetch("http://localhost:8000/news");
      if (!res.ok) throw new Error("Failed to fetch news");
      const data = await res.json();
      setNews(data);
    } catch (error) {
      console.error("Error fetching news:", error);
      Swal.fire("Error", "Failed to load news data.", "error");
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Filtered news
  const filteredNews = useMemo(() => {
    return news.filter(
      (n) =>
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [news, search]);

  // PDF Export
  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["#", "Date", "Title", "Description"];
    const tableRows = [];

    filteredNews.forEach((item, index) => {
      const row = [
        index + 1,
        new Date(item.date || item.createdAt).toLocaleDateString("en-IN"),
        item.title,
        item.description,
      ];
      tableRows.push(row);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      theme: "grid",
      styles: { fontSize: 8 },
      headStyles: { fillColor: [253, 230, 138] },
    });

    doc.text("News List", 14, 15);
    doc.save("news.pdf");
  };

  // Delete news
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
        const res = await fetch(`http://localhost:8000/news/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Failed to delete news");
        Swal.fire("Deleted!", "News has been deleted.", "success");
        fetchNews();
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", err.message || "Failed to delete news.", "error");
      }
    }
  };

  return (
    <section className="min-h-screen ">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-2xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-1">News</h1>
        <p className="text-gray-500 mb-6 text-sm sm:text-base">Welcome back, Admin</p>

        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center mb-6">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 w-full sm:w-1/2">
            <FiSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search news..."
              className="w-full bg-transparent outline-none text-sm sm:text-base"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-row sm:flex-row gap-2 w-full sm:w-auto">
            <button
              onClick={exportPDF}
              className="flex-1 sm:flex-none px-3 sm:px-5 py-2 flex items-center justify-center gap-2 border rounded-lg text-gray-700 hover:bg-gray-100 whitespace-nowrap"
            >
              <HiArrowDownTray className="text-lg" /> Export PDF
            </button>

            <button
              onClick={() => navigate("/admin/newslist/add-news")}
              className="flex-1 sm:flex-none px-3 sm:px-5 py-2 flex items-center justify-center gap-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 whitespace-nowrap"
            >
              <GoPlus /> Add News
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-200 rounded-xl">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-orange-100 text-gray-700 uppercase text-xs sm:text-sm font-semibold">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredNews.length > 0 ? (
                filteredNews.map((n, index) => (
                  <tr key={n.id} className="border-t border-gray-200 hover:bg-orange-50 transition">
                    <td className="px-4 py-3 text-gray-600">{index + 1}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {new Date(n.date || n.createdAt).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800">{n.title}</td>
                    <td className="px-4 py-3 text-gray-600">{n.description}</td>
                    <td className="px-4 py-3 flex gap-2">
                      <button
                        onClick={() => navigate(`/news/edit-news/${n.id}`)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(n.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500 italic">
                    No news found.
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

export default NewsList;

