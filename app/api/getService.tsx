import ApiManager from "./apiManager";

export const getService = async (param: string) => {
  try {
    const result = await ApiManager(param, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    return result.data;
  } catch (error) {
    return error;
  }
};
