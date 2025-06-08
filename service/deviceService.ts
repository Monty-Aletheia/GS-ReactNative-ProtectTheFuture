import api from "../service/api";

export async function addDeviceToUser(
  expoDeviceToken: string,
  userId: string | undefined,
  deviceName: string | null
) {
  try {
    const response = await api.post("/Device", {
      expoDeviceToken,
      userId,
      deviceName,
    });

    if (response.status !== 201) {
      console.error("Falha ao adicionar device:", response.status, response.data);
    }
  } catch (error: any) {
    console.error("Erro ao adicionar device:", error.message || error);
  }
}
