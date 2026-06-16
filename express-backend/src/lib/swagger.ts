import { Express, Request, Response } from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from  "swagger-ui-express"
import {version} from "../../package.json"

const options: swaggerJsDoc.Options = {
    definition: {
        socinetapi: "1.0.0",
        info: {
            title: "SociNet API Docs",
            version
        },
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                },
            },
        },
        security: [
            {
                bearerAuth: []
            },
        ]
    },
    apis: ["src/routes/authRoute.ts", "src/schemas/*.ts"]
}

const swaggerSpec = swaggerJsDoc(options)

function swaggerDocs(app: Express, port: number) {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

    app.get("docs.json", (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json")
        res.send(swaggerSpec)
    })
}

export default swaggerDocs