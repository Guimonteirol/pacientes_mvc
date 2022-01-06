export default class PacientesControler{

    editModal = new bootstrap.Modal(document.getElementById("edit-modal"));
    editToast = new bootstrap.Toast(document.getElementById("edit_toast"));
    delToast = new bootstrap.Toast(document.getElementById("del_toast"));

    constructor(seletor, model){
        this.seletor = seletor; //id do tbody
        this.model = model; //pacientes.model

        this.addConteudo() 
        this.setupForm();//quando estanciar o controler vai configurar o formulário. Só vai executar uma vez
        this.setupAdd();
    }
    
    addConteudo(){
        if(this.model.pacientes.length === 0 ){
           $("#cabeT").empty();
           $("#cabeT").append('<tr><th class= "text-center">Não há registros</th></tr>');
        }
        else{
            $("#cabeT").empty();
            $("#cabeT").append( `
            <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>CPF</th>
                <th>CEP</th>
                <th>RG</th>
                <th>Ações</th>
            </tr>
            `);
        }
    }

    setupForm(){
        $("#telefone, #telefone_edit").mask("(00) 00000-0000");
        $("#cpf, #cpf_edit").mask("000.000.000-00");
        $("#rg, #rg_edit").mask("0.000.000");
        $("#cep, #cep_edit").mask("00000-000");

        $("#edit_paciente").submit((e) => {
            e.preventDefault();
      
            const inputs = $("#edit_paciente").serializeArray();
      
            console.log(inputs)
      
            const id = Number(inputs[0].value);
      
            const data = {
              nome: inputs[1].value,
              email: inputs[2].value,
              telefone: inputs[3].value,
              cpf: inputs[4].value,
              cep: inputs[5].value,
              rg: inputs[6].value,
            };
      
            this.model.edit(id, data);
            this.build();
            this.editModal.hide();
            this.editToast.show({ autohide: true });
      
            $("#edit_paciente input").val("");
          });
    }

    setupAdd(){ //selecionando o formulário
        $("#add_paciente").submit((e) =>{ //ao clilcar no botão execute:
         e.preventDefault();
         const inputs = $("#add_paciente").serializeArray(); //pegar os valores dos inputs do forme transforma em uma estrutura de dados
         const data = {};

         inputs.forEach((input) =>{
            data[input.name] = input.value;
         });

         this.model.add(data);
         $("#add_paciente input").val("");
         this.build();
         this.addConteudo()
        });
    }

    setupEdit(paciente){
        $(`#btn-edit-${paciente.id}`).click(() =>{
            $("#id").val(paciente.id);
            $("#nome_edit").val(paciente.nome);
            $("#email_edit").val(paciente.email);
            $("#telefone_edit").val(paciente.telefone);
            $("#cpf_edit").val(paciente.cpf);
            $("#cep_edit").val(paciente.cep);
            $("#rg_edit").val(paciente.rg);

            this.editModal.show();
        });
    }

    setupDelete(paciente){
        $(`#btn-del-${paciente.id}`).click(() =>{
            let resposta = confirm("Dseja excluir o paciente?")
            if(resposta === true){
                this.model.delete(paciente.id);
                this.build();
                this.delToast.show({autohide:true});
            }
            this.addConteudo();
        });
    }

    build(){ //construir as linhas
        $(this.seletor).empty(); //limpa o conteúdo p adicionar outro
        this.model.pacientes.forEach((paciente) =>{
            $(this.seletor).append(`
            <tr>
                <td>${paciente.id}</td>
                <td>${paciente.nome}</td>
                <td>${paciente.email}</td>
                <td>${paciente.telefone}</td>
                <td>${paciente.cpf}</td>
                <td>${paciente.cep}</td>
                <td>${paciente.rg}</td>
                <td>
                    <button id="btn-edit-${paciente.id}" class= "btn btn-warning btn-sm">
                        <i class="bi bi-pencil-fill"></i>
                    </button>
                    <button id="btn-del-${paciente.id}" class= "btn btn-danger btn-sm">
                         <i class="bi bi-trash-fill"></i>
                    </button>
                </td>
            </tr>
            `);
            this.setupEdit(paciente);
            this.setupDelete(paciente);
        });
    }


}