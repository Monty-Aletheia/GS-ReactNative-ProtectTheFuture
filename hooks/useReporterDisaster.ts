import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reportDisaster } from "../service/markerService";
import { MarkerInfoRequest } from "../types/markerInfo";

export function useReportDisaster(onSuccessCallback: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MarkerInfoRequest) => reportDisaster(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      onSuccessCallback();
    },
    onError: (error) => {
      console.error(error);
      alert("Erro ao enviar relatório, tente novamente.");
    },
  });
}
