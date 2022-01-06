import PacientesModel from "./pacientesModel.js";
import PacientesControler from "./pacientesController.js";

jQuery(()=>{ //quando a dom carregar ativa
    const model = new PacientesModel();
    const controller = new PacientesControler("#pacientes", model);
    controller.build;
});



/*const model = new PacientesModel()
model.add({
    nome:"Gui",
    email:"jskjsdk",
    telefone:"3847395",
    cpf:"45646",
})

model.add({
    nome:"Gu",
    email:"jskjsdk",
    telefone:"3847395",
    cpf:"45646",
})

model.edit(2,{
    nome:"Anaaa",
    email:"jskjsdk",
    telefone:"3847395",
    cpf:"45646"
})

console.log(model.pacientes)*/