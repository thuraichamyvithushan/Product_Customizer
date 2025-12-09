import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// PUBLIC (client)
const publicClient = axios.create({
  baseURL: `${API_URL}/pet-products`
});

// ADMIN (dashboard)
const adminClient = axios.create({
  baseURL: `${API_URL}/admin/pet-products`
});


export const fetchPetProducts = async () => {
  const { data } = await publicClient.get("/");
  return data;
};


export const adminCreatePetProduct = async (payload, token) => {
  const { data } = await adminClient.post("/", payload, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return data;
};


export const adminDeletePetProduct = async (id, token) => {
  const { data } = await adminClient.delete(`/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return data;
};


export const adminAddTemplateToPet = async (productId, templateImage, token) => {
  const { data } = await adminClient.post(
    `/${productId}/templates`,
    { templateImage },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return data;
};


export const adminRemoveTemplateFromPet = async (productId, templateIndex, token) => {
  const { data } = await adminClient.delete(
    `/${productId}/templates/${templateIndex}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return data;
};


export const adminUpdatePetMockup = async (productId, mockupImage, coverArea, coverSize, token) => {
  const { data } = await adminClient.patch(
    `/${productId}/mockup`,
    { mockupImage, coverArea, coverSize },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return data;
};
