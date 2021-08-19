import { Router } from "express"
import { getProxies, addProxies } from "../controllers"

const router = Router()

router.get("/proxies", getProxies)
router.post("/proxies", addProxies)

export default router
