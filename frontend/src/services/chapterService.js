import api from "./api";

const ChapterService = {
    // Create a new chapter
    create: async (chapter) => {
        const response = await api.post("/chapter", chapter);
        return response.data;
    },

    // Fetch chapters by manga ID
    getByMangaId: async (mangaId) => {
        const response = await api.get(`/chapter/${mangaId}`);
        return response.data;
    },
};

export default ChapterService;
