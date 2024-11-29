package repository

import (
	"database/sql"
	"log"

	"github.com/USER/fp-pbkk-go/model"
)

type ChapterRepository struct {
	Db *sql.DB
}

func NewChapterRepository(db *sql.DB) *ChapterRepository {
	return &ChapterRepository{Db: db}
}

func (r *ChapterRepository) InsertChapter(post model.PostChapter) bool {
	// Prepare the SQL statement
	stmt, err := r.Db.Prepare("INSERT INTO chapter (manga_id, chapter_no, title, pdf_path) VALUES (?, ?, ?, ?)")
	if err != nil {
		log.Println("Error preparing statement:", err)
		return false
	}
	defer stmt.Close()

	// Execute the statement
	_, err2 := stmt.Exec(post.MangaId, post.ChapterNo, post.Title, post.PdfPath)
	if err2 != nil {
		log.Println("Error executing statement:", err2)
		return false
	}
	return true
}
