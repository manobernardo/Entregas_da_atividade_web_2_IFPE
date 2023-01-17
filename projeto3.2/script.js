class Eventos{
    constructor(){
        this.id = 1;
        this.arrayEventos = [];
        this.editarId = null;

    }
    salvar(){
       var eventos= this.lerDador();
        if(this.validaCampos(eventos)){
            if(this.editarId == null){
                this.adicionar(eventos);
            }else{
                this.atualizar(this.editarId, eventos)
            }
            
        }
       this.listartabela();
        this.cancelar();
    }
    listartabela(){
        var tbody = document.getElementById('tbody');
        tbody.innerHTML = '';

            for(var i = 0; i < this.arrayEventos.length; i++){
                var tr = tbody.insertRow();

                var td_id = tr.insertCell();
                var td_evento = tr.insertCell();
                var td_data = tr.insertCell();
                var td_endereco = tr.insertCell();
                var td_acoes = tr.insertCell();

                td_id.innerHTML = this.arrayEventos[i].id;
                td_evento.innerHTML = this.arrayEventos[i].nomeEvento;
                td_data.innerHTML = this.arrayEventos[i].dataEvento;
                td_endereco.innerHTML = this.arrayEventos[i].enderecoEvento;
                //td_acoes.innerHTML = this.arrayEventos[i].id;

                td_id.classList.add('center');

                var imagemEdit = document.createElement('img');
                imagemEdit.src = 'img/edit.jpg';
                imagemEdit.setAttribute("onclick","novoEventos.editar("+JSON.stringify(this.arrayEventos[i])+")");

                var imagemDelete = document.createElement('img');
                imagemDelete.src = 'img/delete.svg';
                imagemDelete.setAttribute("onclick","novoEventos.deletar("+this.arrayEventos[i].id+")");
                //("+")");
                td_acoes.appendChild(imagemEdit);
                td_acoes.appendChild(imagemDelete);

                console.log(this.arrayEventos);

            }
        
       

    }
    adicionar(eventos){
        this.arrayEventos.push(eventos);
        this.id++;
    }
    atualizar(id, eventos){
        for(var i = 0; i < this.arrayEventos.length; i++){
            if(this.arrayEventos[i].id == id){
                this.arrayEventos[i].nomeEvento = eventos.nomeEvento;
                this.arrayEventos[i].dataEvento = eventos.dataEvento;
                this.arrayEventos[i].enderecoEvento = eventos.enderecoEvento;
            }
        }
    }
    editar(dados){

        this.editarId = dados.id;
        document.getElementById('evento').value = dados.nomeEvento;
        document.getElementById('data').value = dados.dataEvento;
        document.getElementById('endereco').value = dados.enderecoEvento;

        document.getElementById('botao1').innerText = 'Atualizar';
    }
    lerDador(){
        var eventos = {}
            eventos.id = this.id;
            eventos.nomeEvento = document.getElementById('evento').value;
            eventos.dataEvento = document.getElementById('data').value;
            eventos.enderecoEvento = document.getElementById('endereco').value;

        return eventos;
        
    }
    cancelar(){
        document.getElementById('evento').value = '';
        document.getElementById('data').value = '';
        document.getElementById('endereco').value = '';

        document.getElementById('botao1').innerText = 'Salvar';
        this.editarId = null;

}
    validaCampos(eventos){
        var messagem = '';
        if(eventos.nomeEvento == ''){
            messagem += 'Informe evento\n';
        }
        if(eventos.dataEvento == ''){
            messagem += 'Informe data\n';
        }
        if(eventos.enderecoEvento == ''){
            messagem += 'Informe endereço\n';
        }
        if(messagem != ''){
            alert(messagem);
            return false;
        }
        return true;
}
    deletar(id, nomeEvento) {
        //if(confirm('Deseja realmente deletar o evento do ID' + id)){
        var tbody = document.getElementById('tbody');
        for(var i = 0; i < this.arrayEventos.length; i++){
            if(this.arrayEventos[i].id == id){
                this.arrayEventos.splice(i,1);
                tbody.deleteRow(i);
            }
        }
    //}
    }
}

var novoEventos = new Eventos();