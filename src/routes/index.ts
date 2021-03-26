import { Router } from "express"
import { getProxies, addProxies } from "../controllers"

const router = Router()

router.get("/api/proxies", getProxies)
router.post("/api/proxies", addProxies)

export default router
