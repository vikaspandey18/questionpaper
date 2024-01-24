import { toast } from "react-toastify";
import axios from "axios";
import { redirect } from "react-router-dom";

export const action = async ({ request }) => {
  const formdata = await request.formData();
  const data = Object.fromEntries(formdata);
  try {
    const response = await axios.post("/api/activity/questiontemplate", data);
    toast.success(response.data.msg);
    return redirect("/create-question-paper");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/create-question-paper");
  }
};
