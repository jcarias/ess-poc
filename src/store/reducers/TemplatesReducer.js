import {
  ADD_TEMPLATE,
  UPDATE_TEMPLATE,
  DELETE_TEMPLATE
} from "../actions/TemplatesActions";
import { deepClone } from "../../utils/utils";

const initState = {
  templates: [
    {
      id: "1",
      title: "Novabase Demo",
      description: "Demo using Novabase contract template.",
      eSignTemplateName: "novabase",
      active: true,
      fields: [
        {
          id: "70765e52-30a9-4c5a-ba43-ad2648f4819a",
          name: "personalData",
          label: "Dados Pessoais",
          type: "divider",
          multiline: false,
          options: [],
          xsCols: 12
        },
        {
          id: "6ca19afe-3a96-4a89-b326-29e96a349297",
          name: "fullname",
          type: "text",
          multiline: false,
          options: [
            { label: "Direita", value: "right" },
            { label: "Esquerda", value: "left" }
          ],
          label: "Nome Completo",
          required: true,
          xsCols: 12
        },
        {
          id: "6ca19afe-3a96-4a89-b326-29e96a349298",
          name: "docId",
          type: "text",
          multiline: false,
          options: [
            { label: "Direita", value: "right" },
            { label: "Esquerda", value: "left" }
          ],
          label: "Nº Documento de Identificação",
          required: true,
          xsCols: 6
        },
        {
          id: "e8497475-abaa-4d25-b335-5b1e4c4c73cd",
          name: "docType",
          label: "Tipo de Dcumento",
          type: "select",
          multiline: false,
          options: [
            { label: "Cartão do Cidadão", value: "Cartão do Cidadão" },
            { label: "Passaporte", value: "Passaporte" },
            {
              value: "Autorização de Residência",
              label: "Autorização de Residência"
            }
          ],
          xsCols: 6,
          required: true
        },
        {
          id: "1aa37fce-8ec5-46db-8559-c0b9e7c2b0a1",
          name: "docEntity",
          type: "text",
          multiline: false,
          options: [],
          xsCols: 4,
          label: "Entidade Emissora"
        },
        {
          id: "8b9eb1cf-e6fe-4bf5-b021-6d9a9a7070a8",
          name: "docStartDate",
          type: "text",
          multiline: false,
          options: [],
          xsCols: 4,
          label: "Data Emissão"
        },
        {
          id: "cd651243-09a6-41f8-af5b-65108b8081ca",
          name: "docEndDate",
          label: "Validade Documento",
          type: "text",
          multiline: false,
          options: [],
          xsCols: 4
        },
        {
          id: "890ec4af-5989-4d95-a67a-ff39ed5d7992",
          label: "País Emissior",
          type: "text",
          multiline: false,
          options: [],
          xsCols: 4,
          name: "docCountry"
        },
        {
          id: "af2625d3-ca4b-4dbb-8cc8-13c9942b1060",
          label: "Nacionalidade",
          type: "text",
          multiline: false,
          options: [],
          xsCols: 6,
          name: "nacionality"
        },
        {
          id: "9599cc5b-debf-4742-8821-38718490b94e",
          label: "Data Nascimento",
          type: "text",
          multiline: false,
          options: [],
          xsCols: 6,
          name: "birthdate"
        },
        {
          id: "13290cb0-5cb4-4724-9a85-2b3175932e61",
          label: "Sexo",
          type: "radio",
          multiline: false,
          options: [
            { label: "Masculino", value: "sexM" },
            { label: "Feminino", value: "sexF" },
            { label: "Outro", value: "sexOther" }
          ],
          xsCols: 6,
          name: "sex"
        },
        {
          id: "6930cb51-3120-4737-a597-a278398507ea",
          name: "taxData",
          label: "Dados Fiscais",
          type: "divider",
          multiline: false,
          options: [],
          xsCols: 12
        },
        {
          id: "ad7741b6-c2ef-49f0-8c5b-681d6b622ab1",
          name: "nif",
          type: "text",
          multiline: false,
          options: [],
          xsCols: 6,
          label: "Nº Identificação Fiscal",
          required: true
        },
        {
          id: "394ba402-face-4aa5-bf86-7bbda5b9c614",
          name: "nationalCitizen",
          type: "radio",
          multiline: false,
          options: [
            { label: "Sim", value: "s" },
            { label: "Não", value: "n" }
          ],
          xsCols: 6,
          label: "Cidadão Nacional",
          required: true
        }
      ],
      primary: "#f44336",
      secondary: "#2196f3",
      customFont: "Roboto"
    }
  ]
};

export const TemplatesReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_TEMPLATE: {
      let newState = deepClone(state);
      const newTemplates = [...newState.templates, action.payload];
      return { ...newState, templates: newTemplates };
    }

    case UPDATE_TEMPLATE: {
      let newState = deepClone(state);
      const templateIndex = newState.templates.findIndex(
        template => template.id === action.payload.id
      );
      if (templateIndex >= 0) {
        newState.templates.splice(templateIndex, 1, action.payload);
        return newState;
      } else {
        return state;
      }
    }

    case DELETE_TEMPLATE: {
      let newState = deepClone(state);
      const newTemplates = newState.templates.filter(
        template => template.id !== action.payload.id
      );
      return { ...newState, templates: newTemplates };
    }

    default:
      return state;
  }
};
