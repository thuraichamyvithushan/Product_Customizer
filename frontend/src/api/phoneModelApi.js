import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const publicClient = axios.create({
  baseURL: `${API_URL}/phone-models`
});

const adminClient = axios.create({
  baseURL: `${API_URL}/admin/phone-models`
});

export const fetchPhoneModels = async () => {
  const { data } = await publicClient.get("/");
  return data;
};

export const adminCreatePhoneModel = async (payload, token) => {
  const { data } = await adminClient.post("/", payload, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return data;
};

export const adminDeletePhoneModel = async (id, token) => {
  const { data } = await adminClient.delete(`/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return data;
};

export const adminAddTemplateToModel = async (modelId, templateImage, token) => {
  const { data } = await adminClient.post(
    `/${modelId}/templates`,
    { templateImage },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return data;
};

export const adminRemoveTemplateFromModel = async (modelId, templateIndex, token) => {
  const { data } = await adminClient.delete(`/${modelId}/templates/${templateIndex}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return data;
};


