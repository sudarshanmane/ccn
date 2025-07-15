import { URLS } from "@/utils/URLS.js";
import axios from "axios";

export default axios.create({
  baseURL: URLS.BASE_URL,
});
