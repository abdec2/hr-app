import { createServer } from "miragejs"

export default function () {
  createServer({
    routes() {
        this.get("/api/employees", () => [
            { id: "1", name: "Luke" },
            { id: "2", name: "Leia" },
            { id: "3", name: "Anakin" }
          ])
    }
  })
}