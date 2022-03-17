import { createServer } from "miragejs"
import { data, getData, getEmployee, delEmployee } from "./models/employees"

export default function () {

  createServer({
    routes() {
        this.get("/api/employees", () => data.employees)
        this.get("/api/employees/list/data", (schema, request) => getData(request.queryParams))
        this.get("/api/employees/employee", (_, request) => getEmployee(request.queryParams))
        this.del('/api/employees/delete', (_, req) => delEmployee(req.queryParams))
    }
  })
}
