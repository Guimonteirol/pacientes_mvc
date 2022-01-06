export default class PacientesModel{
    pacientes = [];
    currentId = 1;
    //data é o objeto que está dentro de pacientes
    add(data){
        this.pacientes.push({
            ...data, //esse id é oq determina dentro do array 
            id: this.currentId,
        });

        this.currentId++;
    }

    edit(id,data){
        const pacienteIndex = this.pacientes.findIndex((p) => p.id === id);

        if(pacienteIndex > -1){
            this.pacientes[pacienteIndex] = {...data, id};
        }
    }

        //no delete, o parâmetro importa, pois ele va buscar dentro do vetor o mesmo parâmetro que contem no objeto
    delete(id){
        this.pacientes = this.pacientes.filter((p) =>
         p.id !== id);
         //ele vai filtrar, o veotr não pode conter o p que foi digitado, pois o novo vetor contem um thid.id !== id
    }

}