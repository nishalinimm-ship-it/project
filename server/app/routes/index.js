import userRoutes from "./user.routes.js";
import uploadRoutes from "./upload.routes.js";
import companyRoutes from "./company.routes.js";

export default function (app) {

  app.use("/api/users", userRoutes);   // Users Routes
  app.use("/api/uploads", uploadRoutes); // File Upload Routes
   app.use("/api/company", companyRoutes);

}
