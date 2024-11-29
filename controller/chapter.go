package controller

import (
	"database/sql"
	"net/http"

	"github.com/USER/fp-pbkk-go/model"
	"github.com/USER/fp-pbkk-go/repository"
	"github.com/USER/fp-pbkk-go/utils"
	"github.com/gin-gonic/gin"
)

type ChapterController struct {
	Db *sql.DB
}

func NewChapterController(db *sql.DB) *ChapterController {
	return &ChapterController{Db: db}
}

func (ch *ChapterController) InsertChapter(c *gin.Context) {
	DB := ch.Db
	var post model.PostChapter

	// Bind request to the PostChapter struct
	if err := c.ShouldBind(&post); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "failed", "msg": err.Error()})
		return
	}

	// Handle file upload
	file, err := c.FormFile("pdf")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "failed", "msg": "PDF file is required"})
		return
	}

	// Save the file
	destination := "uploads/chapter"
	filePath, err := utils.UploadFile(file, destination)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "failed", "msg": "File upload failed"})
		return
	}
	post.PdfPath = filePath

	// Save chapter data to the database
	repository := repository.NewChapterRepository(DB)
	if repository.InsertChapter(post) {
		c.JSON(http.StatusOK, gin.H{"status": "success", "msg": "Chapter inserted successfully"})
	} else {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "failed", "msg": "Failed to insert chapter"})
	}
}
