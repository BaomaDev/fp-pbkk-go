package main

import "github.com/USER/fp-pbkk-go/app"

func main() {
	var a app.App
	a.CreateConnection()
	a.Routes()
	a.Run()
}
