package app

import (
	"database/sql"

	"github.com/USER/fp-pbkk-go/controller"
	"github.com/USER/fp-pbkk-go/db"
	"github.com/gin-gonic/gin"
)

type App struct {
	DB     *sql.DB
	Router *gin.Engine
}

func (a *App) CreateConnection() {
	// Establish the database connection
	a.DB = db.Connectdb()
}

func (a *App) Routes() {
	r := gin.Default()

	// Initialize MangaController and add routes
	mangaController := controller.NewMangaController(a.DB)
	r.POST("/manga", mangaController.InsertManga)
	r.GET("/manga", mangaController.GetAllManga)
	r.GET("/manga/:id", mangaController.GetOneManga)
	r.PUT("/manga/:id", mangaController.UpdateManga)
	r.DELETE("/manga/:id", mangaController.DeleteManga)

	// Initialize ChapterController and add routes
	chapterController := controller.NewChapterController(a.DB)
	r.POST("/chapter", chapterController.InsertChapter)

	// Store the router in App struct
	a.Router = r
}

func (a *App) Run() {
	// Run the Gin server
	a.Router.Run(":8080")
}
