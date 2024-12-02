// import React, { useState } from "react";
// import axios from "axios";

// const UploadChapter = () => {
//     const [formData, setFormData] = useState({
//         mangaId: "",
//         chapterNo: 0,
//         title: "",
//         pdfFile: null,
//     });

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleFileChange = (e) => {
//         setFormData({ ...formData, pdfFile: e.target.files[0] });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const formDataToSend = new FormData();
//             formDataToSend.append("manga_id", formData.mangaId);
//             formDataToSend.append("chapter_no", formData.chapterNo);
//             formDataToSend.append("title", formData.title);
//             formDataToSend.append("pdf", formData.pdfFile);

//             await axios.post("http://localhost:8080/chapter", formDataToSend, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 },
//             });

//             alert("Chapter uploaded successfully!");
//         } catch (error) {
//             console.error("Error uploading chapter:", error);
//             alert("Failed to upload chapter. Please try again.");
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-md rounded-md p-6">
//             <h2 className="text-xl font-bold text-gray-800 mb-4">Upload Chapter</h2>

//             <div className="mb-4">
//                 <label className="block text-gray-700 font-bold mb-1">Manga ID</label>
//                 <input
//                     type="number"
//                     name="mangaId"
//                     value={formData.mangaId}
//                     onChange={handleInputChange}
//                     className="w-full border-gray-300 rounded-md p-2"
//                     required
//                 />
//             </div>

//             <div className="mb-4">
//                 <label className="block text-gray-700 font-bold mb-1">Chapter Number</label>
//                 <input
//                     type="number"
//                     name="chapterNo"
//                     value={formData.chapterNo}
//                     onChange={handleInputChange}
//                     className="w-full border-gray-300 rounded-md p-2"
//                     required
//                 />
//             </div>

//             <div className="mb-4">
//                 <label className="block text-gray-700 font-bold mb-1">Chapter Title</label>
//                 <input
//                     type="text"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleInputChange}
//                     className="w-full border-gray-300 rounded-md p-2"
//                     required
//                 />
//             </div>

//             <div className="mb-4">
//                 <label className="block text-gray-700 font-bold mb-1">Upload PDF</label>
//                 <input
//                     type="file"
//                     name="pdfFile"
//                     onChange={handleFileChange}
//                     className="w-full border-gray-300 rounded-md p-2"
//                     accept="application/pdf"
//                     required
//                 />
//             </div>

//             <button
//                 type="submit"
//                 className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//             >
//                 Upload Chapter
//             </button>
//         </form>
//     );
// };

// export default UploadChapter;

import React, { useState } from "react";
import axios from "axios";

const ManageChapter = () => {
    const [formData, setFormData] = useState({
        mangaId: "",
        chapterNo: 0,
        title: "",
        pdfFile: null,
    });

    const [chapters, setChapters] = useState([]); // Added chapters state

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, pdfFile: e.target.files[0] });
    };

    const handleSubmitChapter = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("manga_id", formData.mangaId);
            formDataToSend.append("chapter_no", formData.chapterNo);
            formDataToSend.append("title", formData.title);
            formDataToSend.append("pdf", formData.pdfFile);

            await axios.post("http://localhost:8080/chapter", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Chapter uploaded successfully!");
            setFormData({ mangaId: "", chapterNo: 0, title: "", pdfFile: null });
            fetchChapters(formData.mangaId); // Fetch updated chapter list after upload
        } catch (error) {
            console.error("Error uploading chapter:", error);
            alert("Failed to upload chapter. Please try again.");
        }
    };

    const fetchChapters = async (mangaId) => {
        try {
            const response = await axios.get(`http://localhost:8080/manga/${mangaId}/chapters`);
            setChapters(response.data); // Assuming the API returns an array of chapters
        } catch (error) {
            console.error("Error fetching chapters:", error);
        }
    };

    const handleDeleteChapter = async (mangaId, chapterNo) => {
        if (window.confirm("Are you sure you want to delete this chapter?")) {
            try {
                await axios.delete(`http://localhost:8080/chapter/${mangaId}/${chapterNo}`);
                alert("Chapter deleted successfully!");
                fetchChapters(mangaId); // Fetch updated chapter list after deletion
            } catch (error) {
                console.error("Error deleting chapter:", error);
                alert("Failed to delete chapter. Please try again.");
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Manage Chapter</h2>

            <form onSubmit={handleSubmitChapter} className="bg-white shadow-md rounded-md p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Upload Chapter</h3>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-1">Manga ID</label>
                    <input
                        type="number"
                        name="mangaId"
                        value={formData.mangaId}
                        onChange={handleInputChange}
                        className="w-full border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-1">Chapter Number</label>
                    <input
                        type="number"
                        name="chapterNo"
                        value={formData.chapterNo}
                        onChange={handleInputChange}
                        className="w-full border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-1">Chapter Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-1">Upload PDF</label>
                    <input
                        type="file"
                        name="pdfFile"
                        onChange={handleFileChange}
                        className="w-full border-gray-300 rounded-md p-2"
                        accept="application/pdf"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Upload Chapter
                </button>
            </form>

            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Chapters</h3>
                <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left">Chapter No</th>
                            <th className="px-4 py-2 text-left">Title</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chapters.map((chapter) => (
                            <tr key={chapter.chapterNo}>
                                <td className="px-4 py-2">{chapter.chapterNo}</td>
                                <td className="px-4 py-2">{chapter.title}</td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => handleDeleteChapter(chapter.mangaId, chapter.chapterNo)}
                                        className="text-red-500 hover:underline"
                                    >
                                        Delete Chapter
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageChapter;

