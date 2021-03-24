import { Router } from "express"
import { getProxies, addProxy } from "../controllers"

const router = Router()

router.get("/api/proxies", getProxies)
router.post("/api/proxy", addProxy)

export default router
