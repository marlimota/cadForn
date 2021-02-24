
var app = new function () {
  //A tabela onde serão mostrados os elementos(fornecedores)
  this.FornecedoresTable = document.getElementById('fornecedoresBody');
 
  function Fornecedor(nomeFantasia, razaoSocial, cnpj, telefone, celular, endereco, email, site, produto, contrato, observacao = "") {
    this.nomeFantasia = nomeFantasia;
    this.razaoSocial = razaoSocial;
    this.cnpj = cnpj;
    this.telefone = telefone;
    this.celular = celular;
    this.endereco = endereco;
    this.email = email;
    this.site = site;
    this.produto = produto;
    this.contrato = contrato;
    this.observacao = observacao;
  }

  this.fornecedoresList = [];


  this.FetchAll = function () {
    var data = '';

    if (this.fornecedoresList.length > 0) {
      for (i = 0; i < this.fornecedoresList.length; i++) {
        if (i % 2 == 0) {
          data += '<tr class="colored-row">';
        }
        else {
          data += '<tr>';
        }
        data += '<td style="width:9%">' + this.fornecedoresList[i].nomeFantasia + '</td>';
        data += '<td style="width:9%">' + this.fornecedoresList[i].razaoSocial + '</td>';
        data += '<td style="width:9%">' + this.fornecedoresList[i].cnpj + '</td>';
        data += '<td style="width:9%">' + this.fornecedoresList[i].telefone + '</td>';
        data += '<td style="width:9%"> <Button onclick="app.ShowDetails(' + i + ')"  class="btn" id="details-btn"><i class="fa fa-eye"></i> Detalhes</Button> </td>';
        data += '</tr>';
      }
    }
    return this.FornecedoresTable.innerHTML = data;
  };

  this.AddProvider = function () {
    let currentFornecedor = new Fornecedor(
      document.getElementById('nomeFantasia').value,
      document.getElementById('razaoSocial').value,
      document.getElementById('cnpj').value,
      document.getElementById('telefone').value,
      document.getElementById('celular').value,
      document.getElementById('endereco').value,
      document.getElementById('email').value,
      document.getElementById('site').value,
      document.getElementById('produto').value,
      document.getElementById('contrato').value,
      document.getElementById('observacao').value,
    );

    if (isFornecedorValid(currentFornecedor)) {
      // Add the new value
      this.fornecedoresList.push(currentFornecedor);

      // Reset input value
      document.getElementById('nomeFantasia').value = "";
      document.getElementById('razaoSocial').value = "";
      document.getElementById('cnpj').value = "";
      document.getElementById('telefone').value = "";
      document.getElementById('celular').value = "";
      document.getElementById('endereco').value = "";
      document.getElementById('email').value = "";
      document.getElementById('site').value = "";
      document.getElementById('produto').value = "";
      document.getElementById('contrato').value = "";
      document.getElementById('observacao').value = "";


      // Dislay the new list
      this.FetchAll();

      HideNewProviderOverlay();
    }
  };

  //EDIT FUNCTION
  this.ShowDetails = function (item) {

    //Cria um objeto fornecedor que é cópia do fornecedor que se deseja editar
    currentFornecedor = this.fornecedoresList[item];

    //Exibe as informações do fornecedor a ser editado nos campos de edição
    document.getElementById('nomeFantasia').value = currentFornecedor.nomeFantasia;
    document.getElementById('razaoSocial').value = currentFornecedor.razaoSocial;
    document.getElementById('cnpj').value = currentFornecedor.cnpj;
    document.getElementById('telefone').value = currentFornecedor.telefone;
    document.getElementById('celular').value = currentFornecedor.celular;
    document.getElementById('endereco').value = currentFornecedor.endereco;
    document.getElementById('email').value = currentFornecedor.email;
    document.getElementById('site').value = currentFornecedor.site;
    document.getElementById('produto').value = currentFornecedor.produto;
    document.getElementById('contrato').value = currentFornecedor.contrato;
    document.getElementById('observacao').value = currentFornecedor.observacao;

    //Exibe os campos de edição
    ShowNewProviderOverlay();
    self = this;

    //Função que salva as edições realizadas caso sejam validas
    document.getElementById('save-edit').onsubmit = function () {

      //Cria um objeto fornecedor com todas as informações contidas nos campos de edição
      let editedFornecedor = new Fornecedor(
        document.getElementById('nomeFantasia').value,
        document.getElementById('razaoSocial').value,
        document.getElementById('cnpj').value,
        document.getElementById('telefone').value,
        document.getElementById('celular').value,
        document.getElementById('endereco').value,
        document.getElementById('email').value,
        document.getElementById('site').value,
        document.getElementById('produto').value,
        document.getElementById('contrato').value,
        document.getElementById('observacao').value
      );

      //Caso todas as informações sejam válidas atualiza a lista de fornecedores e esconde os campos de edição
      if (isFornecedorValid(editedFornecedor)) {
        // Edit value
        self.fornecedoresList.splice(item, 1, editedFornecedor);
        // Display the new list
        self.FetchAll();
        // Hide fields
        CloseInput();
      }
    }
  };

  //DELETE FUNCTION
  this.Delete = function (item) {
    // Delete the current row
    this.fornecedoresList.splice(item, 1);
    // Display the new list
    this.FetchAll();
  };

}

app.FetchAll();

this.ShowNewProviderOverlay = function () {
  document.getElementById("pageOverlay").style.display = "block";
}

this.HideNewProviderOverlay = function () {
  document.getElementById("pageOverlay").style.display = "none";
}

function CloseInput() {
  document.getElementById('edit-box').style.display = 'none';
}


function isFornecedorValid(fornecedor) {
  if (fornecedor.nomeFantasia.length < 3) {
    alert("O nome deve ter pelo menos 3 caracteres!");
    return false;
  }
  if (fornecedor.razaoSocial.length < 3) {
    alert("A razão social deve ter pelo menos 3 caracteres!");
    return false;
  }

  if (fornecedor.cnpj.length < 14) {
    alert("O CNPJ deve ter pelo menos 14 caracteres!");
    return false;
  }

  if (fornecedor.endereco.length > 35) {
    alert("O endereço deve ter até 35 caracteres!");
    return false;
  }

  if (fornecedor.telefone === "") {
    alert("Você deve digitar um telefone válido!");
    return false;
  }

  if (fornecedor.produto === "") {
    alert("Você deve digitar um produto!");
    return false;
  }

  if (fornecedor.contrato.length < 10) {
    alert("Você deve digitar o número do contrato. O número possui 11 caracteres!");
    return false;
  }

  return true;

}