import axios from "axios";

export const useCepLookup = (setValue: Function) => {
  const buscarCep = async (cep: string) => {
    const cepLimpo = cep.replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
      console.error("CEP inválido");
      return;
    }

    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
      );
      const data = response.data;

      if (data.erro) {
        console.error("CEP não encontrado");
        return;
      }

      setValue("address.street", data.logradouro);
      setValue("address.neighborhood", data.bairro);
      setValue("address.city", data.localidade);
      setValue("address.state", data.uf);
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    }
  };

  return { buscarCep };
};
