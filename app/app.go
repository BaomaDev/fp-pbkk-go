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
	db := db.Connectdb()
	a.DB = db
}

func (a *App) Routes() {
	r := gin.Default()
	controller := controller.NewMangaController(a.DB)
	r.POST("/manga", controller.InsertManga)
	r.GET("/manga", controller.GetAllManga)
	r.GET("/manga/:id", controller.GetOneManga)
	r.PUT("/manga/:id", controller.UpdateManga)
	r.DELETE("/manga/:id", controller.DeleteManga)
	a.Router = r
}

func (a *App) Run() {
	a.Router.Run(":8080")
}
